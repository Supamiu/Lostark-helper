import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HoningCostOptimizerComponent } from "./honing-cost-optimizer/honing-cost-optimizer.component";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { MarketHeaderModule } from "../../components/market-header/market-header.module";

const routes: Routes = [{
  path: "",
  component: HoningCostOptimizerComponent
}];

@NgModule({
  declarations: [HoningCostOptimizerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NzPageHeaderModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzCheckboxModule,
    NzCardModule,
    NzStatisticModule,
    NzSwitchModule,
    MarketHeaderModule
  ]
})
export class HoningCostOptimizerModule {
}
