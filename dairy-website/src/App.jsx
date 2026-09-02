import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Products from './components/Products'
import About from './components/About'
import Quality from './components/Quality'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'

function App() {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#home">
        Skip to main content
      </a>

      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <main id="home">
        <Hero />
        <Benefits />
        <Products onEnquire={setSelectedProduct} />
        <About />
        <Quality />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
        <Contact
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
        />
      </main>

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false)
          setIsRegisterOpen(true)
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false)
          setIsLoginOpen(true)
        }}
      />
    </div>
  )
}

export default App