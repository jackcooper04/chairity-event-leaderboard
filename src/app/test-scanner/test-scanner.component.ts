import { ChangeDetectorRef, Component } from '@angular/core';
import { LogService } from '../log.service';
import { Appointment } from '../models/appoitnment.model';
import { OperationResponse } from '../models/response.model';

@Component({
  selector: 'app-test-scanner',
  templateUrl: './test-scanner.component.html',
  styleUrls: ['./test-scanner.component.css']
})
export class TestScannerComponent {
  public scannerEnabled: boolean = true;
  public transports: Transport[] = [];
  public information: string = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  constructor(private logService:LogService, public cd: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }
  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";

    const appointment = new Appointment($event);
    this.logService.logAppointment(appointment).subscribe(
      (result: OperationResponse) => {
        this.information = $event;
        this.transports = result.object;
        this.cd.markForCheck();
      },
      (error: any) => {
        this.information = "Ha ocurrido un error por favor intentalo nuevamente ... ";
        this.cd.markForCheck();
      });
  }
  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  }
}
interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}
