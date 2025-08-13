import { Command } from "commander";
import { mainService } from "./utils/index";

const mainServiceInstance = new mainService();

const program = new Command();

program
  .name("weatherman")
  .argument("<dir>", "Directory path to weather files")
  .option("-c, --compare <date>", "Chart report")
  .option("-a, --avg <date>", "Average Values report")
  .option("-e, --extreme <year>", "Extreme Values Report")
  .parse();

const options = program.opts();

const dir = program.args[0];

if (options.compare) {
  mainServiceInstance.getChartReport(options.compare, dir);
}

if (options.avg) {
  mainServiceInstance.getAvgValuesReport(options.avg, dir);
}

if (options.extreme) {
  mainServiceInstance.getExtremeValueReport(options.extreme, dir);
}
