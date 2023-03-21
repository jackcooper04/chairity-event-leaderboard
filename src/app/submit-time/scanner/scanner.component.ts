import { Component , OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<ScannerComponent>){}
    ngOnInit(): void{
      console.log("woo"   )
    }
}
