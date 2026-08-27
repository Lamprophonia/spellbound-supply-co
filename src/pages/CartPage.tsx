import { Link } from 'react-router-dom'
import { ProductImage } from '../components/ProductImage'
import { products } from '../data/products'
import { formatCurrency, toCopper } from '../domain/catalog'
import { useCart } from '../state/CartContext'

export function CartPage() {
  const { lines, itemCount, setQuantity, removeItem, clearCart } = useCart()
  const cartLines = lines.flatMap((line) => {
    const product = products.find((item) => item.sku === line.sku)
    return product ? [{ ...line, product }] : []
  })
  const totalCopper = cartLines.reduce(
    (total, line) => total + toCopper(line.product.price.amount * line.quantity, line.product.price.denomination),
    0,
  )

  return (
    <div className="page-shell shell cart-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>Cart</span></nav>
      <header className="page-header page-header--compact"><p className="eyebrow">Order ledger</p><h1>Your cart</h1><p>{itemCount} {itemCount === 1 ? 'unit' : 'units'} entered for purchase.</p></header>
      {cartLines.length === 0 ? (
        <div className="empty-state empty-state--cart"><span aria-hidden="true">◇</span><h2>Your cart is empty</h2><p>No goods have yet been entered in the order ledger.</p><Link className="button" to="/catalog">Browse the catalog</Link></div>
      ) : (
        <div className="cart-layout">
          <section className="cart-lines" aria-labelledby="cart-items-heading">
            <div className="cart-section-heading"><h2 id="cart-items-heading">Goods entered</h2><button type="button" onClick={clearCart}>Clear cart</button></div>
            {cartLines.map(({ product, quantity }) => (
              <article className="cart-line" key={product.sku}>
                <Link to={`/products/${product.slug}`}><ProductImage product={product} /></Link>
                <div className="cart-line__info"><p className="stock-number">{product.sku}</p><h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.price.amount} {product.price.denomination} per {product.price.unit}</p><button className="remove-button" type="button" onClick={() => removeItem(product.sku)}>Remove</button></div>
                <div className="quantity-field"><label htmlFor={`quantity-${product.sku}`}>Quantity ({product.price.unit}s)</label><input id={`quantity-${product.sku}`} type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(product.sku, Number(event.target.value))} /></div>
                <p className="line-total"><strong>{product.price.amount * quantity} {product.price.denomination}</strong></p>
              </article>
            ))}
          </section>
          <aside className="order-summary" aria-labelledby="summary-heading"><p className="eyebrow">Ledger summary</p><h2 id="summary-heading">Order summary</h2><dl><div><dt>Merchandise total</dt><dd>{formatCurrency(totalCopper)}</dd></div></dl><p className="currency-note">Each denomination converts at 100 to 1: Copper, Silver, Gold, Platinum, then Mythril.</p><button className="button button--full" type="button" disabled>Checkout unavailable</button><p className="checkout-note">This demonstration storefront does not process orders or payment.</p></aside>
        </div>
      )}
    </div>
  )
}
