import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MariOptimizerComponent } from './mari-optimizer/mari-optimizer.component';
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { RouterModule, Routes } from "@angular/router";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { FormsModule } from "@angular/forms";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzButtonModule } from "ng-zorro-antd/button";
import { MarketHeaderModule } from "../../components/market-header/market-header.module";

const routes: Routes = [{
  path: '',
  component: MariOptimizerComponent
}]

@NgModule({
  declarations: [MariOptimizerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NzPageHeaderModule,
    NzInputModule,
    NzInputNumberModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    MarketHeaderModule
  ]
})
export class MariOptimizerModule {}
