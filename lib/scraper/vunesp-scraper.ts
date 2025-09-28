import axios from 'axios'
import * as cheerio from 'cheerio'
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
      
      const response = await axios.get(`${this.baseUrl}/concursos`)
      const $ = cheerio.load(response.data)
      
      const exams: Array<{title: string, url: string, year: number, type: string}> = []
      
      // Buscar links de provas (ajustar seletores conforme estrutura real)
      $('.exam-item, .concurso-item, .prova-item').each((_, element) => {
        const $el = $(element)
        const title = $el.find('h3, .title, .nome').text().trim()
        const link = $el.find('a').attr('href')
        
        if (title && link) {
          // Extrair ano do título
          const yearMatch = title.match(/20\d{2}/)
          const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear()
          
          exams.push({
            title,
            url: link.startsWith('http') ? link : `${this.baseUrl}${link}`,
            year,
            type: this.extractExamType(title)
          })
        }
      })
      
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
      
      const response = await axios.get(examUrl)
      const $ = cheerio.load(response.data)
      
      const questions: ScrapedQuestion[] = []
      
      // Buscar questões (ajustar seletores conforme estrutura real)
      $('.question, .questao, .pergunta').each((index, element) => {
        const $question = $(element)
        
        // Extrair texto da questão
        const questionText = $question.find('.question-text, .enunciado, .texto').text().trim()
        
        // Extrair alternativas
        const alternatives: string[] = []
        $question.find('.alternative, .alternativa, .opcao').each((_, alt) => {
          const altText = $(alt).text().trim()
          if (altText) alternatives.push(altText)
        })
        
        // Extrair resposta correta (se disponível)
        const correctAnswerText = $question.find('.correct, .correta, .gabarito').text()
        const correctAnswer = this.extractCorrectAnswer(correctAnswerText, alternatives)
        
        // Extrair explicação (se disponível)
        const explanation = $question.find('.explanation, .explicacao, .comentario').text().trim()
        
        if (questionText && alternatives.length >= 2) {
          questions.push({
            text: questionText,
            alternatives,
            correctAnswer: correctAnswer || 0,
            explanation: explanation || undefined,
            subject: this.classifySubject(questionText),
            topic: this.classifyTopic(questionText),
            difficulty: this.classifyDifficulty(questionText),
            source: examUrl,
            year: this.extractYearFromUrl(examUrl)
          })
        }
      })
      
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
      
      const searchUrl = `${this.baseUrl}/busca?q=${encodeURIComponent(keyword)}`
      const response = await axios.get(searchUrl)
      const $ = cheerio.load(response.data)
      
      const questions: ScrapedQuestion[] = []
      
      // Processar resultados da busca
      $('.search-result, .resultado').each((_, element) => {
        const $result = $(element)
        const link = $result.find('a').attr('href')
        
        if (link) {
          // Aqui você pode fazer scraping individual de cada resultado
          // Por enquanto, vamos simular
          questions.push({
            text: $result.find('.title, .titulo').text().trim(),
            alternatives: ['A) Opção A', 'B) Opção B', 'C) Opção C', 'D) Opção D'],
            correctAnswer: 0,
            source: link,
            year: new Date().getFullYear()
          })
        }
      })
      
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
          
          // Criar questão
          const createdQuestion = await prisma.question.create({
            data: {
              text: question.text,
              type: 'MULTIPLE_CHOICE',
              difficulty: question.difficulty || 'MEDIUM',
              explanation: question.explanation,
              subjectId: subject.id,
              topicId: topic.id,
              source: question.source,
              year: question.year
            }
          })
          
          // Criar alternativas
          for (let i = 0; i < question.alternatives.length; i++) {
            await prisma.alternative.create({
              data: {
                text: question.alternatives[i],
                isCorrect: i === question.correctAnswer,
                questionId: createdQuestion.id
              }
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
