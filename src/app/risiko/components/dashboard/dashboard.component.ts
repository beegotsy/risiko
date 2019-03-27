import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { WarResult } from '../../models/war.model';
import { WarService } from '../../services/war.service';

@Component({
  selector: 'risiko-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  player1: number;
  player2: number;
  iterations = 1e5;
  outcome: WarResult[];
  test1: any;
  test2: any[];
  test3: any[];
  test4: any[];

  barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true
    },
    scales: {
      xAxes: [
        { scaleLabel: { labelString: 'Carrarmati rimasti', display: true } }
      ],
      yAxes: [{ scaleLabel: { labelString: 'Percentuale %', display: true } }]
    }
  };
  barChartLabels: Label[];
  barChartData: any[] = [
    { data: [], label: 'Attaccante' }
    // { data: [], label: 'Difensore' }
  ];

  constructor(private warService: WarService) {}

  exec() {
    this.outcome = this.warService.bigWar(
      this.player1,
      this.player2,
      this.iterations
    );
    this.test1 = this.warService.calculateWins(this.outcome);
    this.test2 = this.warService.calculateRemainAttackers(this.outcome, 'win');
    this.test3 = this.warService.calculateRemainDefenders(this.outcome, 'loss');
    this.test4 = this.warService.calculateRemainAttackers(this.outcome, 'loss');

    this.barChartLabels = [];
    this.barChartData = [{ data: [], label: 'Attaccante' }];
    this.test2.forEach((v, i: number) => {
      if (v) {
        this.barChartLabels.push(`${i}`);
        this.barChartData[0].data.push(v.percentage.toFixed(3));
      }
    });
  }
}
