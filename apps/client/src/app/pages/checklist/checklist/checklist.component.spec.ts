import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ChecklistComponent } from './checklist.component';
import { Character } from '../../../model/character/character';
import { Completion } from '../../../model/completion';
import { Energy } from '../../../model/energy';
import { LostarkTask } from '../../../model/lostark-task';
import { Roster } from '../../../model/roster';
import { TaskFrequency } from '../../../model/task-frequency';
import { TaskScope } from '../../../model/task-scope';
import { CompletionService } from '../../../core/database/services/completion.service';
import { EnergyService } from '../../../core/database/services/energy.service';
import { RosterService } from '../../../core/database/services/roster.service';
import { SettingsService } from '../../../core/database/services/settings.service';
import { TasksService } from '../../../core/database/services/tasks.service';
import { TimeService } from '../../../core/time.service';

function makeCharacter(i: number): Character {
  return {
    id: i,
    name: `Char${i.toString().padStart(2, '0')}`,
    ilvl: 1500,
    lazy: false,
    class: null,
    weeklyGold: i % 2 === 0,
    tickets: {}
  } as unknown as Character;
}

function makeTask(key: string, scope: TaskScope): LostarkTask {
  return {
    $key: key,
    label: key === 't-char' ? 'Test Task' : 'Test Roster Task',
    amount: 2,
    frequency: TaskFrequency.DAILY,
    scope,
    enabled: true,
    minIlvl: 0,
    maxIlvl: 9999,
    canEditDaysFilter: true
  } as unknown as LostarkTask;
}

type SpecRow = { completion: number[]; task: LostarkTask };

function specRow(group: { data: unknown[] }): SpecRow {
  return group.data[0] as unknown as SpecRow;
}

type SpecGroupRow = { task: LostarkTask; available: boolean };

function specRows(group: { data: unknown[] }): SpecGroupRow[] {
  return group.data as unknown as SpecGroupRow[];
}

function laDay(offsetDays = 0): number {
  return new Date(Date.now() - 10 * 3600000 + offsetDays * 86400000).getUTCDay();
}

function makeDaysTask(key: string, label: string, scope: TaskScope, days: number[], canEditDaysFilter: boolean): LostarkTask {
  return {
    $key: key,
    label,
    amount: 1,
    frequency: TaskFrequency.DAILY,
    scope,
    enabled: true,
    minIlvl: 0,
    canEditDaysFilter,
    daysFilter: days
  } as unknown as LostarkTask;
}

const defaultSettings = {
  lazytracking: {},
  hiddenOnCompletion: false,
  goldPlannerConfiguration: {},
  raidModesForGoldPlanner: {}
};

