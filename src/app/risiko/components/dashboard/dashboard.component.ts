import { Component } from '@angular/core';
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
  test2: any;
  test3: any;

  constructor(private warService: WarService) {}

  exec() {
    this.outcome = this.warService.bigWar(
      this.player1,
      this.player2,
      this.iterations
    );
    this.test1 = this.warService.calculateWins(this.outcome);
    this.test2 = this.warService.calculateRemainAttackers(this.outcome, true);
    this.test3 = this.warService.calculateRemainDefenders(this.outcome, true);
  }
}
