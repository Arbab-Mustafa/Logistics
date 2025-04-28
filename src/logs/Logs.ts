import fs from "fs";
import path from "path";

export default function Logs(data: string) {
  const logPath = path.join(process.cwd(), "logs.txt");
  fs.writeFile(logPath, `\n${data}`, { flag: "a+" }, err => {
    if (err) {
      console.error(err);
    }
  });
}