import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TitleSectionComponent } from "./title-section/title-section.component";

@NgModule({
  declarations: [TitleSectionComponent],
  imports: [CommonModule, RouterModule],
  exports: [TitleSectionComponent],
})
export class SharedComponentsModule {}
