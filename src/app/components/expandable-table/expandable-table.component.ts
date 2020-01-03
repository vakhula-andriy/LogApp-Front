import { Component, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map, startWith, switchMap } from 'rxjs/operators';

import { GetRecordsService } from 'src/app/services/getRecord.service';
import { RecordGeneral } from 'src/app/models/RecordGeneral.interface';
import { RecordDetails } from 'src/app/models/RecordDetails.interface';


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
  showDetails: EventEmitter<number>;
  isLoadingResults = true;

  constructor(private recordService: GetRecordsService) {

    this.showDetails = new EventEmitter<number>();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.recordService.setPageSize(this.paginator.pageSize);
          return this.recordService.getRecords(this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.recordService.getRecordsAmount().subscribe(
            amount => {
              this.paginator.length = amount;
            }
          );
          return data;
        })
      ).subscribe(data => this.records = data);

    this.showDetails.subscribe(
      id => {
         this.recordService.getrecordDetails(id).subscribe(
          recordDetails => {
            if (this.expandedRecord.id === recordDetails.id) {
              this.expandedRecord.id = 0;
            } else {
              this.expandedRecord = recordDetails;
            }
          }
        );
      }
    );
  }

  changePage(pageIndex: number) {
    this.paginator.pageIndex = pageIndex;
    this.paginator.page.emit();
  }
}

