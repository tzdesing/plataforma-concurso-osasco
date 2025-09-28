@echo off
echo 🚀 Configurando Plataforma de Estudos - Concurso Osasco
echo.

echo 📦 Instalando dependências...
npm install

echo.
echo 🔧 Instalando dependências de desenvolvimento...
npm install -D ts-node

echo.
echo 🐳 Iniciando serviços Docker...
docker-compose up -d postgres redis minio

echo.
echo ⏳ Aguardando serviços iniciarem...
timeout /t 10 /nobreak > nul

echo.
echo 🗄️ Configurando banco de dados...
npx prisma db push

echo.
echo 🌱 Populando banco com dados iniciais...
npx prisma db seed

echo.
echo ✅ Configuração concluída!
echo.
echo 🌐 Para iniciar o servidor de desenvolvimento:
echo    npm run dev
echo.
echo 📊 Para acessar o painel do banco:
echo    npm run db:studio
echo.
echo 🎯 Acesse: http://localhost:3000
echo.
pause
