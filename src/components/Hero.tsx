import heroPhoto from '../assets/casos/caso-mf.jpg'
import { WHATSAPP_LINK } from '../config/site'
import { reportWhatsAppConversion } from '../lib/gtagConversion'
import Reveal from './Reveal'
import WhatsAppIcon from './icons/WhatsAppIcon'

export default function Hero() {
  return (
    <section id="inicio" aria-label="Início" className="bg-navy-950 pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold tracking-[0.2em] text-gold-400 uppercase">
            Regularização de obras · Receita Federal
          </p>
          <h1 className="mt-3 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
            Regularize sua obra na Receita Federal com quem entende do assunto
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            Reduza em até <strong className="text-white">73% o INSS devido</strong> pela sua
            construção com o Fator de Ajuste. Atendimento 100% online, em todo o Brasil, conduzido
            por engenheiro civil registrado no CREA.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={reportWhatsAppConversion}
              className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-base font-semibold text-navy-950 shadow-md transition-colors hover:bg-gold-500"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Falar no WhatsApp agora
            </a>
            <a
              href="#como-funciona"
              className="text-sm font-semibold text-navy-200 underline decoration-gold-400 decoration-2 underline-offset-4 hover:text-white"
            >
              Entenda como funciona ↓
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <img
            src={heroPhoto}
            alt="Obra residencial regularizada pela TLR em Campo Grande/MS"
            className="aspect-4/3 w-full rounded-2xl border border-gold-700/40 object-cover shadow-xl"
          />
        </Reveal>
      </div>
    </section>
  )
}
