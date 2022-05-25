import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";

@Component({
  selector: "inventory-title-section",
  template: `
    <div class="subheader">
      <h1 class="subheader-title">
        {{ title }}
      </h1>
      <button
        *ngIf="url"
        class="btn btn-sm btn-outline-primary"
        routerLinkActive="router-link-active"
        [routerLink]="[url]"
      >
        Back
        <!-- to {{ buttonLabel }} -->
        <i class="fal fa-arrow-left ml-1"></i>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleSectionComponent implements OnInit {
  @Input() title: string;
  @Input() url: string;
  @Input() buttonLabel: string;

  constructor() {}

  ngOnInit(): void {}
}
