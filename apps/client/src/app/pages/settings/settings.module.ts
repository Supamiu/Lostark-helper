import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsComponent } from "./settings/settings.component";
import { RouterModule, Routes } from "@angular/router";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { FormsModule } from "@angular/forms";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

const routes: Routes = [{
  path: "",
  component: SettingsComponent
}];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzPageHeaderModule,
    NzGridModule,
    NzCheckboxModule,
    FormsModule,
    NzTableModule,
    NzSwitchModule,
    NzCardModule,
    NzInputNumberModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzToolTipModule
  ]
})
export class SettingsModule {
}
