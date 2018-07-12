import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsComponent } from './charts.component';
import { ChartComponent } from './chart/chart.component';
import { GoogleChart } from './chart/google-chart.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ChartsComponent, ChartComponent, GoogleChart],
  exports     : [ChartsComponent, ChartComponent, GoogleChart]
})
export class ChartsModule { }
