import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./shared/layout/main/main.component";
import { LayoutModule } from "./shared/layout/layout.module";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AuthGuard } from "./shared/Guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: '',
      //   redirectTo: 'settings/company/general', pathMatch: 'full'
      // },
      {
        path: "home",
        loadChildren: () =>
          import("./features/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "masters",
        loadChildren: () =>
          import("./features/masters/masters.module").then(
            (m) => m.MastersModule
          ),
      },
      {
        path: "assignment",
        loadChildren: () =>
          import("./features/assignment/assignment.module").then(
            (m) => m.AssignmentModule
          ),
      },
      {
        path: "stock-to-van",
        loadChildren: () =>
          import("./features/stock-to-van/stock-to-van.module").then(
            (m) => m.StockToVanModule
          ),
      },
      {
        path: "sales-history",
        loadChildren: () =>
          import("./features/sales-history/sales-history.module").then(
            (m) => m.SalesHistoryModule
          ),
      },
      {
        path: "net-bill",
        loadChildren: () =>
          import("./features/net-bill/net-bill.module").then(
            (m) => m.NetBillModule
          ),
      },
      {
        path: "forecast-entry",
        loadChildren: () =>
          import("./features/forecast-entry/forecast-entry.module").then(
            (m) => m.ForecastEntryModule
          ),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./features/settings/settings.module").then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: "excel-remarks",
        loadChildren: () =>
          import("./shared/excel-remarks/excel-remarks.module").then(
            (m) => m.ExcelRemarksModule
          ),
      },
      {
        path: "export",
        loadChildren: () =>
          import("./features/export/export.module").then((m) => m.ExportModule),
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    LayoutModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
