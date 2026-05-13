import { Link } from 'react-router-dom';
import { mockEvents } from '../data';
import { Calendar, MapPin, Users, Music } from 'lucide-react';

export default function EventList() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <header className="mb-16">
        <h2 className="text-6xl font-serif font-light text-osesp-brown italic leading-none">
          Eventos <span className="font-sans font-black text-sm not-italic tracking-[0.3em] text-osesp-gold uppercase ml-4">Temporada 2026</span>
        </h2>
      </header>

      {/* Tabela Editorial */}
      <div className="w-full border-t border-osesp-brown/20">
        {mockEvents.map((event) => (
          <div 
            key={event.id} 
            className="group grid grid-cols-11 items-center py-10 border-b border-osesp-brown/10 hover:bg-white transition-all duration-500 px-4"
          >
            {/* Informações Principais */}
            <div className="col-span-6 space-y-1">
              <h3 className="text-3xl font-serif font-semibold text-osesp-brown tracking-tight">
                {event.name}
              </h3>
              <div className="flex items-center gap-6 text-xs font-bold text-osesp-brown/40 uppercase tracking-widest">
                <span className="flex items-center gap-2"><MapPin size={12}/> {event.location}</span>
                <span className="flex items-center gap-2"><Users size={12}/> {event.customersCount} inscritos</span>
              </div>
            </div>

            {/* Data */}
            <div className="col-span-3 text-center">
              <span className="font-serif italic text-2xl text-osesp-brown/60 group-hover:text-osesp-brown transition-colors">
                {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
              </span>
            </div>

            {/* Ação */}
            <div className="col-span-2 flex justify-end">
              <Link 
                to={`/config/${event.id}`}
                className="border border-osesp-brown text-osesp-brown px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-osesp-brown hover:text-osesp-gold transition-all duration-300"
              >
                Configurar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}