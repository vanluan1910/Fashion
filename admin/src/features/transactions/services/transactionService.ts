import { Transaction } from "../types";

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    orderId: "o1001",
    amount: 2500000,
    paymentMethod: "Thẻ tín dụng",
    status: "Thành công",
    date: "2024-04-24",
    customerName: "Nguyễn Văn A",
    description: "Thanh toán đơn hàng #1001",
    fee: 75000,
    netAmount: 2425000
  },
  {
    id: "t2",
    orderId: "o1002",
    amount: 1800000,
    paymentMethod: "Chuyển khoản",
    status: "Thành công",
    date: "2024-04-24",
    customerName: "Trần Thị B",
    description: "Thanh toán đơn hàng #1002",
    fee: 54000,
    netAmount: 1746000
  },
  {
    id: "t3",
    orderId: "o1003",
    amount: 3200000,
    paymentMethod: "Ví điện tử",
    status: "Đang xử lý",
    date: "2024-04-24",
    customerName: "Lê Văn C",
    description: "Thanh toán đơn hàng #1003",
    fee: 96000,
    netAmount: 3104000
  },
  {
    id: "t4",
    orderId: "o1004",
    amount: 1500000,
    paymentMethod: "Trả sau",
    status: "Thành công",
    date: "2024-04-23",
    customerName: "Phạm Hà D",
    description: "Thanh toán đơn hàng #1004",
    fee: 0,
    netAmount: 1500000
  },
  {
    id: "t5",
    orderId: "o1005",
    amount: 2100000,
    paymentMethod: "Thẻ tín dụng",
    status: "Thất bại",
    date: "2024-04-23",
    customerName: "Đặng Minh E",
    description: "Thanh toán đơn hàng #1005",
    fee: 0,
    netAmount: 0
  },
];

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_TRANSACTIONS), 300);
    });
  },

  getTransactionById: async (id: string): Promise<Transaction | null> => {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === id);
    return Promise.resolve(transaction || null);
  },

  refundTransaction: async (id: string): Promise<void> => {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === id);
    if (transaction) {
      transaction.status = "Hoàn tiền";
    }
    return Promise.resolve();
  },

  retryTransaction: async (id: string): Promise<void> => {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === id);
    if (transaction && transaction.status === "Thất bại") {
      transaction.status = "Đang xử lý";
    }
    return Promise.resolve();
  }
};
