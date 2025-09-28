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

export class VunespScraper {
  private baseUrl = 'https://www.vunesp.com.br'
  private userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

  constructor() {
    // Configurar axios com headers apropriados
    axios.defaults.headers.common['User-Agent'] = this.userAgent
    axios.defaults.timeout = 30000
  }

  /**
   * Busca provas disponíveis no site da VUNESP
   */
  async findAvailableExams(): Promise<Array<{
    title: string
    url: string
    year: number
    type: string
  }>> {
    try {
      console.log('🔍 Buscando provas disponíveis na VUNESP...')
      
      // Por enquanto, retornar dados simulados até implementar parser HTML nativo
      const exams = [
        {
          title: 'Concurso Professor Adjunto - Prefeitura de Osasco 2025',
          url: 'https://vunesp.com.br/osasco2025',
          year: 2025,
          type: 'Professor'
        },
        {
          title: 'Concurso Educação Básica - São Paulo 2024',
          url: 'https://vunesp.com.br/sp2024',
          year: 2024,
          type: 'Professor'
        }
      ]
      
      console.log(`✅ Encontradas ${exams.length} provas`)
      return exams
      
    } catch (error) {
      console.error('❌ Erro ao buscar provas:', error)
      return []
    }
  }

  /**
   * Extrai questões de uma prova específica
   */
  async scrapeExamQuestions(examUrl: string): Promise<ScrapedQuestion[]> {
    try {
      console.log(`🔍 Extraindo questões de: ${examUrl}`)
      
      // Por enquanto, retornar questões simuladas
      const questions: ScrapedQuestion[] = [
        {
          text: "Qual é o principal objetivo da Lei de Diretrizes e Bases da Educação Nacional (LDB)?",
          alternatives: [
            "A) Regulamentar apenas o ensino superior",
            "B) Estabelecer diretrizes e bases da educação nacional",
            "C) Definir salários dos professores",
            "D) Criar universidades públicas"
          ],
          correctAnswer: 1,
          explanation: "A LDB tem como objetivo estabelecer as diretrizes e bases da educação nacional em todos os níveis.",
          subject: "Conhecimentos Pedagógicos & Legislação",
          topic: "LDB - Lei 9.394/96",
          difficulty: "MEDIUM",
          source: examUrl,
          year: this.extractYearFromUrl(examUrl)
        },
        {
          text: "Em uma interpretação de texto, qual é a diferença entre informação explícita e implícita?",
          alternatives: [
            "A) Não há diferença entre elas",
            "B) Explícita está claramente expressa no texto, implícita precisa ser deduzida",
            "C) Implícita é mais importante que explícita",
            "D) Explícita é sempre verdadeira"
          ],
          correctAnswer: 1,
          subject: "Língua Portuguesa",
          topic: "Interpretação de Texto",
          difficulty: "EASY",
          source: examUrl,
          year: this.extractYearFromUrl(examUrl)
        }
      ]
      
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
      
      // Simulação de busca por palavra-chave
      const questions: ScrapedQuestion[] = [
        {
          text: `Questão sobre ${keyword}: Exemplo de questão encontrada na busca.`,
          alternatives: ['A) Opção A', 'B) Opção B', 'C) Opção C', 'D) Opção D'],
          correctAnswer: 0,
          subject: this.classifySubject(keyword),
          topic: this.classifyTopic(keyword),
          difficulty: 'MEDIUM',
          source: `${this.baseUrl}/busca?q=${keyword}`,
          year: new Date().getFullYear()
        }
      ]
      
      return questions.slice(0, limit)
      
    } catch (error) {
      console.error('❌ Erro na busca:', error)
      return []
    }
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
          
          // Criar alternativas primeiro para obter o ID da correta
          const createdAlternatives = []
          for (let i = 0; i < question.alternatives.length; i++) {
            const alternative = await prisma.alternative.create({
              data: {
                letter: String.fromCharCode(65 + i), // A, B, C, D...
                text: question.alternatives[i],
                questionId: 'temp' // Será atualizado depois
              }
            })
            createdAlternatives.push(alternative)
          }
          
          // Criar questão com ID da alternativa correta
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
              institution: 'VUNESP'
            }
          })
          
          // Atualizar alternativas com questionId correto
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
  private extractExamType(title: string): string {
    if (title.toLowerCase().includes('professor')) return 'Professor'
    if (title.toLowerCase().includes('técnico')) return 'Técnico'
    if (title.toLowerCase().includes('analista')) return 'Analista'
    return 'Geral'
  }

  private extractCorrectAnswer(answerText: string, alternatives: string[]): number {
    const match = answerText.match(/[A-E]/i)
    if (match) {
      return match[0].toUpperCase().charCodeAt(0) - 65 // A=0, B=1, etc.
    }
    return 0
  }

  private extractYearFromUrl(url: string): number {
    const match = url.match(/20\d{2}/)
    return match ? parseInt(match[0]) : new Date().getFullYear()
  }

  private classifySubject(questionText: string): string {
    const text = questionText.toLowerCase()
    
    if (text.includes('português') || text.includes('gramática') || text.includes('interpretação')) {
      return 'Língua Portuguesa'
    }
    if (text.includes('matemática') || text.includes('cálculo') || text.includes('porcentagem')) {
      return 'Matemática'
    }
    if (text.includes('ldb') || text.includes('educação') || text.includes('pedagógico')) {
      return 'Conhecimentos Pedagógicos & Legislação'
    }
    
    return 'Geral'
  }

  private classifyTopic(questionText: string): string {
    const text = questionText.toLowerCase()
    
    // Português
    if (text.includes('interpretação') || text.includes('compreensão')) return 'Interpretação de Texto'
    if (text.includes('gramática') || text.includes('concordância')) return 'Gramática Normativa'
    if (text.includes('ortografia') || text.includes('acentuação')) return 'Ortografia'
    
    // Matemática
    if (text.includes('porcentagem') || text.includes('%')) return 'Porcentagem'
    if (text.includes('fração') || text.includes('decimal')) return 'Frações e Decimais'
    if (text.includes('operação') || text.includes('soma') || text.includes('multiplicação')) return 'Operações Fundamentais'
    
    // Pedagógicos
    if (text.includes('ldb') || text.includes('9394')) return 'LDB - Lei 9.394/96'
    if (text.includes('eca') || text.includes('8069')) return 'ECA - Lei 8.069/90'
    if (text.includes('constituição')) return 'Constituição Federal'
    
    return 'Geral'
  }

  private classifyDifficulty(questionText: string): 'EASY' | 'MEDIUM' | 'HARD' {
    // Lógica simples baseada no tamanho e complexidade
    if (questionText.length < 200) return 'EASY'
    if (questionText.length > 500) return 'HARD'
    return 'MEDIUM'
  }
}

export default VunespScraper
