import { Pipe, PipeTransform } from "@angular/core";
import { UserService } from "../database/services/user.service";
import { Observable, pluck } from "rxjs";

@Pipe({
  name: "userName",
  pure: true
})
export class UserNamePipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  transform(value: string): Observable<string> {
    return this.userService.getOne(value).pipe(
      pluck("name")
    );
  }

}
