import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const totalQuestions = parseInt(searchParams.get('total') || '40')
    
    // Distribuição desejada para o concurso
    const distribution = {
      'Língua Portuguesa': Math.ceil(totalQuestions * 0.25), // 25% = 10 questões
      'Matemática': Math.ceil(totalQuestions * 0.25), // 25% = 10 questões  
      'Conhecimentos Pedagógicos': Math.ceil(totalQuestions * 0.5) // 50% = 20 questões
    }
    
    console.log('🎯 Distribuição desejada:', distribution)
    
    const balancedQuestions = []
    
    // Buscar questões para cada disciplina
    for (const [subjectPattern, count] of Object.entries(distribution)) {
      let questions = []
      
      if (subjectPattern === 'Conhecimentos Pedagógicos') {
        // Buscar por qualquer subject que contenha "Pedagógicos"
        questions = await prisma.question.findMany({
          where: {
            subject: {
              name: {
                contains: 'Pedagógicos',
                mode: 'insensitive'
              }
            }
          },
          include: {
            subject: true,
            topic: true,
            alternatives: true
          },
          take: count,
          orderBy: {
            createdAt: 'desc'
          }
        })
      } else {
        // Buscar por nome exato
        questions = await prisma.question.findMany({
          where: {
            subject: {
              name: {
                equals: subjectPattern,
                mode: 'insensitive'
              }
            }
          },
          include: {
            subject: true,
            topic: true,
            alternatives: true
          },
          take: count,
          orderBy: {
            createdAt: 'desc'
          }
        })
      }
      
      console.log(`📚 ${subjectPattern}: encontradas ${questions.length} questões`)
      balancedQuestions.push(...questions)
    }
    
    // Embaralhar questões
    const shuffledQuestions = balancedQuestions.sort(() => Math.random() - 0.5)
    
    // Formatar questões para o frontend
    const formattedQuestions = shuffledQuestions.map(question => ({
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
    
    // Estatísticas da distribuição real
    const actualDistribution = formattedQuestions.reduce((acc, q) => {
      const subject = q.subject || 'Sem Disciplina'
      acc[subject] = (acc[subject] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log('✅ Distribuição real:', actualDistribution)
    
    return NextResponse.json({
      success: true,
      questions: formattedQuestions,
      total: formattedQuestions.length,
      distribution: {
        desired: distribution,
        actual: actualDistribution
      }
    })
    
  } catch (error) {
    console.error('❌ Erro ao buscar questões balanceadas:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar questões balanceadas',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
