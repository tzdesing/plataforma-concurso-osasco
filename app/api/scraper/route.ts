import { NextRequest, NextResponse } from 'next/server'
import PCIConcursosScraper from '@/lib/scraper/pci-scraper'
import PDFParser from '@/lib/scraper/pdf-parser'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const keyword = searchParams.get('keyword')
    const limit = parseInt(searchParams.get('limit') || '20')

    const scraper = new PCIConcursosScraper()

    switch (action) {
      case 'find-exams':
        const exams = await scraper.findAvailableExams()
        return NextResponse.json({ 
          success: true, 
          data: exams,
          message: `Encontradas ${exams.length} provas disponíveis`
        })

      case 'search-questions':
        if (!keyword) {
          return NextResponse.json({ 
            success: false, 
            message: 'Palavra-chave é obrigatória para busca' 
          }, { status: 400 })
        }
        
        const questions = await scraper.searchQuestions(keyword, limit)
        return NextResponse.json({ 
          success: true, 
          data: questions,
          message: `Encontradas ${questions.length} questões`
        })

      case 'scrape-exam':
        const examUrl = searchParams.get('url')
        if (!examUrl) {
          return NextResponse.json({ 
            success: false, 
            message: 'URL da prova é obrigatória' 
          }, { status: 400 })
        }
        
        const examQuestions = await scraper.scrapeExamQuestions(examUrl)
        const savedCount = await scraper.saveQuestions(examQuestions)
        
        return NextResponse.json({ 
          success: true, 
          data: { 
            extracted: examQuestions.length, 
            saved: savedCount 
          },
          message: `${savedCount} questões salvas com sucesso`
        })

      default:
        return NextResponse.json({ 
          success: false, 
          message: 'Ação não reconhecida. Use: find-exams, search-questions, ou scrape-exam' 
        }, { status: 400 })
    }

  } catch (error) {
    console.error('❌ Erro na API do scraper:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    const scraper = new PCIConcursosScraper()
    const pdfParser = new PDFParser()

    switch (action) {
      case 'import-questions':
        if (!data.questions || !Array.isArray(data.questions)) {
          return NextResponse.json({ 
            success: false, 
            message: 'Lista de questões é obrigatória' 
          }, { status: 400 })
        }
        
        const savedCount = await scraper.saveQuestions(data.questions)
        return NextResponse.json({ 
          success: true, 
          data: { saved: savedCount },
          message: `${savedCount} questões importadas com sucesso`
        })

      case 'parse-pdf':
        if (!data.filePath) {
          return NextResponse.json({ 
            success: false, 
            message: 'Caminho do arquivo PDF é obrigatório' 
          }, { status: 400 })
        }
        
        const pdfQuestions = await pdfParser.parsePDF(data.filePath)
        const pdfSavedCount = await scraper.saveQuestions(pdfQuestions)
        
        return NextResponse.json({ 
          success: true, 
          data: { 
            extracted: pdfQuestions.length, 
            saved: pdfSavedCount 
          },
          message: `${pdfSavedCount} questões extraídas do PDF e salvas`
        })

      case 'batch-scrape':
        if (!data.urls || !Array.isArray(data.urls)) {
          return NextResponse.json({ 
            success: false, 
            message: 'Lista de URLs é obrigatória' 
          }, { status: 400 })
        }
        
        let totalExtracted = 0
        let totalSaved = 0
        
        for (const url of data.urls) {
          try {
            const questions = await scraper.scrapeExamQuestions(url)
            const saved = await scraper.saveQuestions(questions)
            totalExtracted += questions.length
            totalSaved += saved
          } catch (error) {
            console.error(`❌ Erro ao processar ${url}:`, error)
          }
        }
        
        return NextResponse.json({ 
          success: true, 
          data: { 
            extracted: totalExtracted, 
            saved: totalSaved,
            processed: data.urls.length
          },
          message: `Processadas ${data.urls.length} provas, ${totalSaved} questões salvas`
        })

      default:
        return NextResponse.json({ 
          success: false, 
          message: 'Ação não reconhecida. Use: import-questions, parse-pdf, ou batch-scrape' 
        }, { status: 400 })
    }

  } catch (error) {
    console.error('❌ Erro na API do scraper (POST):', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
