
import { products } from '../data/dairyData'

function Products({ onEnquire }) {
  return (
    <section className="products section" id="products">
      <div className="container">
        <div className="section-heading">
          <span>Our range</span>
          <h2>Fresh dairy for every day</h2>
          <p>
            From your morning glass of milk to the ingredients that make
            family meals special, every product is made with care.
          </p>
        </div>

        <div className="product-grid">
          {products.map(([name, description, tag, image], index) => (
            <article className="product-tile" key={name}>
              <div className={`product-image product-image-${index % 4}`}>
                <img
                  src={image}
                  alt={`${name} from PureDairy`}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
                <span>{tag}</span>
              </div>

              <div>
                <h3>{name}</h3>
                <p>{description}</p>

                <a href="#contact" onClick={() => onEnquire(name)}>
                  Enquire now <b aria-hidden="true">→</b>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products

