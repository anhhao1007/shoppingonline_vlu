# FE Phone Sell - Quick Reference Guide

## Color Palette

```css
--primary-dark: #1a1a2e      /* Dark navy - main background */
--primary-accent: #d4af37    /* Gold - premium accents */
--primary-green: #16c784     /* Fresh green - actions/success */
--primary-navy: #0f3460      /* Secondary dark */

--secondary-light: #f5f5f7   /* Light background */
--secondary-white: #ffffff   /* Pure white */
--secondary-gray: #6c757d    /* Medium gray text */
--secondary-dark-gray: #2d3436 /* Dark gray */
```

## Common CSS Classes

### Buttons
```jsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-outline">Outline Button</button>
<button className="btn-add">Add to Cart</button>
<button className="btn-checkout">Checkout</button>
<button className="btn-continue">Continue Shopping</button>
```

### Forms
```jsx
<div className="form-group">
  <label className="form-label">Label</label>
  <input className="form-control" type="text" />
</div>

<form className="form-wrapper">
  <div className="form-header">Header</div>
  <div className="form-body">Content</div>
</form>
```

### Layout
```jsx
<div className="container-fluid">...</div>
<div className="products-grid">...</div>
<div className="cart-content">...</div>

<section className="featured-products">...</section>
<section className="home-hero">...</section>
```

### Cards
```jsx
<div className="card">
  <div className="card-header">Header</div>
  <div className="card-body">Content</div>
  <div className="card-footer">Footer</div>
</div>

<div className="product-card">
  <div className="product-image"><img /></div>
  <div className="product-info">
    <span className="product-category">Category</span>
    <h5 className="product-name">Name</h5>
    <div className="product-rating">★★★★☆</div>
    <div className="product-price">
      <span className="current">$99</span>
    </div>
    <div className="product-actions">
      <button className="btn-add">View</button>
      <button className="btn-wishlist">♡</button>
    </div>
  </div>
</div>
```

### Animations
```jsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-fade-in-up">Slide up</div>
<div className="animate-slide-down">Slide down</div>
<div className="animate-scale-in">Scale in</div>
<div className="animate-pulse">Pulse</div>
<div className="animate-float">Float</div>
<div className="animate-glow">Glow</div>
```

### Utilities
```jsx
<div className="text-gold">Gold text</div>
<div className="text-green">Green text</div>
<div className="text-muted">Muted text</div>
<div className="text-center">Centered text</div>

<div className="flex">Flexbox</div>
<div className="flex-center">Centered flex</div>
<div className="flex-between">Space-between flex</div>

<div className="grid grid-3">3-column grid</div>
<div className="grid grid-4">4-column grid</div>

<div className="gap-sm">Small gap</div>
<div className="gap-md">Medium gap</div>
<div className="gap-lg">Large gap</div>

<div className="p-lg">Large padding</div>
<div className="m-lg">Large margin</div>
<div className="mt-lg">Margin top</div>
<div className="mb-lg">Margin bottom</div>
```

### Alerts
```jsx
<div className="alert alert-info">ℹ Info message</div>
<div className="alert alert-success">✓ Success message</div>
<div className="alert alert-warning">⚠ Warning message</div>
<div className="alert alert-danger">✕ Error message</div>
```

### Badges
```jsx
<span className="badge">Gold badge</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-secondary">Secondary</span>
```

### Tables
```jsx
<table>
  <thead className="cart-items-thead">
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody className="cart-items-tbody">
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

### Forms & Inputs
```jsx
<input className="form-control" type="text" placeholder="Enter text" />
<select className="form-control">
  <option>Select option</option>
</select>
<textarea className="form-control"></textarea>
```

## Spacing Scale

```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 24px
--spacing-2xl: 32px
--spacing-3xl: 48px
```

Usage: `padding: var(--spacing-lg);`

## Responsive Breakpoints

```css
/* Desktop: 1024px+ (full features) */
/* Tablet: 768px-1023px (adapted) */
/* Mobile: <768px (single column) */

