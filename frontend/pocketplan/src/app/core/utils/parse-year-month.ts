import { YearMonth } from "../models/year-month";

export function parseYearMonth(value: string): YearMonth | null {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
    return null;
  }

  return value as YearMonth;
}
