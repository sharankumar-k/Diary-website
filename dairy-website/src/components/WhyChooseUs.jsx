import { reasons } from '../data/dairyData'

function WhyChooseUs() {
  return <section className="why section"><div className="container"><div className="section-heading"><span>Why choose us</span><h2>Made for the moments that matter</h2></div><div className="reason-grid">{reasons.map(([title, description]) => <article className="reason-card" key={title}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>
}
export default WhyChooseUs