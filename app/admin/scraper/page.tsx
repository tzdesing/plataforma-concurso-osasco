'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Download, 
  Upload, 
  FileText, 
  Globe, 
  Database,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

interface ScrapingResult {
  success: boolean
  message: string
  data?: {
    extracted?: number
    saved?: number
    processed?: number
  }
}

export default function ScraperPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ScrapingResult[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [examUrl, setExamUrl] = useState('')
  const [batchUrls, setBatchUrls] = useState('')
  const [populatingQuestions, setPopulatingQuestions] = useState(false)
  const [progress, setProgress] = useState(0)

  const addResult = (result: ScrapingResult) => {
    setResults(prev => [result, ...prev])
  }

  const handlePopulateQuestions = async () => {
    setPopulatingQuestions(true)
    try {
      const response = await fetch('/api/populate-questions', {
        method: 'POST'
      })
      const result = await response.json()
      addResult(result)
    } catch (error) {
      addResult({
        success: false,
        message: 'Erro ao popular questões: ' + (error as Error).message
      })
    } finally {
      setPopulatingQuestions(false)
    }
  }
  const handleFindExams = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/scraper?action=find-exams')
      const result = await response.json()
      addResult(result)
    } catch (error) {
      addResult({
        success: false,
        message: 'Erro ao buscar provas: ' + (error as Error).message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearchQuestions = async () => {
    if (!searchKeyword.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/scraper?action=search-questions&keyword=${encodeURIComponent(searchKeyword)}&limit=50`)
      const result = await response.json()
      addResult(result)
    } catch (error) {
      addResult({
        success: false,
        message: 'Erro na busca: ' + (error as Error).message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleScrapeExam = async () => {
    if (!examUrl.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/scraper?action=scrape-exam&url=${encodeURIComponent(examUrl)}`)
      const result = await response.json()
      addResult(result)
    } catch (error) {
      addResult({
        success: false,
        message: 'Erro ao extrair prova: ' + (error as Error).message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBatchScrape = async () => {
    if (!batchUrls.trim()) return
    
    const urls = batchUrls.split('\n').filter(url => url.trim())
    if (urls.length === 0) return
    
    setLoading(true)
    setProgress(0)
    
    try {
      const response = await fetch('/api/scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'batch-scrape',
          data: { urls }
        })
      })
      
      const result = await response.json()
      addResult(result)
      setProgress(100)
    } catch (error) {
      addResult({
        success: false,
        message: 'Erro no processamento em lote: ' + (error as Error).message
      })
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🕷️ Scraper PCI Concursos
        </h1>
        <p className="text-gray-600">
          Ferramenta para coleta automática de questões específicas para Professor Adjunto de Educação Básica I - Osasco
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buscar Provas Disponíveis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Buscar Provas Disponíveis
            </CardTitle>
            <CardDescription>
              Encontra simulados por disciplina no PCI Concursos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleFindExams}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Buscar Simulados
            </Button>
          </CardContent>
        </Card>

        {/* Buscar Questões por Palavra-chave */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar Questões
            </CardTitle>
            <CardDescription>
              Busca questões específicas por palavra-chave
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Ex: português, matemática, LDB..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button 
              onClick={handleSearchQuestions}
              disabled={loading || !searchKeyword.trim()}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Buscar Questões
            </Button>
          </CardContent>
        </Card>

        {/* Extrair Prova Específica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Extrair Prova Específica
            </CardTitle>
            <CardDescription>
              Extrai todas as questões de uma prova específica
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="URL da prova (ex: https://vunesp.com.br/prova123)"
              value={examUrl}
              onChange={(e) => setExamUrl(e.target.value)}
            />
            <Button 
              onClick={handleScrapeExam}
              disabled={loading || !examUrl.trim()}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Extrair Questões
            </Button>
          </CardContent>
        </Card>

        {/* Processamento em Lote */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Processamento em Lote
            </CardTitle>
            <CardDescription>
              Processa múltiplas provas de uma vez (uma URL por linha)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={`https://vunesp.com.br/prova1
https://vunesp.com.br/prova2
https://vunesp.com.br/prova3`}
              value={batchUrls}
              onChange={(e) => setBatchUrls(e.target.value)}
              rows={4}
            />
            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
            <Button 
              onClick={handleBatchScrape}
              disabled={loading || !batchUrls.trim()}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              Processar em Lote
            </Button>
          </CardContent>
        </Card>

        {/* Popular Questões Diretamente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Popular Questões
            </CardTitle>
            <CardDescription>
              Adiciona 10 questões específicas do cargo diretamente no banco
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>• 3 questões de Língua Portuguesa</p>
              <p>• 3 questões de Matemática</p>
              <p>• 4 questões de Conhecimentos Pedagógicos</p>
            </div>
            <Button 
              onClick={handlePopulateQuestions}
              disabled={populatingQuestions}
              className="w-full"
            >
              {populatingQuestions ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Adicionar Questões
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resultados */}
      {results.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resultados do Scraping
            </CardTitle>
            <CardDescription>
              Histórico das operações realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.success 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${
                        result.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {result.message}
                      </p>
                      {result.data && (
                        <div className="flex gap-2 mt-2">
                          {result.data.extracted && (
                            <Badge variant="secondary">
                              {result.data.extracted} extraídas
                            </Badge>
                          )}
                          {result.data.saved && (
                            <Badge variant="default">
                              {result.data.saved} salvas
                            </Badge>
                          )}
                          {result.data.processed && (
                            <Badge variant="outline">
                              {result.data.processed} processadas
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instruções */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>📋 Como Usar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">🔍 Buscar Provas</h4>
              <p className="text-sm text-gray-600">
                Encontra automaticamente todas as provas disponíveis no site da VUNESP
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Buscar por Palavra-chave</h4>
              <p className="text-sm text-gray-600">
                Busca questões específicas usando palavras-chave como "português", "matemática", etc.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📥 Extrair Prova Específica</h4>
              <p className="text-sm text-gray-600">
                Extrai todas as questões de uma prova específica usando sua URL
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚡ Processamento em Lote</h4>
              <p className="text-sm text-gray-600">
                Processa múltiplas provas simultaneamente para maior eficiência
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
