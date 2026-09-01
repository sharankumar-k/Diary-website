import { quality } from '../data/dairyData'

function Quality() {
  return <section className="quality section" id="quality"><div className="container"><div className="section-heading centered"><span>Our promise</span><h2>Quality in every drop</h2><p>Our team carefully protects the freshness, safety and natural goodness of every product.</p></div><div className="quality-grid">{quality.map(([title, description], index) => <article key={title} className="quality-card"><div className="number">0{index + 1}</div><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
}
export default Quality