import { Component, Input, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class TextEditorComponent implements OnInit {
 @Input() rteContent;
  actionSet;
  show:boolean=false;
  constructor() { }

  ngOnInit(): void {
   
  }

}
