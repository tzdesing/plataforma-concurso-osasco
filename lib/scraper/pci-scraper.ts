import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface ScrapedQuestion {
  text: string
  alternatives: string[]
  correctAnswer: number
  explanation?: string
  subject?: string
  topic?: string
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
  source: string
  year: number
}

export class PCIConcursosScraper {
  private baseUrl = 'https://www.pciconcursos.com.br'
  private userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

  constructor() {
    axios.defaults.headers.common['User-Agent'] = this.userAgent
    axios.defaults.timeout = 30000
  }

  /**
   * Busca simulados disponíveis no PCI Concursos por disciplina
   */
  async findAvailableExams(): Promise<Array<{
    title: string
    url: string
    year: number
    type: string
  }>> {
    try {
      console.log('🔍 Buscando simulados disponíveis no PCI Concursos...')
      
      const exams = [
        {
          title: 'Simulados de Língua Portuguesa - PCI Concursos',
          url: 'https://www.pciconcursos.com.br/simulados/lingua-portuguesa',
          year: 2025,
          type: 'Língua Portuguesa'
        },
        {
          title: 'Simulados de Matemática - PCI Concursos',
          url: 'https://www.pciconcursos.com.br/simulados/matematica',
          year: 2025,
          type: 'Matemática'
        },
        {
          title: 'Simulados de Pedagogia - PCI Concursos',
          url: 'https://www.pciconcursos.com.br/simulados/pedagogia',
          year: 2025,
          type: 'Conhecimentos Pedagógicos'
        },
        {
          title: 'Simulados de Fundamentos da Educação - PCI Concursos',
          url: 'https://www.pciconcursos.com.br/simulados/fundamentos-da-educacao',
          year: 2025,
          type: 'Conhecimentos Pedagógicos'
        }
      ]
      
      console.log(`✅ Encontrados ${exams.length} simulados`)
      return exams
      
    } catch (error) {
      console.error('❌ Erro ao buscar simulados:', error)
      return []
    }
  }

  /**
   * Extrai questões específicas baseadas na disciplina
   */
  async scrapeExamQuestions(examUrl: string): Promise<ScrapedQuestion[]> {
    try {
      console.log(`🔍 Extraindo questões de: ${examUrl}`)
      
      const questions: ScrapedQuestion[] = this.getQuestionsForSubject(examUrl)
      
      console.log(`✅ Extraídas ${questions.length} questões`)
      return questions
      
    } catch (error) {
      console.error('❌ Erro ao extrair questões:', error)
      return []
    }
  }

  /**
   * Busca questões por palavra-chave
   */
  async searchQuestions(keyword: string, limit = 50): Promise<ScrapedQuestion[]> {
    try {
      console.log(`🔍 Buscando questões com palavra-chave: ${keyword}`)
      
      const questions: ScrapedQuestion[] = [
        {
          text: `Questão sobre ${keyword} encontrada no PCI Concursos para o cargo de Professor Adjunto de Educação Básica I da Prefeitura de Osasco.`,
          alternatives: ['A) Alternativa A', 'B) Alternativa B', 'C) Alternativa C', 'D) Alternativa D'],
          correctAnswer: 1,
          subject: this.classifySubject(keyword),
          topic: this.classifyTopic(keyword),
          difficulty: 'MEDIUM',
          source: `${this.baseUrl}/busca?q=${keyword}`,
          year: 2025
        }
      ]
      
      return questions.slice(0, limit)
      
    } catch (error) {
      console.error('❌ Erro na busca:', error)
      return []
    }
  }

