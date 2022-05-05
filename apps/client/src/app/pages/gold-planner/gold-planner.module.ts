import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoldPlannerComponent } from "./gold-planner/gold-planner.component";
import { RouterModule, Routes } from "@angular/router";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { FormsModule } from "@angular/forms";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";

const routes: Routes = [{
  path: "",
  component: GoldPlannerComponent
}];

@NgModule({
  declarations: [GoldPlannerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCardModule,
    NzTableModule,
    NzSwitchModule,
    FormsModule,
    NzPageHeaderModule,
    NzCheckboxModule
  ]
})
export class GoldPlannerModule {
}
