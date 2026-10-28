import casoDm from '../assets/casos/caso-dm.jpg'
import casoJs from '../assets/casos/caso-js.jpg'
import casoMf from '../assets/casos/caso-mf.jpg'
import { whatsappLinkWithMessage } from '../config/site'
import { reportWhatsAppConversion } from '../lib/gtagConversion'
import Reveal from './Reveal'
import WhatsAppIcon from './icons/WhatsAppIcon'

interface Caso {
  cliente: string
  foto: string
  area: string
  valorCheio: string
  valorReduzido: string
  reducao: string
}

const CASOS: Caso[] = [
  {
    cliente: 'J. S. — Residencial',
    foto: casoJs,
    area: '115,35 m²',
    valorCheio: 'R$ 6.628,36',
    valorReduzido: 'R$ 3.327,19',
    reducao: '−49,80%',
  },
  {
    cliente: 'M. F. — Residencial',
    foto: casoMf,
    area: '249,84 m²',
    valorCheio: 'R$ 19.800,00',
    valorReduzido: 'R$ 5.346,00',
    reducao: '−73%',
  },
  {
    cliente: 'D. M. — Residencial',
    foto: casoDm,
    area: '166,07 m²',
    valorCheio: 'R$ 9.542,88',
    valorReduzido: 'R$ 2.576,58',
    reducao: '−73%',
  },
]

export default function CasosReais() {
  return (
    <section id="casos-reais" aria-label="Casos reais" className="bg-navy-950 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold tracking-[0.2em] text-gold-400 uppercase">
            Obras regularizadas · Casos reais
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Quanto cada obra deixou de pagar
            </h2>
            <p className="text-sm text-navy-300">INSS apurado&nbsp;&nbsp;→&nbsp;&nbsp;INSS recolhido</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {CASOS.map((caso, i) => (
            <Reveal key={caso.cliente} delay={i * 0.1}>
              <div className="overflow-hidden rounded-xl border border-gold-700/40 bg-navy-900">
                <img
                  src={caso.foto}
                  alt={`Obra regularizada — ${caso.cliente}`}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="font-heading text-base font-semibold text-white">{caso.cliente}</p>
                  <p className="mt-0.5 text-xs text-navy-300">Campo Grande/MS · {caso.area}</p>
                  <p className="mt-3 text-sm text-navy-200">
                    {caso.valorCheio} → <span className="font-semibold text-gold-300">{caso.valorReduzido}</span>
                  </p>
                  <p className="mt-1 text-2xl font-bold text-gold-400">{caso.reducao}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col gap-5 rounded-xl border border-gold-700/40 bg-navy-900 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <p className="font-heading text-3xl font-bold whitespace-nowrap text-gold-300 sm:text-4xl">
              R$ 125 mil
            </p>
            <p className="text-sm text-navy-200 sm:text-base">
              de <strong className="text-white">INSS a menos</strong> para os nossos clientes nos
              casos regularizados em Campo Grande/MS — redução média de{' '}
              <strong className="text-white">55,77%</strong> no conjunto.
            </p>
            <a
              href={whatsappLinkWithMessage('Olá! Vi os casos reais no site e quero avaliar a minha obra.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={reportWhatsAppConversion}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 shadow-md transition-colors hover:bg-gold-500 sm:ml-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Avaliar minha obra
            </a>
          </div>
        </Reveal>

        <p className="mt-4 text-xs text-navy-400">
          Casos reduzidos a 73% atingiram o limite técnico previsto pelo Fator de Ajuste. Valores
          de simulações apresentadas em propostas comerciais. Imagens ilustrativas, divulgadas com
          autorização dos proprietários. O resultado de cada obra depende da sua documentação e do
          seu enquadramento.
        </p>
      </div>
    </section>
  )
}
