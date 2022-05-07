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
    NzAlertModule
  ]
})
export class PartyPlannerModule {
}
