import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './models/appoitnment.model';
import { OperationResponse } from './models/response.model';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl: string = 'http://192.168.1.68:8080/ping';

  constructor(private http: HttpClient) {
  }

  public logAppointment(appointment: Appointment): Observable<OperationResponse> {
    return this.http.post<OperationResponse>(this.baseUrl, appointment);
  }

}
