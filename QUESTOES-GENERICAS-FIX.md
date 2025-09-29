# 🔧 CORREÇÃO - Questões Genéricas

## ❌ **PROBLEMA:**
Questões aparecem como:
```
"Questão 13 de Conhecimentos Pedagógicos: Sobre legislação..."
A) Alternativa A da questão 13
B) Alternativa B da questão 13
```

## ✅ **CAUSA:**
Script `populate-extended-questions.ts` gera questões genéricas programaticamente.

## 🚀 **SOLUÇÃO RÁPIDA:**

### 1. Use o scraper para popular questões reais:
- Acesse `/admin/scraper`
- Clique "🚀 Popular Banco Completo (120+ questões)"
- Aguarde completar

### 2. Ou execute via API:
```
POST /api/populate-extended
```

## 🎯 **RESULTADO:**
Questões reais específicas do cargo serão carregadas no banco.

**Use o scraper para corrigir! 🚀**
