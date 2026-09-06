import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Reveal from './Reveal'

const PERGUNTAS = [
  {
    pergunta: 'O que é o INSS da obra e por que preciso pagar?',
    resposta:
      'É a contribuição previdenciária devida sobre a mão de obra usada na construção. A Receita Federal presume esse valor a partir das características do imóvel (área, padrão, época), mesmo quando não há nota fiscal de toda a mão de obra empregada.',
  },
  {
    pergunta: 'Recebi um Aviso de Regularização de Obra da Receita Federal, o que eu faço agora?',
    resposta:
      'O aviso tem prazo para resposta. O primeiro passo é fazer um diagnóstico da obra para simular o débito e verificar se o Fator de Ajuste se aplica, reduzindo o valor antes que o caso vire uma autuação.',
  },
  {
    pergunta: 'Quanto custa o serviço?',
    resposta:
      'Os honorários variam conforme o porte da obra e são sempre calculados sobre a economia gerada, não sobre o valor total do débito. O valor é apresentado em uma simulação prévia, sem compromisso.',
  },
  {
    pergunta: 'Quanto tempo leva o processo?',
    resposta:
      'O prazo varia de acordo com a complexidade da obra e o andamento do cadastro na Receita Federal, mas o cliente acompanha cada etapa desde o início, com previsão informada logo no diagnóstico.',
  },
  {
    pergunta: 'Minha obra é antiga, ainda posso regularizar?',
    resposta:
      'Sim. Obras antigas, prontas ou já concluídas também podem (e geralmente devem) ser regularizadas, especialmente quando há intenção de vender, financiar ou averbar o imóvel.',
  },
  {
    pergunta: 'Preciso ir até algum lugar ou tudo é feito online?',
    resposta:
      'Todo o processo é conduzido online, do diagnóstico à emissão da certidão final, para clientes de qualquer estado do Brasil.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-label="Dúvidas frequentes" className="bg-navy-50/60 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Dúvidas frequentes</h2>
        </Reveal>

        <div className="mt-10 divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white">
          {PERGUNTAS.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div key={item.pergunta}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900 sm:px-6"
                  >
                    {item.pergunta}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gold-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 text-navy-700 sm:px-6"
                >
                  {item.resposta}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
