import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FilterControlService {
  filter = new EventEmitter();
  clearFilter = new EventEmitter();
  isFiltered = false;
  field: string;
  from?: string;
  to?: string;
}
