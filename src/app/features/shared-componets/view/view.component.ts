import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  constructor() { }
  @Input() isSingleLayer: boolean = false;
  @Input() isTwoLayer: boolean = false;
  @Input() isThreeLayer: boolean = false;
  @Input() itemDetails = [];
  ngOnInit(): void { }
}
