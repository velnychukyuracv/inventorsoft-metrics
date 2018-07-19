
import { Component,  Input,  OnInit} from '@angular/core';
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit{

    @Input('chart') public chart: any;

    private chartTypes: Object = {
        LINE: 'LineChart',
        BAR: 'BarChart',
        COLUMN: 'ColumnChart',
        PIE: 'PieChart',
        AREA: 'AreaChart',
        TABLE: 'Table'
    };

    constructor() {    }

    ngOnInit() {   }

}
