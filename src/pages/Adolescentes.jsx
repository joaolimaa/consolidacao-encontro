import React, { useState, useEffect } from 'react';
import FichaForm from '../components/FichaForm';
import FichaList from '../components/FichaList';
import ModalExcluir from '../components/ModalExcluir';
import Toast from '../components/Toast';

const URL_API = "https://script.google.com/macros/s/AKfycbyI_83oU1Iff4jJ1kb5cikLOuutoIpkdyOVN8-b3u8G5heur73SepFXNmixhey4NGsx/exec";
const ABA = 'ADOLESCENTES';
const DISCIPULADORES = ["Leonardo", "Lucas", "Kayury"];

export default function Adolescentes() {
  const [registros, setRegistros] = useState([]);
  const [emEdicao, setEmEdicao] = useState(null);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch(URL_API + "?aba=" + ABA)
      .then(res => res.json())
      .then(data => setRegistros(data))
      .catch(err => console.error(err));
  }, []);

  const handleSalvarFicha = (dados) => {
    const isEdit = !!emEdicao;
    const tempId = isEdit ? emEdicao.id : Date.now();
    const payload = { id: isEdit ? emEdicao.id : null, ...dados };
    
    // Atualização otimista na UI
    if (isEdit) {
       setRegistros(registros.map(r => r.id === tempId ? { ...dados, id: tempId } : r));
    } else {
       setRegistros([...registros, { ...dados, id: tempId }]);
    }
    
    setToast({ message: isEdit ? 'Atualizado!' : 'Salvo!', type: 'success' });
    setEmEdicao(null);

    // Salva em background na planilha
    fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'salvar', aba: ABA, payload })
    })
    .catch(() => setToast({ message: 'Erro ao salvar na planilha', type: 'error' }));
  };

  const handleConfirmarExclusao = () => {
    const idExcluir = idParaExcluir;
    
    // Atualização otimista na UI
    setRegistros(registros.filter(r => r.id !== idExcluir));
    setToast({ message: 'Registro excluido!', type: 'success' });
    setIdParaExcluir(null);

    // Exclui em background na planilha
    fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'excluir', aba: ABA, id: idExcluir })
    })
    .catch(() => setToast({ message: 'Erro ao excluir na planilha', type: 'error' }));
  };

  return (
    <>
      <header>
        <img src="/logo-siao.svg" alt="Logo Sião" style={{ height: '60px', marginBottom: '8px' }} />
        <div className="church-name">Igreja Videira</div>
        <h1>Encontro com <em>Deus</em></h1>
        <div className="subtitle">Ficha de Consolidação · Adolescentes</div>
        <div className="header-divider"></div>
      </header>

      <FichaForm 
        onAdicionar={handleSalvarFicha} 
        emEdicao={emEdicao} 
        onCancelarEdicao={() => setEmEdicao(null)} 
        discipuladores={DISCIPULADORES}
      />
      
      <FichaList 
        registros={registros} 
        onEdit={setEmEdicao} 
        onDelete={setIdParaExcluir} 
      />

      <ModalExcluir 
        isOpen={idParaExcluir !== null} 
        onConfirm={handleConfirmarExclusao} 
        onCancel={() => setIdParaExcluir(null)} 
      />

      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      )}
    </>
  );
}