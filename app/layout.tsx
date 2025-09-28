import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plataforma de Estudos - Concurso Professor Osasco',
  description: 'Plataforma completa para estudar para o concurso de Professor Adjunto de Educação Básica I da Prefeitura de Osasco',
  keywords: 'concurso, professor, osasco, vunesp, educação básica, simulado, questões',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}
