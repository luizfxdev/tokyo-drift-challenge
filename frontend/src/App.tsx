import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface RaceInput {
  distancia: number;
  velocidadeDesafiante: number;
  velocidadeDK: number;
  bonusDriftDesafiante: number;
  bonusDriftDK: number;
}

interface RaceResult {
  vencedor: string;
  tempoVencedor: number;
  velocidadeMaxima: number;
  tempoDesafiante: number;
  tempoDK: number;
  detalhes: string[];
}

const TokyoDriftApp: React.FC = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [formData, setFormData] = useState<RaceInput>({
    distancia: 0,
    velocidadeDesafiante: 0,
    velocidadeDK: 0,
    bonusDriftDesafiante: 0,
    bonusDriftDK: 0
  });
  const [result, setResult] = useState<RaceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showResult]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateRace = () => {
    setLoading(true);

    setTimeout(() => {
      const { distancia, velocidadeDesafiante, velocidadeDK, bonusDriftDesafiante, bonusDriftDK } = formData;

      const tempoDesafiante = (distancia / velocidadeDesafiante) * 60 - bonusDriftDesafiante;
      const tempoDK = (distancia / velocidadeDK) * 60 - bonusDriftDK;

      const vencedor = tempoDesafiante < tempoDK ? 'Desafiante (Mazda RX-7)' : 'DK (Nissan 350Z)';
      const tempoVencedor = Math.min(tempoDesafiante, tempoDK);
      const velocidadeMaxima = Math.max(velocidadeDesafiante, velocidadeDK);

      const detalhes = [
        `> Iniciando cálculo da corrida...`,
        `> Distância do percurso: ${distancia} km`,
        ``,
        `> MAZDA RX-7 (Desafiante):`,
        `  - Velocidade média: ${velocidadeDesafiante} km/h`,
        `  - Bônus drift: ${bonusDriftDesafiante}s`,
        `  - Tempo base: ${((distancia / velocidadeDesafiante) * 60).toFixed(2)} min`,
        `  - Tempo final: ${tempoDesafiante.toFixed(2)} min`,
        ``,
        `> NISSAN 350Z (DK):`,
        `  - Velocidade média: ${velocidadeDK} km/h`,
        `  - Bônus drift: ${bonusDriftDK}s`,
        `  - Tempo base: ${((distancia / velocidadeDK) * 60).toFixed(2)} min`,
        `  - Tempo final: ${tempoDK.toFixed(2)} min`,
        ``,
        `> Comparando resultados...`,
        `> Diferença: ${Math.abs(tempoDesafiante - tempoDK).toFixed(2)} min`,
        ``
      ];

      setResult({
        vencedor,
        tempoVencedor,
        velocidadeMaxima,
        tempoDesafiante,
        tempoDK,
        detalhes
      });

      setShowResult(true);
      setLoading(false);
    }, 1000);
  };

  const handleReturn = () => {
    setShowResult(false);
    setTimeout(() => {
      setResult(null);
      setFormData({
        distancia: 0,
        velocidadeDesafiante: 0,
        velocidadeDK: 0,
        bonusDriftDesafiante: 0,
        bonusDriftDK: 0
      });
    }, 300);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      >
        <source src="/src/assets/background.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop>
        <source src="/src/assets/theme.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleAudio}
          className="audio-btn"
          aria-label={audioPlaying ? 'Pausar música' : 'Tocar música'}
        >
          <span className="text-3xl">{audioPlaying ? '⏸️' : '🎵'}</span>
        </button>
      </div>

      <div className="container-wrapper">
        <div className="race-container">
          <div className="header-section">
            <h1 className="title-main">Tokyo Drift:Desafiando o DK </h1>
          </div>

          <div className="description-section">
            <p className="description-text">
              No lendário circuito de Neo-Tóquio, você desafia o <span className="highlight">Drift King (DK)</span> para
              decidir quem é o verdadeiro rei do asfalto. Você no volante do{' '}
              <span className="highlight-blue">Mazda RX-7</span>, enfrentando o imponente{' '}
              <span className="highlight-green">Nissan 350Z</span> do DK.
            </p>
            <p className="description-text mt-3">
              Configure os parâmetros da corrida e descubra quem conquistará a vitória nas ruas iluminadas de Tóquio!
            </p>
          </div>

          <div className="form-section">
            <div className="input-grid">
              <div className="input-group">
                <label className="input-label">Distância (km)</label>
                <input
                  type="number"
                  name="distancia"
                  value={formData.distancia || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: 5.0"
                  className="input-field"
                  step="0.1"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Velocidade Mazda RX-7 (km/h)</label>
                <input
                  type="number"
                  name="velocidadeDesafiante"
                  value={formData.velocidadeDesafiante || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: 100"
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Velocidade Nissan 350Z (km/h)</label>
                <input
                  type="number"
                  name="velocidadeDK"
                  value={formData.velocidadeDK || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: 95"
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Bônus Drift Mazda (seg)</label>
                <input
                  type="number"
                  name="bonusDriftDesafiante"
                  value={formData.bonusDriftDesafiante || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: 0.2"
                  className="input-field"
                  step="0.1"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Bônus Drift Nissan (seg)</label>
                <input
                  type="number"
                  name="bonusDriftDK"
                  value={formData.bonusDriftDK || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: 0.0"
                  className="input-field"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <div className="button-section">
            <button className="btn glitch btn-calculate" onClick={calculateRace} disabled={loading}>
              <span>{loading ? 'CALCULANDO...' : 'CALCULAR'}</span>
            </button>

            <button className="btn glitch btn-return" onClick={handleReturn}>
              <span>RETORNAR</span>
            </button>
          </div>

          {showResult && result && (
            <div ref={resultRef} className={`result-section ${showResult ? 'result-show' : ''}`}>
              <h3 className="result-title">📊 RESULTADO DA CORRIDA</h3>

              <div className="terminal">
                {result.detalhes.map((linha, index) => (
                  <div key={index} className="terminal-line" style={{ animationDelay: `${index * 0.1}s` }}>
                    {linha}
                  </div>
                ))}

                <div className="terminal-final" style={{ animationDelay: `${result.detalhes.length * 0.1}s` }}>
                  <div className="final-winner">🏆 VENCEDOR: {result.vencedor}</div>
                  <div className="final-stats">
                    ⏱️ Tempo: {result.tempoVencedor.toFixed(2)} min | 🚀 Velocidade Máxima: {result.velocidadeMaxima}{' '}
                    km/h
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokyoDriftApp;
