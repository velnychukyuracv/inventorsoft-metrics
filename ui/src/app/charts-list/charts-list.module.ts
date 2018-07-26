import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../app.routes';
import { SharedModule } from '../common/shared/shared.module';

import { ChartsListComponent } from './charts-list.component';
import { ChartComponent } from './chart/chart.component';
import { GoogleChart } from './chart/google-chart.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(
        APP_ROUTES
    )
  ],
  declarations: [ChartsListComponent, ChartComponent, GoogleChart],
  exports     : [ChartsListComponent, ChartComponent, GoogleChart]
})
export class ChartsListModule { }