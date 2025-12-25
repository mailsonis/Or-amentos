
export interface BudgetItem {
  id: string;
  quantity: number;
  description: string;
  unitPrice: number;
}

export interface CompanyInfo {
  name: string;
  logo: string;
  whatsapp: string;
  instagram: string;
  address: string;
}

export interface BudgetSummary {
  subtotal: number;
  discountCash: number;
  total: number;
}
