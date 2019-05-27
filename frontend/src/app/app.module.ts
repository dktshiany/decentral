import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { MaterialModule } from './material-module';

import { GetmarketService } from './getmarket.service';


import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    GetmarketService
  ]
})
export class AppModule { }

