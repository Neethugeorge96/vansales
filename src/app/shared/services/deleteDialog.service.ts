import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './../dialogs/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})

export class DeleteDialogService {

  constructor(
    private toastr: ToastrService,
    public modalService: NgbModal,
  ) { }

  OpenConfirmDialog(params: IDeleteDialogParams) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = params.title ? params.title : 'Delete';
    modalRef.componentInstance.confirmationMessage = params.message;
    modalRef.result.then((userResponse) => {
      if (userResponse === true) {
        params.service.subscribe(() => {
          this.toastr.success(params.successMessage ? params.successMessage : 'Record deleted successfully!', 'Success');
          if (params.successCallback) {
              params.successCallback();
          }
        },
        (error: any) => {
          this.toastr.error(
            params.errorMessage ? params.errorMessage : `${error.error ? error.error.message : error.message}`,
            'Error'
          );
        });
      }
    });
  }
}

export interface IDeleteDialogParams {
  service: any;
  message: string;
  title?: string;
  successMessage?: string;
  errorMessage?: string;
  successCallback?: () => void;
}


