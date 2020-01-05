import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { RecordGeneral } from '../models/RecordGeneral.interface';
import { RecordDetails } from '../models/RecordDetails.interface';

@Injectable()
export class GetRecordsService {
  constructor(private http: HttpClient) {
  }

  getRecords(page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + page
    );
  }

  getrecordDetails(id: number): Observable<RecordDetails> {
    return this.http.get<RecordDetails>(
      environment.RecordApiUrl + 'details/' + id
    );
  }

  getRecordsAmount(): Observable<number> {
    return this.http.get<number>(
      environment.RecordApiUrl + 'recordAmount'
    );
  }

  setPageSize(size: number): void {
    this.http.get(
      environment.RecordApiUrl + 'Record',
      {
        params: new HttpParams().set('pageSize', size.toString())
      }
    ).subscribe();
  }

  getIDFilteredRecords(page: number, startID?: number, endID?: number): Observable<RecordGeneral[]> {
    let parameters = new HttpParams();
    if (startID) {
      parameters = parameters.append('minID', startID.toString());
    }
    if (endID) {
      parameters = parameters.append('maxID', endID.toString());
    }
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'ID/' + page,
      {
        params: parameters
      }
    );
  }

  getNameFilteredRecords(page: number, startName?: string, endName?: string): Observable<RecordGeneral[]> {
    let parameters = new HttpParams();
    if (startName) {
      parameters = parameters.append('minName', startName);
    }
    if (endName) {
      parameters = parameters.append('maxName', endName);
    }
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'firstName/' + page,
      {
        params: parameters
      }
    );
  }

  getSurnameFilteredRecords(page: number, startSurname?: string, endSurname?: string): Observable<RecordGeneral[]> {
    let parameters = new HttpParams();
    if (startSurname) {
      parameters = parameters.append('minName', startSurname);
    }
    if (endSurname) {
      parameters = parameters.append('maxName', endSurname);
    }
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'lastName/' + page,
      {
        params: parameters
      }
    );
  }

  getEmailFilteredRecords(page: number, startEmail?: string, endEmail?: string): Observable<RecordGeneral[]> {
    let parameters = new HttpParams();
    if (startEmail) {
      parameters = parameters.append('minEmail', startEmail);
    }
    if (endEmail) {
      parameters = parameters.append('maxEmail', endEmail);
    }
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'email/' + page,
      {
        params: parameters
      }
    );
  }

  getAgeFilteredRecords(page: number, startAge?: number, endAge?: number): Observable<RecordGeneral[]> {
    let parameters = new HttpParams();
    if (startAge) {
      parameters = parameters.append('minAge', startAge.toString());
    }
    if (endAge) {
      parameters = parameters.append('maxAge', endAge.toString());
    }
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'age/' + page,
      {
        params: parameters
      }
    );
  }

  getIPAdressFilteredRecords(page: number, startIP?: string, endIP?: string): Observable<RecordGeneral[]> {
    let parameters = new HttpParams();
    if (startIP) {
      parameters = parameters.append('minIP', startIP);
    }
    if (endIP) {
      parameters = parameters.append('maxIP', endIP);
    }
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'IP/' + page,
      {
        params: parameters
      }
    );
  }

  getDateFilteredRecords(page: number, startDate?: Date, endDate?: Date): Observable<RecordGeneral[]> {
    let startDateTime: string;
    let endDateTime: string;
    let parameters = new HttpParams();
    if (startDate) {
      startDateTime = this.dateToDateTimeString(startDate);
      parameters = parameters.append('minTime', startDateTime);
    }
    if (endDate) {
      endDateTime = this.dateToDateTimeString(endDate);
      parameters = parameters.append('maxTime', endDateTime);
    }
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'time/' + page,
      {
        params: parameters
      }
    );
  }

  dateToDateTimeString(date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
    'T' + this.twoDigitNumber(date.getHours()) + ':' + this.twoDigitNumber(date.getMinutes()) +
    ':' + this.twoDigitNumber(date.getSeconds()) + date.getTimezoneOffset();
  }

  twoDigitNumber(num: number): string {
    if (num < 10) {
      return '0' + num;
    }
    return num.toString();
  }
}
