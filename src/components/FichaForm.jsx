import React, { useState } from 'react';

const SvgChevron = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SvgForm = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--accent)" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="M15 5l3 3"/>
  </svg>
);

export default function FichaForm({ onAdicionar, emEdicao, onCancelarEdicao, discipuladores }) {
  const [form, setForm] = useState(emEdicao || { nome: '', discipulador: '', batismo: '', lider: '', whatsapp: '', observacao: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  React.useEffect(() => {
    if (emEdicao) setForm(emEdicao);
  }, [emEdicao]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.discipulador || !form.batismo) return;
    onAdicionar(form);
    setForm({ nome: '', discipulador: '', batismo: '', lider: '', whatsapp: '', observacao: '' });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">
          <SvgForm />
        </div>
        <div>
          <div className="card-title">{form.id ? 'Editar Registro' : 'Novo Registro'}</div>
          <div className="card-desc">Preencha as informações do encontrista</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field full">
          <label>Nome<span>*</span></label>
          <input 
            type="text" className="p-input" placeholder="Nome do encontrista" required
            value={form.nome} onChange={e => setForm({...form, nome: e.target.value})}
          />
        </div>

        <div className="field">
          <label>Discipulador <span>*</span></label>
          <div className={`p-select-wrap ${dropdownOpen === 'disc' ? 'open' : ''}`}>
            <div className="p-select-trigger" onClick={() => setDropdownOpen(dropdownOpen === 'disc' ? false : 'disc')}>
              <span className={`p-select-label ${!form.discipulador ? 'placeholder' : ''}`}>
                {form.discipulador || 'Selecionar...'}
              </span>
              <span className="p-chevron"><SvgChevron /></span>
            </div>
            {dropdownOpen === 'disc' && (
              <div className="p-dropdown">
                {discipuladores && discipuladores.map(d => (
                  <div key={d} className={`p-dropdown-item ${form.discipulador === d ? 'selected' : ''}`}
                    onClick={() => { setForm({...form, discipulador: d}); setDropdownOpen(false); }}>
                    {d}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="field">
          <label>Batismo <span>*</span></label>
          <div className={`p-select-wrap ${dropdownOpen === 'bat' ? 'open' : ''}`}>
            <div className="p-select-trigger" onClick={() => setDropdownOpen(dropdownOpen === 'bat' ? false : 'bat')}>
              <span className={`p-select-label ${!form.batismo ? 'placeholder' : ''}`}>
                {form.batismo || 'Selecionar...'}
              </span>
              <span className="p-chevron"><SvgChevron /></span>
            </div>
            {dropdownOpen === 'bat' && (
              <div className="p-dropdown">
                {['Já é batizado', 'Quero batizar', 'Não quero batizar'].map(op => (
                  <div key={op} className={`p-dropdown-item ${form.batismo === op ? 'selected' : ''}`}
                    onClick={() => { setForm({...form, batismo: op}); setDropdownOpen(false); }}>
                    {op}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="field">
          <label>Líder</label>
          <input type="text" className="p-input" placeholder="Nome do líder" value={form.lider} onChange={e => setForm({...form, lider: e.target.value})} />
        </div>

        <div className="field">
          <label>WhatsApp</label>
          <input type="text" className="p-input" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} />
        </div>

        <div className="field full">
          <label>Observação</label>
          <textarea className="p-input" placeholder="Alguma informação extra?" value={form.observacao} onChange={e => setForm({...form, observacao: e.target.value})} />
        </div>

        <div className="field full">
          <button type="submit" className="btn-submit">
            {form.id ? 'Atualizar Dados' : 'Salvar Registro'}
          </button>
          {form.id && (
            <button type="button" className="btn-cancel" onClick={onCancelarEdicao}>
              Cancelar Edição
            </button>
          )}
        </div>
      </form>
    </div>
  );
}