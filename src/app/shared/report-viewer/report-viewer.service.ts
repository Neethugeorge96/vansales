import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ReportViewerService {
  public customData: { [key: string]: any; } = {};
  public serviceUrl: string;
  public toolbarSettings: any;
  public loadReportOnInit: boolean;
  public cancelRequest: boolean;
  constructor(
    private toastr: ToastrService) {
      this.reset();
    }

    reset() {
    this.customData = {};
    this.loadReportOnInit = true;
    this.cancelRequest = false;
    }
}
