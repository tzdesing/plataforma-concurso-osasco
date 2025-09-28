# 🚀 Início Rápido - Plataforma de Estudos

## ⚡ Instalação Automática (Windows)

1. **Execute o script de setup:**
```bash
setup.bat
```

## 🔧 Instalação Manual

1. **Instalar dependências:**
```bash
npm install
npm install -D ts-node
```

2. **Iniciar serviços Docker:**
```bash
docker-compose up -d postgres redis minio
```

3. **Configurar banco:**
```bash
npx prisma db push
npx prisma db seed
```

4. **Iniciar aplicação:**
```bash
npm run dev
```

## 🌐 Acessos

- **Aplicação:** http://localhost:3000
- **Banco (Prisma Studio):** `npm run db:studio`
- **MinIO Console:** http://localhost:9003 (minioadmin/minioadmin123)
- **PostgreSQL:** localhost:5433
- **Redis:** localhost:6380

## 🎯 Funcionalidades Disponíveis

### ✅ Prontas para Uso
- **Dashboard** com contador para prova
- **Simulado Completo** (40 questões, 3h)
- **Simulado Rápido** (20 questões, 1h30)
- **Simulados por Disciplina**
- **Sistema de Correção** com explicações
- **Relatórios de Desempenho**

### 📚 Disciplinas
- **Língua Portuguesa** (10 questões)
- **Matemática** (10 questões)  
- **Conhecimentos Pedagógicos** (20 questões)

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor desenvolvimento
npm run build        # Build produção
npm run start        # Servidor produção

# Banco de dados
npm run db:push      # Aplicar schema
npm run db:studio    # Interface visual
npm run db:seed      # Popular dados

# Docker
docker-compose up -d    # Iniciar serviços
docker-compose down     # Parar serviços
docker-compose logs     # Ver logs
```

## 🐛 Solução de Problemas

### Erro de porta ocupada
```bash
# Verificar processos nas portas
netstat -ano | findstr :3000
netstat -ano | findstr :5433
netstat -ano | findstr :6380
netstat -ano | findstr :9002
# Matar processo se necessário
taskkill /PID <PID> /F
```

### Erro de conexão com banco
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps
# Reiniciar se necessário
docker-compose restart postgres
```

### Erro no Prisma
```bash
# Regenerar cliente
npx prisma generate
# Resetar banco (cuidado!)
npx prisma db push --force-reset
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se Docker está rodando
2. Confirme que as portas 3000, 5433, 6380, 9002, 9003 estão livres
3. Execute `docker-compose logs` para ver erros
4. Para limpar containers: `docker-compose down -v`

---

**Boa sorte nos estudos! 🍀**
