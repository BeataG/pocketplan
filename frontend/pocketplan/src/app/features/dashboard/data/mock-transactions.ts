import { TransactionType, type Transaction } from '../models/transaction';

export const mockTransactions: readonly Transaction[] = [
  {
    id: 'transaction-1',
    type: TransactionType.Income,
    amount: 520000,
    categoryId: 'salary',
    date: '2026-11-01',
    description: 'Monthly salary',
  },
  {
    id: 'transaction-2',
    type: TransactionType.Expense,
    amount: 18450,
    categoryId: 'groceries',
    date: '2026-11-03',
    description: 'Weekly groceries',
  },
  {
    id: 'transaction-3',
    type: TransactionType.Expense,
    amount: 6500,
    categoryId: 'transport',
    date: '2026-11-05',
    description: 'Monthly transit pass',
  },
  {
    id: 'transaction-4',
    type: TransactionType.Income,
    amount: 12500,
    categoryId: 'other-income',
    date: '2026-11-08',
    description: 'Secondhand book sale',
  },
];