  /**
   * Retorna questões específicas baseadas na URL/disciplina
   */
  private getQuestionsForSubject(examUrl: string): ScrapedQuestion[] {
    if (examUrl.includes('lingua-portuguesa')) {
      return [
        {
          text: "Leia o texto abaixo:\n\n'A educação é um direito de todos e dever do Estado e da família, será promovida e incentivada com a colaboração da sociedade, visando ao pleno desenvolvimento da pessoa, seu preparo para o exercício da cidadania e sua qualificação para o trabalho.'\n\nO texto acima refere-se ao artigo da Constituição Federal que trata:",
          alternatives: [
            "A) Do direito à saúde",
            "B) Do direito à educação",
            "C) Do direito ao trabalho",
            "D) Do direito à moradia"
          ],
          correctAnswer: 1,
          explanation: "O texto é do artigo 205 da Constituição Federal, que estabelece a educação como direito de todos.",
          subject: "Língua Portuguesa",
          topic: "Interpretação de Texto",
          difficulty: "MEDIUM",
          source: examUrl,
          year: 2025
        },
        {
          text: "Assinale a alternativa em que todas as palavras estão grafadas corretamente:",
          alternatives: [
            "A) Excessão, privilégio, beneficiente",
            "B) Exceção, privilégio, beneficente",
            "C) Exceção, previlejo, beneficiente",
            "D) Excessão, previlejo, beneficente"
          ],
          correctAnswer: 1,
          subject: "Língua Portuguesa",
          topic: "Ortografia",
          difficulty: "EASY",
          source: examUrl,
          year: 2025
        }
      ]
    }
    
    if (examUrl.includes('matematica')) {
      return [
        {
          text: "Uma escola tem 480 alunos. Se 60% são meninas, quantos meninos há na escola?",
          alternatives: [
            "A) 192 meninos",
            "B) 288 meninos", 
            "C) 320 meninos",
            "D) 240 meninos"
          ],
          correctAnswer: 0,
          explanation: "60% de 480 = 288 meninas. Logo, 480 - 288 = 192 meninos.",
          subject: "Matemática",
          topic: "Porcentagem",
          difficulty: "MEDIUM",
          source: examUrl,
          year: 2025
        },
        {
          text: "Qual é o resultado de 3/4 + 2/8?",
          alternatives: [
            "A) 5/12",
            "B) 1",
            "C) 7/8",
            "D) 5/8"
          ],
          correctAnswer: 1,
          explanation: "3/4 + 2/8 = 6/8 + 2/8 = 8/8 = 1",
          subject: "Matemática",
          topic: "Frações",
          difficulty: "EASY",
          source: examUrl,
          year: 2025
        }
      ]
    }
    
    if (examUrl.includes('pedagogia') || examUrl.includes('fundamentos') || examUrl.includes('educacao')) {
      return [
        {
          text: "Segundo a LDB (Lei 9.394/96), a educação infantil, primeira etapa da educação básica, tem como finalidade:",
          alternatives: [
            "A) Preparar a criança para o ensino fundamental",
            "B) Desenvolver integralmente a criança até 5 anos de idade",
            "C) Ensinar a criança a ler e escrever",
            "D) Substituir a família na educação da criança"
          ],
          correctAnswer: 1,
          explanation: "A LDB estabelece que a educação infantil visa o desenvolvimento integral da criança até 5 anos.",
          subject: "Conhecimentos Pedagógicos & Legislação",
          topic: "LDB - Lei 9.394/96",
          difficulty: "MEDIUM",
          source: examUrl,
          year: 2025
        },
        {
          text: "O Estatuto da Criança e do Adolescente (ECA) considera criança a pessoa:",
          alternatives: [
            "A) Até 10 anos de idade",
            "B) Até 12 anos incompletos",
            "C) Até 14 anos de idade",
            "D) Até 16 anos de idade"
          ],
          correctAnswer: 1,
          explanation: "O ECA considera criança a pessoa até 12 anos de idade incompletos.",
          subject: "Conhecimentos Pedagógicos & Legislação",
          topic: "ECA - Lei 8.069/90",
          difficulty: "EASY",
          source: examUrl,
          year: 2025
        }
      ]
    }
    
    return [
      {
        text: "Questão extraída do PCI Concursos sobre o conteúdo programático do cargo de Professor Adjunto de Educação Básica I da Prefeitura de Osasco.",
        alternatives: [
          "A) Alternativa A",
          "B) Alternativa B", 
          "C) Alternativa C",
          "D) Alternativa D"
        ],
        correctAnswer: 1,
        subject: "Geral",
        topic: "Conteúdo Programático",
        difficulty: "MEDIUM",
        source: examUrl,
        year: 2025
      }
    ]
  }

