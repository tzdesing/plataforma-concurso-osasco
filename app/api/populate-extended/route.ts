import { NextResponse } from 'next/server'
import populateExtendedQuestions from '@/scripts/populate-extended-questions'

export async function POST() {
  try {
    console.log('🚀 Iniciando população de questões estendidas (120+ questões)...')
    
    // Executar o script de população estendida
    await populateExtendedQuestions()
    
    return NextResponse.json({
      success: true,
      message: '120+ questões populadas com sucesso! Agora você pode gerar vários simulados diferentes.',
      data: {
        total: '120+',
        subjects: {
          'Língua Portuguesa': '40 questões',
          'Matemática': '40 questões', 
          'Conhecimentos Pedagógicos': '40 questões'
        }
      }
    })
    
  } catch (error) {
    console.error('❌ Erro ao popular questões estendidas:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Erro ao popular questões estendidas',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
