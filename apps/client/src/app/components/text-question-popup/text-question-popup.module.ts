import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextQuestionPopupComponent } from "./text-question-popup/text-question-popup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzButtonModule,
    NzInputModule
  ],
  declarations: [TextQuestionPopupComponent]
})
export class TextQuestionPopupModule {
}
