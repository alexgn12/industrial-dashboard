import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { DetectionsPageDto, KpisDto, ParetoItemDto, TimeSeriesDto } from '../../core/services/dashboard.models';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
//import { DashboardApiService } from '../../core/services/dashboard-api.service';
import { DashboardMockService } from '../../core/services/dashboard-mock.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  kpis: KpisDto | null = null;

  lineData: ChartData<'line'> = { labels: [], datasets: [] };
  lineOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true } },
  };

  paretoData: ChartData<'bar'> = { labels: [], datasets: [] };
  paretoOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true } },
  };

  detections: DetectionsPageDto | null = null;

  // por ahora fijos
  page = 1;
  pageSize = 10;
  onlyNok = false;

  displayedColumns: string[] = ['ts', 'lineId', 'temperatureC', 'result', 'defectType', 'defectScore'];

  loadDetections() {
    this.api.getDetections(this.page, this.pageSize, this.onlyNok).subscribe({
      next: (res) => {
        console.log('DETECTIONS OK', res);
        this.detections = res;
      },
      error: (e) => console.error('DETECTIONS ERROR', e),
    });
  }

  constructor(private api: DashboardMockService) {
    console.log('hola construye');

    this.api.getKpis().subscribe({
      next: (v) => {
        console.log('KPIS OK', v);
        this.kpis = v;
      },
      error: (e) => console.error('KPIS ERROR', e),
    });

    this.api.getTimeSeriesHour().subscribe({
      next: (ts) => {
        this.lineData = {
          labels: ts.labels,
          datasets: [
            { label: 'OK', data: ts.ok },
            { label: 'NOK', data: ts.nok },
          ],
        };
      },
      error: (e) => console.error('TS ERROR', e),
    });

    this.api.getPareto().subscribe({
      next: (items) => {
        this.paretoData = {
          labels: items.map((x) => x.defectType),
          datasets: [{ label: 'Defectos', data: items.map((x) => x.count) }],
        };
      },
      error: (e) => console.error('PARETO ERROR', e),
    });

    this.loadDetections();
  }
}
