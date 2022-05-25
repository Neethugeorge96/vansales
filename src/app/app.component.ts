import { Component } from "@angular/core";

@Component({
  selector: "smart-root",
  template: "<router-outlet></router-outlet><ngx-ui-loader></ngx-ui-loader>",
})
export class AppComponent {
  title = "smart-chef";
}
