import { WHATSAPP_LINK } from '../config/site'
import Reveal from './Reveal'
import WhatsAppIcon from './icons/WhatsAppIcon'

export default function CTAFinal() {
  return (
    <section id="contato" aria-label="Contato" className="bg-navy-900 py-16 text-center text-white sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Fale agora com quem pode reduzir sua pendência com a Receita Federal
          </h2>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold-400 px-8 py-4 text-lg font-bold text-navy-950 shadow-lg transition-colors hover:bg-gold-500"
          >
            <WhatsAppIcon className="h-6 w-6" />
            Falar no WhatsApp
          </a>
          <p className="mt-5 text-sm text-navy-100">
            Atendimento personalizado, simulação sem compromisso, para todo o Brasil.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
