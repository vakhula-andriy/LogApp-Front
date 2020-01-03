import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MaterialModule } from './material.module';
import { AppComponent } from './components/app/app.component';
import { ExpandableTableComponent } from './components/expandable-table/expandable-table.component';
import { GetRecordsService } from './services/getRecord.service';

@NgModule({
  declarations: [
    AppComponent,
    ExpandableTableComponent
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
    GetRecordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
