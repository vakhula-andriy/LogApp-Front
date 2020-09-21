import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { RecordGeneral } from '../models/RecordGeneral.interface';
import { RecordDetails } from '../models/RecordDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class GetRecordsService {
  constructor(private http: HttpClient) {
  }

  getRecords(page: number, pageSize: number): Observable<HttpResponse<RecordGeneral[]>> {
    let params = new HttpParams();
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<RecordGeneral[]>(
      environment.recordApiUrl + page,
      { observe: 'response', params }
    );
  }

  getRecordDetails(id: number): Observable<RecordDetails> {
    return this.http.get<RecordDetails>(
      environment.recordApiUrl + 'details/' + id
    );
  }

  getFilteredRecords(page: number, pageSize: number, field: string,
                     minValue?: string, maxValue?: string, searchValue?: string): Observable<HttpResponse<RecordGeneral[]>> {
    let params = new HttpParams();
    if (!!minValue) {
      if (field === 'time') {
        minValue = (minValue as unknown as Date).toISOString();
      }
      params = params.append('minFilterValue', minValue);
    }
    if (!!maxValue) {
      if (field === 'time') {
        maxValue = (maxValue as unknown as Date).toISOString();
      }
      params = params.append('maxFilterValue', maxValue);
    }
    if (!!searchValue) {
      params = params.append('searchValue', searchValue);
    }
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<RecordGeneral[]>(
      environment.recordApiUrl + field + '/' + page,
      { observe: 'response', params }
    );
  }
}