@media (max-width: 1024px) { }
@media (max-width: 768px) { }
@media (max-width: 480px) { }
```

## Common Patterns

### Hero Section
```jsx
<section className="home-hero">
  <div className="home-hero-content">
    <h1>Heading</h1>
    <p>Description</p>
    <a href="#" className="btn-primary">CTA</a>
  </div>
</section>
```

### Product Grid
```jsx
<section className="featured-products">
  <div className="container-fluid">
    <h2>Title</h2>
    <div className="products-grid">
      {/* Product cards */}
    </div>
  </div>
</section>
```

### Shopping Cart
```jsx
<div className="cart-container">
  <div className="cart-header">
    <h1>Shopping Cart</h1>
  </div>
  <div className="cart-content">
    <div className="cart-items">
      <table className="cart-items-table">
        {/* Cart items */}
      </table>
    </div>
    <div className="cart-summary">
      {/* Summary */}
    </div>
  </div>
</div>
```

### Form
```jsx
<div className="auth-container">
  <div className="form-wrapper">
    <div className="form-header">
      <i className="bi bi-icon"></i>
      <h2>Form Title</h2>
    </div>
    <div className="form-body">
      <form>
        <div className="form-group">
          <label className="form-label">Label</label>
          <input className="form-control" />
        </div>
        <button className="btn-submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## Icon Classes (Bootstrap Icons)

```
bi-star-fill          ★ Star filled
bi-star-half          ☆ Star half
bi-heart              ♡ Heart
bi-trash              🗑 Trash
bi-cart3              🛒 Cart
bi-bag-plus           🛍 Bag plus
bi-box-arrow-in-right 🔐 Login
bi-person-plus        👤 Sign up
bi-shield-check       ✓ Activate
bi-truck              🚚 Shipping
bi-credit-card        💳 Payment
bi-arrow-return-left  ↩ Return
```

## Animation Durations

```css
--transition-fast: 150ms      /* Quick interactions */
--transition-normal: 250ms    /* Standard transitions */
--transition-slow: 350ms      /* Slow transitions */
```

## Gradients

```css
--gradient-gold: linear-gradient(135deg, #d4af37 0%, #c9a017 100%)
--gradient-dark: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)
--gradient-green: linear-gradient(135deg, #16c784 0%, #0dd481 100%)
--gradient-navy-gold: linear-gradient(135deg, #1a1a2e 0%, #d4af37 100%)
```

## Shadows

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1)
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12)
--shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.15)
--shadow-gold: 0 4px 16px rgba(212, 175, 55, 0.3)
```

## Tips & Best Practices

1. **Always use CSS variables** for colors, spacing, transitions
2. **Combine flexbox + gap** instead of margin for layouts
3. **Use transform for animations** (GPU acceleration)
4. **Apply animations with animation-delay** for stagger effects
5. **Mobile-first approach** - design for mobile, enhance for desktop
6. **Test on multiple devices** - 480px, 768px, 1024px
7. **Use semantic HTML** - main, section, article, nav
8. **Add alt text** to all images
9. **Ensure color contrast** for accessibility
10. **Reduce motion** support with prefers-reduced-motion

## File Organization

```
src/
├── components/
│   ├── HomeComponent.js
│   ├── ProductComponent.js
│   ├── ProductDetailComponent.js
│   ├── MycartComponent.js
│   ├── LoginComponent.js
│   ├── SignupComponent.js
│   ├── ActiveComponent.js
│   ├── MyprofileComponent.js
│   ├── MyordersComponent.js
│   ├── MenuComponent.js
│   └── InformComponent.js
├── luxury-design-system.css
├── luxury-animations.css
├── luxury-utilities.css
├── premium-pages.css
├── luxury-auth.css
├── luxury-cart.css
├── luxury-header.css
└── App.js
```

## Resources

- **Design Documentation**: See `LUXURY_REDESIGN.md`
- **Implementation Summary**: See `REDESIGN_SUMMARY.md`
- **Component Guide**: Check each component file for structure
- **CSS Variables**: All defined in `luxury-design-system.css`
