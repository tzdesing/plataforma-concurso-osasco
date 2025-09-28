# 🔧 Variáveis de Ambiente para Coolify

## ✅ **VARIÁVEIS OBRIGATÓRIAS:**

Adicione estas variáveis no Coolify (Environment Variables):

```env
NODE_ENV=production
DATABASE_URL=postgres://postgres:xNgUtAScxrDhvO6G5MprjPBDuwme1URIQywawN60RdN31OWFaDnAgTcxGAkcXEaV@po8ww00wo0c8g04g8scck4ws:5432/concurso_osasco
REDIS_URL=redis://default:ykuDhXX5H7jgL6GZisrn7o0lMPIuNDyDsVkvEBpvAxYJukgs9kQ3FVY5zDBx2rhp@yogkc0ocw8kokw8ows8ws44k:6379/0
MINIO_ENDPOINT=minio-z44w00swgog4wgk8g0g8o8kc.173.249.15.13.sslip.io
MINIO_ACCESS_KEY=MMJCMdNvlCIEXK7L
MINIO_SECRET_KEY=Py0X8x5RpBw1P30TN6KmEt6DY6vF40c2
MINIO_BUCKET=concurso-files
NEXTAUTH_URL=http://rws8g4w8sook84g48cgko8go.173.249.15.13.sslip.io
NEXTAUTH_SECRET=fY8xnfLA6dt+rvZ93NgXarDBQ9AfcnH4yNbvzMBsZWY=
```

## 🚨 **IMPORTANTE:**

### **Para NODE_ENV:**
- ✅ **Marcar:** "Available at Runtime"
- ❌ **DESMARCAR:** "Available at Buildtime"

### **Para todas as outras:**
- ✅ **Marcar:** "Available at Runtime"
- ✅ **Marcar:** "Available at Buildtime" (se necessário)

## 🔧 **CORREÇÕES APLICADAS:**

1. ✅ **Pasta `public` criada** (estava faltando)
2. ✅ **Dockerfile corrigido** (formato ENV atualizado)
3. ✅ **Build dependencies movidas** para `dependencies`

## 🚀 **PRÓXIMOS PASSOS:**

1. **Fazer commit das correções:**
```bash
git add .
git commit -m "Fix: Add public folder and fix Dockerfile ENV format"
git push origin main
```

2. **No Coolify:**
   - Adicionar todas as variáveis de ambiente
   - Configurar NODE_ENV como "Runtime only"
   - Fazer novo deploy

3. **Após deploy bem-sucedido:**
```bash
# Executar no container
docker exec -it [container-name] npx prisma db push
docker exec -it [container-name] npx prisma db seed
```

## 🎯 **STATUS ATUAL:**

- ✅ Build passou com sucesso (Next.js compilou)
- ✅ Prisma Client gerado
- ✅ Dependências instaladas
- ❌ Falhou na cópia da pasta `public` (CORRIGIDO)
- ❌ Warnings de formato ENV (CORRIGIDO)

**Agora deve funcionar! 🚀**
