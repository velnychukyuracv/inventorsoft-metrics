import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../app.routes';
import { SharedModule } from '../common/shared/shared.module';

import { ChartsComponent } from './charts.component';
import { ChartComponent } from './chart/chart.component';
import { GoogleChart } from './chart/google-chart.directive';

import { PaginationableModule } from '../common/shared/paginationable.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PaginationableModule,
    RouterModule.forRoot(
        APP_ROUTES
    )
  ],
  declarations: [ChartsComponent, ChartComponent, GoogleChart],
  exports     : [ChartsComponent, ChartComponent, GoogleChart]
})
export class ChartsModule { }
