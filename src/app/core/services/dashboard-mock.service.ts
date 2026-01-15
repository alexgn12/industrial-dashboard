import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KpisDto, TimeSeriesDto, ParetoItemDto, DetectionsPageDto } from './dashboard.models';

const NO_CACHE_HEADERS = new HttpHeaders({
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
});

const V = 'dev1'; // cambia esto si cambias los JSON

@Injectable({ providedIn: 'root' })
export class DashboardMockService {
  constructor(private http: HttpClient) {}

  getKpis(): Observable<KpisDto> {
    return this.http.get<KpisDto>(`/assets/mock/kpis.json?v=${V}`, { headers: NO_CACHE_HEADERS });
  }

  getTimeSeriesHour(): Observable<TimeSeriesDto> {
    return this.http.get<TimeSeriesDto>(`/assets/mock/timeseries_hour.json?v=${V}`, {
      headers: NO_CACHE_HEADERS,
    });
  }

  getPareto(): Observable<ParetoItemDto[]> {
    return this.http.get<ParetoItemDto[]>(`/assets/mock/pareto.json?v=${V}`, {
      headers: NO_CACHE_HEADERS,
    });
  }
  getDetections(page = 1, pageSize = 10, onlyNok = false): Observable<DetectionsPageDto> {
    // Para la demo devolvemos siempre el mismo JSON
    return this.http.get<DetectionsPageDto>(`/assets/mock/detections_page.json?v=${V}`, {
      headers: NO_CACHE_HEADERS,
    });
  }
}
