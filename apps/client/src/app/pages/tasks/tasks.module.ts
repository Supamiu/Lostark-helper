import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksComponent} from './tasks/tasks.component';
import {RouterModule, Routes} from "@angular/router";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

const routes: Routes = [{
  path: '',
  component: TasksComponent
}]

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCardModule,
    NzCheckboxModule,
    FormsModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzTableModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    NzMessageModule,
    NzPopconfirmModule
  ],
})
export class TasksModule {
}
