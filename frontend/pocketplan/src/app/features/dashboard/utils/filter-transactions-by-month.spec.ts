import { Transaction, TransactionType } from "../models/transaction";
import { filterTransactionsByMonth } from "./filter-transactions-by-month";
import { parseYearMonth } from "../../../core/utils/parse-year-month";

describe('filterTransactionsByMonth', () => {
  it('same month', () => {
    const transactions: readonly Transaction[] = [
      {
        id: 'income-1',
        type: TransactionType.Income,
        amount: 12550,
        categoryId: 'salary',
        date: '2026-11-01',
        description: 'Salary',
      },
      {
        id: 'income-2',
        type: TransactionType.Income,
        amount: 2500,
        categoryId: 'other-income',
        date: '2026-11-02',
        description: 'Sale',
      },
    ];
    const month = parseYearMonth('2026-11');
    if (month === null) {
      throw new Error('Invalid month');
    }
    expect(filterTransactionsByMonth(transactions, month)).toEqual([
      {
        id: 'income-1',
        type: TransactionType.Income,
        amount: 12550,
        categoryId: 'salary',
        date: '2026-11-01',
        description: 'Salary',
      },
      {
        id: 'income-2',
        type: TransactionType.Income,
        amount: 2500,
        categoryId: 'other-income',
        date: '2026-11-02',
        description: 'Sale',
      },
    ]);
  });

  it('different month', () => {
    const transactions: readonly Transaction[] = [
      {
        id: 'expense-1',
        type: TransactionType.Expense,
        amount: 1800,
        categoryId: 'groceries',
        date: '2026-11-03',
        description: 'Groceries',
      },
      {
        id: 'expense-2',
        type: TransactionType.Expense,
        amount: 700,
        categoryId: 'transport',
        date: '2026-12-04',
        description: 'Bus ticket',
      },
    ];

    const month = parseYearMonth('2026-12');
    if (month === null) {
      throw new Error('Invalid month');
    }
    expect(filterTransactionsByMonth(transactions, month)).toEqual([
      {
        id: 'expense-2',
        type: TransactionType.Expense,
        amount: 700,
        categoryId: 'transport',
        date: '2026-12-04',
        description: 'Bus ticket',
      },
    ]);
  });

  it('returns empty array for lack of transactions for a given month', () => {
    const transactions: readonly Transaction[] = [
      {
        id: 'expense-1',
        type: TransactionType.Expense,
        amount: 1800,
        categoryId: 'groceries',
        date: '2026-11-03',
        description: 'Groceries',
      },
      {
        id: 'expense-2',
        type: TransactionType.Expense,
        amount: 700,
        categoryId: 'transport',
        date: '2026-12-04',
        description: 'Bus ticket',
      },
    ];

    const month = parseYearMonth('2026-10');
    if (month === null) {
      throw new Error('Invalid month');
    }
    expect(filterTransactionsByMonth(transactions, month)).toEqual([]);
  });

  it('returns empty array for empty array', () => {
    const transactions: readonly Transaction[] = [];

    const month = parseYearMonth('2026-10');
    if (month === null) {
      throw new Error('Invalid month');
    }
    expect(filterTransactionsByMonth(transactions, month)).toEqual([]);
  });

  it('does not mutate the input transactions', () => {
    const transactions: readonly Transaction[] = [
      {
        id: 'income-1',
        type: TransactionType.Income,
        amount: 10000,
        categoryId: 'salary',
        date: '2026-11-01',
        description: 'Salary',
      },
      {
        id: 'expense-1',
        type: TransactionType.Expense,
        amount: 3500,
        categoryId: 'groceries',
        date: '2026-11-02',
        description: 'Groceries',
      },
    ];
    const originalTransactions = structuredClone(transactions);

    const month = parseYearMonth('2026-11');
    if (month === null) {
      throw new Error('Invalid month');
    }
    filterTransactionsByMonth(transactions, month);

    expect(transactions).toEqual(originalTransactions);
  });

  it('does not return October 31 for the selected November', () => {
    const transactions: readonly Transaction[] = [
      {
        id: 'expense-1',
        type: TransactionType.Expense,
        amount: 1800,
        categoryId: 'groceries',
        date: '2026-10-31',
        description: 'Groceries',
      },
      {
        id: 'expense-2',
        type: TransactionType.Expense,
        amount: 700,
        categoryId: 'transport',
        date: '2026-11-04',
        description: 'Bus ticket',
      },
    ];

    const month = parseYearMonth('2026-11');
    if (month === null) {
      throw new Error('Invalid month');
    }
    expect(filterTransactionsByMonth(transactions, month)).toEqual([{
        id: 'expense-2',
        type: TransactionType.Expense,
        amount: 700,
        categoryId: 'transport',
        date: '2026-11-04',
        description: 'Bus ticket',
      }]);
  });

  it('does not return transactions from another year', () => {
    const transactions: readonly Transaction[] = [
      {
        id: 'expense-1',
        type: TransactionType.Expense,
        amount: 1800,
        categoryId: 'groceries',
        date: '2025-11-01',
        description: 'Groceries',
      },
      {
        id: 'expense-2',
        type: TransactionType.Expense,
        amount: 700,
        categoryId: 'transport',
        date: '2026-11-04',
        description: 'Bus ticket',
      },
    ];
    const month = parseYearMonth('2026-11');
    if (month === null) {
      throw new Error('Invalid month');
    }
    expect(filterTransactionsByMonth(transactions, month)).toEqual([{
        id: 'expense-2',
        type: TransactionType.Expense,
        amount: 700,
        categoryId: 'transport',
        date: '2026-11-04',
        description: 'Bus ticket',
      }]);
  });
});

