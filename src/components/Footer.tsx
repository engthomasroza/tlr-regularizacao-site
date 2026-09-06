import { COMPANY, INSTAGRAM_URL, WHATSAPP_LINK } from '../config/site'
import InstagramIcon from './icons/InstagramIcon'
import WhatsAppIcon from './icons/WhatsAppIcon'

export default function Footer() {
  return (
    <footer className="bg-navy-950 py-10 text-navy-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-white">{COMPANY.displayName}</p>
            <p className="mt-2 text-sm">{COMPANY.legalName}</p>
            <p className="text-sm">CNPJ {COMPANY.cnpj}</p>
          </div>

          <div className="text-sm sm:text-right">
            <p>
              Responsável técnico: {COMPANY.responsibleName} ({COMPANY.crea})
            </p>
            <p className="mt-1">{COMPANY.city}</p>
            <div className="mt-2 flex flex-col gap-2 sm:items-end">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-gold-300 hover:text-gold-200"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-gold-300 hover:text-gold-200"
              >
                <InstagramIcon className="h-4 w-4" />
                Siga no Instagram
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-navy-300">
          {COMPANY.coverage} · © {new Date().getFullYear()} {COMPANY.displayName}. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  )
}
