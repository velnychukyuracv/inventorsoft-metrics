import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';

import { ChartService } from './../../common/services/chart.service';
import { ChartShowService } from './../../common/services/chart-show.service';

import { ChartShow } from './../../common/models/chart-show.model';
import { Chart } from './../../common/models/chart.model';
import {ChartsService} from "../../common/services/charts.service";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input('id') public id: number;
  chartList;
  constructor(
      private chartService: ChartShowService,
      private getChartService: ChartsService
  ) {
  }

  ngOnInit() {
  }

  /*getChart():void{
    this.getChartService.getChartById(id).pipe(first())
      .subscribe(data=>{
        console.log(data);
      })
  }*/

  getCharts(): void {
    this.chartService.getCharts().pipe(first())
        .subscribe(data => {
              this.chartList = data.content;
              this.chartList.forEach(
                  chart => {
                    console.log(chart);
                    this.chartService.getDBQuery(chart).subscribe(
                        dbData => {
                          console.log('db query data = ', dbData);
                        },
                        error => {
                          console.log('error 1 = ', error);
                        }
                    );
                  }
              );
            },
        error => {
          console.log('error 2 = ', error);
        });
  }



  /**
   *  google charts
   *  */
  public showCharts: any = [
    {
      type: 'LineChart',
      data:[
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 850, 1120],
        ['2007', 1030, 540]
      ],
      options:{
        title: 'Company Performance',
        curveType: 'none',
        legend: {
          position: 'bottom'
        },
      }
    },
    {
      type: 'BarChart',
      data:[
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
      ],
      options:{
        title: 'Population of Largest U.S. Cities',
        chartArea: { width: '45%' },
        hAxis: {

          minValue: 0,
          textStyle: {
            bold: true,
            fontSize: 12,
            color: '#4d4d4d'
          },
          titleTextStyle: {
            bold: true,
            fontSize: 18,
            color: '#4d4d4d'
          }
        },
        vAxis: {
          title: 'City',
          textStyle: {
            fontSize: 14,
            bold: true,
            color: '#848484'
          },
          titleTextStyle: {
            fontSize: 14,
            bold: true,
            color: '#848484'
          }
        }
      }
    },
    {
      type: 'PieChart',
      data:[
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ],
      options:{
        is3D: true,
        slices: {
          0: {offset: 0.2},
          2: {offset: 0.4},
          3: {offset: 0.5},
          4: {offset: 0.1},
        }
      }
    },
    {
      type: 'AreaChart',
      data:[
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
      ],
      options:{
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 }
      }
    },
    {
      type: 'ColumnChart',
      data:[
        ['Year', 'V' ],
        ['2010', 10 ],
        ['2020', 14 ],
        ['2030', 16 ],
        ['2040', 22 ],
        ['2050', 28 ]
      ],
      options:{
        animation:{
          duration: 500,
          easing: 'linear',
          startup:'true'
        },
      }
    },
    {
      type: 'Table',
      data:[
        ['Department', 'Revenues', 'Another column'],
        ['Shoes', 10700, -100],
        ['Sports', -15400, 25],
        ['Toys', 12500, 40],
        ['Electronics', -2100, 889],
        ['Food', 22600, 78],
        ['Art', 1100, 42],
        ['Shoes', 10700, -100],
        ['Sports', -15400, 25],
        ['Toys', 12500, 40],
        ['Electronics', -2100, 889],
        ['Food', 22600, 78],
        ['Art', 1100, 42]
      ],
      options:{
        columns: [1, 2],
        type: 'NumberFormat',
        width:'100%'
      }
    },
  ];

}
