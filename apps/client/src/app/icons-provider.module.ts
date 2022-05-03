import {NgModule} from '@angular/core';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';

import {CheckSquareOutline, MenuFoldOutline, MenuUnfoldOutline} from '@ant-design/icons-angular/icons';

const icons = [CheckSquareOutline, MenuFoldOutline, MenuUnfoldOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    {provide: NZ_ICONS, useValue: icons}
  ]
})
export class IconsProviderModule {
}
