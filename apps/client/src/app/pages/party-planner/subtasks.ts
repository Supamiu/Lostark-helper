import { Subtask } from "./subtask";

export const subtasks: Subtask[] = [
  // T1 Guardians
  { id: `ur'nil`, name: `Ur'nil`, parentName: "Guardian", banner: "guardians/monster_info_23.png", minIlvl: 302 },
  { id: `lumerus`, name: `Lumerus`, parentName: "Guardian", banner: "guardians/monster_info_22.png", minIlvl: 340 },
  { id: `icy-legoros`, name: `Icy Legoros`, parentName: "Guardian", banner: "guardians/monster_info_11.png", minIlvl: 380 },
  { id: `vertus`, name: `Vertus`, parentName: "Guardian", banner: "guardians/monster_info_00.png", minIlvl: 420 },
  { id: `chromanium`, name: `Chromanium`, parentName: "Guardian", banner: "guardians/monster_info_02.png", minIlvl: 460 },
  { id: `nacrasena`, name: `Nacrasena`, parentName: "Guardian", banner: "guardians/monster_info_07.png", minIlvl: 500 },
  { id: `flame-fox-yoho`, name: `Flame Fox Yoho`, parentName: "Guardian", banner: "guardians/monster_info_19.png", minIlvl: 540 },
  { id: `tytalos`, name: `Tytalos`, parentName: "Guardian", banner: "guardians/monster_info_21.png", minIlvl: 580 },
  // T2 Guardians
  { id: `dark-legoros`, name: `Dark Legoros`, parentName: "Guardian", banner: "guardians/monster_info_10.png", minIlvl: 802 },
  { id: `helgaia`, name: `Helgaia`, parentName: "Guardian", banner: "guardians/monster_info_01.png", minIlvl: 840 },
  { id: `calventus`, name: `Calventus`, parentName: "Guardian", banner: "guardians/monster_info_17.png", minIlvl: 880 },
  { id: `achates`, name: `Achates`, parentName: "Guardian", banner: "guardians/monster_info_20.png", minIlvl: 920 },
  { id: `frost-helgaia`, name: `Frost Helgaia`, parentName: "Guardian", banner: "guardians/monster_info_14.png", minIlvl: 960 },
  { id: `lava-chromanium`, name: `Lava Chromanium`, parentName: "Guardian", banner: "guardians/monster_info_15.png", minIlvl: 1000 },
  { id: `levanos`, name: `Levanos`, parentName: "Guardian", banner: "guardians/monster_info_09.png", minIlvl: 1040 },
  { id: `alberhastic`, name: `Alberhastic`, parentName: "Guardian", banner: "guardians/monster_info_26.png", minIlvl: 1080 },
  // T3 Guardians
  { id: `armored-nacrasena`, name: `Armored Nacrasena`, parentName: "Guardian", banner: "guardians/monster_info_08.png", minIlvl: 1302 },
  { id: `igrexion`, name: `Igrexion`, parentName: "Guardian", banner: "guardians/monster_info_25.png", minIlvl: 1340 },
  { id: `night-fox-yoho`, name: `Night Fox Yoho`, parentName: "Guardian", banner: "guardians/monster_info_18.png", minIlvl: 1370 },
  // { ie: `velganosd: , name: `Velganos`, parentName: "Guardian", banner: 'guardians/monster_info_.png', minIlvl: 1400 },
  { id: `deskaluda`, name: `Deskaluda`, parentName: "Guardian", banner: 'guardians/monster_info_27.png', minIlvl: 1415 },
  { id: `kungelanium`, name: `Kungelanium`, parentName: "Guardian", banner: 'guardians/monster_info_28.png', minIlvl: 1460 },
  { id: `caliligos`, name: `Caliligos`, parentName: "Guardian", banner: 'guardians/monster_info_16.png', minIlvl: 1490 },
  { id: `hanumatan`, name: `Hanumatan`, parentName: "Guardian", banner: 'guardians/monster_info_29.png', minIlvl: 1540 },
  { id: `sonavel`, name: `Sonavel`, parentName: "Guardian", banner: 'guardians/monster_info_30.png', minIlvl: 1580 },
  { id: `gargadeth`, name: `Gargadeth`, parentName: "Guardian", banner: 'guardians/monster_info_31.png', minIlvl: 1610 },

  // T3 Abyss
  { id: `aira's-oculus-normal`, name: `Aira's Oculus (Normal)`, parentName: "Aira's Oculus", banner: "abyss_dungeons/abyss_dg_09.png", minIlvl: 1325 },
  { id: `aira's-oculus-hard`, name: `Aira's Oculus (Hard)`, parentName: "Aira's Oculus", banner: "abyss_dungeons/abyss_dg_09.png", minIlvl: 1370, maxIlvl: 1415 },
  { id: `oreha-preveza-normal`, name: `Oreha Preveza (Normal)`, parentName: "Oreha Preveza", banner: "abyss_dungeons/abyss_dg_10.png", minIlvl: 1340 },
  { id: `oreha-preveza-hard`, name: `Oreha Preveza (Hard)`, parentName: "Oreha Preveza", banner: "abyss_dungeons/abyss_dg_10.png", minIlvl: 1370, maxIlvl: 1415 },

  // Argos Phases
  { id: `argos-p1`, name: `Argos P1`, parentName: "Argos", banner: "abyss_raids/abyss_02.png", minIlvl: 1370 },
  { id: `argos-p2`, name: `Argos P2`, parentName: "Argos", banner: "abyss_raids/abyss_02.png", minIlvl: 1370 },
  { id: `argos-p3`, name: `Argos P3`, parentName: "Argos", banner: "abyss_raids/abyss_02.png", minIlvl: 1370 },

  // Valtan Difficulties
  { id: `valtan-normal`, name: `Valtan Normal`, parentName: "Valtan", minIlvl: 1415 },
  { id: `valtan-hard`, name: `Valtan Hard`, parentName: "Valtan", minIlvl: 1445 },

  // Vykas Difficulties
  { id: `vykas-normal`, name: `Vykas Normal`, parentName: "Vykas", minIlvl: 1430 },
  { id: `vykas-hard`, name: `Vykas Hard`, parentName: "Vykas", minIlvl: 1460 },
  
  // Kakul Difficulties
  { id: `kakul-normal`, name: `Kakul-Saydon Normal`, parentName: "Kakul", minIlvl: 1475 },
  
  // Brelshaza Difficulties
  { id: `brelshaza-g12`, name: `Brelshaza G1-G2`, parentName: "Brelshaza", minIlvl: 1490 },
  { id: `brelshaza-g3`, name: `Brelshaza G3`, parentName: "Brelshaza", minIlvl: 1500 },
  { id: `brelshaza-g4`, name: `Brelshaza G4`, parentName: "Brelshaza", minIlvl: 1520 },
  
  //Kayangel Difficulties
  { id: `kayangel`, name: `Kayangel`, parentName: "Kayangel", minIlvl: 1540 },

  //Akkan Difficulties
  { id: `akkan-normal`, name: `Akkan Normal`, parentName: "Akkan", minIlvl: 1580 },  
  { id: `akkan-hard`, name: `Akkan Hard`, parentName: "Akkan", minIlvl: 1600 },  

  //Ivory Tower Difficulties
  { id: `ivory-tower-normal`, name: `Ivory Tower Normal`, parentName: "Ivory Tower", minIlvl: 1600 },  
  { id: `ivory-tower-hard`, name: `Ivory Tower Hard`, parentName: "Ivory Tower", minIlvl: 1620 }, 
  
  //Theamine Difficulties
  { id: `theamine-normal`, name: `Theamine Normal`, parentName: "Theamine", minIlvl: 1610 },  
  { id: `theamine-hard`, name: `Theamine Hard`, parentName: "Theamine G4", minIlvl: 1630 }, 

];
