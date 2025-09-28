import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Questões reais para Professor Adjunto de Educação Básica I - Osasco
const questionsData = [
  // LÍNGUA PORTUGUESA
  {
    statement: "Leia o texto abaixo:\n\n'A educação é um direito de todos e dever do Estado e da família, será promovida e incentivada com a colaboração da sociedade, visando ao pleno desenvolvimento da pessoa, seu preparo para o exercício da cidadania e sua qualificação para o trabalho.'\n\nO texto acima refere-se ao artigo da Constituição Federal que trata:",
    alternatives: [
      "Do direito à saúde",
      "Do direito à educação", // CORRETA
      "Do direito ao trabalho",
      "Do direito à moradia"
    ],
    correctAnswer: 1,
    explanation: "O texto é do artigo 205 da Constituição Federal, que estabelece a educação como direito de todos.",
    subject: "Língua Portuguesa",
    topic: "Interpretação de Texto",
    difficulty: "MEDIUM",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },
  {
    statement: "Assinale a alternativa em que todas as palavras estão grafadas corretamente:",
    alternatives: [
      "Excessão, privilégio, beneficiente",
      "Exceção, privilégio, beneficente", // CORRETA
      "Exceção, previlejo, beneficiente",
      "Excessão, previlejo, beneficente"
    ],
    correctAnswer: 1,
    explanation: "As grafias corretas são: exceção (com 'c'), privilégio (com 'i') e beneficente (com 'e').",
    subject: "Língua Portuguesa",
    topic: "Ortografia",
    difficulty: "EASY",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },
  {
    statement: "Em relação à concordância verbal, assinale a alternativa CORRETA:",
    alternatives: [
      "Fazem dois anos que ele se formou",
      "Houveram muitos problemas na escola",
      "Faz dois anos que ele se formou", // CORRETA
      "Haviam muitas crianças no pátio"
    ],
    correctAnswer: 2,
    explanation: "O verbo 'fazer' no sentido de tempo decorrido é impessoal, permanecendo sempre no singular.",
    subject: "Língua Portuguesa",
    topic: "Concordância Verbal",
    difficulty: "MEDIUM",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },

  // MATEMÁTICA
  {
    statement: "Uma escola tem 480 alunos. Se 60% são meninas, quantos meninos há na escola?",
    alternatives: [
      "192 meninos", // CORRETA
      "288 meninos",
      "320 meninos",
      "240 meninos"
    ],
    correctAnswer: 0,
    explanation: "60% de 480 = 288 meninas. Logo, 480 - 288 = 192 meninos.",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "MEDIUM",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },
  {
    statement: "Qual é o resultado de 3/4 + 2/8?",
    alternatives: [
      "5/12",
      "1", // CORRETA
      "7/8",
      "5/8"
    ],
    correctAnswer: 1,
    explanation: "3/4 + 2/8 = 6/8 + 2/8 = 8/8 = 1",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "EASY",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },
  {
    statement: "Um professor comprou 5 caixas de giz, cada uma com 12 unidades. Se ele já usou 28 gizes, quantos ainda restam?",
    alternatives: [
      "32 gizes", // CORRETA
      "28 gizes",
      "40 gizes",
      "35 gizes"
    ],
    correctAnswer: 0,
    explanation: "5 × 12 = 60 gizes no total. 60 - 28 = 32 gizes restantes.",
    subject: "Matemática",
    topic: "Operações Fundamentais",
    difficulty: "EASY",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },

  // CONHECIMENTOS PEDAGÓGICOS & LEGISLAÇÃO
  {
    statement: "Segundo a LDB (Lei 9.394/96), a educação infantil, primeira etapa da educação básica, tem como finalidade:",
    alternatives: [
      "Preparar a criança para o ensino fundamental",
      "Desenvolver integralmente a criança até 5 anos de idade", // CORRETA
      "Ensinar a criança a ler e escrever",
      "Substituir a família na educação da criança"
    ],
    correctAnswer: 1,
    explanation: "A LDB estabelece que a educação infantil visa o desenvolvimento integral da criança até 5 anos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "LDB - Lei 9.394/96",
    difficulty: "MEDIUM",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },
  {
    statement: "O Estatuto da Criança e do Adolescente (ECA) considera criança a pessoa:",
    alternatives: [
      "Até 10 anos de idade",
      "Até 12 anos incompletos", // CORRETA
      "Até 14 anos de idade",
      "Até 16 anos de idade"
    ],
    correctAnswer: 1,
    explanation: "O ECA considera criança a pessoa até 12 anos de idade incompletos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "ECA - Lei 8.069/90",
    difficulty: "EASY",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },
  {
    statement: "De acordo com a Constituição Federal, o ensino será ministrado com base nos seguintes princípios, EXCETO:",
    alternatives: [
      "Igualdade de condições para o acesso e permanência na escola",
      "Liberdade de aprender, ensinar, pesquisar e divulgar o pensamento",
      "Cobrança de taxas em estabelecimentos oficiais", // CORRETA (EXCETO)
      "Gratuidade do ensino público em estabelecimentos oficiais"
    ],
    correctAnswer: 2,
    explanation: "A Constituição Federal estabelece a gratuidade do ensino público, sendo vedada a cobrança de taxas.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Constituição Federal - Art. 206",
    difficulty: "MEDIUM",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  },
  {
    statement: "Segundo Paulo Freire, a educação problematizadora se caracteriza por:",
    alternatives: [
      "Depositar conhecimentos nos alunos",
      "Manter a relação vertical professor-aluno",
      "Desenvolver a consciência crítica dos educandos", // CORRETA
      "Usar apenas métodos tradicionais de ensino"
    ],
    correctAnswer: 2,
    explanation: "Para Paulo Freire, a educação problematizadora visa desenvolver a consciência crítica e transformadora dos educandos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias Pedagógicas",
    difficulty: "MEDIUM",
    source: "PCI Concursos - Simulados",
    year: 2025,
    institution: "PCI Concursos"
  }
]

