import { TransactionType, type Transaction } from '../models/transaction';
import { calculateSummary } from './calculate-summary';

describe('calculateSummary', () => {
  it('totals income transactions', () => {
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

    expect(calculateSummary(transactions)).toEqual({
      income: 15050,
      expenses: 0,
      balance: 15050,
    });
  });

  it('totals expense transactions', () => {
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
        date: '2026-11-04',
        description: 'Bus ticket',
      },
    ];

    expect(calculateSummary(transactions)).toEqual({
      income: 0,
      expenses: 2500,
      balance: -2500,
    });
  });

  it('calculates a balance from mixed income and expenses', () => {
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

    expect(calculateSummary(transactions)).toEqual({
      income: 10000,
      expenses: 3500,
      balance: 6500,
    });
  });

  it('returns zero totals for an empty array', () => {
    expect(calculateSummary([])).toEqual({
      income: 0,
      expenses: 0,
      balance: 0,
    });
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

    calculateSummary(transactions);

    expect(transactions).toEqual(originalTransactions);
  });
});
