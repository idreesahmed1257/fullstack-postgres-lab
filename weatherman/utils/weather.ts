import { Weather, weatherResponse } from "./interfaces";

export class weatherService {
  findExtremeMax(parsedData: Weather[], key: keyof Weather = "maxTemp"): weatherResponse | null {
    if (parsedData.length === 0) return null;
    let max: number = -Infinity;
    let maxDate: Date | null = null;

    parsedData
      .filter((item: Weather) => item[key] !== null && !isNaN(item[key] as number))
      .forEach((item: Weather) => {
        const value = item?.[key] as number | null;

        if (typeof value === "number" && value > max) {
          max = value;
          maxDate = item.pkt;
        }
      });

    if (max === -Infinity) return null;

    return {
      value: max,
      date: maxDate,
    };
  }
  findExtremeMin(parsedData: Weather[], key: keyof Weather = "minTemp"): weatherResponse | null {
    if (parsedData.length === 0) return null;
    let min: number = Infinity;
    let minDate: Date | null = null;

    parsedData
      .filter((item: Weather) => item[key] !== null && !isNaN(item[key] as number))
      .forEach((item: Weather) => {
        const value = item?.[key] as number | null;

        if (typeof value === "number" && value < min) {
          min = value;
          minDate = item.pkt;
        }
      });
    if (min === Infinity) return null;

    return {
      value: min,
      date: minDate,
    };
  }
  findAvg(parsedData: Weather[], key: keyof Weather = "meanTemp"): number | null {
    if (parsedData.length === 0) return null;
    let sum = 0;
    let count = 0;
    parsedData
      ?.filter((item: Weather) => item[key] !== null && !isNaN(item[key] as number))
      .forEach((item: Weather) => {
        const value = item[key];
        if (typeof value === "number") {
          sum += value;
          count++;
        }
      });
    return sum / count;
  }
  findMax(parsedData: Weather[], key: keyof Weather = "meanTemp"): number | null {
    if (parsedData.length === 0) return null;

    let max = -Infinity;

    for (const item of parsedData) {
      const value = item[key];

      if (typeof value === "number" && value > max) {
        max = value;
      }
    }

    return max === -Infinity ? null : max;
  }
  findMin(parsedData: Weather[], key: keyof Weather = "meanTemp"): number | null {
    if (parsedData.length === 0) return null;

    let min = Infinity;

    for (const item of parsedData) {
      const value = item[key];

      if (typeof value === "number" && value < min) {
        min = value;
      }
    }

    return min === Infinity ? null : min;
  }
}
