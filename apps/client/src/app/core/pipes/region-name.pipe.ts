import { Pipe, PipeTransform } from "@angular/core";
import { LostarkRegion } from "../../model/lostark-region";

@Pipe({
  name: "regionName",
  pure: true
})
export class RegionNamePipe implements PipeTransform {

  transform(region: LostarkRegion): string {
    return region.split("_")
      .map(word => `${word[0]}${word.slice(1).toLowerCase()}`)
      .join(" ");
  }

}
