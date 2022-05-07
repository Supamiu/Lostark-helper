import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FriendsComponent } from "./friends/friends.component";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzListModule } from "ng-zorro-antd/list";
import { RouterModule, Routes } from "@angular/router";
import { NzCardModule } from "ng-zorro-antd/card";
import { PipesModule } from "../../core/pipes/pipes.module";
import { NzFormModule } from "ng-zorro-antd/form";
import { ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { IconsProviderModule } from "../../icons-provider.module";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

const routes: Routes = [{
  path: "",
  component: FriendsComponent
}];

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NzPageHeaderModule,
    NzAlertModule,
    NzListModule,
    NzCardModule,
    PipesModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzPopconfirmModule,
    IconsProviderModule,
    NzToolTipModule
  ]
})
export class FriendsModule {
}
