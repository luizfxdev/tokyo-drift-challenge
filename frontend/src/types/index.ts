/**
 * Interface para os dados de entrada da corrida
 * Representa os parâmetros configuráveis pelo usuário
 */
export interface RaceInput {
  /** Distância do percurso em quilômetros */
  distancia: number;

  /** Velocidade média do Mazda RX-7 em km/h */
  velocidadeDesafiante: number;

  /** Velocidade média do Nissan 350Z (DK) em km/h */
  velocidadeDK: number;

  /** Bônus de tempo por drift perfeito do Mazda em segundos */
  bonusDriftDesafiante: number;

  /** Bônus de tempo por drift perfeito do Nissan em segundos */
  bonusDriftDK: number;
}

/**
 * Interface para o resultado calculado da corrida
 * Contém todos os dados da corrida finalizada
 */
export interface RaceResult {
  /** Nome do vencedor da corrida */
  vencedor: string;

  /** Tempo do vencedor em minutos */
  tempoVencedor: number;

  /** Maior velocidade registrada entre os dois carros em km/h */
  velocidadeMaxima: number;

  /** Tempo total do Desafiante (Mazda RX-7) em minutos */
  tempoDesafiante: number;

  /** Tempo total do DK (Nissan 350Z) em minutos */
  tempoDK: number;

  /** Array de strings com o passo a passo do cálculo para exibição no terminal */
  detalhes: string[];
}

/**
 * Interface para requisição à API do backend
 * Espelha a estrutura esperada pelo Spring Boot
 */
export interface RaceRequest {
  distancia: number;
  velocidadeDesafiante: number;
  velocidadeDK: number;
  bonusDriftDesafiante: number;
  bonusDriftDK: number;
}

/**
 * Interface para resposta da API do backend
 * Espelha o Record ResultRace do Java
 */
export interface RaceResponse {
  vencedor: string;
  tempoVencedor: number;
  velocidadeMaxima: number;
  tempoDesafiante: number;
  tempoDK: number;
}

/**
 * Estados possíveis da aplicação
 */
export enum AppState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

/**
 * Interface para controle de áudio
 */
export interface AudioControl {
  isPlaying: boolean;
  volume: number;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
}

/**
 * Tipo para os campos do formulário
 */
export type RaceFormField = keyof RaceInput;

/**
 * Tipo para validação de erros no formulário
 */
export interface FormErrors {
  distancia?: string;
  velocidadeDesafiante?: string;
  velocidadeDK?: string;
  bonusDriftDesafiante?: string;
  bonusDriftDK?: string;
}
