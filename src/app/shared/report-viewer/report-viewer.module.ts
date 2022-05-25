import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportViewerComponent } from './report-viewer.component';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';

// import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
// import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';

@NgModule({
  imports: [
    CommonModule,
    BoldReportViewerModule
  ],
  declarations: [ReportViewerComponent],
  exports: [ReportViewerComponent]
})
export class ReportViewerModule { }
