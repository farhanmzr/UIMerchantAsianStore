import { FormEvent, ReactNode, useMemo, useState } from "react"

type Role = "MANAGER" | "STAFF"
type Screen = "login" | "stores" | "dashboard" | "products" | "listing" | "listing-new" | "inventory" | "batch" | "store" | "team" | "more" | "account"
type IconName = "home" | "box" | "layers" | "menu" | "search" | "arrow" | "chevron" | "refresh" | "store" | "users" | "user" | "logout" | "plus" | "edit" | "eye" | "eyeOff" | "check" | "close" | "alert" | "calendar" | "trash" | "sliders" | "shield" | "wifi"

type Availability = "In stock" | "Low stock" | "Out of stock" | "Unknown"
type Product = {
  id: number
  name: string
  category: string
  origin: string
  price: number | null
  listed: boolean
  availability: Availability
  tone: string
  initials: string
}
type Batch = {
  id: string
  product: string
  code: string | null
  quantity: number
  expiry: string | null
}

const products: Product[] = [
  {
    id: 1,
    name: "Shin Ramyun Noodles",
    category: "Noodles",
    origin: "South Korea",
    price: 8.5,
    listed: true,
    availability: "In stock",
    tone: "red",
    initials: "辛",
  },
  {
    id: 2,
    name: "Premium Jasmine Rice",
    category: "Rice & grains",
    origin: "Thailand",
    price: 44.9,
    listed: true,
    availability: "Low stock",
    tone: "sand",
    initials: "米",
  },
  {
    id: 3,
    name: "Organic Miso Paste",
    category: "Sauces & pastes",
    origin: "Japan",
    price: null,
    listed: true,
    availability: "Out of stock",
    tone: "amber",
    initials: "味",
  },
  {
    id: 4,
    name: "Coconut Milk 400ml",
    category: "Pantry",
    origin: "Thailand",
    price: 12.5,
    listed: true,
    availability: "Unknown",
    tone: "green",
    initials: "椰",
  },
  {
    id: 5,
    name: "Roasted Sesame Oil",
    category: "Oils",
    origin: "China",
    price: null,
    listed: false,
    availability: "Unknown",
    tone: "gold",
    initials: "香",
  },
]

const batches: Batch[] = [
  {
    id: "IB-2048",
    product: "Shin Ramyun Noodles",
    code: "SR-2405",
    quantity: 24,
    expiry: "18 Sep 2026",
  },
  {
    id: "IB-2047",
    product: "Premium Jasmine Rice",
    code: "JR-119",
    quantity: 8,
    expiry: "04 Feb 2027",
  },
  {
    id: "IB-2046",
    product: "Organic Miso Paste",
    code: null,
    quantity: 0,
    expiry: "12 Nov 2025",
  },
  {
    id: "IB-2045",
    product: "Roasted Sesame Oil",
    code: "SO-88",
    quantity: 0,
    expiry: null,
  },
]

function Icon({
  name,
  size = 20,
  stroke = 1.8,
}: {
  name: IconName
  size?: number
  stroke?: number
}) {
  const paths: Record<IconName, ReactNode> = {
    home: (
      <>
        <path d="M3 10.8 12 3l9 7.8" />
        <path d="M5.5 9.7V21h13V9.7M9.2 21v-6.5h5.6V21" />
      </>
    ),
    box: (
      <>
        <path d="m4 7.5 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7.5v9l8 4 8-4v-9M12 11.5v9" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3-9 5 9 5 9-5-9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    menu: (
      <>
        <path d="M5 7h14M5 12h14M5 17h14" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    arrow: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
    chevron: (
      <>
        <path d="m9 18 6-6-6-6" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14.7-4M4 4v5h5M4 13a8 8 0 0 0 14.7 4M20 20v-5h-5" />
      </>
    ),
    store: (
      <>
        <path d="M4 10v10h16V10M3 4h18l-1.5 6a3 3 0 0 1-5 1 3 3 0 0 1-5 0 3 3 0 0 1-5-1L3 4Z" />
        <path d="M9 20v-5h6v5" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2M16 5.5a3 3 0 0 1 0 5.8M17 14a5.5 5.5 0 0 1 3.5 5" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    logout: (
      <>
        <path d="M10 5H4v14h6M14 8l4 4-4 4M8 12h10" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    edit: (
      <>
        <path d="m4 20 4.2-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20ZM14.5 6.5l3 3" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 9.5 6 9.5 6a14 14 0 0 1-2.1 2.8M6.5 6.6C3.9 8.4 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 3-.5" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4.5 4.5L19 7" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12M18 6 6 18" />
      </>
    ),
    alert: (
      <>
        <path d="M12 4 3 20h18L12 4Z" />
        <path d="M12 9v5M12 17.5v.1" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M6.5 7l1 14h9l1-14M10 11v6M14 11v6" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 7h5M15 7h5M9 4v6M4 17h9M19 17h1M15 14v6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    wifi: (
      <>
        <path d="M3 9a14 14 0 0 1 18 0M6.5 12.5a9 9 0 0 1 11 0M10 16a4 4 0 0 1 4 0M12 20h.01" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <div className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M7 15.5C7 8.2 12 4 21 4c.1 8.5-3.5 14-11.5 15.5" />
          <path d="M8 26c2.1-7.2 6-11.8 12-15" />
        </svg>
      </div>
      <div>
        <strong>Asian Store</strong>
        <span>Merchant</span>
      </div>
    </div>
  )
}

function StatusChip({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "green" | "orange" | "red" | "neutral" | "dark"
}) {
  return <span className={`chip chip--${tone}`}>{children}</span>
}

function ProductArt({
  product,
  small = false,
}: {
  product: Product
  small?: boolean
}) {
  return (
    <div
      className={`product-art product-art--${product.tone} ${
        small ? "product-art--small" : ""
      }`}
    >
      <span>{product.initials}</span>
      <i />
    </div>
  )
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "text" | "danger"
  icon?: IconName
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}) {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  )
}

function AppHeader({
  title,
  eyebrow,
  back,
  action,
}: {
  title: string
  eyebrow?: string
  back?: () => void
  action?: ReactNode
}) {
  return (
    <header className="app-header">
      <div className="app-header__top">
        {back ? (
          <button className="icon-button" onClick={back} aria-label="Go back">
            <Icon name="arrow" />
          </button>
        ) : (
          <Brand compact />
        )}
        {action}
      </div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {!back && (
        <div className="store-context">
          <span className="status-dot" /> Synthetic Store A <span>•</span>{" "}
          Active
        </div>
      )}
    </header>
  )
}

function BottomNav({
  screen,
  go,
}: {
  screen: Screen
  go: (screen: Screen) => void
}) {
  const tabs: { id: Screen label: string icon: IconName }[] = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "products", label: "Products", icon: "box" },
    { id: "inventory", label: "Inventory", icon: "layers" },
    { id: "more", label: "More", icon: "menu" },
  ]
  const active =
    screen === "listing" || screen === "listing-new"
      ? "products"
      : screen === "batch"
        ? "inventory"
        : screen
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={active === tab.id ? "active" : ""}
          onClick={() => go(tab.id)}
        >
          <Icon name={tab.icon} size={21} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  hint,
  suffix,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  error?: string
  hint?: string
  suffix?: ReactNode
}) {
  return (
    <label className={`field ${error ? "field--error" : ""}`}>
      <span className="field__label">{label}</span>
      <span className="field__control">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
        />
        {suffix}
      </span>
      {error ? (
        <span className="field__message">
          <Icon name="alert" size={14} />
          {error}
        </span>
      ) : (
        hint && <span className="field__hint">{hint}</span>
      )}
    </label>
  )
}

