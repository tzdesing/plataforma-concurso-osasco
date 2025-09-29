'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Clock, GraduationCap, CheckCircle, Home } from 'lucide-react'
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

export default function SimuladoConhecimentosPedagogicosPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutos
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Buscar questões de Conhecimentos Pedagógicos
  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      // Buscar questões que contenham "Pedagógicos" no subject
      const response = await fetch('/api/questions?limit=50')
      const result = await response.json()
      
      if (result.success && result.questions.length > 0) {
        // Filtrar questões de Conhecimentos Pedagógicos
        const pedagogicalQuestions = result.questions.filter((q: any) => 
          q.subject && q.subject.includes('Pedagógicos')
        ).slice(0, 20) // Pegar até 20 questões
        
        console.log('✅ Questões de Conhecimentos Pedagógicos carregadas:', pedagogicalQuestions.length)
        
        const formattedQuestions: Question[] = pedagogicalQuestions.map((q: any) => ({
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
        console.log('⚠️ Nenhuma questão de Conhecimentos Pedagógicos encontrada')
        setQuestions([])
      }
    } catch (error) {
      console.error('❌ Erro ao buscar questões:', error)
      setQuestions([])
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
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando questões de Conhecimentos Pedagógicos...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-purple-300" />
            <p className="text-gray-600 mb-4">Nenhuma questão de Conhecimentos Pedagógicos disponível no momento.</p>
            <div className="space-y-2">
              <Link href="/admin/scraper">
                <Button className="mr-2">Adicionar Questões</Button>
              </Link>
              <Link href="/simulados">
                <Button variant="outline">Voltar aos Simulados</Button>
              </Link>
            </div>
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
              🎓 Simulado de Conhecimentos Pedagógicos
            </h1>
            <p className="text-gray-600">
              Legislação educacional, didática e teorias pedagógicas
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-purple-600" />
                Pronto para o desafio pedagógico?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {questions.length}
                </div>
                <div className="text-gray-600">Questões de Conhecimentos Pedagógicos</div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                <Clock className="h-5 w-5" />
                <span>Duração: 60 minutos</span>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Conteúdo abordado:</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• <strong>LDB</strong> - Lei de Diretrizes e Bases da Educação Nacional</li>
                  <li>• <strong>ECA</strong> - Estatuto da Criança e do Adolescente</li>
                  <li>• <strong>Constituição Federal</strong> - Artigos sobre educação</li>
                  <li>• <strong>BNCC</strong> - Base Nacional Comum Curricular</li>
                  <li>• <strong>Teorias Pedagógicas</strong> - Piaget, Vygotsky, Paulo Freire</li>
                  <li>• <strong>Gestão Escolar</strong> - PPP, avaliação, inclusão</li>
                </ul>
              </div>
            </CardContent>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Dicas importantes:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• O simulado tem {questions.length} questões de múltipla escolha</li>
                <li>• Você tem 60 minutos para completar</li>
                <li>• Leia com atenção os artigos de lei citados</li>
                <li>• Relacione teoria com prática pedagógica</li>
                <li>• Foque nos princípios fundamentais da educação</li>
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
                className="flex-1 bg-purple-600 hover:bg-purple-700"
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
                <CheckCircle className="h-8 w-8 text-purple-600" />
                Simulado de Conhecimentos Pedagógicos Concluído!
              </CardTitle>
              <CardDescription>
                Veja seu desempenho em legislação e pedagogia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resultado Geral */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{results.correct}</div>
                  <div className="text-sm text-purple-700">Acertos</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{results.total - results.correct}</div>
                  <div className="text-sm text-red-700">Erros</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.percentage}%</div>
                  <div className="text-sm text-blue-700">Aproveitamento</div>
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
                    setTimeLeft(60 * 60)
                    fetchQuestions()
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
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
              <h1 className="text-2xl font-bold">🎓 Conhecimentos Pedagógicos</h1>
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
                {currentQ.topic} - {currentQ.difficulty}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-900 leading-relaxed whitespace-pre-line">
              {currentQ.statement}
            </div>
            
            <div className="space-y-3">
              {currentQ.alternatives.map((alt) => (
                <label
                  key={alt.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers[currentQ.id] === alt.letter
                      ? 'border-purple-500 bg-purple-50'
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
              <Button onClick={handleFinish} className="bg-purple-600 hover:bg-purple-700">
                Finalizar Simulado
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
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
                      ? 'bg-purple-600 text-white'
                      : answers[questions[index].id]
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
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