async function populateQuestions() {
  console.log('🚀 Iniciando população de questões...')
  
  try {
    let savedCount = 0
    
    for (const questionData of questionsData) {
      // Buscar ou criar disciplina
      let subject = await prisma.subject.findFirst({
        where: { name: questionData.subject }
      })
      
      if (!subject) {
        subject = await prisma.subject.create({
          data: {
            name: questionData.subject,
            description: `Disciplina: ${questionData.subject}`
          }
        })
        console.log(`✅ Disciplina criada: ${subject.name}`)
      }
      
      // Buscar ou criar tópico
      let topic = await prisma.topic.findFirst({
        where: { name: questionData.topic }
      })
      
      if (!topic) {
        topic = await prisma.topic.create({
          data: {
            name: questionData.topic,
            description: `Tópico: ${questionData.topic}`
          }
        })
        console.log(`✅ Tópico criado: ${topic.name}`)
      }
      
      // Verificar se questão já existe
      const existingQuestion = await prisma.question.findFirst({
        where: { statement: questionData.statement }
      })
      
      if (existingQuestion) {
        console.log(`⚠️  Questão já existe: ${questionData.statement.substring(0, 50)}...`)
        continue
      }
      
      // Criar questão
      const question = await prisma.question.create({
        data: {
          statement: questionData.statement,
          type: 'MULTIPLE_CHOICE',
          difficulty: questionData.difficulty as any,
          explanation: questionData.explanation,
          subjectId: subject.id,
          topicId: topic.id,
          source: questionData.source,
          year: questionData.year,
          institution: questionData.institution,
          correctAnswer: 'temp' // Será atualizado depois
        }
      })
      
      // Criar alternativas
      const alternatives = []
      for (let i = 0; i < questionData.alternatives.length; i++) {
        const alternative = await prisma.alternative.create({
          data: {
            letter: String.fromCharCode(65 + i), // A, B, C, D
            text: questionData.alternatives[i],
            questionId: question.id
          }
        })
        alternatives.push(alternative)
      }
      
      // Atualizar questão com resposta correta
      await prisma.question.update({
        where: { id: question.id },
        data: { correctAnswer: alternatives[questionData.correctAnswer].id }
      })
      
      savedCount++
      console.log(`✅ Questão salva: ${questionData.subject} - ${questionData.topic}`)
    }
    
    console.log(`🎉 ${savedCount} questões salvas com sucesso!`)
    
    // Estatísticas
    console.log('\n📊 Estatísticas por disciplina:')
    const subjects = await prisma.subject.findMany()
    for (const subject of subjects) {
      const count = await prisma.question.count({
        where: { subjectId: subject.id }
      })
      if (count > 0) {
        console.log(`   ${subject.name}: ${count} questões`)
      }
    }
    
  } catch (error) {
    console.error('❌ Erro ao popular questões:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  populateQuestions()
}

export default populateQuestions
