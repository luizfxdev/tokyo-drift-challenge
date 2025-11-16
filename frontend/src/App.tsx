import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface RaceInput {
  distancia: string;
  velocidadeDesafiante: string;
  velocidadeDK: string;
  bonusDriftDesafiante: string;
  bonusDriftDK: string;
}

interface RaceResult {
  vencedor: string;
  tempoVencedor: number;
  velocidadeMaxima: number;
  tempoDesafiante: number;
  tempoDK: number;
  distancia: number;
  velocidadeDesafiante: number;
  velocidadeDK: number;
  bonusDriftDesafiante: number;
  bonusDriftDK: number;
  diferenca: number;
}

const TokyoDriftApp: React.FC = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [formData, setFormData] = useState<RaceInput>({
    distancia: '',
    velocidadeDesafiante: '',
    velocidadeDK: '',
    bonusDriftDesafiante: '',
    bonusDriftDK: ''
  });
  const [result, setResult] = useState<RaceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
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
      [name]: value
    }));
  };

  const calculateRace = () => {
    // Validação básica
    const distancia = parseFloat(formData.distancia);
    const velocidadeDesafiante = parseFloat(formData.velocidadeDesafiante);
    const velocidadeDK = parseFloat(formData.velocidadeDK);

    if (!distancia || !velocidadeDesafiante || !velocidadeDK) {
      alert('⚠️ Por favor, preencha pelo menos Distância e as Velocidades!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const bonusDriftDesafiante = parseFloat(formData.bonusDriftDesafiante) || 0;
      const bonusDriftDK = parseFloat(formData.bonusDriftDK) || 0;

      const tempoBaseDesafiante = (distancia / velocidadeDesafiante) * 60;
      const tempoBaseDK = (distancia / velocidadeDK) * 60;

      const tempoDesafiante = tempoBaseDesafiante - bonusDriftDesafiante;
      const tempoDK = tempoBaseDK - bonusDriftDK;

      const vencedor = tempoDesafiante < tempoDK ? 'Mazda RX-7' : 'Nissan 350Z';
      const tempoVencedor = Math.min(tempoDesafiante, tempoDK);
      const velocidadeMaxima = Math.max(velocidadeDesafiante, velocidadeDK);
      const diferenca = Math.abs(tempoDesafiante - tempoDK);

      setResult({
        vencedor,
        tempoVencedor,
        velocidadeMaxima,
        tempoDesafiante,
        tempoDK,
        distancia,
        velocidadeDesafiante,
        velocidadeDK,
        bonusDriftDesafiante,
        bonusDriftDK,
        diferenca
      });

      setShowResult(true);
      setLoading(false);
    }, 1200);
  };

  const handleReturn = () => {
    setShowResult(false);
    setTimeout(() => {
      setResult(null);
      setFormData({
        distancia: '',
        velocidadeDesafiante: '',
        velocidadeDK: '',
        bonusDriftDesafiante: '',
        bonusDriftDK: ''
      });
    }, 400);
  };

  return (
    <div className="app-container">
      <video ref={videoRef} autoPlay loop muted playsInline className="background-video">
        <source src="/src/assets/background.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop>
        <source src="/src/assets/theme.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleAudio}
        className="audio-control"
        aria-label={audioPlaying ? 'Pausar música' : 'Tocar música'}
      >
        <span>{audioPlaying ? '⏸️' : '🎵'}</span>
      </button>

      <div className="content-wrapper">
        <div className="race-container">
          {/* Header */}
          <div className="header-section">
            <h1 className="main-title">Tokyo Drift: Desafiando o DK</h1>
            <div className="title-underline"></div>
          </div>

          {/* Descrição */}
          <div className="description-section">
            <p className="description-text">
              No lendário circuito de <span className="highlight-neon">Neo-Tóquio</span>, você desafia o
              <span className="highlight-pink"> Drift King (DK)</span> para decidir quem é o verdadeiro rei do asfalto.
            </p>
            <p className="description-text">
              Você no volante do <span className="highlight-cyan">Mazda RX-7</span>, enfrentando o imponente
              <span className="highlight-green"> Nissan 350Z</span> do DK nas ruas iluminadas de Tóquio!
            </p>
          </div>

          {/* Formulário */}
          <div className="form-section">
            <div className="input-grid">
              <div className="input-wrapper">
                <label className="input-label">📏 Distância (km)</label>
                <input
                  type="number"
                  name="distancia"
                  value={formData.distancia}
                  onChange={handleInputChange}
                  placeholder="Ex: 5.0"
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label">⚡ Velocidade Mazda RX-7 (km/h)</label>
                <input
                  type="number"
                  name="velocidadeDesafiante"
                  value={formData.velocidadeDesafiante}
                  onChange={handleInputChange}
                  placeholder="Ex: 100"
                  className="input-field"
                  step="1"
                  min="0"
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label">⚡ Velocidade Nissan 350Z (km/h)</label>
                <input
                  type="number"
                  name="velocidadeDK"
                  value={formData.velocidadeDK}
                  onChange={handleInputChange}
                  placeholder="Ex: 95"
                  className="input-field"
                  step="1"
                  min="0"
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label">💨 Bônus Drift Mazda (seg)</label>
                <input
                  type="number"
                  name="bonusDriftDesafiante"
                  value={formData.bonusDriftDesafiante}
                  onChange={handleInputChange}
                  placeholder="Ex: 0.2"
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label">💨 Bônus Drift Nissan (seg)</label>
                <input
                  type="number"
                  name="bonusDriftDK"
                  value={formData.bonusDriftDK}
                  onChange={handleInputChange}
                  placeholder="Ex: 0.0"
                  className="input-field"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="buttons-section">
            <button className="action-btn calculate-btn" onClick={calculateRace} disabled={loading}>
              <span className="btn-text">{loading ? 'CALCULANDO...' : 'CALCULAR'}</span>
              <span className="btn-glow"></span>
            </button>

            <button className="action-btn return-btn" onClick={handleReturn}>
              <span className="btn-text">RETORNAR</span>
              <span className="btn-glow"></span>
            </button>
          </div>

          {/* Resultado */}
          {showResult && result && (
            <div ref={resultRef} className="results-section">
              <div className="results-header">
                <div className="results-icon">📊</div>
                <h2 className="results-title">Análise Completa da Corrida</h2>
              </div>

              {/* Parâmetros */}
              <div className="result-card params-card">
                <div className="card-header">
                  <span className="card-icon">⚙️</span>
                  <h3 className="card-title">Parâmetros</h3>
                </div>
                <div className="card-body">
                  <div className="info-line">
                    <span className="info-label">Distância do Percurso:</span>
                    <span className="info-value">{result.distancia} km</span>
                  </div>
                </div>
              </div>

              {/* Mazda RX-7 */}
              <div className="result-card mazda-card">
                <div className="card-header mazda-header">
                  <span className="card-icon">🏎️</span>
                  <h3 className="card-title">Mazda RX-7 (Desafiante)</h3>
                </div>
                <div className="card-body">
                  <div className="info-line">
                    <span className="info-label">Velocidade Média:</span>
                    <span className="info-value">{result.velocidadeDesafiante} km/h</span>
                  </div>
                  <div className="info-line">
                    <span className="info-label">Bônus de Drift:</span>
                    <span className="info-value">{result.bonusDriftDesafiante}s</span>
                  </div>
                  <div className="calculation-steps">
                    <div className="step">
                      <span className="step-number">1.</span>
                      <span className="step-text">
                        Tempo base: ({result.distancia} ÷ {result.velocidadeDesafiante}) × 60
                      </span>
                      <span className="step-result">
                        = {((result.distancia / result.velocidadeDesafiante) * 60).toFixed(3)} min
                      </span>
                    </div>
                    <div className="step">
                      <span className="step-number">2.</span>
                      <span className="step-text">
                        Aplicar bônus: {((result.distancia / result.velocidadeDesafiante) * 60).toFixed(3)} -{' '}
                        {result.bonusDriftDesafiante}
                      </span>
                      <span className="step-result">= {result.tempoDesafiante.toFixed(3)} min</span>
                    </div>
                  </div>
                  <div className="final-time mazda-time">
                    <span className="time-label">⏱️ Tempo Final:</span>
                    <span className="time-value">{result.tempoDesafiante.toFixed(3)} min</span>
                  </div>
                </div>
              </div>

              {/* Nissan 350Z */}
              <div className="result-card nissan-card">
                <div className="card-header nissan-header">
                  <span className="card-icon">🏎️</span>
                  <h3 className="card-title">Nissan 350Z (DK)</h3>
                </div>
                <div className="card-body">
                  <div className="info-line">
                    <span className="info-label">Velocidade Média:</span>
                    <span className="info-value">{result.velocidadeDK} km/h</span>
                  </div>
                  <div className="info-line">
                    <span className="info-label">Bônus de Drift:</span>
                    <span className="info-value">{result.bonusDriftDK}s</span>
                  </div>
                  <div className="calculation-steps">
                    <div className="step">
                      <span className="step-number">1.</span>
                      <span className="step-text">
                        Tempo base: ({result.distancia} ÷ {result.velocidadeDK}) × 60
                      </span>
                      <span className="step-result">
                        = {((result.distancia / result.velocidadeDK) * 60).toFixed(3)} min
                      </span>
                    </div>
                    <div className="step">
                      <span className="step-number">2.</span>
                      <span className="step-text">
                        Aplicar bônus: {((result.distancia / result.velocidadeDK) * 60).toFixed(3)} -{' '}
                        {result.bonusDriftDK}
                      </span>
                      <span className="step-result">= {result.tempoDK.toFixed(3)} min</span>
                    </div>
                  </div>
                  <div className="final-time nissan-time">
                    <span className="time-label">⏱️ Tempo Final:</span>
                    <span className="time-value">{result.tempoDK.toFixed(3)} min</span>
                  </div>
                </div>
              </div>

              {/* Comparação */}
              <div className="result-card comparison-card">
                <div className="card-header comparison-header">
                  <span className="card-icon">⚔️</span>
                  <h3 className="card-title">Comparação</h3>
                </div>
                <div className="card-body">
                  <div className="comparison-line">
                    <span className="comp-car mazda-text">Mazda RX-7:</span>
                    <span className="comp-time">{result.tempoDesafiante.toFixed(3)} min</span>
                  </div>
                  <div className="comparison-line">
                    <span className="comp-car nissan-text">Nissan 350Z:</span>
                    <span className="comp-time">{result.tempoDK.toFixed(3)} min</span>
                  </div>
                  <div className="comparison-line difference-line">
                    <span className="comp-car">Diferença:</span>
                    <span className="comp-diff">
                      {result.diferenca.toFixed(3)} min ({(result.diferenca * 60).toFixed(1)}s)
                    </span>
                  </div>
                </div>
              </div>

              {/* Vencedor DESTAQUE MÁXIMO */}
              <div className="winner-showcase">
                <div className="winner-trophy">🏆</div>
                <div className="winner-content">
                  <div className="winner-label">VENCEDOR</div>
                  <div className="winner-name">{result.vencedor}</div>
                  <div className="winner-stats">
                    <div className="stat-box">
                      <div className="stat-icon">⏱️</div>
                      <div className="stat-label">Tempo</div>
                      <div className="stat-value">{result.tempoVencedor.toFixed(3)} min</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-icon">🚀</div>
                      <div className="stat-label">Vel. Máx.</div>
                      <div className="stat-value">{result.velocidadeMaxima} km/h</div>
                    </div>
                  </div>
                </div>
                <div className="winner-flames">🔥🔥🔥</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokyoDriftApp;
