import { track } from '@vercel/analytics'
import { Calculator, Info } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { whatsappLinkWithMessage } from '../config/site'
import Reveal from './Reveal'
import WhatsAppIcon from './icons/WhatsAppIcon'

type Destinacao = 'unifamiliar' | 'multifamiliar' | 'comercial' | 'galpao' | 'popular'
type TipoObra = 'alvenaria' | 'madeira' | 'mista'
type Proprietario = 'pf' | 'pj'
type Situacao = 'nova' | 'andamento' | 'pronta'
type Estado =
  | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA'
  | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN'
  | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO'

// Valores de referência da Receita Federal (VAU) por estado, atualizados em 06/09/2026.
// O VAU muda todo mês (vinculado ao CUB/SINDUSCON), por isso precisa ser revisado com
// frequência — fontes públicas para conferência: tabelavau.seroassessoria.com.br e
// regularinssdeobras.com.br/tabela-sero.
const VAU_POR_ESTADO: Record<Estado, Record<Destinacao, number>> = {
  AC: { unifamiliar: 4242.1, multifamiliar: 3585.47, comercial: 3970.6, galpao: 1835.61, popular: 2143.31 },
  AL: { unifamiliar: 2558.21, multifamiliar: 2204.66, comercial: 2466.05, galpao: 1151.86, popular: 1362.4 },
  AP: { unifamiliar: 3376.99, multifamiliar: 2982.56, comercial: 3386.0, galpao: 1609.56, popular: 1902.2 },
  AM: { unifamiliar: 4242.1, multifamiliar: 3585.47, comercial: 3970.6, galpao: 1835.61, popular: 2143.31 },
  BA: { unifamiliar: 2752.71, multifamiliar: 2307.07, comercial: 2642.31, galpao: 1198.83, popular: 1487.76 },
  CE: { unifamiliar: 2878.33, multifamiliar: 2499.51, comercial: 2845.05, galpao: 1347.8, popular: 1695.74 },
  DF: { unifamiliar: 2903.96, multifamiliar: 2516.31, comercial: 2879.66, galpao: 1287.94, popular: 1588.55 },
  ES: { unifamiliar: 3403.21, multifamiliar: 2895.38, comercial: 3226.46, galpao: 1462.06, popular: 1916.54 },
  GO: { unifamiliar: 2845.9, multifamiliar: 2376.01, comercial: 2704.95, galpao: 1264.09, popular: 1518.21 },
  MA: { unifamiliar: 2348.61, multifamiliar: 2246.52, comercial: 2294.07, galpao: 1094.67, popular: 1312.57 },
  MT: { unifamiliar: 4007.38, multifamiliar: 3482.69, comercial: 3957.52, galpao: 1740.33, popular: 2222.33 },
  MS: { unifamiliar: 2252.88, multifamiliar: 1887.01, comercial: 2345.43, galpao: 1057.28, popular: 1292.6 },
  MG: { unifamiliar: 3071.19, multifamiliar: 2664.4, comercial: 2991.56, galpao: 1316.03, popular: 1725.92 },
  PA: { unifamiliar: 2917.27, multifamiliar: 2548.39, comercial: 2869.22, galpao: 1356.84, popular: 1655.36 },
  PB: { unifamiliar: 2097.99, multifamiliar: 1859.16, comercial: 2089.85, galpao: 960.51, popular: 1135.38 },
  PR: { unifamiliar: 3340.01, multifamiliar: 2844.92, comercial: 3253.13, galpao: 1458.1, popular: 1827.31 },
  PE: { unifamiliar: 2799.33, multifamiliar: 2341.09, comercial: 2656.82, galpao: 1215.84, popular: 1553.08 },
  PI: { unifamiliar: 2348.61, multifamiliar: 2025.47, comercial: 2294.07, galpao: 1094.67, popular: 1312.57 },
  RJ: { unifamiliar: 3101.08, multifamiliar: 2669.62, comercial: 3036.43, galpao: 1378.73, popular: 1731.76 },
  RN: { unifamiliar: 2651.16, multifamiliar: 2276.11, comercial: 2532.87, galpao: 1217.66, popular: 1530.91 },
  RS: { unifamiliar: 3467.09, multifamiliar: 3069.41, comercial: 3639.91, galpao: 1412.37, popular: 1854.69 },
  RO: { unifamiliar: 2958.5, multifamiliar: 2692.13, comercial: 3044.81, galpao: 1357.59, popular: 1739.04 },
  RR: { unifamiliar: 3682.39, multifamiliar: 3156.13, comercial: 3595.77, galpao: 1723.59, popular: 1913.4 },
  SC: { unifamiliar: 3498.08, multifamiliar: 2968.24, comercial: 3410.76, galpao: 1577.81, popular: 1994.92 },
  SP: { unifamiliar: 2705.27, multifamiliar: 2359.48, comercial: 2685.96, galpao: 1265.41, popular: 1517.13 },
  SE: { unifamiliar: 2548.48, multifamiliar: 2308.47, comercial: 2585.44, galpao: 1188.74, popular: 1396.57 },
  TO: { unifamiliar: 2845.9, multifamiliar: 2376.01, comercial: 2704.95, galpao: 1264.09, popular: 1518.21 },
}

