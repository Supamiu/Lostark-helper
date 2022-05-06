import { DataModel } from "./data-model";
import { from, map, Observable } from "rxjs";
import {
  addDoc,
  collection,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  setDoc,
  UpdateData,
  updateDoc,
  WithFieldValue
} from "@angular/fire/firestore";

export abstract class FirestoreStorage<T extends DataModel> {

  protected converter: FirestoreDataConverter<T> = {
    toFirestore(modelObject: WithFieldValue<T>): DocumentData {
      const workingCopy: Partial<WithFieldValue<T>> = { ...modelObject } as Partial<WithFieldValue<T>>;
      delete workingCopy.$key;
      delete workingCopy.notFound;
      return modelObject as T;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return {
        $key: snapshot.id,
        ...snapshot.data()
      } as T;
    }
  };

  protected readonly collection = collection(this.firestore, this.getCollectionName()).withConverter(this.converter);

  protected constructor(protected firestore: Firestore) {
  }

  private docRef(key: string): DocumentReference<T> {
    return doc(this.firestore, this.getCollectionName(), key).withConverter(this.converter);
  }

  public getOne(key: string): Observable<T> {
    return docData(this.docRef(key)).pipe(
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
  }

  public addOne(row: T): Observable<string> {
    return from(addDoc(this.collection, row)).pipe(
      map(ref => ref.id)
    );
  }

  public setOne(key: string, row: Omit<T, "$key" | "notFound">): Observable<void> {
    return from(setDoc(this.docRef(key), row));
  }

  public updateOne(key: string, row: UpdateData<T>): Observable<void> {
    return from(updateDoc(this.docRef(key), row));
  }

  protected abstract getCollectionName(): string;
}
