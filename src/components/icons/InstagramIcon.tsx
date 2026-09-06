import type { SVGProps } from 'react'

/**
 * Ícone genérico de "câmera/rede social" no estilo Instagram (quadrado arredondado +
 * círculo + ponto), desenhado à mão (lucide-react não inclui ícones de marca).
 * Usa currentColor para herdar a cor do elemento pai.
 */
export default function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}
