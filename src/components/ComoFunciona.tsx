import { Award, Calculator, FileStack, Search, Send } from 'lucide-react'
import Reveal from './Reveal'

const ETAPAS = [
  {
    icon: Search,
    titulo: 'Diagnóstico inicial',
    texto:
      'Levantamento gratuito dos dados da obra: área construída, padrão, data de início e situação (nova, em andamento ou pronta).',
  },
  {
    icon: Calculator,
    titulo: 'Simulação de economia',
    texto:
      'Cálculo do débito com e sem o Fator de Ajuste, mostrando a economia possível antes de qualquer contratação.',
  },
  {
    icon: FileStack,
    titulo: 'Cadastro na Receita Federal',
    texto: 'Abertura/regularização do CNO e aferição no SERO, com toda a documentação organizada.',
  },
  {
    icon: Send,
    titulo: 'Declaração e pagamento',
    texto: 'Envio da DCTFWeb e emissão do DARF, à vista ou parcelado em até 60x.',
  },
  {
    icon: Award,
    titulo: 'Certidão final',
    texto:
      'Emissão de CND ou CPEN, documento necessário para averbar a construção no Cartório de Registro de Imóveis.',
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" aria-label="Como funciona" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Como funciona o processo</h2>
          <p className="mt-3 text-navy-700">
            Um caminho estruturado, do primeiro contato até o documento que você precisa levar ao
            Cartório.
          </p>
        </Reveal>

        <ol className="mt-14 space-y-10 border-l-2 border-navy-100 pl-8 sm:pl-10">
          {ETAPAS.map((etapa, i) => (
            <Reveal key={etapa.titulo} delay={i * 0.08}>
              <li className="relative">
                <span className="absolute top-0 -left-[3.35rem] flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 font-heading text-sm font-bold text-gold-300 sm:-left-[3.85rem]">
                  {i + 1}
                </span>
                <div className="flex items-center gap-2">
                  <etapa.icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-navy-900">{etapa.titulo}</h3>
                </div>
                <p className="mt-2 text-navy-700">{etapa.texto}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
