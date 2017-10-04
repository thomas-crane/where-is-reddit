import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { ApiService } from './services/api.service';
import { HomeComponent } from './components/home/home.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { TopListComponent } from './components/top-list/top-list.component';
import { TableComponent } from './components/table/table.component';
import { CommaseparatorPipe } from './pipes/commaseparator.pipe';
import { ShorthandnumberPipe } from './pipes/shorthandnumber.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BarChartComponent,
    TopListComponent,
    TableComponent,
    CommaseparatorPipe,
    ShorthandnumberPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialImportsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
