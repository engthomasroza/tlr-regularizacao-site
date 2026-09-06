// Dados institucionais e configuração central de contato do site.
// Manter tudo isso num único lugar facilita achar os placeholders antes do lançamento.

export const WHATSAPP_NUMBER = '5567996418667'

// TODO: substituir pelo e-mail de contato real, se for exibido no rodapé.
export const CONTACT_EMAIL = 'contato@tlrregularizacao.com.br'

export const INSTAGRAM_URL = 'https://www.instagram.com/tlr.regularizacaoimobiliaria/'

export const COMPANY = {
  displayName: 'TLR Regularização',
  legalName: 'TLR Engenharia e Regularização Ltda',
  cnpj: '67.752.692/0001-03',
  responsibleName: 'Thomas Loureiro da Roza',
  responsibleTitle: 'Engenheiro Civil',
  crea: 'CREA/MS 71.152',
  city: 'Campo Grande/MS',
  coverage: 'Atendimento 100% online para todo o Brasil',
}

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Vim pelo site e quero entender como regularizar minha obra.'

export const WHATSAPP_LINK = buildWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE)

/** Gera um link de WhatsApp com uma mensagem específica para o contexto do CTA clicado. */
export function whatsappLinkWithMessage(message: string): string {
  return buildWhatsAppLink(message)
}
