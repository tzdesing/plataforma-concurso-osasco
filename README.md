# 📚 Plataforma de Estudos - Concurso Professor Osasco

Plataforma completa para estudar para o concurso de **Professor Adjunto de Educação Básica I** da Prefeitura Municipal de Osasco (VUNESP 2025).

## 🎯 Funcionalidades

### ✅ Implementadas
- **Dashboard principal** com estatísticas do concurso
- **Simulados cronometrados** (completo e por disciplina)
- **Interface de prova** com timer e navegação
- **Banco de questões** organizadas por disciplina
- **Sistema de correção** com gabarito e explicações
- **Relatórios de desempenho** detalhados
- **Conteúdo programático** baseado no edital

### 🚧 Em desenvolvimento
- **Scraping automático** de questões VUNESP
- **Análise de evolução** temporal
- **Sistema de revisão** inteligente
- **Exportação de relatórios** em PDF
- **Modo offline** para estudos

## 🏗️ Arquitetura

- **Frontend:** Next.js 14 + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes + Prisma ORM
- **Banco:** PostgreSQL
- **Cache:** Redis
- **Storage:** MinIO (S3-compatible)
- **Deploy:** Docker + Coolify

## 📋 Conteúdo Programático

### Língua Portuguesa (10 questões)
- Interpretação de texto
- Gramática normativa
- Ortografia oficial
- Concordância verbal e nominal
- Regência verbal e nominal

### Matemática (10 questões)
- Operações fundamentais
- Frações e decimais
- Porcentagem
- Regra de três
- Geometria básica

### Conhecimentos Pedagógicos & Legislação (20 questões)
- LDB - Lei 9.394/96
- ECA - Lei 8.069/90
- Constituição Federal (Educação)
- PCNs e BNCC
- Didática e metodologias

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (ou usar via Docker)

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd plataforma-concurso-osasco
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie os serviços com Docker**
```bash
docker-compose up -d postgres redis minio
```

5. **Configure o banco de dados**
```bash
npx prisma db push
npx prisma db seed
```

6. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

7. **Acesse a aplicação**
- App: http://localhost:3000
- MinIO Console: http://localhost:9001

### Deploy com Coolify

1. **Crie um novo projeto no Coolify**
2. **Configure as variáveis de ambiente:**
   - `DATABASE_URL`
   - `REDIS_URL` 
   - `MINIO_ENDPOINT`
   - `MINIO_ACCESS_KEY`
   - `MINIO_SECRET_KEY`

3. **Configure os serviços:**
   - PostgreSQL
   - Redis
   - MinIO

4. **Deploy automático** via Git push

## 📊 Estrutura do Banco

```sql
-- Disciplinas do concurso
subjects (id, name, description, weight)

-- Tópicos por disciplina  
topics (id, name, description)

-- Questões com alternativas
questions (id, statement, type, difficulty, subject_id, topic_id)
alternatives (id, letter, text, question_id)

-- Simulados e resultados
exams (id, title, type, duration)
exam_results (id, exam_id, question_id, user_answer, is_correct, time_spent)

-- Conteúdo de estudo
study_contents (id, title, content, type, subject_id, topic_id)
study_progress (id, content_id, completed, time_spent)
```

## 🎨 Interface

### Dashboard
- Contador de dias para a prova
- Estatísticas rápidas (disciplinas, questões, duração)
- Acesso rápido aos simulados
- Progresso de estudos

### Simulados
- **Completo:** 40 questões, 3 horas
- **Rápido:** 20 questões, 1h30
- **Por disciplina:** Foco específico
- Timer visual com alertas
- Mapa de questões
- Navegação livre entre questões

### Relatórios
- Desempenho geral e por disciplina
- Análise de erros e acertos
- Tempo médio por questão
- Evolução temporal
- Recomendações de revisão

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção

# Banco de dados
npm run db:push      # Aplica schema no banco
npm run db:studio    # Interface visual do banco
npm run db:seed      # Popula banco com dados iniciais

# Docker
docker-compose up -d # Inicia todos os serviços
docker-compose down  # Para todos os serviços
```

## 📈 Roadmap

### Fase 1 - MVP ✅
- [x] Interface básica
- [x] Simulados funcionais
- [x] Banco de questões
- [x] Sistema de correção

### Fase 2 - Conteúdo 🚧
- [ ] Scraping automático de questões
- [ ] Conteúdo didático completo
- [ ] Sistema de favoritos
- [ ] Modo de revisão

### Fase 3 - Analytics 📊
- [ ] Relatórios avançados
- [ ] Análise preditiva
- [ ] Comparação com outros candidatos
- [ ] Exportação de dados

### Fase 4 - Extras ⭐
- [ ] App mobile (PWA)
- [ ] Modo offline
- [ ] Gamificação
- [ ] Integração com calendário

## 📝 Informações do Concurso

- **Cargo:** Professor Adjunto de Educação Básica I
- **Órgão:** Prefeitura Municipal de Osasco
- **Banca:** VUNESP
- **Vagas:** 10 (9 ampla concorrência + 1 PCD)
- **Salário:** R$ 3.635,90
- **Prova:** 14 de dezembro de 2025
- **Duração:** 3 horas
- **Questões:** 40 (múltipla escolha)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Boa sorte nos estudos! 🍀**