function SelectField({
  label,
  value,
  children,
  onChange,
  hint,
}: {
  label: string
  value: string
  children: ReactNode
  onChange?: (value: string) => void
  hint?: string
}) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <span className="field__control field__control--select">
        <select value={value} onChange={(e) => onChange?.(e.target.value)}>
          {children}
        </select>
        <Icon name="chevron" size={17} />
      </span>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  )
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}) {
  return (
    <button
      className="toggle-row"
      onClick={() => onChange(!checked)}
      type="button"
      role="switch"
      aria-checked={checked}
    >
      <span>
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </span>
      <i className={checked ? "on" : ""}>
        <b />
      </i>
    </button>
  )
}

function EmptyState({
  icon = "box",
  title,
  text,
  action,
}: {
  icon?: IconName
  title: string
  text: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon name={icon} size={25} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  )
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("manager@synthetic.store")
  const [password, setPassword] = useState("merchant")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [authError, setAuthError] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!email.includes("@") || password.length < 6) return
    if (email.includes("error")) {
      setAuthError(true)
      return
    }
    setLoading(true)
    window.setTimeout(onLogin, 650)
  }
  return (
    <div className="auth-screen">
      <div className="auth-glow auth-glow--one" />
      <div className="auth-glow auth-glow--two" />
      <main className="auth-content">
        <Brand />
        <div className="auth-intro">
          <span className="overline">STORE OPERATIONS</span>
          <h1>Welcome back.</h1>
          <p>
            Everything you need to keep your store running smoothly, in one calm
            place.
          </p>
        </div>
        <form className="auth-card" onSubmit={submit}>
          {authError && (
            <div className="inline-alert inline-alert--error">
              <Icon name="alert" />
              <span>
                <strong>We couldn’t sign you in</strong>Check your details or
                try again.
              </span>
            </div>
          )}
          <Field
            label="Email address"
            value={email}
            onChange={(v) => {
              setEmail(v)
              setAuthError(false)
            }}
            placeholder="you@store.com"
            type="email"
            error={
              submitted && !email.includes("@")
                ? "Enter a valid email address."
                : undefined
            }
          />
          <Field
            label="Password"
            value={password}
            onChange={(v) => {
              setPassword(v)
              setAuthError(false)
            }}
            type={show ? "text" : "password"}
            error={
              submitted && password.length < 6
                ? "Password must have at least 6 characters."
                : undefined
            }
            suffix={
              <button
                type="button"
                className="field-icon"
                onClick={() => setShow(!show)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                <Icon name={show ? "eyeOff" : "eye"} />
              </button>
            }
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" /> Signing in…
              </>
            ) : (
              "Sign in securely"
            )}
          </Button>
          <p className="demo-hint">
            Prototype: use the pre-filled Manager account. Add “error” to the
            email to test authentication failure.
          </p>
        </form>
      </main>
      <footer className="auth-footer">
        <Icon name="shield" size={16} /> Secure merchant access
      </footer>
    </div>
  )
}

function StoreSelection({
  onContinue,
  onLogout,
}: {
  onContinue: () => void
  onLogout: () => void
}) {
  const [selected, setSelected] = useState("a")
  return (
    <div className="onboarding-screen">
      <div className="onboarding-top">
        <Brand compact />
        <button className="text-action" onClick={onLogout}>
          Sign out
        </button>
      </div>
      <main className="onboarding-content">
        <span className="step-label">STEP 1 OF 1</span>
        <h1>Choose your store</h1>
        <p>Select which assigned store you’d like to manage today.</p>
        <div className="store-list">
          <button
            className={`store-card ${selected === "a" ? "selected" : ""}`}
            onClick={() => setSelected("a")}
          >
            <div className="store-avatar">
              <Icon name="store" />
            </div>
            <div className="store-card__body">
              <strong>Synthetic Store A</strong>
              <span>Bucharest, Romania</span>
              <div>
                <StatusChip tone="green">Active</StatusChip>
                <StatusChip>Manager</StatusChip>
              </div>
            </div>
            <span className="radio">
              {selected === "a" && <Icon name="check" size={14} stroke={2.6} />}
            </span>
          </button>
          <button
            className={`store-card store-card--inactive ${
              selected === "b" ? "selected" : ""
            }`}
            onClick={() => setSelected("b")}
          >
            <div className="store-avatar">
              <Icon name="store" />
            </div>
            <div className="store-card__body">
              <strong>Synthetic Store B</strong>
              <span>Cluj-Napoca, Romania</span>
              <div>
                <StatusChip>Inactive</StatusChip>
                <StatusChip>Manager</StatusChip>
              </div>
            </div>
            <span className="radio">
              {selected === "b" && <Icon name="check" size={14} stroke={2.6} />}
            </span>
          </button>
        </div>
        {selected === "b" && (
          <div className="inline-alert">
            <Icon name="alert" />
            <span>
              <strong>This store is inactive</strong>You can review its
              information, but write actions will be unavailable.
            </span>
          </div>
        )}
      </main>
      <div className="sticky-action">
        <Button onClick={onContinue}>Continue to dashboard</Button>
      </div>
    </div>
  )
}

