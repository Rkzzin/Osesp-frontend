import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowLeft, Smartphone } from 'lucide-react';

export default function MessageConfig() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [concert, setConcert] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('7d');

    const [form, setForm] = useState({
        msg7d: "",
        msg48h: "",
        msgFinal: "",
    });

    const tipoMap = { '7d': 'T-7', '48h': 'T-48', 'final': 'T-4' };

    useEffect(() => {
        async function loadData() {
            try {
                const [concertData, templatesData] = await Promise.all([
                    api.getConcertById(id),
                    api.getMessagesByConcert(id)
                ]);

                setConcert(concertData);
                setTemplates(templatesData);

                setForm({
                    msg7d: templatesData.find(t => t.tipo === 'T-7')?.conteudo || "",
                    msg48h: templatesData.find(t => t.tipo === 'T-48')?.conteudo || "",
                    msgFinal: templatesData.find(t => t.tipo === 'T-4')?.conteudo || "",
                });
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    const getActiveMsg = () => {
        if (activeTab === '7d') return form.msg7d;
        if (activeTab === '48h') return form.msg48h;
        return form.msgFinal;
    };

    const handleSave = async () => {
        const currentTipo = tipoMap[activeTab];
        const templateNoBanco = templates.find(t => t.tipo === currentTipo);

        if (!templateNoBanco) {
            alert("Erro: Template não encontrado no banco para este concerto.");
            return;
        }

        try {
            const novoConteudo = getActiveMsg();
            await api.updateTemplate(templateNoBanco.id, {
                concerto_id: parseInt(id),
                tipo: currentTipo,
                conteudo: novoConteudo
            });
            alert("∮ Configuração salva com sucesso!");
        } catch (error) {
            alert("Erro ao salvar no servidor.");
        }
    };

    if (loading) return <div className="p-20 font-serif text-osesp-brown italic">Sincronizando com a Temporada...</div>;
    if (!concert) return <div className="p-20 font-serif text-osesp-brown">Evento não encontrado.</div>;

    return (
        <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-700">
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
                            {concert.nome}
                        </h2>
                        <div className="h-1 w-24 bg-osesp-gold mb-2"></div>
                        <p className="text-osesp-brown/40 text-xs font-bold uppercase tracking-[0.2em]">
                            {concert.local} • {new Date(concert.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                        </p>
                    </div>

                    <nav className="flex gap-1 border-b border-osesp-brown/10">
                        {['7d', '48h', 'final'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 font-serif font-bold text-sm transition-all relative ${activeTab === tab ? 'text-osesp-brown' : 'text-osesp-brown/30 hover:text-osesp-brown'}`}
                            >
                                {tab === '7d' ? '7 Dias' : tab === '48h' ? '48 Horas' : 'Última Chamada'}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-osesp-gold animate-in fade-in zoom-in duration-300"></div>}
                            </button>
                        ))}
                    </nav>

                    <div className="space-y-4">
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

                    <button onClick={handleSave} className="w-full bg-osesp-brown text-osesp-gold py-6 font-serif font-black text-lg hover:tracking-[0.1em] transition-all duration-500 uppercase tracking-widest shadow-xl">
                        Confirmar Alterações ∮
                    </button>
                </div>

                {/* COLUNA DA DIREITA: PREVIEW WHATSAPP */}
                <div className="lg:col-span-5 flex flex-col items-center sticky top-32">
                    <div className="w-[320px] h-[640px] bg-osesp-brown rounded-[3rem] p-3 shadow-2xl border-4 border-osesp-brown relative">
                        <div className="w-32 h-6 bg-osesp-brown absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>

                        <div className="w-full h-full bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden flex flex-col relative">
                            {/* Header do WhatsApp */}
                            <div className="bg-[#075E54] pt-10 pb-3 px-4 flex items-center gap-3 shadow-md text-white">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                                    <span className="text-[7px] text-osesp-brown font-bold uppercase">OSESP</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-bold">OSESP - Oficial</p>
                                    <p className="text-white/70 text-[9px]">online</p>
                                </div>
                            </div>

                            {/* Área de Chat */}
                            <div className="flex-1 p-4 overflow-y-auto flex flex-col">
                                <div className="self-center bg-[#D1E4F3] text-[9px] text-slate-600 px-3 py-1 rounded-lg mb-6 shadow-sm uppercase font-bold tracking-tighter text-center">Hoje</div>

                                {/* Balão de Mensagem */}
                                <div className="relative max-w-[85%] bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm text-sm self-start mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
                                    <p className="text-slate-800 leading-relaxed font-sans text-[13px] whitespace-pre-wrap">
                                        {getActiveMsg() || "Aguardando conteúdo..."}
                                    </p>
                                    <div className="flex justify-end items-center gap-1 mt-1">
                                        <span className="text-[9px] text-slate-400 font-sans">14:20</span>
                                    </div>
                                </div>

                                {/* Botões de resposta */}
                                <div className="flex flex-col gap-2 w-[85%] self-start animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl text-[11px] font-bold text-[#00a884] uppercase tracking-tight text-center shadow-sm">
                                        Confirmar Presença
                                    </div>
                                    <div className="bg-white border border-slate-100 p-2.5 rounded-xl text-[11px] font-bold text-rose-500 uppercase tracking-tight text-center shadow-sm">
                                        Não irei
                                    </div>
                                </div>
                            </div>

                            {/* Input do WhatsApp */}
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