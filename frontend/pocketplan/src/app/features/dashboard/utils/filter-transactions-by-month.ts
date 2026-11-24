import { YearMonth } from "../../../core/models/year-month";
import { Transaction } from "../models/transaction";

export function filterTransactionsByMonth(
  transactions: readonly Transaction[],
  month: YearMonth,
): Transaction[] {
  return transactions.filter((transaction) => transaction.date.slice(0, 7) === month);
}
