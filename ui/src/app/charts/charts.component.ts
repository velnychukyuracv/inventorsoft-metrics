import { Component, OnInit } from '@angular/core';
import { ChartsService } from './charts.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    dropdownList = [];
    dropdownSettings = {};
    selectedCharts = [];

    constructor(private service : ChartsService) {
    }

    ngOnInit() {
        this.dropdownList = [
            {"id": 0, alias: "line",  "itemName": "Line"},
            {"id": 1, alias: "line",  "itemName": "Line"},
            {"id": 2, alias: "bar",  "itemName": "Bar"},
            {"id": 3, alias: "bar",  "itemName": "Bar"},
            {"id": 4, alias: "doughnut",  "itemName": "Doughnut"},
            {"id": 5, alias: "pie",  "itemName": "Pie"},
            {"id": 6, alias: "radar",  "itemName": "Radar"},
            {"id": 7, alias: "polarArea",  "itemName": "Polar"}
        ];
        this.dropdownSettings = {
            text: "Select Charts",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All'
        };
        setTimeout(() => console.log(this.selectedCharts), 10000)
    }

    get chartsToShow():any[] {
        return this.selectedCharts.map(({alias}) => this.possibleCharts.find(ch => ch.type === alias));
    }

    possibleCharts = [
        {
            id:'0',
            type: 'line',
            datasets: [
              {
                label: "Data Set One",
                data: [30, 50, 40, 61, 42, 35, 40],
              },
              {
                label: "Data Set Two",
                data: [50, 40, 50, 40, 45, 40, 30],
              }
            ],
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',],
        },
        {
          id:'1',
          type: 'line',
          options: {
            scales: {
              xAxes: [{
                display: true,
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                ticks: {
                  max: 50,
                  min: 0,
                  stepSize: 0.5
                },
                display: false,
                gridLines: {
                  display: false
                }
              }]
            },
            legend: {
              display: false
            }
          },
          datasets: [
            {
              data: [20, 28, 30, 22, 24, 10, 7],
              fill: true,
              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: '#ff7676',
              pointBorderColor: '#ff7676',
              pointHoverBackgroundColor: '#ff7676',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              borderWidth: 3,
              pointBackgroundColor: "#ff7676",
              pointBorderWidth: 0,
              pointHoverRadius: 4,
              pointHoverBorderColor: "#fff",
              pointHoverBorderWidth: 0,
              pointRadius: 4,
              pointHitRadius: 0,

            }
          ],
          labels: ["A", "B", "C", "D", "E", "F", "G"],
        },
        {
            id:'2',
            type: 'bar',
            datasets: [
              {
                label: "A",
                data: [45, 24, 42, 35, 44, 21, 12],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
              },
              {
                label: "A",
                data: [50, 40, 50, 40, 45, 40, 30],
              }
            ],
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012']
        },
        {
          id:'3',
          type: 'bar',
          options: {
            scales:
            {
              xAxes: [{
                display: false
              }],
              yAxes: [{
                display: false
              }],
            },
            legend: {
              display: false
            }
          },
          labels: ["A", "B", "C", "D", "E", "F", "G", "H"],
          datasets: [
            {
              label: "Data Set 1",
              backgroundColor:
                'blue',

              borderColor: [
              ],
              borderWidth: 0,
              data: [35, 55, 65, 85, 30, 22, 18, 35]
            },
            {
              label: "Data Set 2",
              backgroundColor:
                'red',
              borderColor: [
              ],
              borderWidth: 0,
              data: [49, 68, 85, 40, 27, 35, 20, 25]
            }
          ]
        },
        {
            id:'4',
            type: 'doughnut',
            data: [350, 450, 100],
            labels: ['A', 'B', 'Mail-Order Sales']
        },
        {
            id:'5',
            type: 'pie',
            data: [300, 500, 100],
            labels: ['Download Sales', 'In-Store Sales', 'Mail Sales']
        },
        {
            id:'6',
            type: 'radar',
            datasets: [
              {
                label: "ONE",
                data: [65, 59, 80, 81, 56, 55, 40],
              },
              {
                label: "TWO",
                data: [28, 48, 40, 19, 86, 27, 90],
              }
          ],
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running']
        },
        {
            id:'7',
            type: 'polarArea',
            data: [300, 500, 100, 40, 120],
            labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales']
        },
    ];

  buttontoggled : boolean = false;

  OnClik(){
    this.buttontoggled=!this.buttontoggled;
  }

  OnEditChart(){
    //this.display='block';
  }
  onCloseHandled(){
    //this.display='none';
  }


  getChart() {
    this.service.getChart()
      .subscribe(res => {
          console.log(res)
        })
  }

}
