import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearManagerComponent } from './gear-manager/gear-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { GearsetsComponent } from './gearsets/gearsets.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { GearsetCreationPopupComponent } from './gearset-creation-popup/gearset-creation-popup.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconsProviderModule } from '../../icons-provider.module';
import { CharacterReferenceModule } from '../../components/character-reference/character-reference.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { EngravingSelectorComponent } from './engraving-selector/engraving-selector.component';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzSwitchModule } from "ng-zorro-antd/switch";

const routes: Routes = [
  {
    path: '',
    component: GearsetsComponent,
  },
  {
    path: ':id',
    component: GearManagerComponent,
  },
];

@NgModule({
  declarations: [GearManagerComponent, GearsetsComponent, GearsetCreationPopupComponent, EngravingSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NzPageHeaderModule,
    NzListModule,
    NzEmptyModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzMessageModule,
    NzSelectModule,
    NzInputModule,
    IconsProviderModule,
    CharacterReferenceModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzCardModule,
    NzTagModule,
    NzTableModule,
    NzInputNumberModule,
    NzSliderModule,
    NzCheckboxModule,
    NzSwitchModule
  ]
})
export class GearManagerModule {}
