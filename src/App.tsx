import { Analytics } from '@vercel/analytics/react'
import CTAFinal from './components/CTAFinal'
import Calculadora from './components/Calculadora'
import CasosReais from './components/CasosReais'
import ComoFunciona from './components/ComoFunciona'
import Diferenciais from './components/Diferenciais'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Problema from './components/Problema'
import Servico from './components/Servico'
import SobreProfissional from './components/SobreProfissional'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CasosReais />
        <SobreProfissional />
        <Problema />
        <Calculadora />
        <Servico />
        <ComoFunciona />
        <Diferenciais />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
      <Analytics />
    </>
  )
}

export default App
