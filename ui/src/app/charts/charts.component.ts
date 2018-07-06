import { Component, OnInit } from '@angular/core';
import { ChartsService } from './charts.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];

    dropdownList = [];
    dropdownSettings = {};
    selectedCharts = [];

    constructor(private service: ChartsService) {
    }

    ngOnInit() {    }

    dropdownList = [
        {alias: "line" },
        {alias: "line"},
        {alias: "bar" },
        {alias: "bar"},
        {alias: "radar" },
        {alias: "doughnut"},
        {alias: "pie"},
        {alias: "polarArea"}
    ];

    get chartsToShow():any[] {
        return this.dropdownList.map(({alias}) => this.possibleCharts.find(ch => ch.type === alias));
    }

    possibleCharts = [
        {
            id: '0',
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
            id: '1',
            type: 'line',
            datasets: [
                {
                    data: [20, 28, 30, 22, 24, 10, 7],
                }
            ],
            labels: ["A", "B", "C", "D", "E", "F", "G"],
        },
        {
            id: '2',
            type: 'bar',
            datasets: [
                {
                    label: "A",
                    data: [45, 24, 42, 35, 44, 21, 12],
                },
                {
                    label: "A",
                    data: [50, 40, 50, 40, 45, 40, 30],
                }
            ],
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012']
        },
        {
            id: '3',
            type: 'bar',
            datasets: [
                {
                    label: "Data Set 1",
                    data: [35, 55, 65, 85, 30, 22, 18, 35]
                },
                {
                    label: "Data Set 2",
                    data: [49, 68, 85, 40, 27, 35, 20, 25]
                }
            ],
            labels: ["A", "B", "C", "D", "E", "F", "G", "H"],
        },
        {
            id: '4',
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
            id: '5',
            type: 'doughnut',
            data: [350, 450, 100],
            labels: ['A', 'B', 'Mail-Order Sales']
        },
        {
            id: '6',
            type: 'pie',
            data: [300, 500, 100],
            labels: ['Download Sales', 'In-Store Sales', 'Mail Sales']
        },

        {
            id: '7',
            type: 'polarArea',
            data: [300, 500, 100, 40, 120],
            labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales']
        },
    ];

    buttontoggled:boolean = false;

    OnClik() {
        this.buttontoggled = !this.buttontoggled;
    }

    OnEditChart() {
    }

    OnDeleteChart() {
    }


    getCharts() {
        this.service.getChart()
            .subscribe(res => {
                console.log(res)
            })
    }

}
