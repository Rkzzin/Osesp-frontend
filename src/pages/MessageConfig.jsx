import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mockEvents } from '../data';
import { ArrowLeft, Save, Smartphone } from 'lucide-react';

export default function MessageConfig() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = mockEvents.find(e => e.id === id);
    const [activeTab, setActiveTab] = useState('7d');

    const [form, setForm] = useState({
        msg7d: `Olá! Falta 1 semana para ${event?.name}. Prepare seu traje e nos vemos na Sala São Paulo!`,
        msg48h: "O grande dia está chegando! Faltam 48h para o nosso encontro. Já conferiu seu assento?",
        msgFinal: "É hoje! O espetáculo começa em breve. Confirme sua presença ou nos avise caso tenha imprevistos.",
    });

    const getActiveMsg = () => {
        if (activeTab === '7d') return form.msg7d;
        if (activeTab === '48h') return form.msg48h;
        return form.msgFinal;
    };

    if (!event) return <div className="p-20 font-serif text-osesp-brown">Evento não encontrado.</div>;

    return (
        <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-700">
            {/* Botão voltar */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-osesp-brown/40 hover:text-osesp-gold mb-12 font-bold uppercase text-[10px] tracking-[0.3em] transition-all group"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Programação
            </button>

            <div className="grid lg:grid-cols-12 gap-16 items-start">

                {/* COLUNA DA ESQUERDA: EDITOR */}
                <div className="lg:col-span-7 space-y-12">
                    <div>
                        <h2 className="text-6xl font-serif font-black text-osesp-brown mb-4 italic tracking-tight leading-none">
                            {event.name}
                        </h2>
                        <div className="h-1 w-24 bg-osesp-gold mb-2"></div>
                        <p className="text-osesp-brown/40 text-xs font-bold uppercase tracking-[0.2em]">Configuração de Notificações</p>
                    </div>

                    {/* Navegação por Abas Editoriais */}
                    <nav className="flex gap-1 border-b border-osesp-brown/10">
                        {['7d', '48h', 'final'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 font-serif font-bold text-sm transition-all relative ${activeTab === tab
                                    ? 'text-osesp-brown'
                                    : 'text-osesp-brown/30 hover:text-osesp-brown'
                                    }`}
                            >
                                {tab === '7d' ? '7 Dias' : tab === '48h' ? '48 Horas' : 'Última Chamada'}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-osesp-gold animate-in fade-in zoom-in duration-300"></div>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Área do Editor */}
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-osesp-brown/40">Conteúdo da Notificação</label>
                        <textarea
                            className="w-full bg-white border border-osesp-brown/10 p-8 rounded-none focus:border-osesp-gold outline-none transition-all font-serif text-xl text-osesp-brown italic leading-relaxed shadow-sm"
                            rows="6"
                            value={getActiveMsg()}
                            onChange={e => {
                                const key = activeTab === '7d' ? 'msg7d' : activeTab === '48h' ? 'msg48h' : 'msgFinal';
                                setForm({ ...form, [key]: e.target.value });
                            }}
                        />
                    </div>

                    <button
                        onClick={() => {
                            console.log("Salvo:", form);
                            alert('Configurações salvas com sucesso!');
                        }}
                        className="w-full bg-osesp-brown text-osesp-gold py-6 font-serif font-black text-lg hover:tracking-[0.1em] transition-all duration-500 uppercase tracking-widest shadow-xl active:scale-[0.99]"
                    >
                        Confirmar Alterações ∮
                    </button>
                </div>

                {/* COLUNA DA DIREITA: PREVIEW WHATSAPP */}
                <div className="lg:col-span-5 flex flex-col items-center sticky top-32">
                    <div className="w-[320px] h-[640px] bg-osesp-brown rounded-[3rem] p-3 shadow-2xl border-4 border-osesp-brown relative">
                        {/* Notch do Celular */}
                        <div className="w-32 h-6 bg-osesp-brown absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>

                        {/* Tela do WhatsApp */}
                        <div className="w-full h-full bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden flex flex-col relative">

                            {/* Header do WhatsApp */}
                            <div className="bg-[#075E54] pt-10 pb-3 px-4 flex items-center gap-3 shadow-md">
                                <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/20">
                                    <span className="font-display text-[7px] text-osesp-brown font-bold">OSESP</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white text-[11px] font-bold">OSESP - Oficial</p>
                                    <p className="text-white/70 text-[9px]">online</p>
                                </div>
                                <div className="flex gap-3 text-white/90">
                                    <div className="w-3 h-3 border-2 border-current rounded-full opacity-30"></div>
                                    <div className="w-3 h-3 bg-current rounded-sm opacity-30"></div>
                                </div>
                            </div>

                            {/* Área de Chat */}
                            <div className="flex-1 p-4 flex flex-col justify-start overflow-y-auto">
                                <div className="self-center bg-[#D1E4F3] text-[9px] text-slate-600 px-3 py-1 rounded-lg mb-6 shadow-sm uppercase font-bold tracking-tighter">
                                    Hoje
                                </div>

                                {/* Balão de Mensagem (Recebida) */}
                                <div className="relative max-w-[85%] bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm text-sm self-start mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                    {/* A "setinha" do balão */}
                                    <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>

                                    <p className="text-slate-800 leading-relaxed font-sans text-[13px]">
                                        {getActiveMsg()}
                                    </p>

                                    <div className="flex justify-end items-center gap-1 mt-1">
                                        <span className="text-[9px] text-slate-400 font-sans">14:20</span>
                                    </div>
                                </div>

                                {/* Botões Simulados */}
                                <div className="flex flex-col gap-2 w-[85%] self-start animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl text-[11px] font-bold text-[#00a884] uppercase tracking-tight text-center shadow-sm">
                                        Confirmar Presença
                                    </div>
                                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl text-[11px] font-bold text-rose-500 uppercase tracking-tight text-center shadow-sm">
                                        Não irei
                                    </div>
                                </div>
                            </div>

                            {/* Input do WhatsApp (Rodapé) */}
                            <div className="bg-slate-100 p-3 flex items-center gap-2">
                                <div className="flex-1 bg-white h-8 rounded-full border border-slate-200"></div>
                                <div className="w-8 h-8 bg-[#075E54] rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rotate-45 -ml-0.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-osesp-brown/30 text-[10px] uppercase font-black tracking-[0.2em] flex items-center gap-2">
                        <Smartphone size={12} /> Interface de Recebimento
                    </p>
                </div>
            </div>
        </div>
    );
}