// Dispara a conversão do Google Ads quando alguém clica para falar no WhatsApp.
// A tag gtag.js é carregada direto no index.html; aqui só reportamos o evento.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const GOOGLE_ADS_CONVERSION_LABEL = 'AW-18538917996/LgGACPn9OqodEOzghYhF'

export function reportWhatsAppConversion(): void {
  window.gtag?.('event', 'conversion', {
    send_to: GOOGLE_ADS_CONVERSION_LABEL,
    value: 1.0,
    currency: 'BRL',
  })
}
