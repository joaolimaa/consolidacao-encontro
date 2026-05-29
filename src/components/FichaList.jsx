import React from 'react';

const SvgPencil = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const SvgTrash = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const SvgListIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--accent)" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

export default function FichaList({ registros, onEdit, onDelete }) {

  return (
    <div className="card">
      <div className="list-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="card-icon">
            <SvgListIcon />
          </div>
          <span style={{ marginBottom: 0 }}>Cadastrados</span>
        </div>
        <span className="list-count">{registros.length}</span>
      </div>

      <div className="registros-list">
        {registros.length === 0 ? (
          <div className="empty-state">Nenhum encontrista cadastrado.</div>
        ) : (
          registros.slice().reverse().map((reg, index) => {
            const infoArr = [
              reg.batismo || '',
              reg.discipulador ? `Disc.: ${reg.discipulador}` : '',
              reg.whatsapp ? `Telefone: ${reg.whatsapp}` : ''
            ].filter(Boolean);

            return (
              <div key={reg.id} className="registro-item" style={{ animationDelay: `${index * 0.04}s` }}>
                <div className="reg-info">
                  <div className="reg-nome">{reg.nome}</div>
                  <div className="reg-meta">
                    {infoArr.map((item, i) => (
                      <React.Fragment key={i}>
                        <span style={{whiteSpace:'nowrap'}}>{item}</span>
                        {i < infoArr.length - 1 && <span style={{color:'var(--border)', margin:'0 6px'}}>|</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="reg-actions">
                  <button className="action-btn" title="Editar" onClick={() => onEdit(reg)}><SvgPencil /></button>
                  <button className="action-btn" style={{ color: 'var(--danger)' }} title="Excluir" onClick={() => onDelete(reg.id)}><SvgTrash /></button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}