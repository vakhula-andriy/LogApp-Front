import { Component, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, startWith, switchMap } from 'rxjs/operators';

import { RecordGeneral } from 'src/app/models/RecordGeneral.interface';
import { RecordDetails } from 'src/app/models/RecordDetails.interface';
import { GetRecordsService } from 'src/app/services/getRecord.service';
import { FilterControlService } from 'src/app/services/filterControl.service';
import { merge, Observable } from 'rxjs';


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

  constructor(private recordService: GetRecordsService,
              private filterService: FilterControlService) {
    this.pages = new Array<number>();
    this.showDetails = new EventEmitter<number>();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.filterService.filter, this.filterService.clearFilter)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.recordService.setPageSize(this.paginator.pageSize);
          if (this.filterService.isFiltered) {
            return this.filter(this.filterService.from, this.filterService.to, this.filterService.field, this.paginator.pageIndex);
          } else {
            return this.recordService.getRecords(this.paginator.pageIndex);
          }
        })
      ).subscribe(records => {
        this.recordService.getRecordsAmount().subscribe(
          amount => {
            this.paginator.length = amount;
            this.getPagesAmount(this.paginator.getNumberOfPages());
          }
        );
        this.isLoadingResults = false;
        this.records = records;
      });

    this.showDetails.subscribe(
      id => {
         this.recordService.getrecordDetails(id).subscribe(
          recordDetails => {
            if (this.expandedRecord.id === id) {
              this.expandedRecord.id = 0;
            } else {
              this.expandedRecord = recordDetails;
            }
          }
        );
      }
    );
  }

  filter(from: string, to: string, field: string, page: number): Observable<RecordGeneral[]> {
    switch (field) {
      case 'Age':
        return this.recordService.getAgeFilteredRecords(page,
          from ? Number(from) : null,
          to ? Number(to) : null);
      case 'ID':
        return this.recordService.getIDFilteredRecords(page,
          from ? Number(from) : null,
          to ? Number(to) : null);
      case 'First name':
        return this.recordService.getNameFilteredRecords(page, from, to);
      case 'Last name':
        return this.recordService.getSurnameFilteredRecords(page, from, to);
      case 'Email':
        return this.recordService.getEmailFilteredRecords(page, from, to);
      case 'IP-adress':
        return this.recordService.getIPAdressFilteredRecords(page, from, to);
      case 'Date':
        return this.recordService.getDateFilteredRecords(page,
          from ? new Date(from) : null,
          to ? new Date(to) : null);
    }
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
