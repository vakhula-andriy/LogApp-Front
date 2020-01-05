import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MaterialModule } from './material.module';
import { AppComponent } from './components/app/app.component';
import { ExpandableTableComponent } from './components/expandable-table/expandable-table.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { GetRecordsService } from './services/getRecord.service';
import { FilterControlService } from './services/filterControl.service';

@NgModule({
  declarations: [
    AppComponent,
    ExpandableTableComponent,
    FilterFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    GetRecordsService,
    FilterControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
