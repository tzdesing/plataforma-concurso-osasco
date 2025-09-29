'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: string
  statement: string
  alternatives: Array<{
    id: string
    letter: string
    text: string
  }>
  correctAnswer: string
  explanation?: string
  subject: string
  topic?: string
  difficulty?: string
}

// Mock data - será substituído por dados reais do banco
const mockQuestions: Question[] = [
  {
    id: '1',
    subject: 'Língua Portuguesa',
    statement: 'Leia o texto abaixo e responda à questão.\n\n"A educação é a arma mais poderosa que você pode usar para mudar o mundo." (Nelson Mandela)\n\nNo contexto da frase de Mandela, a palavra "arma" foi empregada em sentido:',
    alternatives: [
      { id: 'a', letter: 'A', text: 'Literal, referindo-se a um objeto bélico.' },
      { id: 'b', letter: 'B', text: 'Figurado, como instrumento de transformação.' },
      { id: 'c', letter: 'C', text: 'Pejorativo, indicando algo negativo.' },
      { id: 'd', letter: 'D', text: 'Técnico, relacionado à área militar.' },
      { id: 'e', letter: 'E', text: 'Coloquial, usado informalmente.' }
    ],
    correctAnswer: 'b',
    explanation: 'A palavra "arma" foi empregada em sentido figurado, representando a educação como um instrumento poderoso de transformação social.'
  },
  {
    id: '2',
    subject: 'Matemática',
    statement: 'Em uma escola, 60% dos alunos são meninas. Se há 240 meninas na escola, qual é o total de alunos?',
    alternatives: [
      { id: 'a', letter: 'A', text: '300 alunos' },
      { id: 'b', letter: 'B', text: '350 alunos' },
      { id: 'c', letter: 'C', text: '400 alunos' },
      { id: 'd', letter: 'D', text: '450 alunos' },
      { id: 'e', letter: 'E', text: '500 alunos' }
    ],
    correctAnswer: 'c',
    explanation: 'Se 240 meninas representam 60% do total, então: 240 ÷ 0,6 = 400 alunos no total.'
  },
  {
    id: '3',
    subject: 'Conhecimentos Pedagógicos',
    statement: 'De acordo com a Lei de Diretrizes e Bases da Educação Nacional (LDB - Lei 9.394/96), a educação básica tem por finalidade:',
    alternatives: [
      { id: 'a', letter: 'A', text: 'Desenvolver apenas o raciocínio lógico-matemático.' },
      { id: 'b', letter: 'B', text: 'Preparar exclusivamente para o mercado de trabalho.' },
      { id: 'c', letter: 'C', text: 'Desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores.' },
      { id: 'd', letter: 'D', text: 'Focar apenas no desenvolvimento de habilidades técnicas.' },
      { id: 'e', letter: 'E', text: 'Priorizar o ensino de línguas estrangeiras.' }
    ],
    correctAnswer: 'c',
    explanation: 'Conforme o Art. 22 da LDB, a educação básica tem por finalidade desenvolver o educando, assegurar-lhe a formação comum indispensável para o exercício da cidadania e fornecer-lhe meios para progredir no trabalho e em estudos posteriores.'
  }
]

