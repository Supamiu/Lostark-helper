import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OtherToolsComponent } from "./other-tools/other-tools.component";
import { RouterModule, Routes } from "@angular/router";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzGridModule } from "ng-zorro-antd/grid";

const routes: Routes = [{
  path: "",
  component: OtherToolsComponent
}];

@NgModule({
  declarations: [OtherToolsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCardModule,
    NzPageHeaderModule,
    NzGridModule
  ]
})
export class OtherToolsModule {
}
