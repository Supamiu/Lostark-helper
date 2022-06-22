import { applyDuration, emptyAvailability, isAvailable, mergeAvailabilities } from "./availability";
import { AvailabilityStatus } from "./availability-status";

describe("Availability system", () => {

  it("Should return available for simple events", () => {
    const availability = emptyAvailability();
    [18, 19, 20, 21, 22, 23].every(i => availability.monday[i] = AvailabilityStatus.AVAILABLE);
    expect(isAvailable(availability, 1, 18, 2)).toBeTruthy();
    expect(isAvailable(availability, 1, 20, 2)).toBeTruthy();
    expect(isAvailable(availability, 1, 20, 4)).toBeTruthy();
    expect(isAvailable(availability, 1, 23, 1)).toBeTruthy();
    expect(isAvailable(availability, 1, 20, 5)).not.toBeTruthy();
    expect(isAvailable(availability, 1, 20, 5)).not.toBeTruthy();
    expect(isAvailable(availability, 2, 20, 5)).not.toBeTruthy();
    expect(isAvailable(availability, 2, 20, 5)).not.toBeTruthy();
  });

  it("Should return available for events using two days", () => {
    const availability = emptyAvailability();
    [18, 19, 20, 21, 22, 23].every(i => availability.monday[i] = AvailabilityStatus.AVAILABLE);
    [18, 19, 20, 21, 22, 23].every(i => availability.saturday[i] = AvailabilityStatus.AVAILABLE);
    [0, 1, 2].every(i => availability.tuesday[i] = AvailabilityStatus.AVAILABLE);
    [0, 1, 2].every(i => availability.sunday[i] = AvailabilityStatus.AVAILABLE);

    expect(isAvailable(availability, 1, 20, 6)).toBeTruthy();
    expect(isAvailable(availability, 2, 20, 7)).not.toBeTruthy();

    expect(isAvailable(availability, 6, 20, 6)).toBeTruthy();
    expect(isAvailable(availability, 0, 20, 7)).not.toBeTruthy();
  });

  it("Should merge availabilities properly", () => {
    const a = emptyAvailability();
    const b = emptyAvailability();
    [18, 19, 20, 21, 22, 23].every(i => a.monday[i] = AvailabilityStatus.AVAILABLE);
    [18, 19, 20].every(i => b.monday[i] = AvailabilityStatus.AVAILABLE);
    [18, 19, 20, 21, 22, 23].every(i => b.tuesday[i] = AvailabilityStatus.AVAILABLE);

    const simpleMerge = mergeAvailabilities(a, b);

    expect(simpleMerge.monday[20]).toBe(AvailabilityStatus.AVAILABLE);
    expect(simpleMerge.tuesday[20]).toBe(AvailabilityStatus.NOT_AVAILABLE);
  });

  it("Should merge availabilities with different timezones properly", () => {
    const a = emptyAvailability();
    const b = emptyAvailability();
    a.UTCOffset = 2;
    b.UTCOffset = 5;
    [14, 15, 16, 17, 22, 23].every(i => a.monday[i] = AvailabilityStatus.AVAILABLE);
    [18, 19, 20].every(i => b.monday[i] = AvailabilityStatus.AVAILABLE);
    [0, 1, 2, 3].every(i => b.tuesday[i] = AvailabilityStatus.AVAILABLE);

    const simpleMerge = mergeAvailabilities(a, b);

    expect(simpleMerge.monday[15]).toBe(AvailabilityStatus.AVAILABLE);
    expect(simpleMerge.monday[16]).toBe(AvailabilityStatus.AVAILABLE);
    expect(simpleMerge.monday[17]).toBe(AvailabilityStatus.AVAILABLE);
    expect(simpleMerge.monday[22]).toBe(AvailabilityStatus.AVAILABLE);
    expect(simpleMerge.monday[23]).toBe(AvailabilityStatus.AVAILABLE);
    expect(simpleMerge.tuesday[20]).toBe(AvailabilityStatus.NOT_AVAILABLE);
  });

  it("Should apply duration properly", () => {
    const a = emptyAvailability();
    [14, 15, 16, 17, 22, 23].every(i => a.monday[i] = AvailabilityStatus.AVAILABLE);
    [14, 15].every(i => a.tuesday[i] = AvailabilityStatus.AVAILABLE);

    expect(applyDuration(a, 2).monday[14]).toBe(AvailabilityStatus.AVAILABLE);
    expect(applyDuration(a, 3).tuesday[14]).toBe(AvailabilityStatus.NOT_AVAILABLE);
  });
});
