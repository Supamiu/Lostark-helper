import { Component, HostListener } from "@angular/core";
import { pluck } from "rxjs";
import { UserService } from "../../../core/database/services/user.service";
import { LAHUser } from "../../../model/lah-user";
import { Availability } from "../../../model/availability/availability";
import { AvailabilityStatus } from "../../../model/availability/availability-status";
import { filter } from "rxjs/operators";

@Component({
  selector: "lostark-helper-availability",
  templateUrl: "./availability.component.html",
  styleUrls: ["./availability.component.less"]
})
export class AvailabilityComponent {

  public AvailabilityStatus = AvailabilityStatus;

  public user$ = this.userService.user$;

  public availability$ = this.user$.pipe(
    pluck("availability"),
    filter(Boolean)
  );

  public hours = new Array(24).fill(null).map((_, i) => i);

  public days: (keyof Availability)[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ];

  public tableHeight!: number;

  constructor(private userService: UserService) {
    this.setTableHeight();
  }

  @HostListener("window:resize")
  setTableHeight(): void {
    this.tableHeight = window.innerHeight - 64 - 48 - 160;
  }

  saveAvailability(user: LAHUser, availability: Availability): void {
    this.userService.updateOne(user.$key, { availability });
  }

  trackByIndex(index: number): number {
    return index;
  }

  setAvailable(user: LAHUser, availability: Availability, day: keyof Availability, hour: number, event: MouseEvent): void {
    const newValue = availability[day][hour] === AvailabilityStatus.AVAILABLE ? AvailabilityStatus.NOT_AVAILABLE : AvailabilityStatus.AVAILABLE;
    if (event.shiftKey) {
      let dayAvailability = (availability[day] as Array<AvailabilityStatus>);
      const newValue = availability[day][hour] === AvailabilityStatus.AVAILABLE ? AvailabilityStatus.NOT_AVAILABLE : AvailabilityStatus.AVAILABLE;
      const lastHourWithThisValue = dayAvailability
        .slice(0, hour)
        .lastIndexOf(newValue);
      dayAvailability = dayAvailability.map((v, i) => {
        if (i >= lastHourWithThisValue && i <= hour) {
          return newValue;
        }
        return v;
      });

      this.saveAvailability(user, { ...availability, [day]: dayAvailability });
    } else {
      availability[day][hour] = newValue;
      this.saveAvailability(user, availability);
    }
  }
}
