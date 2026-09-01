import { useState } from 'react'
import { company, getWhatsAppUrl, products } from '../data/dairyData'

const initialFormValues = {
name: '',
email: '',
phone: '',
product: '',
message: '',
}

function Contact({ selectedProduct, onProductChange }) {
const [status, setStatus] = useState('idle')
const [errorMessage, setErrorMessage] = useState('')
const [formValues, setFormValues] = useState({
...initialFormValues,
product: selectedProduct,
})

const isSubmitting = status === 'submitting'
const isSuccess = status === 'success'
const isError = status === 'error'

const handleChange = (event) => {
const { name, value } = event.target


setFormValues((previous) => ({
  ...previous,
  [name]: value,
}))

if (name === 'product') {
  onProductChange(value)
}

if (status === 'success' || status === 'error') {
  setStatus('idle')
  setErrorMessage('')
}


}

const handleSubmit = async (event) => {
event.preventDefault()

const formElement = event.currentTarget

if (!formElement.checkValidity()) {
  formElement.reportValidity()
  return
}

setStatus('submitting')
setErrorMessage('')

const payload = {
  name: formValues.name.trim(),
  email: formValues.email.trim(),
  phone: formValues.phone.trim(),
  product: formValues.product.trim(),
  message: formValues.message.trim(),
}

try {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message || 'Something went wrong. Please try again.',
    )
  }

  setFormValues({
    ...initialFormValues,
    product: '',
  })

  onProductChange('')
  setStatus('success')
} catch (error) {
  setErrorMessage(
    error instanceof Error && error.message
      ? error.message
      : 'We could not send your enquiry right now. Please try again shortly.',
  )

  setStatus('error')
}


}

const buttonLabel = isSubmitting ? 'Sending…' : 'Send Message'

return ( <section className="contact section" id="contact"> <div className="container">


    <div className="section-heading">
      <span>Contact us</span>
      <h2>We&apos;d love to hear from you</h2>
      <p>
        Have a question about our products or deliveries?
        Our team is here to help.
      </p>
    </div>

    <div className="contact-layout">

      {/* CONTACT DETAILS */}
      <div className="contact-details">

        <div className="contact-info-item">
          <div className="contact-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s7-5.4 7-12a7 7 0 0 0-14 0c0 6.6 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2" />
            </svg>
          </div>

          <div>
            <h3>Address</h3>
            <p>
              {company.addressLines[0]}
              <br />
              {company.addressLines[1]}
            </p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2
              19.8 19.8 0 0 1-8.6-3.1
              19.5 19.5 0 0 1-6-6
              19.8 19.8 0 0 1-3.1-8.6
              A2 2 0 0 1 4.1 2h3
              a2 2 0 0 1 2 1.7
              c.1 1 .4 2 .7 2.8
              a2 2 0 0 1-.5 2.1L8 9.9
              a16 16 0 0 0 6 6l1.3-1.3
              a2 2 0 0 1 2.1-.5
              c.8.3 1.8.6 2.8.7
              A2 2 0 0 1 22 16.9Z" />
            </svg>
          </div>

          <div>
            <h3>Phone</h3>
            <a href={company.phoneHref}>
              {company.phone}
            </a>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>

          <div>
            <h3>Email</h3>
            <a href={company.emailHref}>
              {company.email}
            </a>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>

          <div>
            <h3>Business Hours</h3>
            <p>
              {company.businessHours[0]}
              <br />
              {company.businessHours[1]}
            </p>
          </div>
        </div>

        {/* WHATSAPP */}
        <a
          className="whatsapp-link"
          href={getWhatsAppUrl(selectedProduct)}
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0
            C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.7 5.9
            L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4
            h.1c6.5 0 11.8-5.3 11.8-11.8
            0-3.2-1.2-6.1-3.5-8.4Z" />
            <path d="M8.2 6.9c.2-.4.4-.4.7-.4h.6
            c.2 0 .5.1.6.5l.8 1.9
            c.1.3.1.5-.1.7l-.7.9
            c-.2.2-.3.3-.1.6
            .5.9 1.2 1.7 2.1 2.3
            .8.5 1.5.8 1.8.9
            .3.1.5.1.7-.2l.8-.9
            c.2-.2.4-.3.7-.2l1.8.9
            c.3.2.5.3.5.6
            0 .3-.1 1.2-.5 1.6
            -.4.4-1 .6-1.6.6
            -.4 0-1.8-.3-3.5-1.4
            -1.5-.9-2.7-2.2-3.5-3.5
            -.8-1.2-1.3-2.7-1.3-3.3
            0-.6.2-1.1.5-1.5Z" />
          </svg>

          <span>Order on WhatsApp</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* CONTACT FORM */}
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          disabled={isSubmitting}
          value={formValues.name}
          onChange={handleChange}
        />

        <label htmlFor="contact-email">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSubmitting}
          value={formValues.email}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          title="Enter a valid phone number"
          disabled={isSubmitting}
          value={formValues.phone}
          onChange={handleChange}
        />

        <label htmlFor="product-subject">
          Product / subject
        </label>

        <select
          id="product-subject"
          name="product"
          required
          disabled={isSubmitting}
          value={formValues.product}
          onChange={handleChange}
        >
          <option value="">
            Select a product or subject
          </option>

          {products.map(([name]) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}

          <option value="General enquiry">
            General enquiry
          </option>
        </select>

        <label htmlFor="message">
          How can we help?
        </label>

        <textarea
          id="message"
          name="message"
          rows="5"
          required
          disabled={isSubmitting}
          value={formValues.message}
          onChange={handleChange}
        />

        <button type="submit" disabled={isSubmitting}>
          {buttonLabel}
        </button>

        {isSuccess && (
          <p className="form-success" role="status">
            Thanks! Your enquiry has been recorded.
            Our team will be in touch soon.
          </p>
        )}

        {isError && (
          <p className="form-error" role="alert">
            {errorMessage ||
              'We could not send your enquiry. Please try again shortly.'}
          </p>
        )}
      </form>

      {/* MAP */}
      <div
        className="map-placeholder"
        aria-label={`Map placeholder for ${company.name} Bengaluru address`}
      >
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s7-5.4 7-12a7 7 0 0 0-14 0c0 6.6 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2" />
          </svg>

          <strong>Find {company.name}</strong>
          <span>Green Park, Bengaluru</span>

          <a
            className="map-link"
            href={company.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </div>

    </div>
  </div>
</section>


)
}

export default Contact
