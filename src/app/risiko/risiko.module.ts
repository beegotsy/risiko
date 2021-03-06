import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RisikoRoutingModule } from './risiko-routing.module';
import { UtilService } from './services/util.service';
import { WarService } from './services/war.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FormsModule, ChartsModule, RisikoRoutingModule],
  providers: [UtilService, WarService],
  bootstrap: [DashboardComponent]
})
export class RisikoModule {}
