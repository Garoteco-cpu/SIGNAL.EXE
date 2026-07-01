import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/stream', async (req, res) => {
  const videoId = req.query.id;
  
  if (!videoId) {
    return res.status(400).json({ error: 'Falta o ID do vídeo' });
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  console.log(`📡 ROTA COBALT: A processar fluxo de áudio para o ID: ${videoId}`);

  try {
    // Pedido à API do Cobalt para obter o link de áudio puro processado na nuvem
    const cobaltResponse = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: youtubeUrl,
        audioMode: true,      // Queremos apenas o som
        audioFormat: 'mp3',   // Força formato nativo universal
        downloadMode: false   // Modo Stream ativo
      })
    });

    const data = await cobaltResponse.json();

    if (data.status === 'stream' || data.status === 'picker' || data.url) {
      const audioUrl = data.url;
      console.log(`🔗 Link de áudio gerado com sucesso! Redirecionando...`);
      
      // Faz um redirecionamento HTTP direto para o stream puro que o HTML5 adora
      return res.redirect(audioUrl);
    } else {
      console.error('Cobalt recusou o processamento:', data);
      return res.status(500).json({ error: 'Erro ao gerar o link na nuvem' });
    }

  } catch (error) {
    console.error('Erro de conexão com o motor de áudio:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`📡 ENGINE EXTERNO ATIVO: http://localhost:${PORT}`);
});