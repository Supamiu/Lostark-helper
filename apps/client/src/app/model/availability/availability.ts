import { AvailabilityStatus } from "./availability-status";

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
