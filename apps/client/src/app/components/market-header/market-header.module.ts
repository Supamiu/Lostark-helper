import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketHeaderComponent } from './market-header/market-header.component';
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzInputModule } from "ng-zorro-antd/input";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [MarketHeaderComponent],
  imports: [CommonModule, NzPageHeaderModule, NzButtonModule, NzInputNumberModule, NzInputModule, FormsModule],
  exports: [
    MarketHeaderComponent
  ]
})
export class MarketHeaderModule {}
