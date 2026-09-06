import { Building2, Calculator, FileStack, Send } from 'lucide-react'
import Reveal from './Reveal'

const TERMOS = [
  {
    icon: Building2,
    sigla: 'CNO',
    nome: 'Cadastro Nacional de Obras',
    texto: 'É o registro da sua construção junto à Receita Federal, o ponto de partida de todo o processo de regularização.',
  },
  {
    icon: Calculator,
    sigla: 'SERO',
    nome: 'Sistema de aferição da obra',
    texto: 'É o sistema onde a Receita Federal calcula o valor da obra e o débito de INSS a partir das características do imóvel. É aqui que o Fator de Ajuste pode reduzir o valor devido.',
  },
  {
    icon: FileStack,
    sigla: 'e-Social',
    nome: 'Declaração de mão de obra',
    texto: 'É o canal onde são informados os dados da obra e da mão de obra utilizada, servindo de base para o cálculo do débito.',
  },
  {
    icon: Send,
    sigla: 'DCTFWeb',
    nome: 'Declaração e emissão da guia',
    texto: 'É a declaração final que gera o DARF, a guia de pagamento do INSS da obra, à vista ou parcelado.',
  },
]

export default function Servico() {
  return (
    <section id="servico" aria-label="O que é a regularização" className="bg-navy-50/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">O que envolve regularizar uma obra</h2>
          <p className="mt-3 text-navy-700">
            O processo passa por algumas siglas da Receita Federal. Aqui está o que cada uma
            significa, em linguagem simples.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TERMOS.map((termo, i) => (
            <Reveal key={termo.sigla} delay={i * 0.08}>
              <div className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
                <termo.icon className="h-7 w-7 text-navy-700" aria-hidden="true" />
                <p className="mt-4 font-heading text-lg font-bold text-navy-900">{termo.sigla}</p>
                <p className="text-sm font-semibold text-gold-600">{termo.nome}</p>
                <p className="mt-2 text-sm text-navy-700">{termo.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