describe('ChecklistComponent pagination', () => {
  const now = Date.now();
  const characters = Array.from({ length: 15 }, (_, i) => makeCharacter(i));
  // Distinct completion per character to prove index alignment after slicing
  const completionData: Record<string, { amount: number; updated: number }> = {};
  characters.forEach((c, i) => {
    completionData[`${i}:t-char`] = { amount: i % 3, updated: now };
  });
  const completion = { $key: 'c1', data: completionData } as unknown as Completion;
  const energy = { $key: 'e1', data: {} } as unknown as Energy;
  const roster = {
    $key: 'r1',
    characters,
    trackedTasks: {},
    showAllTasks: false
  } as unknown as Roster;

  let component: ChecklistComponent;
  let completionSetOne: jest.Mock;
  let energyUpdateOne: jest.Mock;
  let roster$: BehaviorSubject<Roster>;
  let tasks$: BehaviorSubject<LostarkTask[]>;
  let settings$: BehaviorSubject<typeof defaultSettings>;

  beforeEach(() => {
    localStorage.clear();
    completionSetOne = jest.fn();
    energyUpdateOne = jest.fn();
    roster$ = new BehaviorSubject(roster);
    tasks$ = new BehaviorSubject([makeTask('t-char', TaskScope.CHARACTER), makeTask('t-roster', TaskScope.ROSTER)]);
    settings$ = new BehaviorSubject({ ...defaultSettings });
    component = new ChecklistComponent(
      { roster$ } as unknown as RosterService,
      { tasks$ } as unknown as TasksService,
      {
        settings$,
        getRunningModeFlag: () => undefined
      } as unknown as SettingsService,
      { energy$: of(energy), updateOne: energyUpdateOne } as unknown as EnergyService,
      {
        lastDailyReset$: of(now - 60000),
        lastWeeklyReset$: of(now - 60000),
        lastBiWeeklyReset$: of(now - 60000),
        lastBiWeeklyOffsetReset$: of(now - 60000)
      } as unknown as TimeService,
      { completion$: of(completion), setOne: completionSetOne } as unknown as CompletionService
    );
  });

  it('should be created with narrow-column defaults', () => {
    expect(component).toBeTruthy();
    expect(component.columnWidthOptions).toEqual([80, 150, 240]);
    expect(component.pageSizeOptions).toEqual([
      { value: 0, label: 'All' },
      { value: 6, label: '6' },
      { value: 12, label: '12' }
    ]);
  });

  it('should show all characters by default', async () => {
    const pdisplay = await firstValueFrom(component.paginatedDisplay$);
    expect(pdisplay.total).toBe(15);
    expect(pdisplay.totalPages).toBe(1);
    expect(pdisplay.roster.map(c => c.name)).toEqual(characters.map(c => c.name));
    const row = specRow(pdisplay.data.dailyCharacter);
    expect(row.completion).toHaveLength(15);
    // Alignment: completion[i] belongs to characters[i]
    expect(row.completion).toEqual(characters.map((_, i) => i % 3));
  });

  it('should paginate 6 per page keeping completion aligned', async () => {
    component.pageSize$.next(6);
    let pdisplay = await firstValueFrom(component.paginatedDisplay$);
    expect(pdisplay.totalPages).toBe(3);
    expect(pdisplay.roster.map(c => c.name)).toEqual(['Char00', 'Char01', 'Char02', 'Char03', 'Char04', 'Char05']);
    expect(specRow(pdisplay.data.dailyCharacter).completion).toEqual([0, 1, 2, 0, 1, 2]);

    component.pageIndex$.next(2);
    pdisplay = await firstValueFrom(component.paginatedDisplay$);
    expect(pdisplay.roster.map(c => c.name)).toEqual(['Char12', 'Char13', 'Char14']);
    expect(specRow(pdisplay.data.dailyCharacter).completion).toEqual([0, 1, 2]);
  });

  it('should filter gold earners only', async () => {
    component.goldOnly$.next(true);
    const pdisplay = await firstValueFrom(component.paginatedDisplay$);
    expect(pdisplay.total).toBe(8);
    expect(pdisplay.roster.map(c => c.name)).toEqual(
      ['Char00', 'Char02', 'Char04', 'Char06', 'Char08', 'Char10', 'Char12', 'Char14']
    );

    component.pageSize$.next(6);
    component.pageIndex$.next(1);
    const paged = await firstValueFrom(component.paginatedDisplay$);
    expect(paged.totalPages).toBe(2);
    expect(paged.roster.map(c => c.name)).toEqual(['Char12', 'Char14']);
  });

  it('should not slice roster-scope rows', async () => {
    component.pageSize$.next(6);
    const pdisplay = await firstValueFrom(component.paginatedDisplay$);
    expect(specRow(pdisplay.data.dailyRoster).completion).toHaveLength(15);
    expect(specRow(pdisplay.data.dailyCharacter).completion).toHaveLength(6);
  });

  it('should clamp out-of-range page index', async () => {
    component.pageSize$.next(6);
    component.pageIndex$.next(99);
    const pdisplay = await firstValueFrom(component.paginatedDisplay$);
    expect(pdisplay.pageIndex).toBe(2);
    expect(pdisplay.roster).toHaveLength(3);
  });

  it('should mark the paginated character as done under its own key', async () => {
    component.pageSize$.next(6);
    component.pageIndex$.next(1);
    const pdisplay = await firstValueFrom(component.paginatedDisplay$);
    const target = pdisplay.roster[1];
    expect(target.name).toBe('Char07');
    const row = specRow(pdisplay.data.dailyCharacter);
    component.markAsDone(
      completion, energy, target, row.task, pdisplay.roster,
      true, pdisplay.dailyReset, pdisplay.weeklyReset, pdisplay.biWeeklyReset
    );
    // Char07 key is id-based ("7:t-char"), pre-existing amount was 1
    expect(completion.data['7:t-char'].amount).toBe(2);
    expect(completionSetOne).toHaveBeenCalledWith('c1', completion);
    expect(energyUpdateOne).not.toHaveBeenCalled();
  });

  it('should disable horizontal scroll once paginated narrowly', async () => {
    // 15 chars at 240px overflows 1024px viewport
    let scrolling = await firstValueFrom(component.scrolling$.pipe(skip(1)));
    expect(scrolling.x).toBeTruthy();

    component.columnWidth$.next(80);
    component.pageSize$.next(6);
    scrolling = await firstValueFrom(component.scrolling$.pipe(skip(1)));
    // 6 * 80 + 200 fits, no horizontal scroll needed
    expect(scrolling.x).toBeFalsy();
  });

  it('should expose a live page index stream', () => {
    const indices: number[] = [];
    const sub = (component.pageIndex$ as BehaviorSubject<number>).subscribe(i => indices.push(i));
    component.pageIndex$.next(2);
    sub.unsubscribe();
    expect(indices).toEqual([0, 2]);
  });

  describe('Show all tasks checkbox', () => {
    const today = laDay(0);
    const offDay = laDay(1);
    const dayTasks = () => [
      makeDaysTask('t-on', 'On Day', TaskScope.ROSTER, [today], false),
      makeDaysTask('t-off-fixed', 'Off Day Fixed', TaskScope.ROSTER, [offDay], false),
      makeDaysTask('t-off-custom', 'Off Day Custom', TaskScope.ROSTER, [offDay], true)
    ];

    it('hides off-day tasks by default and reveals them with the checkbox', async () => {
      tasks$.next(dayTasks());
      let pdisplay = await firstValueFrom(component.paginatedDisplay$);
      expect(specRows(pdisplay.data.dailyRoster).map(r => r.task.label)).toEqual(['On Day']);

      roster$.next({ ...roster, showAllTasks: true });
      pdisplay = await firstValueFrom(component.paginatedDisplay$);
      const rows = specRows(pdisplay.data.dailyRoster);
      expect(rows.map(r => r.task.label).sort()).toEqual(['Off Day Custom', 'Off Day Fixed', 'On Day']);
      expect(rows.filter(r => r.task.label !== 'On Day').every(r => !r.available)).toBe(true);
    });

    it('lets showAllTasks override hiddenOnCompletion', async () => {
      tasks$.next(dayTasks());
      settings$.next({ ...defaultSettings, hiddenOnCompletion: true });
      let pdisplay = await firstValueFrom(component.paginatedDisplay$);
      // Off-day rows count as done, hence hidden as completed
      expect(specRows(pdisplay.data.dailyRoster).map(r => r.task.label)).toEqual(['On Day']);

      roster$.next({ ...roster, showAllTasks: true });
      pdisplay = await firstValueFrom(component.paginatedDisplay$);
      expect(specRows(pdisplay.data.dailyRoster)).toHaveLength(3);
    });
  });
});
