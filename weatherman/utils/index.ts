import { Weather, weatherResponse } from "./interfaces";
import { dateService } from "./dateHandler";

import path from "node:path";
import { weatherService } from "./weather";
import { fileService } from "./fileHandler";
import { parserService } from "./parser";
import { monthNames } from "./constants";

const fileServiceInstance = new fileService();
const weatherServiceInstance = new weatherService();
const parserServiceInstance = new parserService();
const dateServiceInstance = new dateService();

export class mainService {
  getAvgValuesReport(date: string, dir: string) {
    const [year, month] = date.split("/");

    const monthName = dateServiceInstance.getMonthName(parseInt(month));

    const directoryPath = path.join(__dirname, `${dir}/Murree_weather_${year}_${monthName}.txt`);

    const fileContent: string = fileServiceInstance.readFileContent(directoryPath);
    const parsedData = parserServiceInstance.parseFileData(fileContent);

    const maxTemp = weatherServiceInstance.findMax(parsedData, "meanTemp");
    const minTemp = weatherServiceInstance.findMin(parsedData, "minTemp");
    const avgHumidity = weatherServiceInstance.findAvg(parsedData, "meanHumidity");
    console.log("++++ Average Values Report ++++");
    console.log("Highest Average :", maxTemp, "C");
    console.log("Lowest Average :", minTemp, "C");
    console.log("Average Mean Humidity:", avgHumidity, "C");
    console.log("----------------------");
  }

  getChartReport(date: string, dir: string) {
    const [year, month] = date.split("/");

    const monthName = dateServiceInstance.getMonthName(parseInt(month));

    const directoryPath = path.join(__dirname, `${dir}/Murree_weather_${year}_${monthName}.txt`);

    const fileContent = fileServiceInstance.readFileContent(directoryPath);
    const parsedData = parserServiceInstance.parseFileData(fileContent);

    if (parsedData?.length) {
      console.log(monthName, year);
      parsedData.forEach((item: Weather) => {
        console.log(
          `\x1b[31m${item.pkt ? new Date(item.pkt).getDate() : "-"} +++++++++++++++++ ${parserServiceInstance.handleEmptyValues(
            item.maxTemp
          )}C \x1b[0m - \x1b[1m\x1b[34m${parserServiceInstance.handleEmptyValues(item.minTemp)}C\x1b[0m`
        );
      });
      console.log("----------------------");
    } else {
      console.log("No Data available for the given date and month");
    }
  }

  getExtremeValueReport(date: string, dir: string) {
    const fileContents = monthNames.map((month) => {
      const filePath = path.join(__dirname, `${dir}/Murree_weather_${date}_${month}.txt`);
      const fileContent = fileServiceInstance.readFileContent(filePath);
      if (fileContent) {
        const parsedData = parserServiceInstance.parseFileData(fileContent);
        return parsedData;
      } else {
        return [];
      }
    });

    const flattenContents = fileContents.flat();

    const maxData: weatherResponse | null = weatherServiceInstance.findExtremeMax(flattenContents, "maxTemp");

    const minData: weatherResponse | null = weatherServiceInstance.findExtremeMin(flattenContents, "minTemp");

    const maxHumidityData = weatherServiceInstance.findExtremeMax(flattenContents, "maxHumidity");

    console.log("+++++ Extreme Values Report +++++");
    console.log("Highest :", maxData?.value, "C on", maxData?.date ? new Date(maxData?.date).toLocaleString("default", { month: "long" }) : "-");
    console.log("Lowest :", minData?.value, "C on", minData?.date ? new Date(minData?.date).toLocaleString("default", { month: "long" }) : "-");
    console.log(
      "Max Humidity :",
      maxHumidityData?.value,
      "% on",
      maxHumidityData?.date
        ? new Date(maxHumidityData?.date).toLocaleString("default", {
            month: "long",
          })
        : "-"
    );

    console.log("----------------------");
  }
}
