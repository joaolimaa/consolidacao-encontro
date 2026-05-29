import React from 'react';

export default function ModalExcluir({ isOpen, onConfirm, onCancel }) {
  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className="modal-box">
        <div className="modal-title">Excluir Participante?</div>
        <div className="modal-desc">Tem certeza que deseja remover esta ficha? Essa ação não pode ser desfeita.</div>
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn-modal-delete" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
}