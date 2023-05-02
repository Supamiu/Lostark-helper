import { createTask } from "../model/lostark-task";
import { TaskFrequency } from "../model/task-frequency";
import { TaskScope } from "../model/task-scope";

export const tasks = [
  // Daily character
  createTask("Chaos Dungeon", 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2, 9999, "chaos-dungeon.webp", {
    partySize: 4
  }),
  createTask("Guardian", 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2, 9999, "guardian.png", {
    shared: true,
    partySize: 4
  }),
  createTask(`Una's Task`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 3, 9999, "daily.webp"),
  createTask(`Kalthertz Slaves`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 1, 9999, "pirate_coin.png"),
  createTask(`Guild Support`, 0, TaskFrequency.DAILY, TaskScope.CHARACTER, 1, 9999, "sylmael.png"),


  // Daily roster
  createTask("Chaos Gate", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "chaos_gate.png", {
    daysFilter: [1, 4, 6, 0],
    canEditDaysFilter: false,
  }),
  createTask("Anguished Island", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "anguished.png"),
  createTask("Adventure Island", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "island.webp"),
  createTask("Procyon Boss", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "island.webp", {
    daysFilter: [2, 5, 0],
    canEditDaysFilter: false,
  }),
  createTask("Affinity Song", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6, 9999, "rapport.webp"),
  createTask("Affinity Emote", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6, 9999, "rapport.webp"),

  // Weekly Character
  createTask(`Una's Task`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3, 9999, "weekly.webp"),
  createTask(`Demon Beast Canyon`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 840, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Necromancer's Origin`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 840, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Hall of the Twisted Warlord`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Hildebrandt Palace`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Road of Lament`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Forge of Fallen Pride`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Sea of Indolence`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 8
  }),
  createTask(`Tranquil Karkosa`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 8
  }),
  createTask(`Alaric's Sanctuary`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 8
  }),
  createTask(`Aira's Oculus`, 1325, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1415, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Oreha Preveza`, 1340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1415, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  createTask(`Argos`, 1370, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3, 1475, "abyssal-raid.webp", {
    shared: true,
    partySize: 8
  }),
  createTask(`Valtan`, 1415, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 2, 9999, "legion_raid.png", {
    shared: true,
    partySize: 8
  }),
  createTask(`Vykas`, 1430, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3, 9999, "legion_raid.png", {
    shared: true,
    partySize: 8
  }),
  createTask(`Kakul-Saydon`, 1475, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3, 9999, "legion_raid.png", {
    shared: true,
    partySize: 4
  }),
  createTask(`Brelshaza Gate 1-2`, 1490, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 2, 9999, "legion_raid.png", {
    shared: true,
    partySize: 8
  }),
  createTask(`Brelshaza Gate 3-4`, 1500, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 2, 9999, "legion_raid.png", {
    shared: true,
    partySize: 8
  }),
  createTask(`Brelshaza Gate 5-6`, 1520, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 2, 9999, "legion_raid.png", {
    shared: true,
    partySize: 8
  }),
  createTask(`Kayangel`, 1540, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 4, 9999, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),

  // Weekly Roster
  createTask(`Ghostship`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 1, 9999, "ghostship.png", {
    daysFilter: [2, 4, 6],
    canEditDaysFilter: false
  }),
  createTask(`South Vern Chaos Line Dungeon`, 1340, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2, 9999, "dungeon.webp"),
  createTask("Challenge Guardian", 302, TaskFrequency.WEEKLY, TaskScope.ROSTER, 3, 9999, "guardian.png", {
    shared: true,
    partySize: 4
  }),
  createTask("Challenge Abyssal Dungeon", 302, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2, 9999, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  //createTask(`Trial of the Abyss`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2),

  // Trades
  createTask(`Sylmael Bloodstones Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "sylmael.png"),
  createTask(`Pirate Coin Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "pirate_coin.png"),
  createTask(`Chaos Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "chaos-dungeon.webp")
];
