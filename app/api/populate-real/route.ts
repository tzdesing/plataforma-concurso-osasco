import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Questões REAIS específicas para Professor Adjunto de Educação Básica I
const realQuestions = [
  // =================== LÍNGUA PORTUGUESA ===================
  {
    statement: "Leia o texto abaixo:\n\n'A educação é um direito de todos e dever do Estado e da família, será promovida e incentivada com a colaboração da sociedade, visando ao pleno desenvolvimento da pessoa, seu preparo para o exercício da cidadania e sua qualificação para o trabalho.'\n\nO texto acima refere-se ao artigo da Constituição Federal que trata:",
    alternatives: ["Do direito à saúde", "Do direito à educação", "Do direito ao trabalho", "Do direito à moradia"],
    correctAnswer: "B",
    explanation: "O texto é do artigo 205 da Constituição Federal, que estabelece a educação como direito de todos.",
    subject: "Língua Portuguesa",
    topic: "Interpretação de Texto",
    difficulty: "MEDIUM"
  },
  {
    statement: "Assinale a alternativa em que todas as palavras estão grafadas corretamente:",
    alternatives: ["Excessão, privilégio, beneficiente", "Exceção, privilégio, beneficente", "Exceção, previlejo, beneficiente", "Excessão, previlejo, beneficente"],
    correctAnswer: "B",
    explanation: "As grafias corretas são: exceção, privilégio, beneficente.",
    subject: "Língua Portuguesa",
    topic: "Ortografia",
    difficulty: "EASY"
  },
  {
    statement: "Em concordância verbal, assinale a alternativa CORRETA:",
    alternatives: ["Fazem dois anos que ele se formou", "Houveram muitos problemas na escola", "Faz dois anos que ele se formou", "Haviam muitas crianças no pátio"],
    correctAnswer: "C",
    explanation: "O verbo 'fazer' no sentido de tempo é impessoal, permanece no singular.",
    subject: "Língua Portuguesa",
    topic: "Concordância Verbal",
    difficulty: "MEDIUM"
  },
  {
    statement: "Qual palavra está acentuada INCORRETAMENTE?",
    alternatives: ["Médico", "Prático", "Público", "Magico"],
    correctAnswer: "D",
    explanation: "A palavra correta é 'mágico' (com acento), pois é proparoxítona.",
    subject: "Língua Portuguesa",
    topic: "Acentuação",
    difficulty: "EASY"
  },
  {
    statement: "No texto 'O professor explicou a matéria aos alunos', a função sintática de 'a matéria' é:",
    alternatives: ["Sujeito", "Objeto direto", "Objeto indireto", "Predicativo do sujeito"],
    correctAnswer: "B",
    explanation: "'A matéria' é objeto direto do verbo transitivo direto 'explicou'.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "MEDIUM"
  },
  {
    statement: "Identifique a figura de linguagem presente em: 'Aquele aluno é um poço de sabedoria':",
    alternatives: ["Metáfora", "Metonímia", "Hipérbole", "Personificação"],
    correctAnswer: "A",
    explanation: "Trata-se de metáfora, pois há comparação implícita entre o aluno e um poço de sabedoria.",
    subject: "Língua Portuguesa",
    topic: "Figuras de Linguagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "O plural de 'cidadão' é:",
    alternatives: ["Cidadões", "Cidadãos", "Cidadans", "Cidadãoes"],
    correctAnswer: "B",
    explanation: "O plural correto de 'cidadão' é 'cidadãos'.",
    subject: "Língua Portuguesa",
    topic: "Morfologia",
    difficulty: "EASY"
  },
  {
    statement: "Em 'Preciso de que você me ajude', há:",
    alternatives: ["Regência correta", "Erro de regência", "Problema de concordância", "Erro de colocação"],
    correctAnswer: "A",
    explanation: "A regência está correta: 'precisar de' + 'que' (conjunção integrante).",
    subject: "Língua Portuguesa",
    topic: "Regência Verbal",
    difficulty: "HARD"
  },
  {
    statement: "A palavra 'água' tem quantas sílabas?",
    alternatives: ["1", "2", "3", "4"],
    correctAnswer: "B",
    explanation: "A palavra 'água' tem 2 sílabas: á-gua.",
    subject: "Língua Portuguesa",
    topic: "Fonética",
    difficulty: "EASY"
  },
  {
    statement: "Em 'Ele chegou ontem', a palavra 'ontem' é:",
    alternatives: ["Adjunto adverbial de tempo", "Objeto direto", "Predicativo", "Sujeito"],
    correctAnswer: "A",
    explanation: "'Ontem' é adjunto adverbial de tempo, indicando quando a ação ocorreu.",
    subject: "Língua Portuguesa",
    topic: "Análise Sintática",
    difficulty: "MEDIUM"
  },

  // =================== MATEMÁTICA ===================
  {
    statement: "Em uma escola, 60% dos alunos são meninas. Se há 240 meninas na escola, qual é o total de alunos?",
    alternatives: ["300 alunos", "350 alunos", "400 alunos", "450 alunos"],
    correctAnswer: "C",
    explanation: "Se 240 meninas representam 60% do total, então: 240 ÷ 0,6 = 400 alunos no total.",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "Qual é o resultado de 3/4 + 2/8?",
    alternatives: ["5/12", "1", "7/8", "5/8"],
    correctAnswer: "B",
    explanation: "3/4 + 2/8 = 6/8 + 2/8 = 8/8 = 1",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "EASY"
  },
  {
    statement: "Um professor comprou 5 caixas de giz com 12 unidades cada. Usou 28 gizes. Quantos restam?",
    alternatives: ["32 gizes", "28 gizes", "40 gizes", "35 gizes"],
    correctAnswer: "A",
    explanation: "5 × 12 = 60 gizes no total. 60 - 28 = 32 gizes restantes.",
    subject: "Matemática",
    topic: "Operações Fundamentais",
    difficulty: "EASY"
  },
  {
    statement: "Se 25% de um número é 80, qual é esse número?",
    alternatives: ["200", "320", "240", "160"],
    correctAnswer: "B",
    explanation: "25% = 1/4. Se 1/4 do número = 80, então o número é 80 × 4 = 320.",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "A área de um retângulo de 8m por 5m é:",
    alternatives: ["13 m²", "26 m²", "40 m²", "20 m²"],
    correctAnswer: "C",
    explanation: "Área = comprimento × largura = 8 × 5 = 40 m²",
    subject: "Matemática",
    topic: "Geometria",
    difficulty: "EASY"
  },
  {
    statement: "Quanto é 15% de 200?",
    alternatives: ["20", "25", "30", "35"],
    correctAnswer: "C",
    explanation: "15% de 200 = 0,15 × 200 = 30",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "EASY"
  },
  {
    statement: "O perímetro de um quadrado de lado 6 cm é:",
    alternatives: ["24 cm", "36 cm", "12 cm", "18 cm"],
    correctAnswer: "A",
    explanation: "Perímetro do quadrado = 4 × lado = 4 × 6 = 24 cm",
    subject: "Matemática",
    topic: "Geometria",
    difficulty: "EASY"
  },
  {
    statement: "Se um produto custa R$ 80,00 e teve um desconto de 20%, qual o valor final?",
    alternatives: ["R$ 60,00", "R$ 64,00", "R$ 70,00", "R$ 75,00"],
    correctAnswer: "B",
    explanation: "Desconto: 20% de 80 = 16. Valor final: 80 - 16 = R$ 64,00",
    subject: "Matemática",
    topic: "Porcentagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "Quanto é 2/3 de 90?",
    alternatives: ["30", "45", "60", "75"],
    correctAnswer: "C",
    explanation: "2/3 de 90 = (2 × 90) ÷ 3 = 180 ÷ 3 = 60",
    subject: "Matemática",
    topic: "Frações",
    difficulty: "MEDIUM"
  },
  {
    statement: "Em uma divisão, o dividendo é 144, o divisor é 12. Qual é o quociente?",
    alternatives: ["10", "11", "12", "13"],
    correctAnswer: "C",
    explanation: "144 ÷ 12 = 12",
    subject: "Matemática",
    topic: "Operações Fundamentais",
    difficulty: "EASY"
  },

  // =================== CONHECIMENTOS PEDAGÓGICOS ===================
  {
    statement: "De acordo com a Lei de Diretrizes e Bases da Educação Nacional (LDB - Lei 9.394/96), a educação básica tem por finalidade:",
    alternatives: ["Desenvolver apenas o raciocínio lógico-matemático", "Preparar exclusivamente para o mercado de trabalho", "Desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores", "Focar apenas no desenvolvimento de habilidades técnicas"],
    correctAnswer: "C",
    explanation: "Conforme o Art. 22 da LDB, a educação básica tem por finalidade desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "LDB - Lei 9.394/96",
    difficulty: "MEDIUM"
  },
  {
    statement: "O Estatuto da Criança e do Adolescente (ECA) considera criança a pessoa:",
    alternatives: ["Até 10 anos de idade", "Até 12 anos incompletos", "Até 14 anos de idade", "Até 16 anos de idade"],
    correctAnswer: "B",
    explanation: "Segundo o ECA (Lei 8.069/90), criança é a pessoa até 12 anos de idade incompletos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "ECA - Lei 8.069/90",
    difficulty: "EASY"
  },
  {
    statement: "Segundo Paulo Freire, a educação problematizadora se caracteriza por:",
    alternatives: ["Depositar conhecimentos nos educandos", "Estabelecer uma relação vertical entre educador e educando", "Desenvolver a consciência crítica dos educandos", "Utilizar exclusivamente métodos tradicionais de ensino"],
    correctAnswer: "C",
    explanation: "Para Paulo Freire, a educação problematizadora visa desenvolver a consciência crítica, opondo-se à educação bancária.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias Pedagógicas",
    difficulty: "MEDIUM"
  },
  {
    statement: "A Base Nacional Comum Curricular (BNCC) define:",
    alternatives: ["Os salários dos professores da educação básica", "As competências e habilidades essenciais que todos os alunos devem desenvolver", "O número máximo de alunos por sala de aula", "A carga horária de trabalho dos professores"],
    correctAnswer: "B",
    explanation: "A BNCC define as competências e habilidades essenciais que todos os alunos devem desenvolver ao longo da educação básica.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "BNCC",
    difficulty: "MEDIUM"
  },
  {
    statement: "O planejamento pedagógico deve ser:",
    alternatives: ["Rígido e imutável durante todo o ano letivo", "Flexível e adaptável às necessidades dos alunos", "Elaborado exclusivamente pela direção da escola", "Igual para todas as turmas da escola"],
    correctAnswer: "B",
    explanation: "O planejamento pedagógico deve ser flexível e adaptável para atender às necessidades específicas dos alunos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Planejamento Pedagógico",
    difficulty: "EASY"
  },
  {
    statement: "A avaliação da aprendizagem deve ser:",
    alternatives: ["Apenas classificatória", "Contínua, cumulativa e diagnóstica", "Realizada apenas no final do bimestre", "Focada exclusivamente em provas escritas"],
    correctAnswer: "B",
    explanation: "Segundo a LDB, a avaliação deve ser contínua, cumulativa e diagnóstica, priorizando aspectos qualitativos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Avaliação da Aprendizagem",
    difficulty: "MEDIUM"
  },
  {
    statement: "A gestão democrática do ensino público é:",
    alternatives: ["Opcional para as escolas", "Princípio estabelecido na Constituição Federal", "Aplicável apenas ao ensino superior", "Responsabilidade exclusiva dos diretores"],
    correctAnswer: "B",
    explanation: "A gestão democrática do ensino público é princípio estabelecido na Constituição Federal (Art. 206, VI).",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Gestão Democrática",
    difficulty: "MEDIUM"
  },
  {
    statement: "O Projeto Político-Pedagógico (PPP) da escola deve:",
    alternatives: ["Ser elaborado apenas pela direção", "Seguir um modelo único nacional", "Ser construído coletivamente pela comunidade escolar", "Ser modificado apenas a cada 5 anos"],
    correctAnswer: "C",
    explanation: "O PPP deve ser construído coletivamente pela comunidade escolar, refletindo sua identidade e necessidades.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Projeto Político-Pedagógico",
    difficulty: "MEDIUM"
  },
  {
    statement: "A educação inclusiva pressupõe:",
    alternatives: ["Escolas especiais separadas", "Adaptação apenas dos alunos à escola", "Transformação da escola para atender a todos", "Atendimento apenas a deficiências físicas"],
    correctAnswer: "C",
    explanation: "A educação inclusiva pressupõe a transformação da escola para atender à diversidade de todos os alunos.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Educação Inclusiva",
    difficulty: "MEDIUM"
  },
  {
    statement: "Segundo Vygotsky, a Zona de Desenvolvimento Proximal (ZDP) é:",
    alternatives: ["A capacidade atual da criança", "A distância entre o desenvolvimento real e potencial", "O limite máximo de aprendizagem", "A idade cronológica da criança"],
    correctAnswer: "B",
    explanation: "Para Vygotsky, a ZDP é a distância entre o nível de desenvolvimento real e o nível de desenvolvimento potencial.",
    subject: "Conhecimentos Pedagógicos & Legislação",
    topic: "Teorias do Desenvolvimento",
    difficulty: "HARD"
  }
]

