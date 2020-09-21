import { Component, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { RecordGeneral } from 'src/app/models/RecordGeneral.interface';
import { RecordDetails } from 'src/app/models/RecordDetails.interface';
import { GetRecordsService } from 'src/app/services/get-records.service';
import { FilterControlService } from 'src/app/services/filter-control.service';
import { RefreshTableService } from 'src/app/services/refresh-table.service';


@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '50px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ExpandableTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['ID', 'Surname', 'IP_Adress', 'Details'];
  records: RecordGeneral[] = [];
  expandedRecord: RecordDetails = {
    id: 0,
    firstName: '',
    email: '',
    age: 0,
    timeStamp: new Date()
  };
  pages: number[] = [];
  showDetails: EventEmitter<number>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private recordService: GetRecordsService,
              private filterService: FilterControlService,
              private refreshService: RefreshTableService,
              private snackBar: MatSnackBar) {
    this.pages = new Array<number>();
    this.showDetails = new EventEmitter<number>();
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.filterService.filter,
          this.filterService.clearFilter, this.refreshService.refreshRecords)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.filterService.isFiltered) {
            return this.recordService.getFilteredRecords(this.paginator.pageIndex, this.paginator.pageSize, this.filterService.field,
              this.filterService.from, this.filterService.to, this.filterService.searchValue);
          } else {
            return this.recordService.getRecords(this.paginator.pageIndex, this.paginator.pageSize);
          }
        }))
      .subscribe(response => {
        this.isLoadingResults = false;
        this.records = response.body;
        this.paginator.length = +response.headers.get('records_amount');
        this.getPagesAmount(this.paginator.length / this.paginator.pageSize);
      }, () => {
          this.isLoadingResults = false;
          this.snackBar.open('Error with loading ocured, please, try again');
      });

    this.showDetails.subscribe(id => {
      this.recordService.getRecordDetails(id).subscribe(recordDetails => {
        if (this.expandedRecord.id === id) {
          this.expandedRecord.id = 0;
        } else {
          this.expandedRecord = recordDetails;
        }
      }, () => {
        this.isLoadingResults = false;
        this.snackBar.open('Error with loading ocured, please, try again');
      });
    });
  }

  getPagesAmount(pageNumber: number) {
    this.pages = [];
    for (let i = 0; i < pageNumber; i++) {
      this.pages.push(i);
    }
  }

  changePage(pageIndex: number) {
    this.paginator.pageIndex = pageIndex;
    this.paginator.page.emit();
  }
}
