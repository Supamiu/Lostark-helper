import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksComponent } from "./tasks/tasks.component";
import { RouterModule, Routes } from "@angular/router";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { IconsProviderModule } from "../../icons-provider.module";
import { NzModalModule } from "ng-zorro-antd/modal";
import { TextQuestionPopupModule } from "../../components/text-question-popup/text-question-popup.module";

const routes: Routes = [{
  path: "",
  component: TasksComponent
}];

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TextQuestionPopupModule,

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
    NzPopconfirmModule,
    NzToolTipModule,
    IconsProviderModule,
    NzModalModule
  ]
})
export class TasksModule {
}
