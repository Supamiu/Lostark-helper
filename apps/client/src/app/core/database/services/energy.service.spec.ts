import { TestBed } from "@angular/core/testing";
import { EnergyService } from "./energy.service";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../../../../environments/environment";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { NzMessageModule } from "ng-zorro-antd/message";
import { TimeService } from "../../time.service";
import { of } from "rxjs";
import { TasksService } from "./tasks.service";
import { tasks } from "../../tasks";
import { RosterService } from "./roster.service";
import { CompletionService } from "./completion.service";
import { CompletionEntry } from "../../../model/completion-entry";

const mockTask = {
  ...tasks[0],
  $key: "testing"
};

describe("EnergyService", () => {
  let service: EnergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        NzMessageModule
      ],
      providers: [
        {
          provide: TimeService,
          useValue: {
            // Sun 08/05/2022 @10AM UTC +1s
            lastDailyReset$: of(1652005000000)
          }
        },
        {
          provide: TasksService,
          useValue: {
            tasks$: of([
              mockTask
            ])
          }
        },
        {
          provide: RosterService,
          useValue: {
            roster$: of({
              characters: []
            })
          }
        },
        {
          provide: CompletionService,
          useValue: {
            completion$: of({
              data: {}
            })
          }
        }
      ]
    });
    service = TestBed.inject(EnergyService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should update energy properly", () => {
    const reset = 1652005000000;
    const twoDaysBefore = reset + 3600000 - 2 * 86400000;
    const completionEntry: CompletionEntry = {
      amount: 2,
      updated: twoDaysBefore
    };
    const energy = { $key: "test", data: {}, updated: twoDaysBefore };
    const task = tasks[0]; // Chaos dungeon
    const entry = { amount: 0 };

    expect(service.getEnergyUpdate(reset, completionEntry, energy, task, entry).amount).toBe(20);
  });

  it("should update energy properly on specific case", () => {
    const reset = 1652176800000;
    const completionDate = 1652038911993;
    const completionEntry: CompletionEntry = {
      amount: 2,
      updated: completionDate
    };
    const energy = { $key: "test", data: {}, updated: 1652176800000 - 3600000 };
    const task = tasks[0]; // Chaos dungeon
    const entry = { amount: 0 };

    expect(service.getEnergyUpdate(reset, completionEntry, energy, task, entry).amount).toBe(20);
  });

  it("should update energy properly with partially done task", () => {
    const reset = 1652004000;
    const twoDaysBefore = reset + 3600000 - 2 * 86400000;
    const completionEntry: CompletionEntry = {
      amount: 1,
      updated: twoDaysBefore
    };
    const energy = { $key: "test", data: {}, updated: twoDaysBefore };
    const task = tasks[0]; // Chaos dungeon
    const entry = { amount: 0 };

    expect(service.getEnergyUpdate(reset, completionEntry, energy, task, entry).amount).toBe(30);
  });

  it("should update energy properly with partially done task on last day only", () => {
    const reset = 1652004000;
    const oneDayBefore = reset + 3600000 - 86400000;
    const completionEntry: CompletionEntry = {
      amount: 1,
      updated: oneDayBefore
    };
    const energy = { $key: "test", data: {}, updated: oneDayBefore };
    const task = tasks[0]; // Chaos dungeon
    const entry = { amount: 0 };

    expect(service.getEnergyUpdate(reset, completionEntry, energy, task, entry).amount).toBe(10);
  });

  it("should update energy properly with partially done task after existing update", () => {
    const reset = 1652004000;
    const twoDaysBefore = reset + 3600000 - 2 * 86400000;
    const oneDayBefore = reset + 3600000 - 86400000;
    const completionEntry: CompletionEntry = {
      amount: 1,
      updated: twoDaysBefore
    };
    const energy = { $key: "test", data: {}, updated: oneDayBefore };
    const task = tasks[0]; // Chaos dungeon
    const entry = { amount: 10 };

    expect(service.getEnergyUpdate(reset, completionEntry, energy, task, entry).amount).toBe(30);
  });
});
