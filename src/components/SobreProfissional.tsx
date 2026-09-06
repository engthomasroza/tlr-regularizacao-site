import thomasPhoto from '../assets/thomas.jpg'
import { COMPANY, INSTAGRAM_URL } from '../config/site'
import InstagramIcon from './icons/InstagramIcon'
import Reveal from './Reveal'

export default function SobreProfissional() {
  return (
    <section id="sobre" aria-label="Sobre o profissional" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-navy-100 bg-navy-50/40 p-8 sm:grid-cols-[auto_1fr] sm:p-10">
            <img
              src={thomasPhoto}
              alt={`${COMPANY.responsibleName}, ${COMPANY.responsibleTitle.toLowerCase()}`}
              className="mx-auto h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-white sm:mx-0"
            />

            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{COMPANY.responsibleName}</h2>
              <p className="font-semibold text-gold-600">
                {COMPANY.responsibleTitle} ({COMPANY.crea})
              </p>

              <p className="mt-4 text-navy-800">
                Engenheiro civil especializado em regularização de imóveis perante a Receita
                Federal, a Prefeitura e o Cartório de Registro de Imóveis, com atuação também em
                perícia judicial e engenharia investigativa. Essa vivência técnica traz domínio
                completo do processo construtivo, não apenas da parte burocrática.
              </p>
              <p className="mt-3 text-navy-800">
                Responsável técnico da <strong>{COMPANY.legalName}</strong>, sediada em{' '}
                {COMPANY.city}, com atendimento 100% online para todo o Brasil.
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600"
              >
                <InstagramIcon className="h-4 w-4" />
                Siga no Instagram
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
