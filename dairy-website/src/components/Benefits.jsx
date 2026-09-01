import { benefits } from '../data/dairyData'

function Benefits() {
  return <section className="benefits" aria-label="Trust highlights"><div className="container benefits-grid">{benefits.map(([title, description]) => <article className="benefit-card" key={title}><div className="benefit-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C9 7 6 10 6 14a6 6 0 0 0 12 0c0-4-3-7-6-11Z"/><path d="m9 14 2 2 4-4"/></svg></div><h2>{title}</h2><p>{description}</p></article>)}</div></section>
}
export default Benefits