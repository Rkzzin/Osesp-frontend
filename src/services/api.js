const API_URL = "http://localhost:8000";

export const api = {
  getConcerts: () => fetch(`${API_URL}/concert/`).then(res => res.json()),
  
  getConcertById: (id) => fetch(`${API_URL}/concert/${id}`).then(res => res.json()),
  
  getMessagesByConcert: (id) => fetch(`${API_URL}/template/concert/${id}`).then(res => res.json()),
  
  updateTemplate: async (templateId, concertId, tipo, conteudo) => {
    const response = await fetch(`${API_URL}/template/${templateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concerto_id: concertId, tipo: tipo, conteudo: conteudo })
    });
    return response.json();
  }
};