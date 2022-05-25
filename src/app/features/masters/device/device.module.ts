import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DeviceComponent } from "./device/device.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";

@NgModule({
  declarations: [DeviceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridAllModule,
    CheckBoxModule,
    RouterModule.forChild([
      {
        path: "",
        component: DeviceComponent,
        data: { breadcrumbs: ["Masters", "Device"] },
      },
    ]),
  ],
})
export class DeviceModule {}
