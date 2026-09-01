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

function App() {
  const [selectedProduct, setSelectedProduct] = useState('')
  return <div className="site-shell"><a className="skip-link" href="#home">Skip to main content</a><Header /><main id="home"><Hero /><Benefits /><Products onEnquire={setSelectedProduct} /><About /><Quality /><WhyChooseUs /><Testimonials /><CTA /><Contact selectedProduct={selectedProduct} onProductChange={setSelectedProduct} /></main><Footer /></div>
}

export default App