import { MariTrade } from "./mari-trade";

export const mariTrades: MariTrade[] = [
  // Honing Chances
  {
    name: "Solar Grace",
    icon: "shop_09.png",
    crystalPrice: 160,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 40,
    mbQuantity: 1
  },
  {
    name: "Solar Blessing",
    icon: "shop_10.png",
    crystalPrice: 300,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 30,
    mbQuantity: 1
  },
  {
    name: "Solar Protection",
    icon: "shop_11.png",
    crystalPrice: 360,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 8,
    mbQuantity: 1
  },
  {
    name: "Moon's Breath",
    icon: "shop_08.png",
    crystalPrice: 30,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 10,
    mbQuantity: 1
  },
  {
    name: "Star's Breath",
    icon: "shop_07.png",
    crystalPrice: 30,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 15,
    mbQuantity: 1
  },
  // Honing materials

  // Stones
  {
    name: "Destruction Stone Crystal",
    icon: "shop_13.png",
    crystalPrice: 300,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 500,
    mbQuantity: 10
  },
  {
    name: "Guardian Stone Crystal",
    icon: "shop_15.png",
    crystalPrice: 270,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 1000,
    mbQuantity: 10
  },
  {
    name: "Destruction Stone",
    icon: "shop_12.png",
    crystalPrice: 90,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 300,
    mbQuantity: 10
  },
  {
    name: "Guardian Stone",
    icon: "shop_14.png",
    crystalPrice: 150,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 1000,
    mbQuantity: 10
  },
  {
    name: "Destruction Stone Fragment",
    icon: "",
    crystalPrice: 120,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 600,
    mbQuantity: 10
  },
  {
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
    name: "Honor Shard Pouch (S)",
    icon: "shop_04.png",
    crystalPrice: 112,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    name: "Life Shard Pouch (S)",
    icon: "shop_01.png",
    crystalPrice: 75,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 20,
    mbQuantity: 1
  },
  {
    name: "Harmony Shard Pouch (M)",
    icon: "shop_25.png",
    crystalPrice: 141,
    minIlvl: 302,
    maxIlvl: 600,
    quantity: 15,
    mbQuantity: 1
  },

  // Leapstones
  {
    name: "Great Honor Leapstone",
    icon: "shop_23.png",
    crystalPrice: 50,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 5,
    mbQuantity: 1
  },
  {
    name: "Honor Leapstone",
    icon: "shop_22.png",
    crystalPrice: 40,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    name: "Life Leapstone",
    icon: "shop_19.png",
    crystalPrice: 56,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 40,
    mbQuantity: 1
  },
  {
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
    name: "Basic Oreha Fusion Material",
    icon: "basic_oreha.png",
    crystalPrice: 72,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    name: "Simple Oreha Fusion Material",
    icon: "simple_oreha.png",
    crystalPrice: 54,
    minIlvl: 1302,
    maxIlvl: 9999,
    quantity: 20,
    mbQuantity: 1
  },
  {
    name: "Caldarr Fusion Material",
    icon: "caldarr.png",
    crystalPrice: 60,
    minIlvl: 802,
    maxIlvl: 1100,
    quantity: 15,
    mbQuantity: 1
  }
].sort((a,b) => a.minIlvl - b.minIlvl);
