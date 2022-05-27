import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuildHomeComponent } from './guild-home/guild-home.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { RouterModule, Routes } from '@angular/router';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CharacterReferenceModule } from '../../components/character-reference/character-reference.module';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { GuildDetailsComponent } from './guild-details/guild-details.component';
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { PipesModule } from "../../core/pipes/pipes.module";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzSwitchModule } from "ng-zorro-antd/switch";

const routes: Routes = [
  {
    path: '',
    component: GuildHomeComponent,
  },
  {
    path: ':guildId',
    component: GuildDetailsComponent,
  },
];

@NgModule({
  declarations: [GuildHomeComponent, GuildDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NzPageHeaderModule,
    NzListModule,
    NzEmptyModule,
    NzCardModule,
    NzGridModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzStatisticModule,
    NzTagModule,
    CharacterReferenceModule,
    IconsProviderModule,
    NzTypographyModule,
    NzToolTipModule,
    NzPopconfirmModule,
    ClipboardModule,
    NzBadgeModule,
    NzDividerModule,
    PipesModule,
    NzAlertModule,
    NzSwitchModule,
    FormsModule
  ]
})
export class GuildModule {}
