import { ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportViewerService } from './report-viewer.service';

@Component({
  selector: 'app-reportviewer',
  templateUrl: './report-viewer.component.html'
})
export class ReportViewerComponent implements OnInit, OnDestroy {
  processingMode: any;
  showReportViewer: boolean;
  serviceUrl: string;
  constructor(
    private reportviewerService: ReportViewerService,
    private changeDetector: ChangeDetectorRef,
    private toastr: ToastrService) {
    this.reportviewerService.reset();
    this.serviceUrl = this.reportviewerService.serviceUrl;
    this.showReportViewer = this.reportviewerService.loadReportOnInit;
    this.processingMode = 'Local';
  }

  ngOnInit() {
    this.serviceUrl = this.reportviewerService.serviceUrl;
    this.showReportViewer = this.reportviewerService.loadReportOnInit;
  }
  ngOnDestroy() {
  }
  load() {
    this.showReportViewer = false;
    this.changeDetector.detectChanges();
    this.showReportViewer = true;
  }
  onShowError(event) {
    /*alert("Error code : " + event.errorCode + "\n" + "Error Detail : " + event.errorDetail + "\n" +
                "Error Message : " + event.errorMessage);*/
    this.toastr.error(event.errorCode + ' - ' + event.errorMessage, 'Error');
  }
  onReportError(event) {
    // alert(event.errmsg);
    this.toastr.error(event.errmsg, 'Error');
  }
  onAjaxFailure(event) {
    /*alert("Status: " + event.status + "\n" + "Error: " + event.responseText);*/
    this.toastr.error(event.status + ' - ' + event.statusText, 'Error');
  }
  onAjaxRequest(event) {
    console.log(this.reportviewerService);
    if (this.reportviewerService.cancelRequest === true) {
      event.cancel = true;
      return;
    }
    event.data = this.reportviewerService.customData;
  }
  onAjaxSuccess(event) {
  }
}
