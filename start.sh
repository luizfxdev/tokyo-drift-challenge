#!/bin/bash

echo "�� Tokyo Drift Challenge - Iniciando aplicação..."
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Matar TUDO que está usando as portas
echo -e "${YELLOW}🛑 Limpando portas 8080 e 5173...${NC}"
lsof -ti:8080 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
sleep 3

echo -e "${GREEN}🚀 Iniciando Backend (Spring Boot) na porta 8080...${NC}"
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..
sleep 5

echo -e "${GREEN}🎨 Iniciando Frontend (Vite) na porta 5173...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✅ Aplicação iniciada com sucesso!${NC}"
echo ""
echo "🔗 Backend:  http://localhost:8080"
echo "🔗 Frontend: http://localhost:5173"
echo ""
echo "⚠️  Para parar, pressione CTRL+C"
echo ""

wait