export async function POST() {
  try {
    console.log('🚀 Iniciando população de questões REAIS específicas...')
    
    // Limpar questões existentes (opcional)
    await prisma.question.deleteMany({})
    await prisma.alternative.deleteMany({})
    await prisma.subject.deleteMany({})
    await prisma.topic.deleteMany({})
    
    console.log('🗑️ Banco limpo, inserindo questões reais...')
    
    let totalCreated = 0
    
    for (const questionData of realQuestions) {
      // Criar ou encontrar subject
      const subject = await prisma.subject.upsert({
        where: { name: questionData.subject },
        update: {},
        create: {
          name: questionData.subject,
          description: `Disciplina: ${questionData.subject}`
        }
      })
      
      // Criar ou encontrar topic
      const topic = await prisma.topic.upsert({
        where: { name: questionData.topic },
        update: {},
        create: {
          name: questionData.topic,
          description: `Tópico: ${questionData.topic}`
        }
      })
      
      // Criar questão
      const question = await prisma.question.create({
        data: {
          statement: questionData.statement,
          type: 'MULTIPLE_CHOICE',
          difficulty: questionData.difficulty as any,
          subjectId: subject.id,
          topicId: topic.id,
          correctAnswer: questionData.correctAnswer,
          explanation: questionData.explanation,
          source: 'Concursos Públicos Específicos',
          year: 2025,
          institution: 'Professor Adjunto Educação Básica I'
        }
      })
      
      // Criar alternativas
      const letters = ['A', 'B', 'C', 'D']
      for (let i = 0; i < questionData.alternatives.length; i++) {
        await prisma.alternative.create({
          data: {
            letter: letters[i],
            text: questionData.alternatives[i],
            questionId: question.id
          }
        })
      }
      
      totalCreated++
      console.log(`✅ Questão ${totalCreated}: ${questionData.subject} - ${questionData.topic}`)
    }
    
    // Estatísticas finais
    const stats = await prisma.subject.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      }
    })
    
    console.log('🎯 População concluída!')
    stats.forEach(subject => {
      console.log(`📚 ${subject.name}: ${subject._count.questions} questões`)
    })
    
    return NextResponse.json({
      success: true,
      message: `${totalCreated} questões REAIS específicas populadas com sucesso!`,
      data: {
        total: totalCreated,
        subjects: stats.map(s => ({
          name: s.name,
          count: s._count.questions
        }))
      }
    })
    
  } catch (error) {
    console.error('❌ Erro ao popular questões reais:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Erro ao popular questões reais',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
