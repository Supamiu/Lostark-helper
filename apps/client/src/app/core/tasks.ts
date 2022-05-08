import { LostarkTask } from "../model/lostark-task";
import { TaskFrequency } from "../model/task-frequency";
import { TaskScope } from "../model/task-scope";


export const tasks = [
  // Daily character
  new LostarkTask("Chaos Dungeon", 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2, 9999, "chaos-dungeon.webp", {
    partySize: 4
  }),
  new LostarkTask("Guardian", 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2, 9999, "guardian.png", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Una's Task`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 3, 9999, "daily.webp"),
  new LostarkTask(`Kalthertz Slaves`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 1),
  new LostarkTask(`Guild Support`, 0, TaskFrequency.DAILY, TaskScope.CHARACTER, 1),


  // Daily roster
  new LostarkTask("Chaos Gate", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "chaos_gate.png", {
    daysFilter: [1, 4, 6, 0]
  }),
  new LostarkTask("Anguished Island", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1),
  new LostarkTask("Adventure Island", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "island.webp"),
  new LostarkTask("Procyon Boss", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "island.webp", {
    daysFilter: [2, 5, 0]
  }),
  new LostarkTask("Affinity Song", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6, 9999, "rapport.webp"),
  new LostarkTask("Affinity Emote", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6, 9999, "rapport.webp"),

  // Weekly Character
  new LostarkTask(`Una's Task`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3, 9999, "weekly.webp"),
  //new LostarkTask(`Guardian`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3),
  new LostarkTask(`Demon Beast Canyon`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 840, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Necromancer's Origin`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 840, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Hall of the Twisted Warlord`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Hildebrandt Palace`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Road of Lament`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Forge of Fallen Pride`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Sea of Indolence`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 8
  }),
  new LostarkTask(`Tranquil Karkosa`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 8
  }),
  new LostarkTask(`Alaric's Sanctuary`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 8
  }),
  new LostarkTask(`Aira's Oculus`, 1325, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Oreha Preveza`, 1340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "abyssal-dungeon.webp", {
    shared: true,
    partySize: 4
  }),
  new LostarkTask(`Argos`, 1370, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "abyssal-raid.webp", {
    shared: true,
    partySize: 8
  }),

  // Weekly Roster
  new LostarkTask(`Ghostship`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 1, 9999, "ghostship.png", {
    daysFilter: [2, 4, 6]
  }),
  new LostarkTask(`South Vern Dungeon`, 1340, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2, 9999, "", ),
  //new LostarkTask(`Trial of the Abyss`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2),

  // Trades
  new LostarkTask(`Sylmael Bloodstones Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "sylmael.png"),
  new LostarkTask(`Pirate Coin Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "pirate_coin.png"),
  new LostarkTask(`Chaos Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "chaos-dungeon.webp")
];
