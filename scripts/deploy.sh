#!/bin/bash

echo "🚀 Iniciando deploy da Plataforma de Estudos..."

# Gerar cliente Prisma
echo "📦 Gerando cliente Prisma..."
npx prisma generate

# Aplicar migrações do banco
echo "🗄️ Aplicando schema do banco..."
npx prisma db push

# Executar seed se necessário
echo "🌱 Populando banco de dados..."
npx prisma db seed

echo "✅ Deploy concluído com sucesso!"
