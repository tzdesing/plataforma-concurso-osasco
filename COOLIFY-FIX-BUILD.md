# 🔧 Corrigir Erro de Build no Coolify v4

## 🚨 **PROBLEMA IDENTIFICADO:**
```
Error: Cannot find module 'autoprefixer'
```

**Causa:** O Coolify está usando `NODE_ENV=production` durante o build, fazendo o npm pular as `devDependencies` onde estão as ferramentas de build.

## ✅ **SOLUÇÃO APLICADA:**

### **1. Movidas dependências de build para `dependencies`:**
- `autoprefixer`
- `postcss` 
- `tailwindcss`
- `typescript`
- `prisma`

### **2. Configurar Variáveis no Coolify:**

#### **Environment Variables (Runtime):**
```env
NODE_ENV=production
DATABASE_URL=postgres://postgres:xNgUtAScxrDhvO6G5MprjPBDuwme1URIQywawN60RdN31OWFaDnAgTcxGAkcXEaV@po8ww00wo0c8g04g8scck4ws:5432/concurso_osasco
REDIS_URL=redis://default:ykuDhXX5H7jgL6GZisrn7o0lMPIuNDyDsVkvEBpvAxYJukgs9kQ3FVY5zDBx2rhp@yogkc0ocw8kokw8ows8ws44k:6379/0
MINIO_ENDPOINT=minio-z44w00swgog4wgk8g0g8o8kc.173.249.15.13.sslip.io
MINIO_ACCESS_KEY=MMJCMdNvlCIEXK7L
MINIO_SECRET_KEY=Py0X8x5RpBw1P30TN6KmEt6DY6vF40c2
MINIO_BUCKET=concurso-files
NEXTAUTH_URL=https://[SEU-DOMINIO]
NEXTAUTH_SECRET=[GERAR-CHAVE-32-CHARS]
```

#### **⚠️ IMPORTANTE - Configurar NODE_ENV:**
1. **No Coolify, para a variável `NODE_ENV`:**
   - ✅ **Marcar:** "Available at Runtime" 
   - ❌ **DESMARCAR:** "Available at Buildtime"

2. **Ou criar variável separada para build:**
   - `NODE_ENV` (Runtime only) = `production`
   - `BUILD_ENV` (Buildtime only) = `development`

## 🚀 **PRÓXIMOS PASSOS:**

### **1. Fazer commit das mudanças:**
```bash
git add .
git commit -m "Fix: Move build dependencies to dependencies for Coolify"
git push origin main
```

### **2. No Coolify:**
1. **Verificar variáveis de ambiente**
2. **Desmarcar "Available at Buildtime" para NODE_ENV**
3. **Fazer novo deploy**

### **3. Gerar NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🔍 **VERIFICAR APÓS DEPLOY:**

### **Build deve passar com:**
- ✅ `autoprefixer` encontrado
- ✅ `postcss` funcionando  
- ✅ `tailwindcss` compilando
- ✅ Next.js build success

### **Runtime deve funcionar:**
- ✅ Aplicação inicia
- ✅ Conecta com PostgreSQL
- ✅ Conecta com Redis
- ✅ Conecta com MinIO

## 🛠️ **Se ainda der erro:**

### **Alternativa 1 - Dockerfile customizado:**
```dockerfile
# No estágio builder, forçar NODE_ENV=development
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Forçar NODE_ENV para development durante build
ENV NODE_ENV=development
RUN npx prisma generate
RUN npm run build

# Depois voltar para production no runtime
ENV NODE_ENV=production
```

### **Alternativa 2 - Script de build customizado:**
```json
{
  "scripts": {
    "build": "NODE_ENV=development next build"
  }
}
```

## 📊 **Status Atual:**
- ✅ Dependências movidas para `dependencies`
- ✅ Package.json atualizado
- 🔄 Aguardando commit e novo deploy
- ⏳ Configurar variáveis no Coolify

**Agora faça o commit e tente o deploy novamente!** 🚀
