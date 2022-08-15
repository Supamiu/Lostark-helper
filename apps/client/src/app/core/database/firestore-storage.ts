import { DataModel } from "./data-model";
import { distinctUntilChanged, finalize, first, from, map, merge, Observable, shareReplay, Subject, tap } from "rxjs";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  runTransaction,
  setDoc,
  Transaction,
  UpdateData,
  updateDoc,
  WithFieldValue,
  WriteBatch,
  writeBatch
} from "@angular/fire/firestore";
import { QueryConstraint } from "@firebase/firestore";
import { environment } from "../../../environments/environment";
import { startWith, switchMap } from "rxjs/operators";

export abstract class FirestoreStorage<T extends DataModel> {

  protected static OPERATIONS: Record<string, Record<"read" | "write" | "delete", number>> = {};

  protected shouldClone = true;

  protected converter: FirestoreDataConverter<T> = {
    toFirestore: (modelObject: WithFieldValue<T>): DocumentData => {
      const workingCopy: Partial<WithFieldValue<T>> = (this.shouldClone ? { ...modelObject } : modelObject) as Partial<WithFieldValue<T>>;
      delete workingCopy.$key;
      delete workingCopy.notFound;
      Object.entries(workingCopy)
        .forEach(([key, value]) => {
          if (value === undefined) {
            delete workingCopy[key];
          }
        });
      return workingCopy as T;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return {
        ...snapshot.data(),
        $key: snapshot.id
      } as T;
    }
  };

  protected cache: Record<string, Observable<T>> = {};

  protected updateSources: Record<string, Subject<UpdateData<T>>> = {};
  protected setSources: Record<string, Subject<T>> = {};

  protected readonly collection = collection(this.firestore, this.getCollectionName()).withConverter(this.converter);

  protected constructor(protected firestore: Firestore) {
    if (!window["getOperationsStats"]) {
      window["getOperationsStats"] = () => {
        const totals = {
          read: 0,
          write: 0,
          delete: 0
        };
        Object.entries(FirestoreStorage.OPERATIONS).forEach(([uri, stats]) => {
          console.group(uri);
          Object.entries(stats).forEach(([op, count]) => {
            console.log(`${op}: ${count}`);
            totals[op] += count;
          });
          console.groupEnd();
        });
        console.group("TOTALS");
        Object.entries(totals).forEach(([op, count]) => {
          console.log(`${op}: ${count}`);
        });
        console.groupEnd();
      };
    }
  }

  public recordOperation(operation: "read" | "write" | "delete", debugData?: unknown): void {
    if (window["verboseOperations"] || environment.verboseOperations) {
      console.log("OPERATION", operation, this.getCollectionName(), debugData);
    }
    FirestoreStorage.OPERATIONS[this.getCollectionName()] = FirestoreStorage.OPERATIONS[this.getCollectionName()] || {
      read: 0,
      write: 0,
      delete: 0
    };
    FirestoreStorage.OPERATIONS[this.getCollectionName()][operation]++;
  }

  protected docRef(key: string): DocumentReference<T> {
    return doc(this.firestore, this.getCollectionName(), key).withConverter(this.converter);
  }

  public query(...filterQuery: QueryConstraint[]): Observable<T[]> {
    return collectionData(query(this.collection, ...filterQuery).withConverter(this.converter));
  }

  private updateObjProp<T>(obj: T, value: unknown, propPath: string): void {
    const [head, ...rest] = propPath.split(".");
    !rest.length
      ? obj[head] = value
      : this.updateObjProp(obj[head], value, rest.join("."));
  }

  public getOne(key: string, isForCurrentUser = false): Observable<T> {
    if (!this.cache[key]) {
      const source$ = docData(this.docRef(key)).pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap(() => this.recordOperation("read", "wtf")),
        map(res => {
          if (!res) {
            return {
              $key: key,
              notFound: true
            } as T;
          }
          return res;
        })
      );
      if (isForCurrentUser) {
        this.updateSources[key] = new Subject<UpdateData<T>>();
        this.setSources[key] = new Subject<T>();
        this.cache[key] = merge(
          this.setSources[key],
          source$.pipe(first())
        ).pipe(
          switchMap((obj) => {
            return this.updateSources[key].pipe(
              map(update => {
                Object.keys(update).forEach(k => {
                  // Skipping array manipulations
                  if (typeof update[k] === "function") {
                    return;
                  }
                  this.updateObjProp(obj, update[k], k);
                });
                return obj;
              }),
              startWith(obj)
            );
          })
        );
      } else {
        this.cache[key] = source$.pipe(
          shareReplay({ refCount: true, bufferSize: 1 }),
          finalize(() => delete this.cache[key])
        );
      }
    }
    return this.cache[key];
  }

  public addOne(row: Omit<T, "$key">): Observable<string> {
    return from(addDoc(this.collection, row)).pipe(
      tap(() => this.recordOperation("write")),
      map(ref => ref.id)
    );
  }

  public deleteOne(key: string): Observable<void> {
    this.recordOperation("delete", key);
    return from(deleteDoc(this.docRef(key)));
  }

  public setOne(key: string, row: Omit<T, "$key" | "notFound">): Observable<void> {
    this.recordOperation("write", key);
    if (this.setSources[key]) {
      this.setSources[key].next({ ...row, $key: key } as T);
    }
    return from(setDoc(this.docRef(key), row));
  }

  public updateOne(key: string, row: UpdateData<T>): Observable<void> {
    this.recordOperation("write", key);
    if (this.updateSources[key]) {
      this.updateSources[key].next(row);
    }
    return from(updateDoc(this.docRef(key), row));
  }

  protected transaction<R>(transaction: (t: Transaction) => Promise<R>): Observable<R> {
    return from(runTransaction(this.firestore, transaction));
  }

  protected batch(): WriteBatch {
    return writeBatch(this.firestore);
  }

  protected abstract getCollectionName(): string;
}