function Dashboard({
  go,
  role,
  toast,
}: {
  go: (screen: Screen) => void
  role: Role
  toast: (message: string) => void
}) {
  const [refreshing, setRefreshing] = useState(false)
  const refresh = () => {
    setRefreshing(true)
    window.setTimeout(() => {
      setRefreshing(false)
      toast("Dashboard is up to date")
    }, 600)
  }
  return (
    <div className="screen">
      <AppHeader
        title="Good morning, Alex"
        eyebrow={`${role === "MANAGER" ? "MANAGER" : "STAFF"} WORKSPACE`}
        action={
          <button
            className={`icon-button ${refreshing ? "rotating" : ""}`}
            onClick={refresh}
            aria-label="Refresh dashboard"
          >
            <Icon name="refresh" />
          </button>
        }
      />
      <main className="screen-content">
        <section className="summary-card">
          <div className="summary-card__top">
            <div>
              <span>Store listings</span>
              <strong>5</strong>
            </div>
            <div className="summary-ring">
              <svg viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="16" />
                <circle className="progress" cx="21" cy="21" r="16" />
              </svg>
              <b>80%</b>
            </div>
          </div>
          <div className="summary-card__bottom">
            <div>
              <i className="dot dot--green" />
              <span>Listed</span>
              <strong>4</strong>
            </div>
            <div>
              <i className="dot dot--muted" />
              <span>Unlisted</span>
              <strong>1</strong>
            </div>
            <div>
              <i className="dot dot--orange" />
              <span>No price</span>
              <strong>2</strong>
            </div>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <span className="eyebrow">AT A GLANCE</span>
            <h2>Availability</h2>
          </div>
          <button onClick={() => go("products")}>
            View products <Icon name="chevron" size={15} />
          </button>
        </div>
        <section className="availability-card">
          <div className="availability-bar">
            <i className="stock" />
            <i className="low" />
            <i className="out" />
            <i className="unknown" />
          </div>
          <div className="availability-grid">
            <div>
              <span>
                <i className="dot dot--green" />
                In stock
              </span>
              <strong>1</strong>
            </div>
            <div>
              <span>
                <i className="dot dot--orange" />
                Low stock
              </span>
              <strong>1</strong>
            </div>
            <div>
              <span>
                <i className="dot dot--red" />
                Out of stock
              </span>
              <strong>1</strong>
            </div>
            <div>
              <span>
                <i className="dot dot--muted" />
                Unknown
              </span>
              <strong>2</strong>
            </div>
          </div>
          <p>
            <Icon name="alert" size={14} /> Availability is recorded manually
            and does not calculate physical stock.
          </p>
        </section>

        <div className="section-heading">
          <div>
            <span className="eyebrow">INVENTORY</span>
            <h2>Batch records</h2>
          </div>
          <button onClick={() => go("inventory")}>
            Open inventory <Icon name="chevron" size={15} />
          </button>
        </div>
        <section className="inventory-kpis">
          <div>
            <span>Total batches</span>
            <strong>4</strong>
            <small>Across 4 listings</small>
          </div>
          <div className="attention">
            <span>Zero quantity</span>
            <strong>2</strong>
            <small>Need attention</small>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <span className="eyebrow">SHORTCUTS</span>
            <h2>Manage your store</h2>
          </div>
        </div>
        <section className="quick-grid">
          <button onClick={() => go("products")}>
            <span>
              <Icon name="box" />
            </span>
            <div>
              <strong>Products</strong>
              <small>Listings & price</small>
            </div>
            <Icon name="chevron" size={17} />
          </button>
          <button onClick={() => go("inventory")}>
            <span>
              <Icon name="layers" />
            </span>
            <div>
              <strong>Inventory</strong>
              <small>Batch records</small>
            </div>
            <Icon name="chevron" size={17} />
          </button>
          <button onClick={() => go("store")}>
            <span>
              <Icon name="store" />
            </span>
            <div>
              <strong>My Store</strong>
              <small>Store profile</small>
            </div>
            <Icon name="chevron" size={17} />
          </button>
        </section>
        <p className="prototype-note">
          Fictional data for prototype demonstration only.
        </p>
      </main>
    </div>
  )
}

