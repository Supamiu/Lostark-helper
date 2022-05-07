import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartyPlannerComponent } from "./party-planner/party-planner.component";
import { RouterModule, Routes } from "@angular/router";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import { IconsProviderModule } from "../../icons-provider.module";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { PipesModule } from "../../core/pipes/pipes.module";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputModule } from "ng-zorro-antd/input";
import { FormsModule } from "@angular/forms";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";

const routes: Routes = [{
  path: "",
  component: PartyPlannerComponent
}];

@NgModule({
  declarations: [PartyPlannerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzPageHeaderModule,
    NzButtonModule,
    NzTableModule,
    IconsProviderModule,
    NzToolTipModule,
    PipesModule,
    NzAlertModule,
    NzSelectModule,
    NzInputModule,
    FormsModule,
    NzCheckboxModule
  ]
})
export class PartyPlannerModule {
}
