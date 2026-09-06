import { Calculator, Info } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { whatsappLinkWithMessage } from '../config/site'
import Reveal from './Reveal'
import WhatsAppIcon from './icons/WhatsAppIcon'

type Destinacao = 'unifamiliar' | 'multifamiliar' | 'comercial' | 'galpao' | 'popular'
type TipoObra = 'alvenaria' | 'madeira' | 'mista'
type Proprietario = 'pf' | 'pj'
type Situacao = 'nova' | 'andamento' | 'pronta'

// Valores de referência da Receita Federal (VAU) para Mato Grosso do Sul.
// O VAU muda todo mês e varia por estado, por isso o resultado é sempre uma estimativa,
// refinada de verdade no diagnóstico gratuito.
const VAU_MS: Record<Destinacao, number> = {
  unifamiliar: 2056.54,
  multifamiliar: 1862.89,
  comercial: 2145.63,
  galpao: 969.36,
  popular: 1185.45,
}

// % de mão de obra sobre o custo da obra, por destinação e tipo de construção.
const PERCENTUAL_MAO_DE_OBRA: Record<Destinacao, Record<TipoObra, number>> = {
  unifamiliar: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  multifamiliar: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  comercial: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  galpao: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  popular: { alvenaria: 0.12, madeira: 0.07, mista: 0.07 },
}

const DESTINACOES: { value: Destinacao; label: string }[] = [
  { value: 'unifamiliar', label: 'Residencial unifamiliar (casa)' },
  { value: 'multifamiliar', label: 'Residencial multifamiliar (edifício, apto)' },
  { value: 'comercial', label: 'Comercial (salas e lojas)' },
  { value: 'galpao', label: 'Galpão industrial' },
  { value: 'popular', label: 'Casa popular (até 70 m²)' },
]

const TIPOS_OBRA: { value: TipoObra; label: string }[] = [
  { value: 'alvenaria', label: 'Alvenaria (padrão)' },
  { value: 'madeira', label: 'Madeira' },
  { value: 'mista', label: 'Mista (estrutura ou paredes metálicas, madeira ou pré-moldadas)' },
]

const SITUACOES: { value: Situacao; label: string }[] = [
  { value: 'nova', label: 'Obra nova (ainda não iniciou ou começou agora)' },
  { value: 'andamento', label: 'Obra em andamento' },
  { value: 'pronta', label: 'Obra pronta / já concluída' },
]

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

interface Resultado {
  area: number
  destinacaoLabel: string
  inssBruto: number
}

export default function Calculadora() {
  const areaId = useId()
  const [area, setArea] = useState('')
  const [destinacao, setDestinacao] = useState<Destinacao>('unifamiliar')
  const [tipoObra, setTipoObra] = useState<TipoObra>('alvenaria')
  const [proprietario, setProprietario] = useState<Proprietario>('pf')
  const [situacao, setSituacao] = useState<Situacao>('nova')
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const destinacaoLabel = useMemo(
    () => DESTINACOES.find((d) => d.value === destinacao)?.label ?? '',
    [destinacao],
  )

  function calcular() {
    const areaNum = Number(area.replace(',', '.'))

    if (!areaNum || areaNum <= 0) {
      setErro('Informe a área construída em metros quadrados (ex: 150).')
      setResultado(null)
      return
    }

    setErro(null)

    // COD (Custo da Obra por Destinação)
    const vau = VAU_MS[destinacao]
    const cod = areaNum * vau

    // RMT (Remuneração da Mão de Obra Total)
    const percentualMO = PERCENTUAL_MAO_DE_OBRA[destinacao][tipoObra]
    const rmt = cod * percentualMO

    // INSS bruto = RMT x 20% (cota patronal), sem nenhuma redução legal aplicada
    const inssBruto = rmt * 0.2

    setResultado({ area: areaNum, destinacaoLabel, inssBruto })
  }

  const mensagemWhatsApp = resultado
    ? [
        'Olá! Fiz uma simulação no site da TLR Regularização e quero confirmar os valores.',
        '',
        `Área construída: ${resultado.area} m²`,
        `Tipo de imóvel: ${resultado.destinacaoLabel}`,
        `Proprietário: ${proprietario === 'pf' ? 'Pessoa física' : 'Pessoa jurídica'}`,
        `Situação da obra: ${SITUACOES.find((s) => s.value === situacao)?.label}`,
        '',
        `INSS bruto estimado: ${currency.format(resultado.inssBruto)}`,
        '',
        'Quero saber quanto desse valor eu consigo reduzir.',
      ].join('\n')
    : ''

  return (
    <section id="simulador" aria-label="Simulador de economia" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Simule o débito estimado da sua obra</h2>
          <p className="mt-3 text-navy-700">
            Responda 5 perguntas rápidas e veja uma estimativa do valor bruto do INSS devido pela
            sua construção.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-navy-100 bg-navy-50/40 p-6 shadow-lg shadow-navy-900/5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={areaId} className="block text-sm font-semibold text-navy-900">
                  Área construída (m²)
                </label>
                <input
                  id={areaId}
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 150"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-900">
                  Tipo de imóvel
                </label>
                <select
                  value={destinacao}
                  onChange={(e) => setDestinacao(e.target.value as Destinacao)}
                  className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
                >
                  {DESTINACOES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-900">
                  Tipo de construção
                </label>
                <select
                  value={tipoObra}
                  onChange={(e) => setTipoObra(e.target.value as TipoObra)}
                  className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
                >
                  {TIPOS_OBRA.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-900">Proprietário</label>
                <select
                  value={proprietario}
                  onChange={(e) => setProprietario(e.target.value as Proprietario)}
                  className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
                >
                  <option value="pf">Pessoa física</option>
                  <option value="pj">Pessoa jurídica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-900">
                  Situação da obra
                </label>
                <select
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value as Situacao)}
                  className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
                >
                  {SITUACOES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {erro && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-600">
                {erro}
              </p>
            )}

            <button
              type="button"
              onClick={calcular}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-800 sm:w-auto"
            >
              <Calculator className="h-5 w-5" aria-hidden="true" />
              Calcular estimativa
            </button>

            {resultado && (
              <div role="status" aria-live="polite" className="mt-8 border-t border-navy-200 pt-6">
                <p className="text-sm font-semibold tracking-wide text-navy-600 uppercase">
                  Resultado da simulação
                </p>

                <p className="mt-3 text-navy-800">INSS bruto estimado da sua obra:</p>
                <p className="font-heading text-3xl font-extrabold text-navy-900">
                  {currency.format(resultado.inssBruto)}
                </p>

                <p className="mt-4 text-navy-800">
                  Esse é o valor <strong>sem nenhuma redução legal aplicada</strong>. A maioria dos
                  nossos clientes consegue reduzir bastante esse débito com o Fator de Ajuste, fale
                  com a gente para descobrir quanto você pode economizar no seu caso.
                </p>

                <a
                  href={whatsappLinkWithMessage(mensagemWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-base font-semibold text-navy-950 shadow-md transition-colors hover:bg-gold-500"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Quero saber quanto posso reduzir
                </a>
              </div>
            )}

            <p className="mt-6 flex gap-2 text-xs text-navy-500">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Simulação simplificada e educativa, com base em valores de referência da Receita
              Federal para Mato Grosso do Sul (VAU). O valor exato da sua obra, e o quanto pode
              ser reduzido, depende de outros fatores (tipo de mão de obra, documentação,
              decadência tributária, Fator Social) e é calculado com precisão no diagnóstico
              gratuito, sem compromisso.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
