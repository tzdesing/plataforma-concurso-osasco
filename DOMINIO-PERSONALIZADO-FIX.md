# 🌐 CONFIGURAÇÃO DOMÍNIO PERSONALIZADO

## ✅ **NOVO DOMÍNIO:**
```
https://luci.harpo-zk.com.br
```

## ❌ **PROBLEMA ATUAL:**
- **Domínio configurado** no Coolify
- **Aplicação não carrega** - página em branco
- **SSL/HTTPS** pode estar causando problemas

## 🔧 **CONFIGURAÇÕES NECESSÁRIAS:**

### **1. 📝 Variáveis de Ambiente no Coolify:**
```env
# URL da aplicação
NEXTAUTH_URL=https://luci.harpo-zk.com.br
NEXT_PUBLIC_APP_URL=https://luci.harpo-zk.com.br

# Database (manter existente)
DATABASE_URL=postgresql://...

# Redis (manter existente)  
REDIS_URL=redis://...

# MinIO (manter existente)
MINIO_ENDPOINT=...
MINIO_ACCESS_KEY=...
MINIO_SECRET_KEY=...
MINIO_BUCKET=...

# NextAuth Secret (manter existente)
NEXTAUTH_SECRET=...
```

### **2. 🔒 Configuração SSL no Coolify:**
- **SSL Certificate:** Let's Encrypt (automático)
- **Force HTTPS:** Habilitado
- **HSTS:** Habilitado

### **3. 🌐 Configuração DNS:**
Verifique se o DNS está apontando corretamente:
```
luci.harpo-zk.com.br → IP do servidor Coolify
```

## 🚀 **PASSOS PARA CORRIGIR:**

### **1. 🔧 No Coolify Dashboard:**
1. **Acesse o projeto** da plataforma
2. **Environment Variables** → Adicione:
   ```
   NEXTAUTH_URL=https://luci.harpo-zk.com.br
   NEXT_PUBLIC_APP_URL=https://luci.harpo-zk.com.br
   ```
3. **Domain Settings:**
   - **Primary Domain:** `luci.harpo-zk.com.br`
   - **SSL:** Let's Encrypt habilitado
   - **Force HTTPS:** Sim

### **2. 📝 Atualizar next.config.js (se necessário):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### **3. 🔄 Rebuild da Aplicação:**
No Coolify:
1. **Deploy** → **Redeploy**
2. Aguarde o build completar
3. Verifique os logs para erros

## 🔍 **DIAGNÓSTICO:**

### **1. 🌐 Teste de DNS:**
```bash
# Verifique se o DNS resolve
nslookup luci.harpo-zk.com.br

# Deve retornar o IP do servidor Coolify
```

### **2. 📡 Teste de Conectividade:**
```bash
# Teste HTTP (pode redirecionar para HTTPS)
curl -I http://luci.harpo-zk.com.br

# Teste HTTPS
curl -I https://luci.harpo-zk.com.br
```

### **3. 🔍 Logs do Coolify:**
- **Build Logs:** Verifique se o build passou
- **Runtime Logs:** Procure por erros de SSL/HTTPS
- **Proxy Logs:** Verifique configuração do reverse proxy

## ⚠️ **PROBLEMAS COMUNS:**

### **1. 🔒 SSL/HTTPS Issues:**
- **Certificado não gerado:** Aguarde alguns minutos
- **Mixed content:** Verifique se todas as URLs são HTTPS
- **CORS errors:** Configure headers adequadamente

### **2. 🌐 DNS Propagation:**
- **Pode levar até 24h** para propagar globalmente
- **Teste local:** Adicione ao `/etc/hosts` temporariamente
- **Cache DNS:** Limpe cache do navegador

### **3. 🔧 Configuração Coolify:**
- **Port mapping:** Deve estar correto (3000)
- **Health checks:** Configurados adequadamente
- **Resource limits:** Suficientes para a aplicação

## 🚀 **TESTE IMEDIATO:**

### **1. 📱 URLs para Testar:**
```
# Principal
https://luci.harpo-zk.com.br

# API Test
https://luci.harpo-zk.com.br/api/questions

# Debug Page
https://luci.harpo-zk.com.br/debug
```

### **2. 🔍 Ferramentas de Debug:**
```
# SSL Test
https://www.ssllabs.com/ssltest/analyze.html?d=luci.harpo-zk.com.br

# DNS Test
https://dnschecker.org/#A/luci.harpo-zk.com.br
```

## 📋 **CHECKLIST:**

- [ ] **DNS** aponta para IP correto
- [ ] **SSL Certificate** gerado (Let's Encrypt)
- [ ] **Environment Variables** atualizadas
- [ ] **Force HTTPS** habilitado
- [ ] **Build** completou com sucesso
- [ ] **Logs** sem erros críticos

## 🎯 **PRÓXIMOS PASSOS:**

1. **Configure as variáveis** no Coolify
2. **Force rebuild** da aplicação
3. **Aguarde SSL** ser gerado (2-5 minutos)
4. **Teste o acesso** via HTTPS
5. **Verifique logs** se houver problemas

**O domínio personalizado deve funcionar perfeitamente após essas configurações! 🌐✅**
