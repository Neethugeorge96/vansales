import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "suggestedqtyandinvoicehistory",
        loadChildren: () =>
          import(
            "./suggestedqty-invoicehistory/suggestedqty-invoicehistory.module"
          ).then((m) => m.SuggestedqtyInvoicehistoryModule),
      },
      {
        path: "invoiceNo",
        loadChildren: () =>
          import(
            "./invoice-no/invoice-no.module"
          ).then((m) => m.InvoiceNoModule),
      },
      {
        path: "integrationSettings",
        loadChildren: () =>
          import(
            "./integration-settings/integration-settings.module"
          ).then((m) => m.IntegrationSettingsModule),
      },
    ]),
  ],
})
export class SettingsModule {}
