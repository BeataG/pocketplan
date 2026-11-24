import { Transaction, TransactionType } from '../models/transaction';

export interface TransactionSummary {
  /** Total income in integer grosze. */
  readonly income: number;
  /** Total expenses in integer grosze. */
  readonly expenses: number;
  /** Balance in integer grosze. */
  readonly balance: number;
}

export function calculateSummary(
  transactions: readonly Transaction[],
): TransactionSummary {
  let income = 0;
  let expenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === TransactionType.Income) {
      income += transaction.amount;
    } else if (transaction.type === TransactionType.Expense) {
      expenses += transaction.amount;
    }
  })
  return { income, expenses, balance: income - expenses };
}
