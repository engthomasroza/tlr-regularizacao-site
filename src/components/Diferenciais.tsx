import { CheckCircle2, ClipboardCheck, Globe2, HardHat, Percent, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'

const ITENS = [
  {
    icon: HardHat,
    titulo: 'Conduzido por engenheiro civil',
    texto: 'Processo conduzido por profissional com registro ativo no CREA, e não por despachante ou intermediário genérico.',
  },
  {
    icon: Percent,
    titulo: 'Honorários sobre a economia',
    texto: 'Os honorários são calculados sobre a economia gerada: você só paga em cima do que economiza, não sobre o valor total do débito.',
  },
  {
    icon: Globe2,
    titulo: 'Atendimento 100% online',
    texto: 'Para clientes de qualquer estado do Brasil, sem necessidade de deslocamento.',
  },
  {
    icon: CheckCircle2,
    titulo: 'Sem compromisso',
    texto: 'Simulação e diagnóstico inicial gratuitos, sem compromisso de contratação.',
  },
  {
    icon: ClipboardCheck,
    titulo: 'Acompanhamento completo',
    texto: 'Da abertura do processo até a certidão final para o Cartório, em todas as etapas.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Transparência total',
    texto: 'Você acompanha cada etapa (CNO, SERO, e-Social, DCTFWeb) e entende o que está sendo pago e por quê.',
  },
]

export default function Diferenciais() {
  return (
    <section id="diferenciais" aria-label="Diferenciais" className="bg-navy-900 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Por que a TLR</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITENS.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-white/10 bg-white/5 p-6">
                <item.icon className="h-7 w-7 text-gold-300" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-bold text-white">{item.titulo}</h3>
                <p className="mt-2 text-sm text-navy-100">{item.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
