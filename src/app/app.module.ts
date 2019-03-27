import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

//Project components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadWeatherComponent } from './load-weather/load-weather.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';

//Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

//External libraries
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    LoadWeatherComponent,
    HeaderToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    GooglePlaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
