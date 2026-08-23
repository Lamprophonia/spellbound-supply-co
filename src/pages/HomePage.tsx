import { Link } from 'react-router-dom'
import { ProductArt } from '../components/ProductArt'
import { ProductCard } from '../components/ProductCard'
import { departments } from '../data/departments'
import { canonicalProducts } from '../data/canonical/products'
import { products } from '../data/products'

export function HomePage() {
  const featured = canonicalProducts[0]
  return (
    <>
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">The general catalog · Autumn issue</p>
            <h1>Dependable provisions for an enchanted age.</h1>
            <p className="hero__lede">Fine thaumaturgic goods for the household, laboratory, academy, and licensed trade—supplied with the sober attention they require.</p>
            <div className="hero__actions">
              <Link className="button" to="/catalog">Shop the catalog</Link>
              <Link className="text-link" to={`/products/${featured.slug}`}>View the featured provision <span aria-hidden="true">→</span></Link>
            </div>
            <dl className="hero__assurances">
              <div><dt>342 years</dt><dd>In continuous trade</dd></div>
              <div><dt>4 departments</dt><dd>Under one roof</dd></div>
              <div><dt>Standard courier</dt><dd>For eligible goods</dd></div>
            </dl>
          </div>
          <div className="hero__feature">
            <div className="feature-label"><span>Household essential</span><span>No. 0001</span></div>
            <ProductArt product={featured} large />
            <div className="feature-copy">
              <div><p className="stock-number">{featured.sku}</p><h2>{featured.name}</h2></div>
              <p className="price"><strong>5 Copper</strong><span>per ounce</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="departments-section shell" aria-labelledby="departments-heading">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">The departments</p>
          <h2 id="departments-heading">Goods for every branch of practice</h2>
          <p>Browse our principal counters. Further departments will be entered in subsequent catalogs.</p>
        </div>
        <div className="department-grid">
          {departments.map((department) => (
            <Link className="department-card" key={department.id} to={`/departments/${department.id}`}>
              <span className="department-card__mark" aria-hidden="true">{department.mark}</span>
              <h3>{department.name}</h3>
              <p>{department.description}</p>
              <span className="department-card__link">Browse department <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="catalog-feature">
        <div className="shell">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Selected merchandise</p><h2>From the general catalog</h2></div>
            <p>Canonical SSC goods appear alongside clearly identified demonstration listings used to develop this storefront.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => <ProductCard product={product} key={product.sku} />)}
          </div>
          <div className="center-action"><Link className="button button--outline" to="/catalog">View all catalog goods</Link></div>
        </div>
      </section>

      <section className="notice-band">
        <div className="shell notice-band__inner">
          <div className="notice-seal" aria-hidden="true">SSC<span>1684</span></div>
          <div><p className="eyebrow">A note from the company</p><h2>Trade conducted with care and proper record.</h2><p>Spellbound Supply Co. has provisioned households and licensed practitioners since 1684. All merchandise is catalogued by department and stock number for convenient reference.</p></div>
        </div>
      </section>
    </>
  )
}
