import { monthNames } from "./constants";

export class dateService {
  getMonthName(monthNumber: number): string {
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error("Invalid month number. It should be between 1 and 12.");
    }
    return monthNames[monthNumber - 1];
  }
}
