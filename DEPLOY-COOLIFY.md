# 🚀 Deploy no Coolify v4.0.0 - Plataforma de Estudos

## 📋 Pré-requisitos

- Coolify v4.0.0 instalado e funcionando
- Domínio configurado
- Repositório Git criado
- Acesso SSH ao servidor

## 🗄️ 1. Configurar Serviços no Coolify v4

### PostgreSQL
1. **Criar serviço PostgreSQL:**
   - Nome: `concurso-postgres`
   - Versão: `15`
   - Database: `concurso_osasco`
   - Username: `postgres`
   - Password: `[gerar senha segura]`

2. **Anotar a connection string:**
   ```
   postgresql://postgres:[password]@concurso-postgres:5432/concurso_osasco
   ```

### Redis
1. **Criar serviço Redis:**
   - Nome: `concurso-redis`
   - Versão: `7`

2. **Anotar a connection string:**
   ```
   redis://concurso-redis:6379
   ```

### MinIO
1. **Criar serviço MinIO:**
   - Nome: `concurso-minio`
   - Root User: `minioadmin`
   - Root Password: `[gerar senha segura]`

2. **Configurar bucket:**
   - Bucket: `concurso-files`
   - Policy: `public-read`

3. **Anotar as configurações:**
   ```
   MINIO_ENDPOINT=concurso-minio:9000
   MINIO_ACCESS_KEY=minioadmin
   MINIO_SECRET_KEY=[password]
   ```

## 🔧 2. Criar Aplicação no Coolify v4

### Passo a Passo no Dashboard:

1. **Acessar Dashboard do Coolify**
   - Login no painel admin
   - Ir para "Projects" ou "Applications"

2. **Criar Nova Aplicação**
   - Clicar em "New Application" ou "+"
   - Escolher "Git Repository"

3. **Configurar Source**
   - **Git Provider:** GitHub/GitLab/Gitea
   - **Repository:** `[usuario]/plataforma-concurso-osasco`
   - **Branch:** `main`
   - **Build Pack:** Docker

4. **Configurações de Build**
   - **Dockerfile:** `Dockerfile` (padrão)
   - **Context:** `.` (raiz do projeto)
   - **Port:** `3000`

### Variáveis de Ambiente
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[password]@concurso-postgres:5432/concurso_osasco
REDIS_URL=redis://concurso-redis:6379
MINIO_ENDPOINT=concurso-minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=[minio-password]
MINIO_BUCKET=concurso-files
NEXTAUTH_URL=https://[seu-dominio]
NEXTAUTH_SECRET=[gerar-secret-seguro]
```

### Domínio
- **Domínio:** `concurso.seudominio.com`
- **SSL:** Ativado (Let's Encrypt)

## 📦 3. Preparar Repositório Git

### Inicializar Git (se ainda não foi feito)
```bash
cd C:\Users\sales\CascadeProjects\plataforma-concurso-osasco
git init
git add .
git commit -m "Initial commit - Plataforma de Estudos Concurso Osasco"
```

### Adicionar remote e push
```bash
# Substitua pela URL do seu repositório
git remote add origin https://github.com/[usuario]/plataforma-concurso-osasco.git
git branch -M main
git push -u origin main
```

## 🚀 4. Deploy Automático

1. **No Coolify:**
   - Conectar ao repositório Git
   - Configurar webhook automático
   - Fazer o primeiro deploy

2. **Verificar logs:**
   - Acompanhar build no Coolify
   - Verificar se serviços estão conectados
   - Testar aplicação no domínio

## 🔍 5. Verificações Pós-Deploy

### Testar Funcionalidades
- [ ] Página inicial carrega
- [ ] Simulados funcionam
- [ ] Timer funciona corretamente
- [ ] Banco de dados populado
- [ ] Relatórios são gerados

### Monitoramento
- [ ] Logs da aplicação
- [ ] Status dos serviços
- [ ] Uso de recursos
- [ ] SSL funcionando

## 🛠️ 6. Comandos Úteis

### Executar comandos no container
```bash
# Via Coolify terminal ou SSH
docker exec -it [container-name] npx prisma db seed
docker exec -it [container-name] npx prisma studio
```

### Backup do banco
```bash
# Backup automático via Coolify
# Ou manual:
pg_dump [connection-string] > backup.sql
```

## 🔧 7. Troubleshooting

### Problemas Comuns
1. **Erro de conexão com banco:**
   - Verificar se PostgreSQL está rodando
   - Conferir connection string
   - Verificar network entre containers

2. **Erro no build:**
   - Verificar Dockerfile
   - Conferir dependências no package.json
   - Verificar logs de build

3. **Erro no Prisma:**
   - Executar `npx prisma generate`
   - Verificar schema.prisma
   - Executar migrations

### Logs Importantes
```bash
# Logs da aplicação
docker logs [app-container]

# Logs do PostgreSQL
docker logs [postgres-container]

# Logs do Redis
docker logs [redis-container]
```

## 📊 8. Configurações de Produção

### Performance
- **Node.js:** Configurar PM2 ou cluster mode
- **Database:** Connection pooling
- **Cache:** Redis para sessões e cache
- **CDN:** Para assets estáticos

### Segurança
- **HTTPS:** Obrigatório
- **Headers:** Security headers
- **Rate Limiting:** Para APIs
- **Backup:** Automático do banco

### Monitoramento
- **Uptime:** Monitoring via Coolify
- **Logs:** Centralizados
- **Metrics:** CPU, RAM, Disk
- **Alerts:** Para falhas críticas

---

## 🎯 Próximos Passos Após Deploy

1. **Testar todas as funcionalidades**
2. **Configurar backup automático**
3. **Implementar scraper de questões**
4. **Adicionar mais conteúdo didático**
5. **Otimizar performance**

**Boa sorte com o deploy! 🍀**
