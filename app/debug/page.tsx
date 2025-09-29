'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Question {
  id: string
  statement: string
  subject: string
  topic?: string
  difficulty?: string
}

export default function DebugPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetchQuestions()
    fetchStats()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions?limit=200')
      const result = await response.json()
      
      if (result.success) {
        setQuestions(result.questions)
      }
    } catch (error) {
      console.error('Erro ao buscar questões:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stats' })
      })
      
      const result = await response.json()
      if (result.success) {
        setStats(result.stats)
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
  }

  // Agrupar questões por disciplina
  const groupedQuestions = questions.reduce((acc, question) => {
    const subject = question.subject || 'Sem Disciplina'
    if (!acc[subject]) {
      acc[subject] = []
    }
    acc[subject].push(question)
    return acc
  }, {} as Record<string, Question[]>)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              Voltar ao Início
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔍 Debug - Questões no Banco
        </h1>
        <p className="text-gray-600">
          Visualização detalhada das questões salvas no banco de dados
        </p>
      </div>

      {/* Resumo Geral */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Resumo Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
              <div className="text-sm text-blue-700">Total de Questões</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{Object.keys(groupedQuestions).length}</div>
              <div className="text-sm text-green-700">Disciplinas Diferentes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{stats?.total || 0}</div>
              <div className="text-sm text-purple-700">Total via API Stats</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">{stats?.subjects?.length || 0}</div>
              <div className="text-sm text-orange-700">Subjects via API</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questões por Disciplina */}
      <div className="space-y-6">
        {Object.entries(groupedQuestions).map(([subject, subjectQuestions]) => (
          <Card key={subject}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{subject}</span>
                <span className="text-lg font-normal text-gray-600">
                  {subjectQuestions.length} questões
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {subjectQuestions.slice(0, 5).map((question, index) => (
                  <div key={question.id} className="p-3 bg-gray-50 rounded text-sm">
                    <div className="font-medium">Questão {index + 1}:</div>
                    <div className="text-gray-600 truncate">
                      {question.statement.substring(0, 100)}...
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Tópico: {question.topic || 'N/A'} | 
                      Dificuldade: {question.difficulty || 'N/A'}
                    </div>
                  </div>
                ))}
                {subjectQuestions.length > 5 && (
                  <div className="text-center text-gray-500 text-sm">
                    ... e mais {subjectQuestions.length - 5} questões
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nomes Exatos das Disciplinas */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Nomes Exatos das Disciplinas no Banco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.keys(groupedQuestions).map((subject, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded font-mono text-sm">
                "{subject}" ({groupedQuestions[subject].length} questões)
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats da API */}
      {stats && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Estatísticas da API</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(stats, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
