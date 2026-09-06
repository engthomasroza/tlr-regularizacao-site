import { WHATSAPP_LINK } from '../config/site'
import WhatsAppIcon from './icons/WhatsAppIcon'

/**
 * Botão flutuante fixo, presente em todas as seções da página (mobile e desktop).
 * A animação de pulso é sutil e periódica (não contínua/rápida) para não incomodar.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a TLR Regularização"
      className="animate-whatsapp-pulse fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:scale-105 sm:right-8 sm:bottom-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
