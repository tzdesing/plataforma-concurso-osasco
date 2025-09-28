import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Target, BookOpen, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function SimuladosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simulados</h1>
        <p className="text-gray-600">
          Pratique com simulados cronometrados no padrão VUNESP
        </p>
      </div>

      {/* Simulado Completo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              Simulado Completo
            </CardTitle>
            <CardDescription>
              Simulado completo com 40 questões, 3 horas de duração
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">10</div>
                  <div className="text-gray-600">Português</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">10</div>
                  <div className="text-gray-600">Matemática</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">20</div>
                  <div className="text-gray-600">Pedagógicos</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Duração: 3 horas</span>
              </div>
              <Link href="/simulados/completo">
                <Button className="w-full" size="lg">
                  Iniciar Simulado Completo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-green-600" />
              Simulado Rápido
            </CardTitle>
            <CardDescription>
              Simulado com 20 questões, 1h30 de duração
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">5</div>
                  <div className="text-gray-600">Português</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">5</div>
                  <div className="text-gray-600">Matemática</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">10</div>
                  <div className="text-gray-600">Pedagógicos</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Duração: 1h30</span>
              </div>
              <Link href="/simulados/rapido">
                <Button className="w-full" variant="outline" size="lg">
                  Iniciar Simulado Rápido
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simulados por Disciplina */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulados por Disciplina</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Língua Portuguesa
              </CardTitle>
              <CardDescription>
                Foque apenas em questões de português
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div>• Interpretação de texto</div>
                  <div>• Gramática normativa</div>
                  <div>• Ortografia oficial</div>
                </div>
                <Link href="/simulados/lingua-portuguesa">
                  <Button className="w-full" variant="outline">
                    Iniciar (10 questões)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
                Matemática
              </CardTitle>
              <CardDescription>
                Pratique cálculos e raciocínio lógico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div>• Operações fundamentais</div>
                  <div>• Frações e porcentagem</div>
                  <div>• Geometria básica</div>
                </div>
                <Link href="/simulados/matematica">
                  <Button className="w-full" variant="outline">
                    Iniciar (10 questões)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Conhecimentos Pedagógicos
              </CardTitle>
              <CardDescription>
                Legislação educacional e didática
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div>• LDB e ECA</div>
                  <div>• Constituição Federal</div>
                  <div>• PCNs e BNCC</div>
                </div>
                <Link href="/simulados/conhecimentos-pedagogicos">
                  <Button className="w-full" variant="outline">
                    Iniciar (20 questões)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Histórico de Simulados */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Simulados</CardTitle>
          <CardDescription>
            Seus últimos simulados realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum simulado realizado ainda</p>
            <p className="text-sm">Comece fazendo seu primeiro simulado!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
