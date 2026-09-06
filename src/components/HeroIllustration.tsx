/**
 * Ilustração de uma pilha de documentos (comprovante de obra, guia de pagamento e
 * certidão final). O cabeçalho, o selo circular e os campos destacados são formas
 * abstratas e genéricas, não reproduções do Brasão da República nem do logotipo da
 * Receita Federal. São símbolos oficiais protegidos por lei, e usá-los num site
 * comercial passaria uma falsa impressão de vínculo institucional.
 * TODO: pode ser substituída por uma peça gráfica definitiva da marca, se desejado.
 */
export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 360 370"
      role="img"
      aria-label="Ilustração de documentos de regularização de obra: comprovante, guia de pagamento e certidão"
      className="w-full max-w-md text-navy-900"
    >
      {/* Documento 1 (atrás): comprovante de cadastro da obra */}
      <g transform="translate(8 55) rotate(-12 105 135)" opacity="0.85">
        <rect x="0" y="0" width="210" height="270" rx="14" fill="white" stroke="currentColor" strokeWidth="2" />
        <path d="M0 14a14 14 0 0 1 14-14h182a14 14 0 0 1 14 14v42H0Z" className="fill-navy-800" />
        <circle cx="28" cy="28" r="13" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
        <circle cx="28" cy="28" r="5" fill="white" opacity="0.9" />
        <rect x="50" y="18" width="120" height="8" rx="2" fill="white" opacity="0.9" />
        <rect x="50" y="32" width="90" height="6" rx="2" fill="white" opacity="0.6" />

        <rect x="24" y="76" width="162" height="8" rx="2" fill="currentColor" opacity="0.16" />
        <rect x="24" y="98" width="130" height="8" rx="2" fill="currentColor" opacity="0.16" />
        <rect x="24" y="120" width="150" height="8" rx="2" fill="currentColor" opacity="0.16" />

        <line x1="24" y1="152" x2="186" y2="152" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <rect x="24" y="170" width="70" height="7" rx="2" fill="currentColor" opacity="0.14" />
        <rect x="24" y="186" width="138" height="7" rx="2" fill="currentColor" opacity="0.14" />
        <rect x="120" y="170" width="42" height="7" rx="2" fill="currentColor" opacity="0.14" />
      </g>

      {/* Documento 2 (meio): guia de pagamento */}
      <g transform="translate(128 62) rotate(10 105 135)">
        <rect x="0" y="0" width="210" height="270" rx="14" fill="white" stroke="currentColor" strokeWidth="2" />
        <path d="M0 14a14 14 0 0 1 14-14h182a14 14 0 0 1 14 14v6H0Z" className="fill-gold-400" />

        <circle cx="28" cy="42" r="13" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <path d="M22 42h12M28 36v12" stroke="currentColor" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
        <rect x="50" y="34" width="120" height="8" rx="2" fill="currentColor" opacity="0.22" />
        <rect x="50" y="48" width="90" height="6" rx="2" fill="currentColor" opacity="0.15" />

        <rect x="24" y="82" width="162" height="7" rx="2" fill="currentColor" opacity="0.14" />
        <rect x="24" y="98" width="120" height="7" rx="2" fill="currentColor" opacity="0.14" />

        <rect x="24" y="124" width="162" height="56" rx="8" fill="var(--color-gold-50)" stroke="var(--color-gold-300)" strokeWidth="1.5" />
        <rect x="36" y="136" width="80" height="7" rx="2" className="fill-gold-600" opacity="0.8" />
        <rect x="36" y="152" width="110" height="14" rx="3" className="fill-gold-500" />

        <g opacity="0.55">
          {[0, 5, 9, 12, 16, 21, 25, 28, 33, 37, 41, 46, 50, 54, 59, 63, 67].map((offset, i) => (
            <rect
              key={offset}
              x={offset + 24}
              y="200"
              width={i % 3 === 0 ? 3 : 1.5}
              height="22"
              fill="currentColor"
            />
          ))}
        </g>
      </g>

      {/* Documento 3 (frente): certidão final */}
      <g transform="translate(65 24)">
        <rect x="0" y="0" width="210" height="270" rx="14" fill="white" stroke="currentColor" strokeWidth="2.5" />
        <path d="M0 16a16 16 0 0 1 16-16h178a16 16 0 0 1 16 16v34H0Z" className="fill-navy-900" />

        <circle cx="30" cy="25" r="14" fill="none" stroke="var(--color-gold-300)" strokeWidth="2.5" />
        <path
          d="M24 25l4.5 4.5L36 20.5"
          stroke="var(--color-gold-300)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="54" y="19" width="130" height="8" rx="2" fill="white" opacity="0.9" />

        <rect x="26" y="72" width="176" height="8" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="26" y="94" width="140" height="8" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="26" y="116" width="160" height="8" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="26" y="138" width="100" height="8" rx="2" fill="currentColor" opacity="0.18" />

        <rect x="26" y="172" width="176" height="1" fill="currentColor" opacity="0.15" />
        <rect x="26" y="192" width="96" height="12" rx="3" className="fill-gold-400" />
        <rect x="26" y="216" width="132" height="8" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="26" y="238" width="82" height="8" rx="2" fill="currentColor" opacity="0.18" />
      </g>
    </svg>
  )
}
