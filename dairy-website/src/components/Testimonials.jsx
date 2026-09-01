import { testimonials } from '../data/dairyData'

function Testimonials() {
  return <section className="testimonials section"><div className="container"><div className="section-heading centered"><span>Family stories</span><h2>Loved at every table</h2></div><div className="testimonial-grid">{testimonials.map(([quote, name, role]) => <figure className="testimonial" key={name}><div className="stars" role="img" aria-label="Five star rating">★★★★★</div><blockquote>{quote}</blockquote><figcaption><span>{name.slice(0, 1)}</span><div><strong>{name}</strong><small>{role}</small></div></figcaption></figure>)}</div></div></section>
}
export default Testimonials