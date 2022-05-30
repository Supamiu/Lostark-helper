import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNamePipe } from './user-name.pipe';
import { RegionNamePipe } from './region-name.pipe';



@NgModule({
  declarations: [
    UserNamePipe,
    RegionNamePipe
  ],
  exports: [
    UserNamePipe,
    RegionNamePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
