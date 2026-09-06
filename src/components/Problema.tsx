import { AlertTriangle, Ban, FileSearch, TrendingUp } from 'lucide-react'
import { whatsappLinkWithMessage } from '../config/site'
import Reveal from './Reveal'
import WhatsAppIcon from './icons/WhatsAppIcon'

const PONTOS = [
  {
    icon: FileSearch,
    text: 'A Prefeitura é obrigada a notificar a Receita Federal sobre obras com alvará emitido.',
  },
  {
    icon: Ban,
    text: 'Sem regularização, o imóvel não pode ser vendido, financiado ou averbado no Cartório.',
  },
  {
    icon: AlertTriangle,
    text: 'Ignorar o prazo de um Aviso de Regularização pode gerar autuação de no mínimo 75% sobre o valor devido.',
  },
  {
    icon: TrendingUp,
    text: 'Quanto mais tempo passa, maiores ficam os juros e a multa acumulados (SELIC).',
  },
]

export default function Problema() {
  return (
    <section id="problema" aria-label="O problema" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Toda obra com mão de obra remunerada precisa ser regularizada
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PONTOS.map((ponto, i) => (
            <Reveal key={ponto.text} delay={i * 0.08}>
              <div className="flex h-full gap-4 rounded-xl border border-navy-100 bg-navy-50/40 p-6">
                <ponto.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold-500" aria-hidden="true" />
                <p className="text-navy-800">{ponto.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-xl border-l-4 border-gold-400 bg-gold-50 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-navy-900 sm:text-xl">
              Recebeu um Aviso de Regularização de Obra da Receita Federal?
            </h3>
            <p className="mt-3 text-navy-800">
              Esse aviso tem prazo. Antes que ele se transforme em uma autuação, com multa e
              juros muito mais altos, existe uma solução legal para reduzir e regularizar o
              débito. Quanto antes o processo começar, mais alternativas ficam disponíveis.
            </p>
            <a
              href={whatsappLinkWithMessage(
                'Olá! Recebi um Aviso de Regularização de Obra da Receita Federal e quero entender o que fazer.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Falar agora no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
