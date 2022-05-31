import { HoningService } from "./honing.service";

describe("HoningService", () => {
  it("Should properly compute cost", () => {
    const service = new HoningService();
    expect(service.getHoningCost({
      "quality": 100,
      "rarity": 4,
      "targetHoning": 10,
      "honing": 9
    }, "weapon")?.leapstones).toBe(64);
    expect(service.getHoningCost({
      "quality": 100,
      "rarity": 4,
      "targetHoning": 20,
      "honing": 19
    }, "weapon")?.leapstones).toBe(640);
  });
});
