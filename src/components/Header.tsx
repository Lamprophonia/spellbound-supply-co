import { FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { departments } from '../data/departments'
import { useCart } from '../state/CartContext'
import { BrandMark } from './BrandMark'

export function Header() {
  const navigate = useNavigate()
  const { itemCount, announcement } = useCart()

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const query = String(data.get('q') ?? '').trim()
    navigate(query ? `/catalog?q=${encodeURIComponent(query)}` : '/catalog')
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="service-strip">
        <div className="shell service-strip__inner">
          <span>Established 1684</span>
          <span>Standard courier service available</span>
          <span>Trade & guild accounts welcome</span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell masthead">
          <Link className="brand" to="/" aria-label="Spellbound Supply Co. home">
            <img className="brand__heritage-logo" src="/brand/ssc-header-lockup-v2.png" alt="" />
            <span className="brand__compact">
              <BrandMark />
              <span className="brand__type">
              <span className="brand__name">Spellbound Supply Co.</span>
              <span className="brand__tagline">Purveyors of Fine Thaumaturgic Goods</span>
              </span>
            </span>
          </Link>
          <form className="site-search" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="site-search">Search the catalog</label>
            <input id="site-search" name="q" type="search" placeholder="Search products or stock number" />
            <button type="submit">Search</button>
          </form>
          <Link className="cart-link" to="/cart" aria-label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}>
            <span className="cart-link__icon" aria-hidden="true">◇</span>
            <span>Cart</span>
            <strong>{itemCount}</strong>
          </Link>
        </div>
        <nav className="department-nav" aria-label="Departments">
          <div className="shell department-nav__inner">
            <NavLink to="/catalog">All goods</NavLink>
            {departments.map((department) => (
              <NavLink key={department.id} to={`/departments/${department.id}`}>
                {department.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>
    </>
  )
}
