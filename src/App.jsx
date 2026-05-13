import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EventList from './pages/EventList';
import MessageConfig from './pages/MessageConfig';

function App() {
  return (
    <BrowserRouter>
      {/* Fundo creme */}
      <div className="min-h-screen bg-[#FDFCF2] text-slate-900 font-sans relative">
        {/* Padrões geométricos ocre */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url(/path/to/ocre_pattern.svg)' }}></div>

        {/* Header madeira escura */}
        <header className="bg-[#483321] border-b border-[#D4AF37]/50 py-4 px-6 sticky top-0 z-20 shadow-xl relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center z-10 relative">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-serif font-black text-[#D4AF37] tracking-tight">OSESP</h1>
              <span className="font-serif text-sm font-medium text-[#D4AF37]/70 leading-tight">Orquestra Sinfônica<br />do Estado de São Paulo</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-12 relative z-10">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/config/:id" element={<MessageConfig />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;