function ProductsScreen({ go }: { go: (screen: Screen) => void }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const queryMatch = p.name.toLowerCase().includes(query.toLowerCase())
        const filterMatch =
          filter === "All" ||
          (filter === "Listed" && p.listed) ||
          (filter === "Unlisted" && !p.listed) ||
          (filter === "No price" && p.price === null)
        return queryMatch && filterMatch
      }),
    [query, filter],
  )
  return (
    <div className="screen">
      <AppHeader
        title="Products"
        eyebrow="5 STORE LISTINGS"
        action={
          <button
            className="icon-button icon-button--filled"
            onClick={() => go("listing-new")}
            aria-label="Create listing"
          >
            <Icon name="plus" />
          </button>
        }
      />
      <main className="screen-content screen-content--list">
        <div className="search-box">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search store listings"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <Icon name="close" size={17} />
            </button>
          )}
        </div>
        <div className="filter-row" aria-label="Product filters">
          {["All", "Listed", "Unlisted", "No price"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={filter === item ? "active" : ""}
            >
              {item}
              {item === "No price" && <span>2</span>}
            </button>
          ))}
        </div>
        <div className="list-summary">
          <span>
            {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
          </span>
          <button>
            <Icon name="sliders" size={16} /> Sort: A–Z
          </button>
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            title="No listings found"
            text="Try another search or clear your current filters."
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery("")
                  setFilter("All")
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="product-list">
            {filtered.map((product) => (
              <button
                className="product-row"
                key={product.id}
                onClick={() => go("listing")}
              >
                <ProductArt product={product} small />
                <div className="product-row__content">
                  <div>
                    <strong>{product.name}</strong>
                    {!product.listed && <StatusChip>Unlisted</StatusChip>}
                  </div>
                  <span>
                    {product.category} · {product.origin}
                  </span>
                  <div>
                    {product.price !== null ? (
                      <b>{product.price.toFixed(2)} RON</b>
                    ) : (
                      <b className="missing">Price required</b>
                    )}
                    <StatusChip
                      tone={
                        product.availability === "In stock"
                          ? "green"
                          : product.availability === "Low stock"
                            ? "orange"
                            : product.availability === "Out of stock"
                              ? "red"
                              : "neutral"
                      }
                    >
                      {product.availability}
                    </StatusChip>
                  </div>
                </div>
                <Icon name="chevron" size={17} />
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function ListingDetail({
  back,
  go,
  toast,
}: {
  back: () => void
  go: (screen: Screen) => void
  toast: (message: string) => void
}) {
  const product = products[0]
  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState("8.50")
  const [listed, setListed] = useState(true)
  const [availability, setAvailability] = useState<Availability>("In stock")
  const save = () => {
    if (!price || Number(price) < 0) return
    setEditing(false)
    toast("Listing changes saved")
  }
  return (
    <div className="screen">
      <AppHeader
        title={editing ? "Edit listing" : "Listing details"}
        eyebrow="SYNTHETIC STORE A"
        back={back}
        action={
          !editing && (
            <button className="header-action" onClick={() => setEditing(true)}>
              <Icon name="edit" size={17} /> Edit
            </button>
          )
        }
      />
      <main className="screen-content detail-content">
        <section className="product-identity">
          <ProductArt product={product} />
          <div>
            <StatusChip tone="dark">GLOBAL PRODUCT</StatusChip>
            <h2>{product.name}</h2>
            <p>Nongshim · 120 g</p>
          </div>
        </section>
        <section className="info-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">CATALOG INFORMATION</span>
              <h3>Product identity</h3>
            </div>
            <span className="lock-label">
              <Icon name="shield" size={14} /> Read only
            </span>
          </div>
          <dl className="details-grid">
            <div>
              <dt>Category</dt>
              <dd>Noodles</dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>South Korea</dd>
            </div>
            <div>
              <dt>Product ID</dt>
              <dd>PRD-001842</dd>
            </div>
            <div>
              <dt>Brand</dt>
              <dd>Nongshim</dd>
            </div>
          </dl>
        </section>
        <section className="info-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">STORE LISTING</span>
              <h3>Your store data</h3>
            </div>
          </div>
          {editing ? (
            <div className="form-stack">
              <Field
                label="Price"
                value={price}
                onChange={setPrice}
                type="number"
                hint="Customer-facing price for this store."
                suffix={<span className="field-unit">RON</span>}
                error={
                  price !== "" && Number(price) < 0
                    ? "Price cannot be negative."
                    : undefined
                }
              />
              <SelectField
                label="Manual availability"
                value={availability}
                onChange={(v) => setAvailability(v as Availability)}
                hint="This is not calculated from batch quantities."
              >
                <option>In stock</option>
                <option>Low stock</option>
                <option>Out of stock</option>
                <option>Unknown</option>
              </SelectField>
              <Toggle
                checked={listed}
                onChange={setListed}
                label="Visible to customers"
                description="Customers can find this listing when enabled."
              />
            </div>
          ) : (
            <dl className="detail-list">
              <div>
                <dt>Price</dt>
                <dd>8.50 RON</dd>
              </div>
              <div>
                <dt>Visibility</dt>
                <dd>
                  <StatusChip tone="green">Listed</StatusChip>
                </dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>
                  <StatusChip tone="green">In stock</StatusChip>
                </dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>Today, 09:42</dd>
              </div>
            </dl>
          )}
        </section>
        {!editing && (
          <button className="related-card" onClick={() => go("inventory")}>
            <span>
              <Icon name="layers" />
            </span>
            <div>
              <strong>Related inventory</strong>
              <small>1 batch · 24 units recorded</small>
            </div>
            <Icon name="chevron" />
          </button>
        )}
      </main>
      {editing && (
        <div className="sticky-action sticky-action--split">
          <Button variant="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Save changes</Button>
        </div>
      )}
    </div>
  )
}

function NewListing({
  back,
  toast,
  done,
}: {
  back: () => void
  toast: (message: string) => void
  done: () => void
}) {
  const [step, setStep] = useState(1)
  const [catalogQuery, setCatalogQuery] = useState("")
  const [selected, setSelected] = useState(false)
  const [price, setPrice] = useState("")
  const [listed, setListed] = useState(true)
  const [availability, setAvailability] = useState("Unknown")
  const [attempted, setAttempted] = useState(false)
  const next = () => {
    setAttempted(true)
    if (step === 1 && !selected) return
    if (step === 2 && price !== "" && Number(price) < 0) return
    setAttempted(false)
    if (step < 3) setStep(step + 1)
    else {
      toast("Store listing created")
      done()
    }
  }
  return (
    <div className="screen">
      <AppHeader
        title="Create listing"
        eyebrow={`STEP ${step} OF 3`}
        back={back}
      />
      <div className="stepper">
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= step ? "active" : ""} />
        ))}
      </div>
      <main className="screen-content detail-content wizard">
        {step === 1 && (
          <>
            <div className="wizard-intro">
              <h2>Select a catalog product</h2>
              <p>
                Create a store listing from an existing product in the global
                catalog.
              </p>
            </div>
            <div className="search-box">
              <Icon name="search" />
              <input
                value={catalogQuery}
                onChange={(e) => setCatalogQuery(e.target.value)}
                placeholder="Search by product or brand"
              />
            </div>
            <div className="catalog-result-label">SUGGESTED PRODUCTS</div>
            <button
              className={`catalog-choice ${selected ? "selected" : ""}`}
              onClick={() => setSelected(!selected)}
            >
              <ProductArt product={products[1]} small />
              <div>
                <strong>Premium Jasmine Rice</strong>
                <span>Royal Umbrella · 5 kg</span>
                <small>Rice & grains · Thailand</small>
              </div>
              <span className="radio">
                {selected && <Icon name="check" size={14} stroke={2.6} />}
              </span>
            </button>
            {attempted && !selected && (
              <p className="form-error">
                <Icon name="alert" size={15} /> Select a catalog product to
                continue.
              </p>
            )}
            <div className="inline-alert">
              <Icon name="shield" />
              <span>
                <strong>Catalog products are read only</strong>Merchant accounts
                can create store listings, but cannot add or change global
                products.
              </span>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="wizard-intro">
              <h2>Add store information</h2>
              <p>Set the details specific to Synthetic Store A.</p>
            </div>
            <section className="selected-product">
              <ProductArt product={products[1]} small />
              <div>
                <small>SELECTED PRODUCT</small>
                <strong>Premium Jasmine Rice</strong>
                <span>Royal Umbrella · 5 kg</span>
              </div>
            </section>
            <div className="form-stack form-card">
              <Field
                label="Price (optional)"
                value={price}
                onChange={setPrice}
                type="number"
                placeholder="0.00"
                suffix={<span className="field-unit">RON</span>}
                error={
                  attempted && price !== "" && Number(price) < 0
                    ? "Price cannot be negative."
                    : undefined
                }
              />
              <SelectField
                label="Manual availability"
                value={availability}
                onChange={setAvailability}
                hint="Not calculated from physical inventory."
              >
                <option>Unknown</option>
                <option>In stock</option>
                <option>Low stock</option>
                <option>Out of stock</option>
              </SelectField>
              <Toggle
                checked={listed}
                onChange={setListed}
                label="Visible to customers"
                description="You can change this at any time."
              />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="wizard-intro">
              <h2>Review listing</h2>
              <p>Confirm the information below before saving.</p>
            </div>
            <section className="review-card">
              <div className="review-product">
                <ProductArt product={products[1]} small />
                <div>
                  <strong>Premium Jasmine Rice</strong>
                  <span>Royal Umbrella · 5 kg</span>
                </div>
              </div>
              <dl className="detail-list">
                <div>
                  <dt>Store</dt>
                  <dd>Synthetic Store A</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>
                    {price ? `${Number(price).toFixed(2)} RON` : "Not set"}
                  </dd>
                </div>
                <div>
                  <dt>Visibility</dt>
                  <dd>
                    <StatusChip tone={listed ? "green" : "neutral"}>
                      {listed ? "Listed" : "Unlisted"}
                    </StatusChip>
                  </dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd>
                    <StatusChip>{availability}</StatusChip>
                  </dd>
                </div>
              </dl>
            </section>
            <div className="inline-alert inline-alert--success">
              <Icon name="check" />
              <span>
                <strong>Ready to create</strong>This adds a store listing only.
                The global product remains unchanged.
              </span>
            </div>
          </>
        )}
      </main>
      <div className="sticky-action sticky-action--split">
        {step > 1 ? (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={next}>
          {step === 3 ? "Create listing" : "Continue"}
        </Button>
      </div>
    </div>
  )
}

function InventoryScreen({ go }: { go: (screen: Screen) => void }) {
  const [query, setQuery] = useState("")
  const [showEmpty, setShowEmpty] = useState(false)
  const filtered = batches.filter(
    (batch) =>
      batch.product.toLowerCase().includes(query.toLowerCase()) &&
      (!showEmpty || batch.quantity === 0),
  )
  return (
    <div className="screen">
      <AppHeader
        title="Inventory"
        eyebrow="4 BATCH RECORDS"
        action={
          <button
            className="icon-button icon-button--filled"
            onClick={() => go("batch")}
            aria-label="Add inventory batch"
          >
            <Icon name="plus" />
          </button>
        }
      />
      <main className="screen-content screen-content--list">
        <section className="inventory-strip">
          <div>
            <span>Total records</span>
            <strong>4</strong>
          </div>
          <i />
          <div>
            <span>Zero quantity</span>
            <strong className="terracotta">2</strong>
          </div>
          <small>Counts batch records, not sold units.</small>
        </section>
        <div className="search-box">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product or batch"
          />
        </div>
        <div className="filter-row">
          <button
            className={!showEmpty ? "active" : ""}
            onClick={() => setShowEmpty(false)}
          >
            All batches
          </button>
          <button
            className={showEmpty ? "active" : ""}
            onClick={() => setShowEmpty(true)}
          >
            Zero quantity <span>2</span>
          </button>
        </div>
        <div className="batch-list">
          {filtered.map((batch) => (
            <button
              className="batch-row"
              key={batch.id}
              onClick={() => go("batch")}
            >
              <div
                className={`quantity-badge ${
                  batch.quantity === 0 ? "zero" : ""
                }`}
              >
                <strong>{batch.quantity}</strong>
                <small>QTY</small>
              </div>
              <div className="batch-row__content">
                <strong>{batch.product}</strong>
                <span>
                  {batch.id}{" "}
                  {batch.code ? `· ${batch.code}` : "· No batch code"}
                </span>
                <small>
                  <Icon name="calendar" size={14} />{" "}
                  {batch.expiry
                    ? `Expires ${batch.expiry}`
                    : "No expiration date"}
                </small>
              </div>
              <Icon name="chevron" size={17} />
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

function BatchDetail({
  back,
  role,
  toast,
}: {
  back: () => void
  role: Role
  toast: (message: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [quantity, setQuantity] = useState("24")
  const [code, setCode] = useState("SR-2405")
  const [date, setDate] = useState("2026-09-18")
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [conflict, setConflict] = useState(false)
  return (
    <div className="screen">
      <AppHeader
        title={editing ? "Edit batch" : "Batch details"}
        eyebrow="INVENTORY RECORD"
        back={back}
        action={
          !editing && (
            <button className="header-action" onClick={() => setEditing(true)}>
              <Icon name="edit" size={17} /> Edit
            </button>
          )
        }
      />
      <main className="screen-content detail-content">
        <section className="batch-hero">
          <span className="batch-hero__icon">
            <Icon name="layers" />
          </span>
          <div>
            <span>BATCH ID</span>
            <h2>IB-2048</h2>
            <p>Synthetic Store A</p>
          </div>
          <StatusChip tone="green">24 on hand</StatusChip>
        </section>
        <section className="info-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">RELATED LISTING</span>
              <h3>Shin Ramyun Noodles</h3>
            </div>
          </div>
          <div className="mini-product">
            <ProductArt product={products[0]} small />
            <div>
              <span>Nongshim · 120 g</span>
              <strong>8.50 RON</strong>
            </div>
            <Icon name="chevron" />
          </div>
        </section>
        <section className="info-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">BATCH INFORMATION</span>
              <h3>{editing ? "Update record" : "Record details"}</h3>
            </div>
          </div>
          {conflict && (
            <div className="inline-alert inline-alert--error">
              <Icon name="refresh" />
              <span>
                <strong>This batch changed elsewhere</strong>Refresh the record
                before saving your edits.
              </span>
            </div>
          )}
          {editing ? (
            <div className="form-stack">
              <SelectField
                label="Related StoreProduct"
                value="Shin Ramyun Noodles"
              >
                <option>Shin Ramyun Noodles</option>
              </SelectField>
              <Field
                label="Batch code (optional)"
                value={code}
                onChange={setCode}
                placeholder="e.g. SR-2405"
              />
              <Field
                label="Quantity on hand"
                value={quantity}
                onChange={setQuantity}
                type="number"
                hint="Enter a whole number, including zero."
                error={
                  Number(quantity) < 0 || !Number.isInteger(Number(quantity))
                    ? "Quantity must be a nonnegative whole number."
                    : undefined
                }
              />
              <Field
                label="Expiration date (optional)"
                value={date}
                onChange={setDate}
                type="date"
                hint="Leave empty if no date is recorded."
              />
              <button
                className="conflict-link"
                onClick={() => setConflict(true)}
                type="button"
              >
                Demo stale-edit conflict
              </button>
            </div>
          ) : (
            <dl className="detail-list">
              <div>
                <dt>Quantity on hand</dt>
                <dd>24</dd>
              </div>
              <div>
                <dt>Batch code</dt>
                <dd>SR-2405</dd>
              </div>
              <div>
                <dt>Expiration date</dt>
                <dd>18 Sep 2026</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>Today, 09:36</dd>
              </div>
            </dl>
          )}
        </section>
        <div className="inline-alert">
          <Icon name="alert" />
          <span>
            <strong>Availability stays separate</strong>Changing quantity will
            not update the listing’s manual availability.
          </span>
        </div>
        {editing && role === "MANAGER" && (
          <Button
            variant="danger"
            icon="trash"
            onClick={() => setConfirmDelete(true)}
          >
            Delete batch
          </Button>
        )}
        {editing && role === "STAFF" && (
          <p className="permission-note">
            <Icon name="shield" /> Delete is unavailable for Staff accounts.
          </p>
        )}
      </main>
      {editing && (
        <div className="sticky-action sticky-action--split">
          <Button
            variant="secondary"
            onClick={() => {
              setEditing(false)
              setConflict(false)
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={
              conflict ||
              Number(quantity) < 0 ||
              !Number.isInteger(Number(quantity))
            }
            onClick={() => {
              setEditing(false)
              toast("Batch record saved")
            }}
          >
            Save batch
          </Button>
        </div>
      )}
      {confirmDelete && (
        <div
          className="dialog-backdrop"
          onClick={() => setConfirmDelete(false)}
        >
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog__icon">
              <Icon name="trash" />
            </div>
            <h2>Delete this batch?</h2>
            <p>
              IB-2048 will be permanently removed. This action cannot be undone.
            </p>
            <div>
              <Button
                variant="secondary"
                onClick={() => setConfirmDelete(false)}
              >
                Keep batch
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setConfirmDelete(false)
                  toast("Batch deleted in prototype")
                }}
              >
                Delete batch
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MyStore({
  back,
  role,
  toast,
}: {
  back: () => void
  role: Role
  toast: (message: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState("+40 21 555 0142")
  return (
    <div className="screen">
      <AppHeader
        title="My Store"
        eyebrow="STORE PROFILE"
        back={back}
        action={
          !editing && role === "MANAGER" ? (
            <button className="header-action" onClick={() => setEditing(true)}>
              <Icon name="edit" size={17} /> Edit
            </button>
          ) : undefined
        }
      />
      <main className="screen-content detail-content">
        <section className="store-profile-hero">
          <div className="store-avatar store-avatar--large">
            <Icon name="store" size={28} />
          </div>
          <h2>Synthetic Store A</h2>
          <p>Bucharest, Romania</p>
          <StatusChip tone="green">Active store</StatusChip>
        </section>
        <section className="info-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">STORE IDENTITY</span>
              <h3>Store details</h3>
            </div>
          </div>
          {editing ? (
            <div className="form-stack">
              <Field
                label="Store name"
                value="Synthetic Store A"
                onChange={() => {}}
              />
              <Field label="Phone number" value={phone} onChange={setPhone} />
            </div>
          ) : (
            <dl className="detail-list">
              <div>
                <dt>Store name</dt>
                <dd>Synthetic Store A</dd>
              </div>
              <div>
                <dt>Store ID</dt>
                <dd>STR-A1042</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <StatusChip tone="green">Active</StatusChip>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>+40 21 555 0142</dd>
              </div>
            </dl>
          )}
        </section>
        <section className="info-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">LOCATION</span>
              <h3>Address</h3>
            </div>
          </div>
          <p className="address">
            Strada Exemplu 18
            <br />
            Sector 1, București 010101
            <br />
            Romania
          </p>
        </section>
        <p className="permission-note">
          <Icon name="shield" /> You are signed in as{" "}
          {role === "MANAGER" ? "Manager" : "Staff"}. Store controls follow
          backend permissions.
        </p>
      </main>
      {editing && (
        <div className="sticky-action sticky-action--split">
          <Button variant="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setEditing(false)
              toast("Store details saved")
            }}
          >
            Save changes
          </Button>
        </div>
      )}
    </div>
  )
}

function Team({ back, role }: { back: () => void role: Role }) {
  return (
    <div className="screen">
      <AppHeader title="Team" eyebrow="SYNTHETIC STORE A" back={back} />
      <main className="screen-content detail-content">
        {role === "MANAGER" ? (
          <>
            <div className="section-intro">
              <h2>Store memberships</h2>
              <p>
                Read-only membership information returned by the store service.
              </p>
            </div>
            <div className="inline-alert">
              <Icon name="shield" />
              <span>
                <strong>Team is read only</strong>Merchant accounts cannot
                invite, promote, demote or remove members.
              </span>
            </div>
            <div className="member-list">
              {[
                ["SM-01842", "ACC-72A19", "MANAGER", "12 Mar 2024"],
                ["SM-02108", "ACC-83C44", "STAFF", "04 Jun 2024"],
                ["SM-02431", "ACC-19D02", "STAFF", "19 Aug 2024"],
              ].map((member, i) => (
                <section className="member-card" key={member[0]}>
                  <div className="member-avatar">
                    {i === 0 ? "M1" : `S${i}`}
                  </div>
                  <div className="member-card__body">
                    <div>
                      <strong>{member[0]}</strong>
                      <StatusChip
                        tone={member[2] === "MANAGER" ? "dark" : "neutral"}
                      >
                        {member[2]}
                      </StatusChip>
                    </div>
                    <span>Account {member[1]}</span>
                    <small>
                      <i className="status-dot" /> Active · Since {member[3]}
                    </small>
                  </div>
                </section>
              ))}
            </div>
            <p className="prototype-note">
              Names, emails and profile photos are not available from the
              current membership response.
            </p>
          </>
        ) : (
          <section className="restricted-state">
            <div className="restricted-state__art">
              <Icon name="shield" size={33} />
              <i />
              <i />
            </div>
            <StatusChip>STAFF ACCESS</StatusChip>
            <h2>Your role at this store</h2>
            <p>
              You can work with Products and Inventory within your permissions.
              Coworker membership details are visible to Managers only.
            </p>
            <div className="role-card">
              <span className="member-avatar">S1</span>
              <div>
                <small>CURRENT STORE</small>
                <strong>Synthetic Store A</strong>
                <span>Your role: Staff</span>
              </div>
              <StatusChip tone="green">Active</StatusChip>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function Account({ back }: { back: () => void }) {
  return (
    <div className="screen">
      <AppHeader title="Account" eyebrow="PROFILE" back={back} />
      <main className="screen-content detail-content">
        <section className="profile-card">
          <div className="profile-avatar">AM</div>
          <h2>Alex Merchant</h2>
          <p>manager@synthetic.store</p>
          <StatusChip tone="dark">MERCHANT ACCOUNT</StatusChip>
        </section>
        <section className="info-card">
          <div className="card-title">
            <div>
              <span className="eyebrow">ACCOUNT INFORMATION</span>
              <h3>Profile details</h3>
            </div>
            <span className="lock-label">
              <Icon name="shield" size={14} /> Read only
            </span>
          </div>
          <dl className="detail-list">
            <div>
              <dt>Account ID</dt>
              <dd>ACC-72A19</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>manager@synthetic.store</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <StatusChip tone="green">Active</StatusChip>
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  )
}

type DemoState = "loading" | "empty-products" | "empty-inventory" | "network" | "session" | "unauthorized" | "inactive" | "no-store" | null

function MoreScreen({
  go,
  role,
  setRole,
  logout,
  openStates,
}: {
  go: (s: Screen) => void
  role: Role
  setRole: (r: Role) => void
  logout: () => void
  openStates: () => void
}) {
  return (
    <div className="screen">
      <AppHeader
        title="More"
        eyebrow="SETTINGS & ACCESS"
        action={
          <button className="profile-button" onClick={() => go("account")}>
            AM
          </button>
        }
      />
      <main className="screen-content">
        <section className="more-profile">
          <div className="profile-avatar">AM</div>
          <div>
            <strong>Alex Merchant</strong>
            <span>manager@synthetic.store</span>
            <small>
              <span className="status-dot" /> Synthetic Store A
            </small>
          </div>
          <button onClick={() => go("account")}>
            <Icon name="chevron" />
          </button>
        </section>
        <span className="group-label">STORE</span>
        <section className="menu-group">
          <button onClick={() => go("store")}>
            <span>
              <Icon name="store" />
            </span>
            <div>
              <strong>My Store</strong>
              <small>Profile and location</small>
            </div>
            <Icon name="chevron" />
          </button>
          <button onClick={() => go("team")}>
            <span>
              <Icon name="users" />
            </span>
            <div>
              <strong>Team</strong>
              <small>
                {role === "MANAGER"
                  ? "Read-only memberships"
                  : "Your Store role"}
              </small>
            </div>
            <Icon name="chevron" />
          </button>
        </section>
        <span className="group-label">ACCOUNT</span>
        <section className="menu-group">
          <button onClick={() => go("account")}>
            <span>
              <Icon name="user" />
            </span>
            <div>
              <strong>Account</strong>
              <small>Profile information</small>
            </div>
            <Icon name="chevron" />
          </button>
        </section>
        <span className="group-label">PROTOTYPE CONTROLS</span>
        <section className="demo-panel">
          <div>
            <span className="demo-icon">
              <Icon name="sliders" />
            </span>
            <div>
              <strong>Demo role</strong>
              <small>Preview permission-aware states</small>
            </div>
          </div>
          <div className="segmented">
            <button
              className={role === "MANAGER" ? "active" : ""}
              onClick={() => setRole("MANAGER")}
            >
              Manager
            </button>
            <button
              className={role === "STAFF" ? "active" : ""}
              onClick={() => setRole("STAFF")}
            >
              Staff
            </button>
          </div>
          <button className="state-lab-button" onClick={openStates}>
            <Icon name="layers" /> Open state laboratory <Icon name="chevron" />
          </button>
        </section>
        <button className="logout-button" onClick={logout}>
          <Icon name="logout" /> Sign out
        </button>
        <p className="version-label">Asian Store Merchant · Prototype 1.0</p>
      </main>
    </div>
  )
}

function StateLaboratory({
  close,
  show,
}: {
  close: () => void
  show: (state: DemoState) => void
}) {
  const states: {
    id: Exclude<DemoState, null>
    label: string
    icon: IconName
  }[] = [
    { id: "loading", label: "Initial loading", icon: "refresh" },
    { id: "empty-products", label: "Empty listings", icon: "box" },
    { id: "empty-inventory", label: "Empty inventory", icon: "layers" },
    { id: "network", label: "Network failure", icon: "wifi" },
    { id: "session", label: "Session expired", icon: "shield" },
    { id: "unauthorized", label: "Unauthorized action", icon: "alert" },
    { id: "inactive", label: "Inactive store", icon: "store" },
    { id: "no-store", label: "No store assigned", icon: "close" },
  ]
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <i className="sheet-handle" />
        <div className="sheet-title">
          <div>
            <span className="eyebrow">PROTOTYPE TOOL</span>
            <h2>State laboratory</h2>
            <p>Preview operational edge cases and recovery patterns.</p>
          </div>
          <button className="icon-button" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <div className="state-grid">
          {states.map((item) => (
            <button key={item.id} onClick={() => show(item.id)}>
              <span>
                <Icon name={item.icon} />
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatePreview({
  state,
  close,
}: {
  state: Exclude<DemoState, null>
  close: () => void
}) {
  if (state === "loading")
    return (
      <div className="state-preview state-preview--loading">
        <Brand compact />
        <div className="loading-content">
          <div className="loading-mark">
            <span className="spinner spinner--green" />
          </div>
          <h2>Preparing your workspace</h2>
          <p>Loading Synthetic Store A securely…</p>
          <div className="skeleton">
            <i />
            <i />
            <i />
          </div>
        </div>
        <Button variant="text" onClick={close}>
          Close preview
        </Button>
      </div>
    )
  const configs: Record<Exclude<DemoState, null | "loading">, {
    icon: IconName
    eyebrow: string
    title: string
    text: string
    action: string
  }> = {
    "empty-products": {
      icon: "box",
      eyebrow: "PRODUCTS",
      title: "No store listings yet",
      text: "Create your first listing by selecting a product from the global catalog.",
      action: "Create first listing",
    },
    "empty-inventory": {
      icon: "layers",
      eyebrow: "INVENTORY",
      title: "No inventory batches",
      text: "Add a batch record to start tracking physical quantities for a store listing.",
      action: "Add first batch",
    },
    network: {
      icon: "wifi",
      eyebrow: "CONNECTION ISSUE",
      title: "We couldn’t load this",
      text: "Check your internet connection, then try again. Your unsaved changes are still here.",
      action: "Try again",
    },
    session: {
      icon: "shield",
      eyebrow: "SESSION EXPIRED",
      title: "Please sign in again",
      text: "For your security, your merchant session has ended. We did not treat this as an empty store.",
      action: "Return to sign in",
    },
    unauthorized: {
      icon: "shield",
      eyebrow: "ACCESS RESTRICTED",
      title: "You can’t perform this action",
      text: "Your current Store role does not include this permission. Contact a Manager if you need help.",
      action: "Go back",
    },
    inactive: {
      icon: "store",
      eyebrow: "INACTIVE STORE",
      title: "Editing is unavailable",
      text: "You can still review Synthetic Store A, but write actions are disabled while it is inactive.",
      action: "View store information",
    },
    "no-store": {
      icon: "store",
      eyebrow: "NO STORE ASSIGNED",
      title: "You don’t have a Store yet",
      text: "Your account is valid, but it is not assigned to an active Store. Ask an administrator for access.",
      action: "Sign out",
    },
  }
  const config = configs[state]
  return (
    <div className="state-preview">
      <div className="state-preview__top">
        <Brand compact />
        <button className="icon-button" onClick={close}>
          <Icon name="close" />
        </button>
      </div>
      <div className="full-state">
        <div className={`full-state__icon full-state__icon--${state}`}>
          <Icon name={config.icon} size={30} />
        </div>
        <span className="eyebrow">{config.eyebrow}</span>
        <h2>{config.title}</h2>
        <p>{config.text}</p>
        <Button onClick={close}>{config.action}</Button>
        <Button variant="text" onClick={close}>
          Close preview
        </Button>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login")
  const [role, setRole] = useState<Role>("MANAGER")
  const [toast, setToast] = useState("")
  const [statesOpen, setStatesOpen] = useState(false)
  const [demoState, setDemoState] = useState<DemoState>(null)

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }
  const go = (next: Screen) => setScreen(next)
  const logout = () => {
    setScreen("login")
    setRole("MANAGER")
  }

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return <LoginScreen onLogin={() => go("stores")} />
      case "stores":
        return (
          <StoreSelection
            onContinue={() => go("dashboard")}
            onLogout={logout}
          />
        )
      case "dashboard":
        return <Dashboard go={go} role={role} toast={notify} />
      case "products":
        return <ProductsScreen go={go} />
      case "listing":
        return (
          <ListingDetail back={() => go("products")} go={go} toast={notify} />
        )
      case "listing-new":
        return (
          <NewListing
            back={() => go("products")}
            done={() => go("products")}
            toast={notify}
          />
        )
      case "inventory":
        return <InventoryScreen go={go} />
      case "batch":
        return (
          <BatchDetail
            back={() => go("inventory")}
            role={role}
            toast={notify}
          />
        )
      case "store":
        return <MyStore back={() => go("more")} role={role} toast={notify} />
      case "team":
        return <Team back={() => go("more")} role={role} />
      case "account":
        return <Account back={() => go("more")} />
      case "more":
        return (
          <MoreScreen
            go={go}
            role={role}
            setRole={(r) => {
              setRole(r)
              notify(
                `Demo role changed to ${r === "MANAGER" ? "Manager" : "Staff"}`,
              )
            }}
            logout={logout}
            openStates={() => setStatesOpen(true)}
          />
        )
    }
  }

  const hasNav = ![
    "login",
    "stores",
    "listing",
    "listing-new",
    "batch",
    "store",
    "team",
    "account",
  ].includes(screen)
  return (
    <div className="app-stage">
      <div className="phone-shell">
        {renderScreen()}
        {hasNav && <BottomNav screen={screen} go={go} />}
        {toast && (
          <div className="toast">
            <span>
              <Icon name="check" size={16} />
            </span>
            {toast}
          </div>
        )}
        {statesOpen && (
          <StateLaboratory
            close={() => setStatesOpen(false)}
            show={(state) => {
              setStatesOpen(false)
              setDemoState(state)
            }}
          />
        )}
        {demoState && (
          <StatePreview state={demoState} close={() => setDemoState(null)} />
        )}
      </div>
    </div>
  )
}
