import { Component, ContentChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-time',
  templateUrl: './submit-time.component.html',
  styleUrls: ['./submit-time.component.css']
})
export class SubmitTimeComponent {
  constructor(public matDialog: MatDialog){}
}