// Percentual de Equivalência de Área (Manual SERO v3.0, item 17.1 / art. 25, §6º). Reduz
// a área informada antes de multiplicar pelo VAU. Varia por destinação e por faixa de
// área — não varia por padrão construtivo (a tabela ABNT NBR 12.721/2006 de R-1/R-8/CSL
// serve para calibrar o CUB do SINDUSCON, uma finalidade diferente, e não deve ser usada
// aqui).
function percentualEquivalencia(destinacao: Destinacao, area: number): number {
  switch (destinacao) {
    case 'unifamiliar':
      return area <= 1000 ? 0.89 : 0.85
    case 'multifamiliar':
      return area <= 1000 ? 0.9 : 0.86
    case 'comercial':
      return area <= 3000 ? 0.86 : 0.83
    case 'galpao':
      return 0.95
    case 'popular':
      return 0.98
  }
}

// Fator Social (Manual SERO v3.0, item 19.4) — multiplicador direto sobre a RMT,
// exclusivo de pessoa física, conforme a área total do projeto. Quanto menor a área,
// maior o desconto (ex: até 100 m² fica com só 20% da RMT, ou seja, 80% de desconto).
function fatorSocial(area: number): number {
  if (area <= 100) return 0.2
  if (area <= 200) return 0.4
  if (area <= 300) return 0.55
  if (area <= 400) return 0.7
  return 0.9
}

// % de mão de obra sobre o custo da obra, por destinação e tipo de construção.
const PERCENTUAL_MAO_DE_OBRA: Record<Destinacao, Record<TipoObra, number>> = {
  unifamiliar: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  multifamiliar: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  comercial: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  galpao: { alvenaria: 0.2, madeira: 0.15, mista: 0.15 },
  popular: { alvenaria: 0.12, madeira: 0.07, mista: 0.07 },
}

// Alíquota total do INSS da obra: cota patronal (20%) + segurado (8%) + RAT (3%) +
// outras entidades/terceiros (5,8%) = 36,8%. Vale tanto para pessoa física quanto para
// pessoa jurídica fora do Simples Nacional; PJ optante do Simples usa 40% (fora de
// escopo por ora, pois o público majoritário do site é pessoa física).
const ALIQUOTA_TOTAL = 0.368

const ESTADOS: { value: Estado; label: string }[] = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

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
  estadoLabel: string
  destinacaoLabel: string
  inssBruto: number
}

export default function Calculadora() {
  const areaId = useId()
  const [area, setArea] = useState('')
  const [estado, setEstado] = useState<Estado>('MS')
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
  const estadoLabel = useMemo(
    () => ESTADOS.find((uf) => uf.value === estado)?.label ?? '',
    [estado],
  )

  function calcular() {
    const areaNum = Number(area.replace(',', '.'))

    if (!areaNum || areaNum <= 0) {
      setErro('Informe a área construída em metros quadrados (ex: 150).')
      setResultado(null)
      return
    }

    setErro(null)

    // Área Equivalente (Percentual de Equivalência aplicado antes do VAU)
    const areaEquivalente = areaNum * percentualEquivalencia(destinacao, areaNum)

    // COD (Custo da Obra por Destinação)
    const vau = VAU_POR_ESTADO[estado][destinacao]
    const cod = areaEquivalente * vau

    // RMT (Remuneração da Mão de Obra Total)
    const percentualMO = PERCENTUAL_MAO_DE_OBRA[destinacao][tipoObra]
    let rmt = cod * percentualMO

    // Fator Social: multiplicador direto sobre a RMT, exclusivo de pessoa física
    if (proprietario === 'pf') {
      rmt *= fatorSocial(areaNum)
    }

    // INSS bruto = RMT x alíquota total (36,8%), sem nenhuma redução legal aplicada
    const inssBruto = rmt * ALIQUOTA_TOTAL

    setResultado({ area: areaNum, estadoLabel, destinacaoLabel, inssBruto })

    // Métrica: uma simulação calculada com sucesso (sem dados pessoais, só categorias)
    track('simulacao_calculada', { estado, destinacao, situacao, proprietario })
  }

  const mensagemWhatsApp = resultado
    ? [
        'Olá! Fiz uma simulação no site da TLR Regularização e quero confirmar os valores.',
        '',
        `Estado: ${resultado.estadoLabel}`,
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
            Responda 6 perguntas rápidas e veja uma estimativa do valor bruto do INSS devido pela
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
                <label className="block text-sm font-semibold text-navy-900">Estado</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as Estado)}
                  className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
                >
                  {ESTADOS.map((uf) => (
                    <option key={uf.value} value={uf.value}>
                      {uf.label}
                    </option>
                  ))}
                </select>
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
                  onClick={() => track('simulador_whatsapp_click')}
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
              Federal por estado (VAU), no Percentual de Equivalência de Área por destinação e
              faixa de área, no Fator Social (para pessoa física) e na alíquota total do INSS
              (36,8%). O valor exato da sua obra, e o quanto pode ser reduzido, depende de outros
              fatores (tipo de mão de obra, documentação, decadência tributária) e é calculado com
              precisão no diagnóstico gratuito, sem compromisso.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
