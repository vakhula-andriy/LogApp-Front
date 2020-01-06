import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RefreshTableService {
  refreshRecords = new EventEmitter();
}
