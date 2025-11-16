# 🏁 Tokyo Drift Challenge - Desafiando o DK

![Tokyo Drift](https://img.shields.io/badge/Tokyo-Drift-00ffff?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-green?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)

## 📖 Sobre o Projeto

Aplicação full-stack que simula uma corrida épica entre o **Mazda RX-7** e o **Nissan 350Z** nas ruas de Neo-Tóquio, aplicando todos os conceitos fundamentais de **Programação Orientada a Objetos (POO)** em Java.

### 🎯 Objetivo

Demonstrar domínio completo dos pilares da POO através de um sistema de corrida interativo, combinando:
- Backend robusto em Java/Spring Boot
- Frontend moderno em React/TypeScript
- Design imersivo inspirado no universo Tokyo Drift

---

## 🧠 Lógica e Arquitetura do Sistema

### 📐 Modelagem Orientada a Objetos

#### 1. **Abstração** - Classe `Car`
```java
public abstract class Car implements Driftavel
```
- Define a estrutura base de qualquer veículo de corrida
- Atributos essenciais: modelo, piloto, velocidade máxima
- Método abstrato `calcularTempo()` obriga implementação específica

**Decisão técnica:** Classe abstrata permite compartilhar código comum (getters/setters) enquanto força especialização do cálculo de tempo.

#### 2. **Herança** - Hierarquia de Classes
```
Car (abstract)
├── MazdaRX7
└── Nissan350Z
```
- Cada modelo herda características base e implementa comportamento específico
- Reutilização de código sem duplicação
- Facilita adição de novos modelos no futuro

#### 3. **Polimorfismo** - Interface `Driftavel`
```java
public interface Driftavel {
    double realizarDrift();
    String getTipoDrift();
}
```
- Contrato que garante capacidade de drift
- Permite tratar diferentes carros de forma uniforme
- Cada implementação define seu próprio bônus de drift

**Exemplo prático:**
```java
Car mazda = new MazdaRX7(...);  // Polimorfismo de referência
double tempo = mazda.calcularTempo(...);  // Método específico do Mazda
```

#### 4. **Encapsulamento** - Proteção de Dados
- Atributos `private` com acesso controlado via getters/setters
- Validações no construtor do Record `ResultRace`
- Separação clara de responsabilidades entre camadas

#### 5. **Records** - Imutabilidade e DTOs
```java
public record ResultRace(...)
public record RaceRequest(...)
```
- Objetos imutáveis para transferência de dados
- Geração automática de equals, hashCode, toString
- Segurança contra mutações acidentais

---

### ⚙️ Algoritmo de Cálculo da Corrida

#### Fórmula Base
```
Tempo (minutos) = (Distância / Velocidade) × 60 - Bônus Drift
```

#### Fluxo de Processamento
```
1. INPUT: Recebe parâmetros da corrida
   ↓
2. INSTANCIAÇÃO: Cria objetos MazdaRX7 e Nissan350Z
   ↓
3. CÁLCULO: Aplica fórmula para cada veículo
   ↓
4. COMPARAÇÃO: Identifica o menor tempo (vencedor)
   ↓
5. AGREGAÇÃO: Compila estatísticas da corrida
   ↓
6. OUTPUT: Retorna ResultRace com todos os dados
```

#### Exemplo Numérico

**Entrada:**
- Distância: 5 km
- Velocidade Mazda: 100 km/h
- Velocidade Nissan: 95 km/h
- Bônus Drift Mazda: 0.2s
- Bônus Drift Nissan: 0.0s

**Cálculo:**
```
Tempo Mazda = (5 / 100) × 60 - 0.2 = 3.0 - 0.2 = 2.8 min
Tempo Nissan = (5 / 95) × 60 - 0.0 = 3.16 min

Vencedor: Mazda RX-7 (2.8 min < 3.16 min)
Diferença: 0.36 min (21.6 segundos)
```

---

### 🏗️ Arquitetura em Camadas
```
┌─────────────────────────────────────┐
│        Frontend (React/TS)          │
│  - Interface do usuário             │
│  - Validações client-side           │
│  - Animações e feedback visual      │
└─────────────────┬───────────────────┘
                  │ HTTP POST
                  │ /api/race/calculate
┌─────────────────▼───────────────────┐
│    Controller Layer (Spring)        │
│  - RaceController                   │
│  - Recebe requisições HTTP          │
│  - Valida entrada                   │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     Service Layer (Business)        │
│  - RacingService                    │
│  - Lógica de negócio POO            │
│  - Cálculos de corrida              │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│      Model Layer (Domain)           │
│  - Car, MazdaRX7, Nissan350Z        │
│  - Driftavel, ResultRace            │
│  - Entidades de domínio             │
└─────────────────────────────────────┘
```

**Vantagens da arquitetura:**
- **Separação de responsabilidades:** Cada camada tem função específica
- **Testabilidade:** Camadas isoladas facilitam testes unitários
- **Manutenibilidade:** Mudanças em uma camada não afetam outras
- **Escalabilidade:** Fácil adicionar novas funcionalidades

---

### 🔄 Princípios SOLID Aplicados

| Princípio | Implementação | Benefício |
|-----------|---------------|-----------|
| **S**RP | Cada classe tem uma única responsabilidade | Código coeso e focado |
| **O**CP | Interface Driftavel permite extensão sem modificação | Facilita adição de novos carros |
| **L**SP | MazdaRX7 e Nissan350Z substituem Car perfeitamente | Polimorfismo seguro |
| **I**SP | Interface Driftavel contém apenas métodos essenciais | Sem dependências desnecessárias |
| **D**IP | Controller depende de Service (abstração), não implementação | Desacoplamento |

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 17** - Linguagem base com recursos modernos (Records)
- **Spring Boot 3.2.0** - Framework para APIs REST
- **Maven** - Gerenciamento de dependências
- **Jackson** - Serialização JSON automática

### Frontend
- **React 18.2** - Biblioteca UI com Hooks
- **TypeScript 5.2** - Tipagem estática para JavaScript
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Axios** - Cliente HTTP para requisições

---

## 📦 Instalação e Execução

### Pré-requisitos
```bash
# Java JDK 17+
java -version

# Node.js 18+ e npm
node --version
npm --version

# Maven (ou use o wrapper mvnw)
mvn --version
```

### Instalação Backend
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
# Servidor rodando em http://localhost:8080
```

### Instalação Frontend
```bash
cd frontend
npm install
npm run dev
# Aplicação rodando em http://localhost:3000
```

### Execução Simultânea (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

### Execução Simultânea (Windows)
```bash
start.bat
```

---

## 📡 API Endpoints

### POST `/api/race/calculate`

**Request Body:**
```json
{
  "distancia": 5.0,
  "velocidadeDesafiante": 100,
  "velocidadeDK": 95,
  "bonusDriftDesafiante": 0.2,
  "bonusDriftDK": 0.0
}
```

**Response:**
```json
{
  "vencedor": "Desafiante (Mazda RX-7)",
  "tempoVencedor": 2.8,
  "velocidadeMaxima": 100.0,
  "tempoDesafiante": 2.8,
  "tempoDK": 3.16
}
```

---

## 🎨 Features do Frontend

- ✅ Background em vídeo full-screen
- ✅ Controle de áudio com tema Tokyo Drift
- ✅ Formulário com validação em tempo real
- ✅ Animações com efeito glitch nos botões
- ✅ Terminal animado para exibição de resultados
- ✅ Design responsivo (mobile-first)
- ✅ Container com glassmorphism e efeito neon

---

## 📚 Conceitos Avançados Demonstrados

### Java/POO
- Classes abstratas vs Interfaces
- Records (Java 14+)
- Herança e composição
- Injeção de dependência (@Autowired)
- REST Controllers (@RestController)
- Cross-Origin Resource Sharing (CORS)

### TypeScript/React
- Hooks (useState, useRef, useEffect)
- Tipagem estática forte
- Componentes funcionais
- Event handling
- Conditional rendering
- CSS-in-JS com styled components

---

## 🧪 Testando a Aplicação

### Caso de Teste 1: Mazda Vence
```
Distância: 5 km
Vel. Mazda: 100 km/h
Vel. Nissan: 95 km/h
Drift Mazda: 0.2s
Drift Nissan: 0s

Resultado: Mazda RX-7 vence por 0.36 min
```

### Caso de Teste 2: Empate Técnico
```
Distância: 10 km
Vel. Mazda: 120 km/h
Vel. Nissan: 120 km/h
Drift Mazda: 0s
Drift Nissan: 0s

Resultado: Empate perfeito (5 min)
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Luiz FX** - [GitHub](https://github.com/luizfxdev)

---

## 🙏 Agradecimentos

- Inspirado no universo Tokyo Drift
- Comunidade Spring Boot
- Comunidade React
- Todos os contribuidores open-source

---

**⭐ Se este projeto te ajudou, considere deixar uma estrela!**

🏁 *Que vença o melhor piloto!* 🔥
