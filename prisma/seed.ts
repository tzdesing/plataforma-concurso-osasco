import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.examResult.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.studyContent.deleteMany()
  await prisma.studyProgress.deleteMany()
  await prisma.alternative.deleteMany()
  await prisma.question.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.subject.deleteMany()

  // Criar disciplinas
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Língua Portuguesa',
        description: 'Interpretação de texto, gramática normativa, ortografia oficial',
        weight: 10
      }
    }),
    prisma.subject.create({
      data: {
        name: 'Matemática',
        description: 'Operações fundamentais, frações, porcentagem, geometria básica',
        weight: 10
      }
    }),
    prisma.subject.create({
      data: {
        name: 'Conhecimentos Pedagógicos & Legislação',
        description: 'LDB, ECA, Constituição Federal, PCNs, BNCC, didática',
        weight: 20
      }
    })
  ])

  // Criar tópicos
  const topics = await Promise.all([
    // Língua Portuguesa
    prisma.topic.create({
      data: {
        name: 'Interpretação de Texto',
        description: 'Compreensão e interpretação de textos diversos'
      }
    }),
    prisma.topic.create({
      data: {
        name: 'Gramática Normativa',
        description: 'Concordância, regência, crase, pontuação'
      }
    }),
    prisma.topic.create({
      data: {
        name: 'Ortografia',
        description: 'Ortografia oficial, acentuação gráfica'
      }
    }),
    // Matemática
    prisma.topic.create({
      data: {
        name: 'Operações Fundamentais',
        description: 'Adição, subtração, multiplicação, divisão'
      }
    }),
    prisma.topic.create({
      data: {
        name: 'Frações e Decimais',
        description: 'Operações com frações e números decimais'
      }
    }),
    prisma.topic.create({
      data: {
        name: 'Porcentagem',
        description: 'Cálculos percentuais e aplicações'
      }
    }),
    // Conhecimentos Pedagógicos
    prisma.topic.create({
      data: {
        name: 'LDB - Lei 9.394/96',
        description: 'Lei de Diretrizes e Bases da Educação Nacional'
      }
    }),
    prisma.topic.create({
      data: {
        name: 'ECA - Lei 8.069/90',
        description: 'Estatuto da Criança e do Adolescente'
      }
    }),
    prisma.topic.create({
      data: {
        name: 'Constituição Federal',
        description: 'Artigos relacionados à educação'
      }
    })
  ])

  // Questões de exemplo
  const portuguesSubject = subjects.find(s => s.name === 'Língua Portuguesa')!
  const matematicaSubject = subjects.find(s => s.name === 'Matemática')!
  const pedagogicosSubject = subjects.find(s => s.name === 'Conhecimentos Pedagógicos & Legislação')!

  const interpretacaoTopic = topics.find(t => t.name === 'Interpretação de Texto')!
  const operacoesTopic = topics.find(t => t.name === 'Operações Fundamentais')!
  const ldbTopic = topics.find(t => t.name === 'LDB - Lei 9.394/96')!

  // Questão de Português
  const questaoPortugues = await prisma.question.create({
    data: {
      statement: `Leia o texto abaixo e responda à questão.

"A educação é a arma mais poderosa que você pode usar para mudar o mundo." (Nelson Mandela)

No contexto da frase de Mandela, a palavra "arma" foi empregada em sentido:`,
      type: 'MULTIPLE_CHOICE',
      difficulty: 'MEDIUM',
      subjectId: portuguesSubject.id,
      topicId: interpretacaoTopic.id,
      correctAnswer: 'b',
      explanation: 'A palavra "arma" foi empregada em sentido figurado, representando a educação como um instrumento poderoso de transformação social.',
      source: 'VUNESP - Adaptado',
      year: 2024,
      institution: 'VUNESP',
      alternatives: {
        create: [
          { letter: 'A', text: 'Literal, referindo-se a um objeto bélico.' },
          { letter: 'B', text: 'Figurado, como instrumento de transformação.' },
          { letter: 'C', text: 'Pejorativo, indicando algo negativo.' },
          { letter: 'D', text: 'Técnico, relacionado à área militar.' },
          { letter: 'E', text: 'Coloquial, usado informalmente.' }
        ]
      }
    }
  })

  // Questão de Matemática
  const questaoMatematica = await prisma.question.create({
    data: {
      statement: 'Em uma escola, 60% dos alunos são meninas. Se há 240 meninas na escola, qual é o total de alunos?',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'MEDIUM',
      subjectId: matematicaSubject.id,
      topicId: operacoesTopic.id,
      correctAnswer: 'c',
      explanation: 'Se 240 meninas representam 60% do total, então: 240 ÷ 0,6 = 400 alunos no total.',
      source: 'VUNESP - Adaptado',
      year: 2024,
      institution: 'VUNESP',
      alternatives: {
        create: [
          { letter: 'A', text: '300 alunos' },
          { letter: 'B', text: '350 alunos' },
          { letter: 'C', text: '400 alunos' },
          { letter: 'D', text: '450 alunos' },
          { letter: 'E', text: '500 alunos' }
        ]
      }
    }
  })

  // Questão de Conhecimentos Pedagógicos
  const questaoPedagogicos = await prisma.question.create({
    data: {
      statement: 'De acordo com a Lei de Diretrizes e Bases da Educação Nacional (LDB - Lei 9.394/96), a educação básica tem por finalidade:',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'MEDIUM',
      subjectId: pedagogicosSubject.id,
      topicId: ldbTopic.id,
      correctAnswer: 'c',
      explanation: 'Conforme o Art. 22 da LDB, a educação básica tem por finalidade desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores.',
      source: 'LDB - Lei 9.394/96',
      year: 1996,
      institution: 'Legislação',
      alternatives: {
        create: [
          { letter: 'A', text: 'Desenvolver apenas o raciocínio lógico-matemático.' },
          { letter: 'B', text: 'Preparar exclusivamente para o mercado de trabalho.' },
          { letter: 'C', text: 'Desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores.' },
          { letter: 'D', text: 'Focar apenas no desenvolvimento de habilidades técnicas.' },
          { letter: 'E', text: 'Priorizar o ensino de línguas estrangeiras.' }
        ]
      }
    }
  })

  // Criar conteúdo de estudo
  await prisma.studyContent.createMany({
    data: [
      {
        title: 'Interpretação de Texto - Conceitos Básicos',
        content: `# Interpretação de Texto

## Conceitos Fundamentais

A interpretação de texto é uma habilidade essencial que envolve:

### 1. Compreensão Literal
- Identificação de informações explícitas no texto
- Reconhecimento de dados, fatos e detalhes

### 2. Compreensão Inferencial  
- Dedução de informações implícitas
- Estabelecimento de relações entre ideias

### 3. Compreensão Crítica
- Avaliação das ideias apresentadas
- Análise da intenção do autor

## Dicas para a Prova
- Leia o texto com atenção
- Identifique a ideia principal
- Observe as palavras-chave
- Analise o contexto`,
        type: 'TEXT',
        subjectId: portuguesSubject.id,
        topicId: interpretacaoTopic.id,
        order: 1
      },
      {
        title: 'Operações com Porcentagem',
        content: `# Porcentagem

## Conceito
Porcentagem é uma razão cujo denominador é 100.

## Fórmulas Básicas

### Cálculo de Porcentagem
- x% de N = (x/100) × N

### Encontrar o Total
- Se x% = valor, então Total = valor ÷ (x/100)

### Variação Percentual
- Aumento: ((Valor Final - Valor Inicial) / Valor Inicial) × 100
- Desconto: ((Valor Inicial - Valor Final) / Valor Inicial) × 100

## Exemplos Práticos
1. 30% de 200 = (30/100) × 200 = 60
2. Se 40% = 80, então Total = 80 ÷ 0,4 = 200`,
        type: 'TEXT',
        subjectId: matematicaSubject.id,
        topicId: topics.find(t => t.name === 'Porcentagem')!.id,
        order: 1
      },
      {
        title: 'LDB - Princípios e Fins da Educação',
        content: `# Lei de Diretrizes e Bases da Educação Nacional
## Lei 9.394/96

### Art. 2º - Finalidade da Educação
A educação, dever da família e do Estado, inspirada nos princípios de liberdade e nos ideais de solidariedade humana, tem por finalidade o pleno desenvolvimento do educando, seu preparo para o exercício da cidadania e sua qualificação para o trabalho.

### Art. 3º - Princípios do Ensino
I - igualdade de condições para o acesso e permanência na escola
II - liberdade de aprender, ensinar, pesquisar e divulgar a cultura
III - pluralismo de ideias e de concepções pedagógicas
IV - respeito à liberdade e apreço à tolerância
V - coexistência de instituições públicas e privadas de ensino

### Art. 22 - Finalidade da Educação Básica
A educação básica tem por finalidade desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores.`,
        type: 'TEXT',
        subjectId: pedagogicosSubject.id,
        topicId: ldbTopic.id,
        order: 1
      }
    ]
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log(`📚 Criadas ${subjects.length} disciplinas`)
  console.log(`📝 Criados ${topics.length} tópicos`)
  console.log(`❓ Criadas 3 questões de exemplo`)
  console.log(`📖 Criados 3 conteúdos de estudo`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
