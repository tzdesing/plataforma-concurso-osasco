import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    const limit = parseInt(searchParams.get('limit') || '10')
    const difficulty = searchParams.get('difficulty')
    
    // Buscar questões com filtros
    const questions = await prisma.question.findMany({
      where: {
        ...(subject && {
          subject: {
            name: {
              contains: subject,
              mode: 'insensitive'
            }
          }
        }),
        ...(difficulty && {
          difficulty: difficulty as any
        })
      },
      include: {
        subject: true,
        topic: true,
        alternatives: true
      },
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Formatar questões para o frontend
    const formattedQuestions = questions.map(question => ({
      id: question.id,
      statement: question.statement,
      alternatives: question.alternatives.map(alt => ({
        id: alt.id,
        letter: alt.letter,
        text: alt.text
      })),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      subject: question.subject?.name,
      topic: question.topic?.name,
      difficulty: question.difficulty,
      source: question.source,
      year: question.year
    }))
    
    return NextResponse.json({
      success: true,
      questions: formattedQuestions,
      total: formattedQuestions.length
    })
    
  } catch (error) {
    console.error('❌ Erro ao buscar questões:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar questões',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

// Endpoint para estatísticas
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body
    
    if (action === 'stats') {
      // Buscar estatísticas por disciplina
      const subjects = await prisma.subject.findMany({
        include: {
          _count: {
            select: { questions: true }
          }
        }
      })
      
      const stats = subjects.map(subject => ({
        name: subject.name,
        count: subject._count.questions,
        description: subject.description
      }))
      
      const totalQuestions = await prisma.question.count()
      
      return NextResponse.json({
        success: true,
        stats: {
          subjects: stats,
          total: totalQuestions
        }
      })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Ação não reconhecida'
    }, { status: 400 })
    
  } catch (error) {
    console.error('❌ Erro na API de questões:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
