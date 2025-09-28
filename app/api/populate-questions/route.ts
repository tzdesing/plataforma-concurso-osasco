import { NextResponse } from 'next/server'
import populateQuestions from '@/scripts/populate-questions'

export async function POST() {
  try {
    console.log('🚀 Iniciando população de questões via API...')
    
    // Executar o script de população
    await populateQuestions()
    
    return NextResponse.json({
      success: true,
      message: 'Questões populadas com sucesso!'
    })
    
  } catch (error) {
    console.error('❌ Erro ao popular questões:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Erro ao popular questões',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
