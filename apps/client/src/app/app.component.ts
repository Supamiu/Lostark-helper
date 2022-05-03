import {Component} from '@angular/core';

@Component({
  selector: 'lostark-helper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = localStorage.getItem('sidebar:collapsed') === 'true';

  saveCollapsed(collapsed: boolean): void {
    localStorage.setItem('sidebar:collapsed', collapsed.toString());
  }
}