export default function SimuladoCompletoPage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60) // 3 horas em segundos
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Buscar questões reais da API
  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      // Tentar buscar questões balanceadas primeiro
      const response = await fetch('/api/questions/balanced?total=40')
      const result = await response.json()
      
      if (result.success && result.questions.length > 0) {
        console.log('✅ Questões balanceadas carregadas:', result.distribution)
        
        // Converter formato da API para o formato esperado
        const formattedQuestions: Question[] = result.questions.map((q: any) => ({
          id: q.id,
          statement: q.statement,
          alternatives: q.alternatives,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subject: q.subject,
          topic: q.topic,
          difficulty: q.difficulty
        }))
        setQuestions(formattedQuestions)
      } else {
        console.log('❌ Falha na API balanceada, tentando API normal...')
        
        // Fallback para API normal
        const fallbackResponse = await fetch('/api/questions?limit=40')
        const fallbackResult = await fallbackResponse.json()
        
        if (fallbackResult.success && fallbackResult.questions.length > 0) {
          const formattedQuestions: Question[] = fallbackResult.questions.map((q: any) => ({
            id: q.id,
            statement: q.statement,
            alternatives: q.alternatives,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            subject: q.subject,
            topic: q.topic,
            difficulty: q.difficulty
          }))
          setQuestions(formattedQuestions)
        } else {
          console.log('⚠️ Usando questões mock - banco vazio')
        }
      }
    } catch (error) {
      console.error('❌ Erro ao buscar questões:', error)
      console.log('⚠️ Usando questões mock')
    } finally {
      setLoading(false)
    }
  }

  // Timer
  useEffect(() => {
    if (!isStarted || isFinished) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true)
          setShowResults(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isStarted, isFinished])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleFinish = () => {
    setIsFinished(true)
    setShowResults(true)
  }

  const calculateResults = () => {
    let correct = 0
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando questões...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Simulado Completo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {questions.filter(q => q.subject === 'Língua Portuguesa').length}
                  </div>
                  <div className="text-sm text-gray-600">Português</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {questions.filter(q => q.subject === 'Matemática').length}
                  </div>
                  <div className="text-sm text-gray-600">Matemática</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {questions.filter(q => q.subject && q.subject.includes('Pedagógicos')).length}
                  </div>
                  <div className="text-sm text-gray-600">Pedagógicos</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                <Clock className="h-5 w-5" />
                <span>Duração: 3 horas</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Instruções:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• O simulado tem {questions.length} questões de múltipla escolha</li>
                <li>• Você tem 3 horas para completar</li>
                <li>• Pode navegar entre as questões livremente</li>
                <li>• O gabarito será mostrado ao final</li>
                <li>• O tempo será cronometrado automaticamente</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link href="/simulados" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <Button 
                onClick={() => setIsStarted(true)} 
                className="flex-1"
              >
                Iniciar Simulado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const results = calculateResults()
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Resultado do Simulado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {results.percentage}%
              </div>
              <div className="text-xl text-gray-600">
                {results.correct} de {results.total} questões corretas
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{results.correct}</div>
                <div className="text-sm text-green-700">Acertos</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{results.total - results.correct}</div>
                <div className="text-sm text-red-700">Erros</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formatTime(3 * 60 * 60 - timeLeft)}</div>
                <div className="text-sm text-blue-700">Tempo Usado</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Revisão das Questões</h3>
              {questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect = userAnswer === question.correctAnswer
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-2">
                          Questão {index + 1} - {question.subject}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {question.statement}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Sua resposta: </span>
                          <span className={userAnswer ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}>
                            {userAnswer ? question.alternatives.find(alt => alt.id === userAnswer)?.letter : 'Não respondida'}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Resposta correta: </span>
                          <span className="text-green-600">
                            {question.alternatives.find(alt => alt.id === question.correctAnswer)?.letter}
                          </span>
                        </div>
                        {question.explanation && (
                          <div className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                            <strong>Explicação:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-4">
              <Link href="/simulados" className="flex-1">
                <Button variant="outline" className="w-full">
                  Voltar aos Simulados
                </Button>
              </Link>
              <Link href="/relatorios" className="flex-1">
                <Button className="w-full">
                  Ver Relatórios Detalhados
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header com timer e progresso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/simulados">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </Link>
            <div className="text-sm text-gray-600">
              Questão {currentQuestion + 1} de {questions.length}
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            timeLeft < 600 ? 'bg-red-100 text-red-700' : 
            timeLeft < 1800 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-mono font-semibold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Questão */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {question.subject}
            </CardTitle>
            <div className="text-sm text-gray-500">
              Questão {currentQuestion + 1}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {question.statement}
            </p>
          </div>
          
          <div className="space-y-3">
            {question.alternatives.map((alternative) => (
              <label
                key={alternative.id}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  answers[question.id] === alternative.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={alternative.id}
                  checked={answers[question.id] === alternative.id}
                  onChange={() => handleAnswer(question.id, alternative.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="font-medium mr-2">{alternative.letter})</span>
                  <span>{alternative.text}</span>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navegação */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        <div className="flex gap-2">
          {currentQuestion === questions.length - 1 ? (
            <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
              Finalizar Simulado
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Próxima
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Mapa de questões */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Mapa de Questões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 text-xs rounded border ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white border-blue-600'
                    : answers[questions[index].id]
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Atual</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Respondida</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
              <span>Não respondida</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
