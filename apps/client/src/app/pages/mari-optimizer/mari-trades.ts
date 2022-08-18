import { GameCode } from "../../data/game-code";
import { MariTrade } from "./mari-trade";

export const mariTrades: MariTrade[] = [
  // Honing Chances
  {
    gameCode: GameCode.JUICE_1302_S,
    name: "Solar Grace",
    icon: "shop_09.png",
    crystalPrice: 160,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 40,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.JUICE_1302_M,
    name: "Solar Blessing",
    icon: "shop_10.png",
    crystalPrice: 300,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 30,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.JUICE_1302_L,
    name: "Solar Protection",
    icon: "shop_11.png",
    crystalPrice: 750,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 25,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.JUICE_802,
    name: "Moon's Breath",
    icon: "shop_08.png",
    crystalPrice: 30,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 10,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.JUICE_302,
    name: "Star's Breath",
    icon: "shop_07.png",
    crystalPrice: 30,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 15,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.BOOK_ARMOR_1340,
    name: "Tailoring: Applied Mending",
    icon: "shop_27.png",
    crystalPrice: 260,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 4,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.BOOK_WEAPON_1340,
    name: "Metallurgy: Applied Welding",
    icon: "shop_28.png",
    crystalPrice: 280,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 2,
    mbQuantity: 1
  },
  // Honing materials

  // Stones
  {
    gameCode: GameCode.DESTRUCTION_1302,
    name: "Crystallized Destruction Stone",
    icon: "shop_13.png",
    crystalPrice: 300,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 500,
    mbQuantity: 10
  },
  {
    gameCode: GameCode.GUARDIAN_1302,
    name: "Crystallized Guardian Stone",
    icon: "shop_15.png",
    crystalPrice: 270,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 1000,
    mbQuantity: 10
  },
  {
    gameCode: GameCode.DESTRUCTION_802,
    name: "Destruction Stone",
    icon: "shop_12.png",
    crystalPrice: 90,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 300,
    mbQuantity: 10
  },
  {
    gameCode: GameCode.GUARDIAN_802,
    name: "Guardian Stone",
    icon: "shop_14.png",
    crystalPrice: 150,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 1000,
    mbQuantity: 10
  },
  {
    gameCode: GameCode.DESTRUCTION_302,
    name: "Destruction Stone Fragment",
    icon: "",
    crystalPrice: 120,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 600,
    mbQuantity: 10
  },
  {
    gameCode: GameCode.GUARDIAN_302,
    name: "Guardian Stone Fragment",
    icon: "",
    crystalPrice: 75,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 1000,
    mbQuantity: 10
  },

  // Shards
  {
    gameCode: GameCode.SHARDS_1302_S,
    name: "Honor Shard Pouch (S)",
    icon: "shop_04.png",
    crystalPrice: 112,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.SHARDS_802_S,
    name: "Life Shard Pouch (S)",
    icon: "shop_01.png",
    crystalPrice: 75,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 20,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.SHARDS_302_M,
    name: "Harmony Shard Pouch (M)",
    icon: "shop_25.png",
    crystalPrice: 141,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 15,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.SHARDS_1302_L,
    name: "Honor Shard Pouch (L)",
    icon: "shop_06.png",
    crystalPrice: 291,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },

  // Leapstones
  {
    gameCode: GameCode.LEAPSTONE_1340,
    name: "Great Honor Leapstone",
    icon: "shop_23.png",
    crystalPrice: 50,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 5,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.LEAPSTONE_1302,
    name: "Honor Leapstone",
    icon: "shop_22.png",
    crystalPrice: 40,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.LEAPSTONE_802,
    name: "Life Leapstone",
    icon: "shop_19.png",
    crystalPrice: 56,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 40,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.LEAPSTONE_302,
    name: "Harmony Leapstone",
    icon: "shop_16.png",
    crystalPrice: 30,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 30,
    mbQuantity: 1
  },

  // Fusion Materials
  {
    gameCode: GameCode.FUSION_1340,
    name: "Basic Oreha Fusion Material",
    icon: "basic_oreha.png",
    crystalPrice: 72,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.FUSION_1302,
    name: "Simple Oreha Fusion Material",
    icon: "simple_oreha.png",
    crystalPrice: 54,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    gameCode: GameCode.FUSION_802,
    name: "Caldarr Fusion Material",
    icon: "caldarr.png",
    crystalPrice: 60,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 15,
    mbQuantity: 1
  }
].sort((a,b) => a.minIlvl - b.minIlvl);
