'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Target, Clock, Database } from 'lucide-react'

interface SubjectStats {
  name: string
  count: number
  description: string
}

interface Stats {
  subjects: SubjectStats[]
  total: number
}

export default function QuestionStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

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
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardContent className="p-6 text-center">
              <div className="animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const totalQuestions = stats?.total || 0
  const subjectCount = stats?.subjects?.length || 3

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <Card>
        <CardContent className="p-6 text-center">
          <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{subjectCount}</div>
          <div className="text-sm text-gray-600">Disciplinas</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{totalQuestions}</div>
          <div className="text-sm text-gray-600">Questões no Banco</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">40</div>
          <div className="text-sm text-gray-600">Questões na Prova</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">3h</div>
          <div className="text-sm text-gray-600">Duração</div>
        </CardContent>
      </Card>
    </div>
  )
}
