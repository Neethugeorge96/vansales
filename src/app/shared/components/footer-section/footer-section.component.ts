import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";

@Component({
  selector: "footer-section",
  template: `
    <footer class="page-footer w-100" role="contentinfo">
      <div class="d-flex align-items-center flex-1 text-muted">
        <span class="hidden-md-down">
          Last edited by - {{ modifiedBy }} -
          {{ modifiedDate | date: "dd - MM - yy" }}
        </span>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSectionComponent implements OnInit {
  @Input() modifiedBy: string;
  @Input() modifiedDate: string;

  constructor() {}

  ngOnInit(): void {
    this.modifiedBy = this.modifiedBy ? this.modifiedBy : "System";
  }
}
