# 🚀 Deploy no Coolify v4.0.0 - Guia Completo

## 📋 **Pré-requisitos**
- ✅ Coolify v4.0.0 rodando
- ✅ Repositório Git criado (GitHub/GitLab)
- ✅ Domínio configurado

---

## 🗄️ **PASSO 1: Criar Serviços de Banco**

### **1.1 PostgreSQL**
1. **No Dashboard Coolify:**
   - `Services` → `+ New Service`
   - Escolher `PostgreSQL`
   
2. **Configurações:**
   ```
   Name: concurso-postgres
   Version: 15
   Database Name: concurso_osasco
   Username: postgres
   Password: [gerar senha forte]
   ```

3. **Após criar, anotar:**
   ```
   Internal URL: postgresql://postgres:[password]@concurso-postgres:5432/concurso_osasco
   ```

### **1.2 Redis**
1. **No Dashboard:**
   - `Services` → `+ New Service`
   - Escolher `Redis`

2. **Configurações:**
   ```
   Name: concurso-redis
   Version: 7
   ```

3. **Anotar:**
   ```
   Internal URL: redis://concurso-redis:6379
   ```

### **1.3 MinIO**
1. **No Dashboard:**
   - `Services` → `+ New Service`
   - Escolher `MinIO`

2. **Configurações:**
   ```
   Name: concurso-minio
   Root User: minioadmin
   Root Password: [gerar senha forte]
   ```

3. **Após deploy, criar bucket:**
   - Acessar MinIO Console
   - Criar bucket: `concurso-files`
   - Definir policy como `public-read`

---

## 🚀 **PASSO 2: Criar Aplicação**

### **2.1 Nova Aplicação**
1. **No Dashboard:**
   - `Applications` → `+ New Application`
   - Escolher `Public Git Repository`

### **2.2 Configurar Source**
```
Git Provider: GitHub (ou seu provider)
Repository URL: https://github.com/[usuario]/plataforma-concurso-osasco
Branch: main
```

### **2.3 Build Configuration**
```
Build Pack: Docker
Dockerfile: Dockerfile
Context: .
Port: 3000
```

---

## ⚙️ **PASSO 3: Configurar Variáveis de Ambiente**

### **3.1 No painel da aplicação:**
- Ir para `Environment Variables`
- Adicionar as seguintes variáveis:

```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[sua-senha]@concurso-postgres:5432/concurso_osasco
REDIS_URL=redis://concurso-redis:6379
MINIO_ENDPOINT=concurso-minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=[sua-senha-minio]
MINIO_BUCKET=concurso-files
NEXTAUTH_URL=https://[seu-dominio.com]
NEXTAUTH_SECRET=[gerar-secret-32-chars]
```

### **3.2 Gerar NEXTAUTH_SECRET:**
```bash
# No terminal local ou online
openssl rand -base64 32
```

---

## 🌐 **PASSO 4: Configurar Domínio**

### **4.1 No painel da aplicação:**
- Ir para `Domains`
- Clicar em `+ Add Domain`

### **4.2 Configurações:**
```
Domain: concurso.seudominio.com
SSL: Enable (Let's Encrypt)
```

### **4.3 DNS (no seu provedor de domínio):**
```
Type: A
Name: concurso
Value: [IP-do-seu-servidor-coolify]
```

---

## 🔧 **PASSO 5: Deploy**

### **5.1 Primeiro Deploy:**
1. **No painel da aplicação:**
   - Clicar em `Deploy`
   - Aguardar build completar

### **5.2 Verificar Logs:**
- `Deployments` → Ver logs em tempo real
- Verificar se build passou sem erros

### **5.3 Executar Seed (após primeiro deploy):**
```bash
# Via terminal do Coolify ou SSH
docker exec -it [container-name] npx prisma db push
docker exec -it [container-name] npx prisma db seed
```

---

## ✅ **PASSO 6: Verificações**

### **6.1 Testar Aplicação:**
- [ ] Acessar https://concurso.seudominio.com
- [ ] Dashboard carrega corretamente
- [ ] Simulados funcionam
- [ ] Timer funciona
- [ ] Questões aparecem

### **6.2 Verificar Serviços:**
- [ ] PostgreSQL conectado
- [ ] Redis funcionando
- [ ] MinIO acessível

---

## 🔄 **PASSO 7: Auto-Deploy (Opcional)**

### **7.1 Webhook Automático:**
1. **No painel da aplicação:**
   - `Settings` → `Webhooks`
   - Copiar URL do webhook

2. **No GitHub/GitLab:**
   - `Settings` → `Webhooks`
   - Colar URL do Coolify
   - Eventos: `Push to main`

### **7.2 Testar Auto-Deploy:**
```bash
# Fazer uma mudança e push
git add .
git commit -m "Test auto-deploy"
git push origin main
```

---

## 🛠️ **Comandos Úteis**

### **Acessar Container:**
```bash
# Via Coolify terminal
docker exec -it [app-container] bash

# Comandos úteis dentro do container
npx prisma studio
npx prisma db seed
npm run build
```

### **Ver Logs:**
```bash
# Logs da aplicação
docker logs [app-container] -f

# Logs do PostgreSQL
docker logs [postgres-container] -f
```

### **Backup Banco:**
```bash
# Backup via pg_dump
docker exec [postgres-container] pg_dump -U postgres concurso_osasco > backup.sql
```

---

## 🚨 **Troubleshooting**

### **Build Falha:**
1. Verificar Dockerfile
2. Verificar dependências no package.json
3. Ver logs detalhados no Coolify

### **Erro de Conexão com Banco:**
1. Verificar se PostgreSQL está rodando
2. Conferir DATABASE_URL
3. Verificar network entre containers

### **Erro 500:**
1. Ver logs da aplicação
2. Verificar variáveis de ambiente
3. Testar conexões com serviços

---

## 📊 **Monitoramento**

### **Métricas no Coolify:**
- CPU e RAM usage
- Network traffic
- Disk usage
- Uptime

### **Logs Importantes:**
- Application logs
- Build logs
- Service logs
- Error logs

---

## 🎯 **Próximos Passos**

Após deploy funcionando:
1. ✅ Testar todas funcionalidades
2. 🔄 Configurar backup automático
3. 📈 Implementar scraper de questões
4. 📚 Adicionar mais conteúdo
5. ⚡ Otimizar performance

**Deploy realizado com sucesso! 🎉**
