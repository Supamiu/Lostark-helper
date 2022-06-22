import { AvailabilityStatus } from "./availability-status";

export const days: (keyof Omit<Availability, "UTCOffset">)[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

export interface Availability {
  UTCOffset: number;
  monday: Array<AvailabilityStatus>;
  tuesday: Array<AvailabilityStatus>;
  wednesday: Array<AvailabilityStatus>;
  thursday: Array<AvailabilityStatus>;
  friday: Array<AvailabilityStatus>;
  saturday: Array<AvailabilityStatus>;
  sunday: Array<AvailabilityStatus>;
}

export function emptyAvailability(): Availability {
  return {
    UTCOffset: -1 * new Date().getTimezoneOffset() / 60,
    monday: new Array(24).fill(AvailabilityStatus.NOT_AVAILABLE),
    tuesday: new Array(24).fill(AvailabilityStatus.NOT_AVAILABLE),
    wednesday: new Array(24).fill(AvailabilityStatus.NOT_AVAILABLE),
    thursday: new Array(24).fill(AvailabilityStatus.NOT_AVAILABLE),
    friday: new Array(24).fill(AvailabilityStatus.NOT_AVAILABLE),
    saturday: new Array(24).fill(AvailabilityStatus.NOT_AVAILABLE),
    sunday: new Array(24).fill(AvailabilityStatus.NOT_AVAILABLE)
  };
}

export function mergeAvailabilities(a: Availability, b: Availability): Availability {
  const merge = { ...a };
  days.forEach(day => {
    merge[day] = merge[day].map((available, hour) => {
      const otherAvailability = getAvailabilityForUTCOffset(b, day, hour, a.UTCOffset);
      if (available === otherAvailability) {
        return available;
      }
      if (available === AvailabilityStatus.NOT_AVAILABLE || otherAvailability === AvailabilityStatus.NOT_AVAILABLE) {
        return AvailabilityStatus.NOT_AVAILABLE;
      }
      if (available === AvailabilityStatus.BUSY || otherAvailability === AvailabilityStatus.BUSY) {
        return AvailabilityStatus.BUSY;
      }
      return AvailabilityStatus.AVAILABLE;
    });
  });
  return merge;
}

export function applyDuration(availability: Availability, duration: number): Availability {
  const clone = { ...availability };
  days.forEach((day, i) => {
    clone[day] = clone[day].map((_, hour) => {
      const available = isAvailable(availability, i, hour, duration);
      if (available) {
        return AvailabilityStatus.AVAILABLE;
      }
      return AvailabilityStatus.NOT_AVAILABLE;
    });
  });
  return clone;
}

export function getAvailabilityForUTCOffset(target: Availability, day: keyof Omit<Availability, "UTCOffset">, hour: number, offset: number): AvailabilityStatus {
  const offsetToApply = target.UTCOffset - offset;
  let offsetHour = hour + offsetToApply;
  if (offsetHour > 23) {
    day = days[(days.indexOf(day) + 1) % 7];
    offsetHour -= 23;
  } else if (offsetHour < 0) {
    let dayBefore = days.indexOf(day) - 1;
    if (dayBefore === -1) {
      dayBefore = 6;
    }
    day = days[dayBefore];
    offsetHour += 23;
  }
  return target[day][offsetHour];
}

export function isAvailable(availability: Availability, dayIndex: number, hour: number, duration: number): boolean {
  const day = days[dayIndex];
  const dayAvailability: Array<AvailabilityStatus> = availability[day];
  const isAvailableForFirstDay = dayAvailability.slice(hour, Math.min(hour + duration, 23)).every(a => a === AvailabilityStatus.AVAILABLE);
  if (hour + duration > 24) {
    const isAvailableForSecondDay = availability[days[(dayIndex + 1) % 7]].slice(0, hour + duration - 23).every(a => a === AvailabilityStatus.AVAILABLE);
    return isAvailableForFirstDay && isAvailableForSecondDay;
  }
  return isAvailableForFirstDay;
}
