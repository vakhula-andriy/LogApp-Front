import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshTableService {
  refreshRecords = new EventEmitter();
}
