const fs = require("node:fs");

export class fileService {
  readFileContent(filePath: string): string {
    if (!fs.existsSync(filePath)) {
      console.log("file does not exists, Please re-check the date or directory");
      return "";
    }

    const data = fs.readFileSync(filePath, "utf8");
    return data;
  }
}
