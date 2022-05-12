import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzButtonModule } from "ng-zorro-antd/button";
import { IconsProviderModule } from "../../icons-provider.module";
import { NzCarouselModule } from "ng-zorro-antd/carousel";

const routes: Routes = [{
  path: "",
  component: HomeComponent
}];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzGridModule,
    NzButtonModule,
    IconsProviderModule,
    NzCarouselModule
  ]
})
export class HomeModule {
}
