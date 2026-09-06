import { WHATSAPP_LINK } from '../config/site'
import HeroIllustration from './HeroIllustration'
import Reveal from './Reveal'
import WhatsAppIcon from './icons/WhatsAppIcon'

export default function Hero() {
  return (
    <section id="inicio" aria-label="Início" className="bg-navy-50/60 pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <h1 className="text-3xl leading-tight font-extrabold text-navy-900 sm:text-4xl lg:text-5xl">
            Regularize sua obra na Receita Federal com quem entende do assunto
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-700">
            Reduza em até <strong className="text-navy-900">73% o INSS devido</strong> pela sua
            construção com o Fator de Ajuste. Atendimento 100% online, em todo o Brasil, conduzido
            por engenheiro civil registrado no CREA.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-base font-semibold text-navy-950 shadow-md transition-colors hover:bg-gold-500"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Falar no WhatsApp agora
            </a>
            <a
              href="#como-funciona"
              className="text-sm font-semibold text-navy-700 underline decoration-gold-400 decoration-2 underline-offset-4 hover:text-navy-900"
            >
              Entenda como funciona ↓
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center lg:justify-end">
          <HeroIllustration />
        </Reveal>
      </div>
    </section>
  )
}
