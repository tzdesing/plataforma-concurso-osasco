# 🔧 Correção de Build - Regex ES2018

## ❌ **PROBLEMA:**
```
Type error: This regular expression flag is only available when targeting 'es2018' or later.
./lib/scraper/pdf-parser.ts:95:34
```

## ✅ **CORREÇÕES APLICADAS:**

### **1. Atualizado tsconfig.json:**
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es2018"],
    "target": "es2018",
    "downlevelIteration": true,
    // ... outras configurações
  }
}
```

### **2. Corrigido PDF Parser:**
- ✅ Removidas flags `s` das regex (ES2018+)
- ✅ Substituído `matchAll()` por `exec()` loop
- ✅ Compatibilidade com ES2015+

### **3. Regex Patterns Corrigidos:**
```typescript
// ANTES (ES2018+):
/\d+\.\s*(.+?)(?=\d+\.|$)/gs

// DEPOIS (ES2015+):
/\d+\.\s*(.+?)(?=\d+\.|$)/g
```

## 🚀 **COMANDOS PARA DEPLOY:**

```bash
git add .
git commit -m "fix: Update tsconfig to ES2018, fix regex patterns for build compatibility"
git push origin main
```

## 🎯 **RESULTADO ESPERADO:**
- ✅ Build passa sem erros de TypeScript
- ✅ Scraper funciona corretamente
- ✅ Deploy no Coolify bem-sucedido

**Agora o build deve passar! 🎉**
