import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { EngravingSearchComponent } from "./engraving-search/engraving-search.component";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTagModule } from "ng-zorro-antd/tag";

const routes: Routes = [
  {
    path: '',
    component: EngravingSearchComponent,
  },
];

@NgModule({
    declarations: [EngravingSearchComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        NzSelectModule,
        NzGridModule,
        NzTypographyModule,
        NzCardModule,
        NzDividerModule,
        NzTagModule
    ],
})

export class EngravingSearchModule {
}