import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{confirmationBoxTitle}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p class="lead">{{confirmationMessage}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-cancel" (click)="activeModal.close(false)">No</button>
      <button type="button" class="btn btn-success" (click)="activeModal.close(true)">Yes</button>

    </div>
`
})

export class ConfirmModalComponent {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal) { }
}