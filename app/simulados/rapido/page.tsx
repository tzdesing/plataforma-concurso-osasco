'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Clock, Target, CheckCircle, Home } from 'lucide-react'
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

export default function SimuladoRapidoPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(90 * 60) // 1h30 em segundos
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Buscar questões balanceadas da API
  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      // Buscar 20 questões balanceadas (5+5+10)
      const response = await fetch('/api/questions/balanced?total=20')
      const result = await response.json()
      
      if (result.success && result.questions.length > 0) {
        console.log('✅ Questões balanceadas carregadas para simulado rápido:', result.distribution)
        
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
        console.log('❌ Falha na API balanceada, usando API normal...')
        
        // Fallback para API normal
        const fallbackResponse = await fetch('/api/questions?limit=20')
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
          // Usar questões mock se necessário
          setQuestions([])
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
      setTimeLeft(prev => {
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

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando simulado rápido...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Nenhuma questão disponível no momento.</p>
            <Link href="/admin/scraper">
              <Button>Adicionar Questões</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela inicial
  if (!isStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/simulados">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Voltar aos Simulados
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Simulado Rápido
            </h1>
            <p className="text-gray-600">
              20 questões em 1h30 - Versão reduzida do simulado completo
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-green-600" />
                Pronto para começar?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                <span>Duração: 1h30</span>
              </div>
            </CardContent>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Instruções:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• O simulado tem {questions.length} questões de múltipla escolha</li>
                <li>• Você tem 1h30 para completar</li>
                <li>• Pode navegar entre as questões livremente</li>
                <li>• O gabarito será mostrado ao final</li>
                <li>• O tempo será cronometrado automaticamente</li>
              </ul>
            </div>

            <div className="flex gap-4 p-6">
              <Link href="/simulados" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button 
                onClick={() => setIsStarted(true)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Iniciar Simulado
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Tela de resultados
  if (showResults) {
    const results = calculateResults()
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <CheckCircle className="h-8 w-8 text-green-600" />
                Simulado Rápido Concluído!
              </CardTitle>
              <CardDescription>
                Veja seu desempenho e revise as questões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resultado Geral */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.correct}</div>
                  <div className="text-sm text-blue-700">Acertos</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{results.total - results.correct}</div>
                  <div className="text-sm text-red-700">Erros</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{results.percentage}%</div>
                  <div className="text-sm text-green-700">Aproveitamento</div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-4">
                <Link href="/simulados" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Voltar aos Simulados
                  </Button>
                </Link>
                <Button 
                  onClick={() => {
                    setIsStarted(false)
                    setIsFinished(false)
                    setShowResults(false)
                    setCurrentQuestion(0)
                    setAnswers({})
                    setTimeLeft(90 * 60)
                    fetchQuestions()
                  }}
                  className="flex-1"
                >
                  Fazer Novamente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Tela do simulado
  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header com timer e progresso */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Simulado Rápido</h1>
              <div className="text-sm text-gray-600">
                Questão {currentQuestion + 1} de {questions.length}
              </div>
            </div>
            <div className="flex items-center gap-2 text-lg font-mono">
              <Clock className="h-5 w-5" />
              <span className={timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Questão atual */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Questão {currentQuestion + 1}
              </CardTitle>
              <div className="text-sm text-gray-600">
                {currentQ.subject} - {currentQ.topic}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-900 leading-relaxed">
              {currentQ.statement}
            </div>
            
            <div className="space-y-3">
              {currentQ.alternatives.map((alt) => (
                <label
                  key={alt.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers[currentQ.id] === alt.letter
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={alt.letter}
                    checked={answers[currentQ.id] === alt.letter}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="font-medium">{alt.letter})</span> {alt.text}
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
              </Button>
            )}
          </div>
        </div>

        {/* Mapa de questões */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Mapa de Questões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : answers[questions[index].id]
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
