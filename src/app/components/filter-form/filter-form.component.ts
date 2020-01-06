import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FilterControlService } from 'src/app/services/filterControl.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({width: '0px', minWidth: '0', height: '0px', minHeight: '0'})),
      state('expanded', style({width: '*', height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class FilterFormComponent implements OnInit {
  filterForm: FormGroup;
  expanded = false;
  selected: string;

  constructor(private filterService: FilterControlService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      from: new FormControl(null),
      to: new FormControl(null)
    });
  }

  onSelectChange() {
    this.filterForm.get('from').clearValidators();
    this.filterForm.get('to').clearValidators();
    switch (this.selected) {
      case 'Age':
      case 'ID':
        this.filterForm.get('from').setValidators(Validators.pattern('^[0-9]*$'));
        this.filterForm.get('to').setValidators(Validators.pattern('^[0-9]*$'));
        break;
      case 'First name':
      case 'Last name':
        this.filterForm.get('from').setValidators(Validators.pattern('^[A-Za-z]*$'));
        this.filterForm.get('to').setValidators(Validators.pattern('^[A-Za-z]*$'));
        break;
      case 'Email':
        this.filterForm.get('from').setValidators(Validators.email);
        this.filterForm.get('to').setValidators(Validators.email);
        break;
      case 'IP-adress':
        this.filterForm.get('from').setValidators(Validators.pattern('^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$'));
        this.filterForm.get('to').setValidators(Validators.pattern('^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$'));
        break;
    }
    this.filterForm.get('from').updateValueAndValidity();
    this.filterForm.get('to').updateValueAndValidity();
  }

  filterRecords() {
    this.filterService.from = this.filterForm.get('from').value;
    this.filterService.to = this.filterForm.get('to').value;
    this.filterService.field = this.selected;
    this.filterService.isFiltered = true;
    this.filterService.filter.emit();
  }

  clearFilters() {
    this.filterForm.reset();
    this.filterService.isFiltered = false;
    this.filterService.clearFilter.emit();
  }
}
