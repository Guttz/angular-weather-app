import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadWeatherComponent } from './load-weather/load-weather.component';

const routes: Routes = [
  {
    path: '',
    component: LoadWeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
