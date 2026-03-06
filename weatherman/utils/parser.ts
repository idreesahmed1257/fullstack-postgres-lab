import { Weather } from "./interfaces";

export class parserService {
  parseFileData(data: string): Weather[] {
    if (!data) {
      return [];
    }
    let newline = "\n";

    let arr = data.trim().split(newline);
    let jsonData: Weather[] = [];
    arr.forEach((row, idx) => {
      if (idx === 0) {
        return;
      }
      const arr2 = row.split(",");

      const weatherEntry: Weather = {
        pkt: new Date(arr2[0]),
        maxTemp: parseInt(arr2[1]),
        meanTemp: parseInt(arr2[2]),
        minTemp: parseInt(arr2[3]),
        dewPoint: parseInt(arr2[4]),
        meanDewPoint: parseInt(arr2[5]),
        minDewPoint: parseInt(arr2[6]),
        maxHumidity: parseInt(arr2[7]),
        meanHumidity: parseInt(arr2[8]),
        minHumidity: parseInt(arr2[9]),
        maxSeaLevelPressure: parseInt(arr2[10]),
        meanSeaLevelPressure: parseInt(arr2[11]),
        minSeaLevelPressure: parseInt(arr2[12]),
        maxVisibility: parseFloat(arr2[13]),
        meanVisibility: parseFloat(arr2[14]),
        minVisibility: parseFloat(arr2[15]),
        maxWindSpeed: parseFloat(arr2[16]),
        meanWindSpeed: parseFloat(arr2[17]),
        minWindSpeed: parseFloat(arr2[18]),
        maxGustSpeed: parseFloat(arr2[19]),
        precipitation: parseFloat(arr2[20]),
        cloudCover: parseFloat(arr2[21]),
        event: arr2[22],
        windDirDegrees: parseFloat(arr2[23]),
      };

      jsonData.push(weatherEntry);
    });

    return jsonData;
  }

  handleEmptyValues(value: number): number | string {
    if (value && !isNaN(value) && value !== undefined && value !== null) {
      return value;
    } else {
      return "-";
    }
  }
}
