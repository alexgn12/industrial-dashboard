import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KpisDto, TimeSeriesDto, ParetoItemDto, DetectionsPageDto } from './dashboard.models';

const NO_CACHE_HEADERS = new HttpHeaders({
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
});

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  constructor(private http: HttpClient) {}

  getKpis(): Observable<KpisDto> {
    return this.http.get<KpisDto>(`/api/kpis.php`, { headers: NO_CACHE_HEADERS });
  }

  getTimeSeriesHour(): Observable<TimeSeriesDto> {
    return this.http.get<TimeSeriesDto>(`/api/timeseries.php`, { headers: NO_CACHE_HEADERS });
  }

  getPareto(): Observable<ParetoItemDto[]> {
    return this.http.get<ParetoItemDto[]>(`/api/pareto.php`, { headers: NO_CACHE_HEADERS });
  }

  getDetections(page = 1, pageSize = 20, onlyNok = false): Observable<DetectionsPageDto> {
  const only = onlyNok ? 1 : 0;
  return this.http.get<DetectionsPageDto>(`/api/detections.php?page=${page}&pageSize=${pageSize}&onlyNok=${only}`);
}
}




