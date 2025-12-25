
import React from 'react';
import { BudgetItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface BudgetItemRowProps {
  item: BudgetItem;
  onUpdate: (id: string, updates: Partial<BudgetItem>) => void;
  onRemove: (id: string) => void;
  isCapturing?: boolean;
}

const BudgetItemRow: React.FC<BudgetItemRowProps> = ({ item, onUpdate, onRemove, isCapturing = false }) => {
  const itemTotal = item.quantity * item.unitPrice;

  if (isCapturing) {
    return (
      <tr className="border-b border-slate-100 bg-white">
        <td className="py-4 px-4 text-center text-slate-700 font-medium">
          {item.quantity}
        </td>
        <td className="py-4 px-4 text-slate-700">
          {item.description}
        </td>
        <td className="py-4 px-4 text-slate-700">
          {formatCurrency(item.unitPrice)}
        </td>
        <td className="py-4 px-4 font-bold text-slate-900 text-right">
          {formatCurrency(itemTotal)}
        </td>
        <td className="w-0 p-0 overflow-hidden"></td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
      <td className="py-3 px-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, { quantity: Number(e.target.value) })}
          className="w-16 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-center font-medium"
        />
      </td>
      <td className="py-3 px-4 flex-grow">
        <input
          type="text"
          value={item.description}
          onChange={(e) => onUpdate(item.id, { description: e.target.value })}
          className="w-full bg-transparent border-b border-transparent focus:border-emerald-500 outline-none"
          placeholder="Descrição do produto"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center">
          <span className="text-slate-400 mr-1 text-sm">R$</span>
          <input
            type="number"
            step="0.01"
            value={item.unitPrice || ""}
            onChange={(e) => onUpdate(item.id, { unitPrice: Number(e.target.value) })}
            className="w-24 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none"
            placeholder="0,00"
          />
        </div>
      </td>
      <td className="py-3 px-4 font-semibold text-slate-800 text-right">
        {formatCurrency(itemTotal)}
      </td>
      <td className="py-3 px-4 text-right no-print">
        <button
          onClick={() => onRemove(item.id)}
          className="text-slate-300 hover:text-rose-500 transition-colors"
          title="Remover item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </td>
    </tr>
  );
};

export default BudgetItemRow;
