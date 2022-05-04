import {LostarkTask} from "../model/lostark-task";
import {TaskFrequency} from "../model/task-frequency";
import {TaskScope} from "../model/task-scope";

export const tasks = [
  // Daily character
  new LostarkTask('Chaos dungeon', 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2),
  new LostarkTask('Guardian', 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 2),
  new LostarkTask(`Una's Task`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 3),
  new LostarkTask(`Kalthertz Slaves`, 302, TaskFrequency.DAILY, TaskScope.CHARACTER, 1),
  new LostarkTask(`Guild support`, 0, TaskFrequency.DAILY, TaskScope.CHARACTER, 1),


  // Daily roster
  new LostarkTask('Chaos gate', 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1),
  new LostarkTask('Anguished Island', 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1),
  new LostarkTask('Adventure Island', 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1),
  new LostarkTask('Procyon Boss', 302, TaskFrequency.DAILY, TaskScope.ROSTER, 1),
  new LostarkTask('Affinity Song', 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6),
  new LostarkTask('Affinity Emote', 302, TaskFrequency.DAILY, TaskScope.ROSTER, 6),

  // Weekly Character
  new LostarkTask(`Una's Task`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3),
  //new LostarkTask(`Guardian`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 3),
  new LostarkTask(`Demon Beast Canyon`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960),
  new LostarkTask(`Necromancer's Origin`, 340, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960),
  new LostarkTask(`Hall of the Twisted Warlord`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960),
  new LostarkTask(`Hildebrandt Palace`, 460, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 960),
  new LostarkTask(`Road of Lament`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325),
  new LostarkTask(`Forge of Fallen Pride`, 840, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325),
  new LostarkTask(`Sea of Indolence`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325),
  new LostarkTask(`Tranquil Karkosa`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325),
  new LostarkTask(`Alaric's Sanctuary`, 960, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1, 1325),
  new LostarkTask(`Aira's Oculus`, 1325, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1),
  new LostarkTask(`Oreha Preveza`, 1325, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1),
  new LostarkTask(`Argos`, 1370, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1),

  // Weekly Roster
  new LostarkTask(`Ghostship`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 1),
  new LostarkTask(`South Vern Dungeon`, 1340, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2),
  //new LostarkTask(`Trial of the Abyss`, 460, TaskFrequency.WEEKLY, TaskScope.ROSTER, 2),

  // Trades
  new LostarkTask(`Sylmael Bloodstones Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1),
  new LostarkTask(`Pirate Coin Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1),
  new LostarkTask(`Chaos Purchases`, 302, TaskFrequency.WEEKLY, TaskScope.CHARACTER, 1),
]
