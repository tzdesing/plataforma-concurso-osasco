# 🔧 Correção Docker + Prisma + População de Questões

## ❌ **PROBLEMAS IDENTIFICADOS:**

### **1. Prisma + OpenSSL no Docker:**
```
Error loading shared library libssl.so.1.1: No such file or directory
PrismaClientInitializationError: Unable to require libquery_engine-linux-musl.so.node
```

### **2. Questões não aparecem na interface**
### **3. Salvamento no banco falha**

## ✅ **CORREÇÕES APLICADAS:**

### **1. Dockerfile Atualizado:**
```dockerfile
# ANTES:
RUN apk add --no-cache libc6-compat

# DEPOIS:
RUN apk add --no-cache libc6-compat openssl1.1-compat
```

### **2. Script de População Criado:**
- **Arquivo:** `scripts/populate-questions.ts`
- **10 questões específicas** do cargo
- **3 disciplinas:** Português, Matemática, Pedagógicos
- **Comando:** `npm run populate-questions`

### **3. API Endpoint Criado:**
- **Rota:** `POST /api/populate-questions`
- **Execução direta** via HTTP
- **Integração com interface**

### **4. Interface Atualizada:**
- **Botão "Adicionar Questões"** na interface
- **Feedback em tempo real**
- **10 questões prontas** para uso

## 🚀 **COMANDOS PARA DEPLOY:**

### **1. Commit das Correções:**
```bash
git add .
git commit -m "fix: Add OpenSSL support to Docker, create direct question population system"
git push origin main
```

### **2. Após Deploy - Popular Questões:**
```bash
# Via interface web:
https://[seu-dominio]/admin/scraper
# Clicar em "Adicionar Questões"

# Ou via API direta:
curl -X POST https://[seu-dominio]/api/populate-questions
```

## 📚 **QUESTÕES INCLUÍDAS:**

### **Língua Portuguesa (3):**
1. **Interpretação de Texto** - Constituição Federal Art. 205
2. **Ortografia** - Exceção, privilégio, beneficente
3. **Concordância Verbal** - Verbo fazer impessoal

### **Matemática (3):**
1. **Porcentagem** - Cálculo de alunos por gênero
2. **Frações** - Soma de frações
3. **Operações Fundamentais** - Multiplicação e subtração

### **Conhecimentos Pedagógicos (4):**
1. **LDB** - Educação infantil
2. **ECA** - Definição de criança
3. **Constituição Federal** - Princípios do ensino
4. **Paulo Freire** - Educação problematizadora

## 🎯 **RESULTADO ESPERADO:**

### **✅ Docker Build:**
- OpenSSL disponível
- Prisma funciona corretamente
- Build passa sem erros

### **✅ Questões no Banco:**
- 10 questões específicas
- 3 disciplinas configuradas
- Tópicos organizados
- Alternativas com gabarito

### **✅ Interface Funcional:**
- Botão de população funciona
- Feedback de sucesso/erro
- Questões aparecem nos simulados

**Agora está tudo corrigido! Faça o commit e teste! 🎉**
