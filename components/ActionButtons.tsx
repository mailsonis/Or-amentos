
import React from 'react';

interface ActionButtonsProps {
  onDownload: () => void;
  onClear: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDownload, onClear }) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 no-print">
      <button
        onClick={onClear}
        className="p-4 bg-white border border-slate-200 text-slate-600 rounded-full shadow-lg hover:bg-slate-50 transition-all group"
        title="Limpar tudo"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
      
      <button
        onClick={onDownload}
        className="p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105"
        title="Baixar como Imagem (PNG)"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
      </button>
    </div>
  );
};

export default ActionButtons;
