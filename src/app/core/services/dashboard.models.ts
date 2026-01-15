export interface KpisDto {
  totalPieces: number;
  defectPieces: number;
  defectRate: number; // 0..1
  avgTemp: number;
  piecesPerMinute: number;
  lastEventTs: string;
}

export interface TimeSeriesDto {
  labels: string[];
  ok: number[];
  nok: number[];
  avgTemp: number[];
}

export interface ParetoItemDto {
  defectType: string;
  count: number;
}

export interface DetectionsPageDto {
  page: number;
  pageSize: number;
  total: number;
  items: Array<{
    id: number;
    ts: string;
    lineId: string;
    presence: number;
    temperatureC: number;
    result: 'OK' | 'NOK';
    defectType: string | null;
    defectScore: number;
  }>;
}
