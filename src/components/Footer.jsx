export default function Footer() {
  return (
    <footer style={{ 
      borderTop: '4px solid #000000', 
      background: '#EAEAEA', 
      padding: '24px', 
      textAlign: 'center',
      fontFamily: 'monospace',
      fontSize: '10px',
      fontWeight: 'bold',
      color: '#555555',
      lineHeight: '1.6'
    }}>
      <p style={{ margin: '0 0 8px 0', textTransform: 'uppercase' }}>
        // PT: Este projeto é estritamente para fins educacionais e de demonstração de portfólio. Não tem qualquer fim comercial. Todos os direitos de áudio e imagem pertencem aos respetivos artistas, autores e editoras.
      </p>
      <p style={{ margin: 0, textTransform: 'uppercase' }}>
        // EN: This project is strictly for educational and portfolio demonstration purposes. No commercial use intended. All audio and image rights belong to their respective artists, authors, and record labels.
      </p>
    </footer>
  );
}