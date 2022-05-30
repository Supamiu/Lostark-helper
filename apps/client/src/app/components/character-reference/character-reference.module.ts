import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterReferenceComponent } from './character-reference/character-reference.component';
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { IconsProviderModule } from "../../icons-provider.module";

@NgModule({
  declarations: [CharacterReferenceComponent],
  exports: [
    CharacterReferenceComponent
  ],
  imports: [CommonModule, NzToolTipModule, IconsProviderModule]
})
export class CharacterReferenceModule {}
