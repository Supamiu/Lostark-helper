import { LostarkTask } from "../model/lostark-task";
import { TaskFrequency } from "../model/task-frequency";
import { TaskScope } from "../model/task-scope";


export const tasks = [
  // Daily character
  new LostarkTask("Chaos dungeon", 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2, 9999, "chaos-dungeon.webp", { shared: true }),
  new LostarkTask("Guardian", 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2, 9999, "guardian.png", { shared: true }),
  new LostarkTask(`Una's Task`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 3, 9999, "daily.webp"),
  new LostarkTask(`Kalthertz Slaves`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 1),
  new LostarkTask(`Guild support`, 0, TaskFrequency.DAILY, TaskScope.CHARACTER, 1),


  // Daily roster
  new LostarkTask("Chaos gate", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "chaos_gate.png", {
    daysFilter: [0, 3, 5, 6],
    shared: true
  }),
  new LostarkTask("Anguished Island", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1),
  new LostarkTask("Adventure Island", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "island.webp", { shared: true }),
  new LostarkTask("Procyon Boss", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1, 9999, "island.webp", {
    daysFilter: [1, 4, 6],
    shared: true
  }),
  new LostarkTask("Affinity Song", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6, 9999, "rapport.webp"),
  new LostarkTask("Affinity Emote", 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6, 9999, "rapport.webp"),

  // Weekly Character
  new LostarkTask(`Una's Task`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3, 9999, "weekly.webp"),
  //new LostarkTask(`Guardian`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3),
  new LostarkTask(`Demon Beast Canyon`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 840, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Necromancer's Origin`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 840, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Hall of the Twisted Warlord`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Hildebrandt Palace`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Road of Lament`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Forge of Fallen Pride`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Sea of Indolence`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Tranquil Karkosa`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Alaric's Sanctuary`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1370, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Aira's Oculus`, 1325, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Oreha Preveza`, 1340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "abyssal-dungeon.webp", { shared: true }),
  new LostarkTask(`Argos`, 1370, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "abyssal-raid.webp", { shared: true }),

  // Weekly Roster
  new LostarkTask(`Ghostship`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 1, 9999, "ghostship.png", {
    daysFilter: [1, 3, 5],
    shared: true
  }),
  new LostarkTask(`South Vern Dungeon`, 1340, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2, 9999, '', { shared: true }),
  //new LostarkTask(`Trial of the Abyss`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2),

  // Trades
  new LostarkTask(`Sylmael Bloodstones Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "sylmael.png"),
  new LostarkTask(`Pirate Coin Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "pirate_coin.png"),
  new LostarkTask(`Chaos Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 9999, "chaos-dungeon.webp")
];
