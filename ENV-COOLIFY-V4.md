# 🔧 Configurar Variáveis de Ambiente - Coolify v4

## 📍 **ONDE COLOCAR as Variáveis:**

### **1. No Dashboard do Coolify:**
1. **Acesse sua aplicação** (depois de criá-la)
2. **Clique na aba `Environment Variables`** ou `Environment`
3. **Adicione uma por uma** ou **importe em lote**

### **2. Localização Exata:**
```
Dashboard → Applications → [sua-app] → Environment Variables → + Add
```

---

## ⚙️ **SUAS Variáveis Configuradas:**

Com base nos dados que você anotou:

```env
NODE_ENV=production

DATABASE_URL=postgres://postgres:xNgUtAScxrDhvO6G5MprjPBDuwme1URIQywawN60RdN31OWFaDnAgTcxGAkcXEaV@po8ww00wo0c8g04g8scck4ws:5432/postgres

REDIS_URL=redis://default:ykuDhXX5H7jgL6GZisrn7o0lMPIuNDyDsVkvEBpvAxYJukgs9kQ3FVY5zDBx2rhp@yogkc0ocw8kokw8ows8ws44k:6379/0

MINIO_ENDPOINT=minio-z44w00swgog4wgk8g0g8o8kc.173.249.15.13.sslip.io
MINIO_ACCESS_KEY=MMJCMdNvlCIEXK7L
MINIO_SECRET_KEY=Py0X8x5RpBw1P30TN6KmEt6DY6vF40c2
MINIO_BUCKET=concurso-files

NEXTAUTH_URL=https://[SEU-DOMINIO]
NEXTAUTH_SECRET=sua-chave-secreta-aqui-32-chars
```

---

## 🔐 **GERAR NEXTAUTH_SECRET:**

Execute este comando para gerar uma chave segura:
```bash
# No terminal local ou online
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Ou use este site: https://generate-secret.vercel.app/32

---

## 📝 **PASSO A PASSO para Adicionar:**

### **Método 1 - Uma por vez:**
1. Clique em `+ Add Environment Variable`
2. **Name:** `NODE_ENV`
3. **Value:** `production`
4. Clique `Save`
5. Repita para cada variável

### **Método 2 - Em lote (se disponível):**
1. Procure opção `Import` ou `Bulk Add`
2. Cole todas as variáveis de uma vez
3. Salve

---

## 🎯 **IMPORTANTE - Banco de Dados:**

⚠️ **ATENÇÃO:** Sua connection string aponta para `/postgres` no final, mas nossa aplicação usa `/concurso_osasco`.

### **Opções:**

**Opção 1 - Mudar o banco (RECOMENDADO):**
```env
DATABASE_URL=postgres://postgres:xNgUtAScxrDhvO6G5MprjPBDuwme1URIQywawN60RdN31OWFaDnAgTcxGAkcXEaV@po8ww00wo0c8g04g8scck4ws:5432/concurso_osasco
```

**Opção 2 - Criar banco concurso_osasco:**
```sql
-- Conectar ao PostgreSQL e executar:
CREATE DATABASE concurso_osasco;
```

---

## 🌐 **CONFIGURAR DOMÍNIO:**

### **1. Adicionar Domínio na Aplicação:**
- `Domains` → `+ Add Domain`
- Digite: `concurso.seudominio.com`
- Ativar SSL

### **2. Atualizar NEXTAUTH_URL:**
```env
NEXTAUTH_URL=https://concurso.seudominio.com
```

---

## ✅ **CHECKLIST Final:**

Antes de fazer deploy, verifique:

- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` com banco correto
- [ ] `REDIS_URL` configurado
- [ ] `MINIO_*` todas configuradas
- [ ] `NEXTAUTH_URL` com seu domínio
- [ ] `NEXTAUTH_SECRET` gerado
- [ ] Domínio configurado no DNS

---

## 🚀 **PRÓXIMOS PASSOS:**

1. **Adicionar todas as variáveis**
2. **Configurar domínio**
3. **Fazer primeiro deploy**
4. **Executar seed do banco**
5. **Testar aplicação**

---

## 🛠️ **Comandos Pós-Deploy:**

Após o primeiro deploy, execute:
```bash
# Acessar container da aplicação
docker exec -it [nome-container] bash

# Aplicar schema do banco
npx prisma db push

# Popular banco com dados iniciais
npx prisma db seed
```

**Está pronto para configurar! 🎉**
