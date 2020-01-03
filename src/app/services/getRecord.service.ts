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

  public getRecords(page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + page
    );
  }

  public getrecordDetails(id: number): Observable<RecordDetails> {
    return this.http.get<RecordDetails>(
      environment.RecordApiUrl + 'details/' + id
    );
  }

  public getRecordsAmount(): Observable<number> {
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

  getIDFilteredRecords(startID: number, endID: number, page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'ID/' + page,
      {
        params: new HttpParams().set('minID', startID.toString())
                                .set('maxID', endID.toString())
      }
    );
  }

  getNameFilteredRecords(startName: string, endName: string, page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'firstName/' + page,
      {
        params: new HttpParams().set('minName', startName)
                                .set('maxName', endName)
      }
    );
  }

  getSurnameFilteredRecords(startSurname: string, endSurname: string, page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'lastName/' + page,
      {
        params: new HttpParams().set('minName', startSurname)
                                .set('maxName', endSurname)
      }
    );
  }

  getEmailFilteredRecords(startEmail: string, endEmail: string, page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'email/' + page,
      {
        params: new HttpParams().set('minEmail', startEmail)
                                .set('maxEmail', endEmail)
      }
    );
  }

  getAgeFilteredRecords(startAge: number, endAge: number, page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'age/' + page,
      {
        params: new HttpParams().set('minAge', startAge.toString())
                                .set('maxAge', endAge.toString())
      }
    );
  }

  getIPAdressFilteredRecords(startIP: string, endIP: string, page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'IP/' + page,
      {
        params: new HttpParams().set('minIP', startIP)
                                .set('maxIP', endIP)
      }
    );
  }

  getDateFilteredRecords(startDate: Date, endDate: Date, page: number): Observable<RecordGeneral[]> {
    return this.http.get<RecordGeneral[]>(
      environment.RecordApiUrl + 'time/' + page,
      {
        params: new HttpParams().set('minTime', startDate.toString())
                                .set('maxTime', endDate.toString())
      }
    );
  }
}
