import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logoTlr from '../assets/logo-tlr.png'
import { WHATSAPP_LINK } from '../config/site'
import WhatsAppIcon from './icons/WhatsAppIcon'

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#problema', label: 'O Problema' },
  { href: '#simulador', label: 'Simule Agora' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#faq', label: 'Dúvidas Frequentes' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-shadow duration-200 ${
        scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white/80 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2 font-heading">
          <img src={logoTlr} alt="TLR" className="h-9 w-9 object-contain" />
          <span className="hidden text-base font-semibold text-navy-900 sm:inline">
            Regularização
          </span>
        </a>

        <nav className="hidden items-center gap-4 xl:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium whitespace-nowrap text-navy-700 transition-colors hover:text-gold-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="flex items-center gap-2 rounded-full bg-gold-400 px-3 py-2 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-500 sm:px-4"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Falar no WhatsApp</span>
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-800 xl:hidden"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Navegação principal (mobile)"
          className="border-t border-navy-100 bg-white px-4 pb-4 xl:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm font-medium text-navy-700 hover:text-gold-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
