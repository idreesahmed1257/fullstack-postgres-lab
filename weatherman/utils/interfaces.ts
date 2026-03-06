export interface Weather {
  pkt: Date;
  maxTemp: number;
  meanTemp: number;
  minTemp: number;
  dewPoint: number;
  meanDewPoint: number;
  minDewPoint: number;
  maxHumidity: number;
  meanHumidity: number;
  minHumidity: number;
  maxSeaLevelPressure: number;
  meanSeaLevelPressure: number;
  minSeaLevelPressure: number;
  maxVisibility: number;
  meanVisibility: number;
  minVisibility: number;
  maxWindSpeed: number;
  meanWindSpeed: number;
  minWindSpeed: number;
  maxGustSpeed: number;
  precipitation: number;
  cloudCover: number;
  event: string;
  windDirDegrees: number;
}

export interface weatherResponse {
  value?: number | null;
  date: Date | null;
}
