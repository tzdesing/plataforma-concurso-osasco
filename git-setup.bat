@echo off
echo 🔧 Configurando Git para deploy no Coolify
echo.

echo 📝 Inicializando repositório Git...
git init

echo.
echo 📦 Adicionando arquivos...
git add .

echo.
echo 💾 Fazendo commit inicial...
git commit -m "Initial commit - Plataforma de Estudos Concurso Osasco"

echo.
echo 🌐 Para conectar ao repositório remoto, execute:
echo    git remote add origin https://github.com/[usuario]/plataforma-concurso-osasco.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 📋 Próximos passos:
echo    1. Criar repositório no GitHub/GitLab
echo    2. Executar os comandos acima com a URL correta
echo    3. Configurar no Coolify
echo.
pause
