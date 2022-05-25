import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "itemmaster",
        loadChildren: () =>
          import("./items/items.module").then((m) => m.ItemsModule),
      },
      {
        path: "vanmaster",
        loadChildren: () =>
          import("./vanmaster/vanmaster.module").then((m) => m.VanmasterModule),
      },
      {
        path: "locationmaster",
        loadChildren: () =>
          import("./location/location.module").then((m) => m.LocationModule),
      },
      {
        path: "customermaster",
        loadChildren: () =>
          import("./customer/customer.module").then((m) => m.CustomerModule),
      },
      {
        path: "reasonmaster",
        loadChildren: () =>
          import("./reason/reason.module").then((m) => m.ReasonModule),
      },
      {
        path: "employeemaster",
        loadChildren: () =>
          import("./employee/employee.module").then((m) => m.EmployeeModule),
      },
      {
        path: "usermaster",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "routemaster",
        loadChildren: () =>
          import("./route/route.module").then((m) => m.RouteModule),
      },
      {
        path: "devicemaster",
        loadChildren: () =>
          import("./device/device.module").then((m) => m.DeviceModule),
      },
      {
        path: "priceListmaster",
        loadChildren: () =>
          import("./price/price.module").then((m) => m.PriceModule),
      },
      {
        path: "itemgrouping",
        loadChildren: () =>
          import("./item-groupping/item-groupping.module").then(
            (m) => m.ItemGrouppingModule
          ),
      },
      {
        path: "itemMapping",
        loadChildren: () =>
          import("./item-mapping/item-mapping.module").then(
            (m) => m.ItemMappingModule
          ),
      },
      {
        path: "customerDiscount",
        loadChildren: () =>
          import("./customer-discount/customer-discount.module").then(
            (m) => m.CustomerDiscountModule
          ),
      },
    ]),
  ],
})
export class MastersModule {}
