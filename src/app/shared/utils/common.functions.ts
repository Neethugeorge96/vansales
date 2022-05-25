// export function enumSelector(definition) {
//   return Object.keys(definition)
//     .filter(Number)
//     .map(key => ({ value: key, text: definition[key] }));
// }
import * as XLSX from "xlsx";
export function enumSelector(definition) {
  return Object.keys(definition)
    .filter(Number)
    .map((key) => ({
      value: parseInt(key),
      text: pascalCaseToTitleCase(definition[key]),
    }));
}

export function pascalCaseToTitleCase(text: string) {
  return text
    .replace(/([A-Z]+)/g, "$1")
    .replace(/([A-Z][a-z])/g, " $1")
    .trim();
}

export function dropDownformatter(data: any[], key1: string, key2: string) {
  data.forEach((item) => {
    item.diplayText = item[key1] + " - " + item[key2];
  });
  return data;
}

export function sampleExcelDownloader(headerRow: string[], fileName: string) {
  let templateToExcel: string[][] = [headerRow, []];
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(templateToExcel);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, fileName + ".xlsx");
}
