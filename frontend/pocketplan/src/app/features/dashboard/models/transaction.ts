export const TransactionType = {
  Income: 'income',
  Expense: 'expense',
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  readonly id: string;
  readonly type: TransactionType;
  /** Monetary amount in integer grosze. */
  readonly amount: number;
  readonly categoryId: string;
  /** ISO calendar date in YYYY-MM-DD format. */
  readonly date: string;
  readonly description: string;
}