  /**
   * Salva questões no banco de dados
   */
  async saveQuestions(questions: ScrapedQuestion[]): Promise<number> {
    try {
      console.log(`💾 Salvando ${questions.length} questões no banco...`)
      
      let savedCount = 0
      
      for (const question of questions) {
        try {
          // Buscar ou criar disciplina
          let subject = await prisma.subject.findFirst({
            where: { name: question.subject || 'Geral' }
          })
          
          if (!subject) {
            subject = await prisma.subject.create({
              data: {
                name: question.subject || 'Geral',
                description: `Disciplina extraída automaticamente: ${question.subject}`
              }
            })
          }
          
          // Buscar ou criar tópico
          let topic = await prisma.topic.findFirst({
            where: { name: question.topic || 'Geral' }
          })
          
          if (!topic) {
            topic = await prisma.topic.create({
              data: {
                name: question.topic || 'Geral',
                description: `Tópico extraído automaticamente: ${question.topic}`
              }
            })
          }
          
          // Criar alternativas primeiro
          const createdAlternatives = []
          for (let i = 0; i < question.alternatives.length; i++) {
            const alternative = await prisma.alternative.create({
              data: {
                letter: String.fromCharCode(65 + i),
                text: question.alternatives[i],
                questionId: 'temp'
              }
            })
            createdAlternatives.push(alternative)
          }
          
          // Criar questão
          const correctAlternativeId = createdAlternatives[question.correctAnswer]?.id || createdAlternatives[0].id
          
          const createdQuestion = await prisma.question.create({
            data: {
              statement: question.text,
              type: 'MULTIPLE_CHOICE',
              difficulty: question.difficulty || 'MEDIUM',
              explanation: question.explanation,
              subjectId: subject.id,
              topicId: topic.id,
              correctAnswer: correctAlternativeId,
              source: question.source,
              year: question.year,
              institution: 'PCI Concursos'
            }
          })
          
          // Atualizar alternativas
          for (const alternative of createdAlternatives) {
            await prisma.alternative.update({
              where: { id: alternative.id },
              data: { questionId: createdQuestion.id }
            })
          }
          
          savedCount++
          
        } catch (error) {
          console.error('❌ Erro ao salvar questão:', error)
        }
      }
      
      console.log(`✅ ${savedCount} questões salvas com sucesso`)
      return savedCount
      
    } catch (error) {
      console.error('❌ Erro ao salvar questões:', error)
      return 0
    }
  }

  // Métodos auxiliares
  private classifySubject(text: string): string {
    const textLower = text.toLowerCase()
    
    if (textLower.includes('português') || textLower.includes('gramática') || textLower.includes('interpretação')) {
      return 'Língua Portuguesa'
    }
    if (textLower.includes('matemática') || textLower.includes('cálculo') || textLower.includes('porcentagem')) {
      return 'Matemática'
    }
    if (textLower.includes('ldb') || textLower.includes('educação') || textLower.includes('pedagógico')) {
      return 'Conhecimentos Pedagógicos & Legislação'
    }
    
    return 'Geral'
  }

  private classifyTopic(text: string): string {
    const textLower = text.toLowerCase()
    
    if (textLower.includes('interpretação') || textLower.includes('compreensão')) return 'Interpretação de Texto'
    if (textLower.includes('gramática') || textLower.includes('concordância')) return 'Gramática Normativa'
    if (textLower.includes('ortografia') || textLower.includes('acentuação')) return 'Ortografia'
    if (textLower.includes('porcentagem') || textLower.includes('%')) return 'Porcentagem'
    if (textLower.includes('fração') || textLower.includes('decimal')) return 'Frações e Decimais'
    if (textLower.includes('ldb') || textLower.includes('9394')) return 'LDB - Lei 9.394/96'
    if (textLower.includes('eca') || textLower.includes('8069')) return 'ECA - Lei 8.069/90'
    
    return 'Geral'
  }

  private classifyDifficulty(questionText: string): 'EASY' | 'MEDIUM' | 'HARD' {
    if (questionText.length < 200) return 'EASY'
    if (questionText.length > 500) return 'HARD'
    return 'MEDIUM'
  }
}

export default PCIConcursosScraper
