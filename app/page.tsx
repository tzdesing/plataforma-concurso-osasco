import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, BarChart3, Target, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const examDate = new Date('2025-12-14')
  const today = new Date()
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Plataforma de Estudos
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Concurso Professor Adjunto de Educação Básica I - Prefeitura de Osasco
        </p>
        <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span className="font-semibold">
              {daysUntilExam > 0 ? `${daysUntilExam} dias para a prova` : 'Prova hoje!'}
            </span>
          </div>
          <div className="text-sm opacity-90">14 de dezembro de 2025</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-600">Disciplinas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">40</div>
            <div className="text-sm text-gray-600">Questões na Prova</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">3h</div>
            <div className="text-sm text-gray-600">Duração da Prova</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">10</div>
            <div className="text-sm text-gray-600">Vagas Disponíveis</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Simulados */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Simulados
            </CardTitle>
            <CardDescription>
              Pratique com simulados cronometrados baseados no padrão VUNESP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/simulados/completo">
                <Button className="w-full" variant="default">
                  Simulado Completo (40 questões)
                </Button>
              </Link>
              <Link href="/simulados/por-disciplina">
                <Button className="w-full" variant="outline">
                  Simulado por Disciplina
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Banco de Questões */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Banco de Questões
            </CardTitle>
            <CardDescription>
              Acesse questões organizadas por disciplina e assunto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/questoes/lingua-portuguesa">
                <Button className="w-full" variant="outline">
                  Língua Portuguesa (10 questões)
                </Button>
              </Link>
              <Link href="/questoes/matematica">
                <Button className="w-full" variant="outline">
                  Matemática (10 questões)
                </Button>
              </Link>
              <Link href="/questoes/conhecimentos-pedagogicos">
                <Button className="w-full" variant="outline">
                  Conhecimentos Pedagógicos (20 questões)
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Relatórios */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Relatórios
            </CardTitle>
            <CardDescription>
              Acompanhe seu desempenho e identifique pontos de melhoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/relatorios/desempenho">
                <Button className="w-full" variant="outline">
                  Desempenho Geral
                </Button>
              </Link>
              <Link href="/relatorios/por-disciplina">
                <Button className="w-full" variant="outline">
                  Por Disciplina
                </Button>
              </Link>
              <Link href="/relatorios/evolucao">
                <Button className="w-full" variant="outline">
                  Evolução no Tempo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Programático */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Programático do Edital</CardTitle>
            <CardDescription>
              Baseado no Edital VUNESP 001/2025 - Prefeitura Municipal de Osasco
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-600">Língua Portuguesa (10 questões)</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Interpretação de texto</li>
                  <li>• Gramática normativa</li>
                  <li>• Ortografia oficial</li>
                  <li>• Concordância verbal e nominal</li>
                  <li>• Regência verbal e nominal</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-600">Matemática (10 questões)</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Operações fundamentais</li>
                  <li>• Frações e decimais</li>
                  <li>• Porcentagem</li>
                  <li>• Regra de três</li>
                  <li>• Geometria básica</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-purple-600">Conhecimentos Pedagógicos (20 questões)</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• LDB - Lei 9.394/96</li>
                  <li>• ECA - Lei 8.069/90</li>
                  <li>• Constituição Federal (Educação)</li>
                  <li>• PCNs e BNCC</li>
                  <li>• Didática e metodologias</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
