import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvailabilityComponent } from "./availability/availability.component";
import { RouterModule, Routes } from "@angular/router";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { IconsProviderModule } from "../../icons-provider.module";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSwitchModule } from "ng-zorro-antd/switch";

const routes: Routes = [{
  path: "",
  component: AvailabilityComponent
}];

@NgModule({
  declarations: [AvailabilityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzPageHeaderModule,
    NzInputModule,
    NzInputNumberModule,
    FormsModule,
    NzButtonModule,
    IconsProviderModule,
    NzToolTipModule,
    NzRadioModule,
    NzTableModule,
    NzSwitchModule
  ]
})
export class AvailabilityModule {
}
