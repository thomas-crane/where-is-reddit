import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

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
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DataService } from './services/data.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BarChartComponent,
    TopListComponent,
    TableComponent,
    CommaseparatorPipe,
    ShorthandnumberPipe,
    LineChartComponent,
    ToolbarComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialImportsModule
  ],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
