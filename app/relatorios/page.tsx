'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BarChart3, TrendingUp, Target, Clock, BookOpen, Home } from 'lucide-react'
import Link from 'next/link'

interface SubjectStats {
  name: string
  count: number
  description: string
}

interface Stats {
  subjects: SubjectStats[]
  total: number
}

export default function RelatoriosPage() {
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
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📊 Relatórios e Estatísticas
        </h1>
        <p className="text-gray-600">
          Acompanhe seu progresso e estatísticas de estudo
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats?.total || 0}</div>
            <div className="text-sm text-gray-600">Total de Questões</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats?.subjects?.length || 0}</div>
            <div className="text-sm text-gray-600">Disciplinas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-600">Simulados Feitos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">0h</div>
            <div className="text-sm text-gray-600">Tempo de Estudo</div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Disciplina */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Questões por Disciplina
          </CardTitle>
          <CardDescription>
            Distribuição das questões disponíveis no banco
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stats?.subjects?.map((subject, index) => {
              const percentage = stats.total > 0 ? (subject.count / stats.total) * 100 : 0
              const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600']
              const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100']
              
              return (
                <div key={subject.name} className={`p-4 rounded-lg ${bgColors[index % bgColors.length]}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                      <p className="text-sm text-gray-600">{subject.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{subject.count}</div>
                      <div className="text-sm text-gray-600">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Desempenho (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Simulados</CardTitle>
            <CardDescription>
              Seus últimos resultados em simulados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum simulado realizado ainda</p>
              <p className="text-sm">Faça seu primeiro simulado para ver estatísticas aqui</p>
              <Link href="/simulados" className="mt-4 inline-block">
                <Button size="sm">
                  Fazer Simulado
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progresso de Estudos</CardTitle>
            <CardDescription>
              Acompanhe sua evolução ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Dados de progresso não disponíveis</p>
              <p className="text-sm">Continue estudando para gerar relatórios detalhados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/simulados">
              <Button variant="outline" className="w-full h-16">
                <div className="text-center">
                  <Target className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Fazer Simulado</div>
                </div>
              </Button>
            </Link>
            
            <Link href="/admin/scraper">
              <Button variant="outline" className="w-full h-16">
                <div className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Adicionar Questões</div>
                </div>
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full h-16">
                <div className="text-center">
                  <Home className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Página Inicial</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
