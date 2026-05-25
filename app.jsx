/* global React */
const { useState, useEffect, useRef } = React;

// =========================================================================
// Inline SVG icons — single-color, stroked, matches the brand's clean look
// =========================================================================
const Icon = {
  Truck: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  Bolt: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>,
  Shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l9 4v6c0 5-3.5 9.5-9 10C6.5 21.5 3 17 3 12V6l9-4z" /><path d="M8.5 12l2.5 2.5L16 9.5" /></svg>,
  Ruler: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 15l6-12 12 6-6 12z" /><path d="M7.5 7l1.5 3M10 5.5l1.5 3M13 4l1.5 3M16 8l-1.5 3M13.5 9.5l-1.5 3M11 11l-1.5 3" /></svg>,
  Hammer: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" /><path d="M17.64 15L22 10.64" /><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" /></svg>,
  Layers: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  Sparkles: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /><path d="M19 16l.6 1.8L21 18l-1.4.6L19 20l-.6-1.8L17 18l1.8-.4z" /><path d="M5 4l.4 1.4L7 6l-1.6.4L5 8l-.4-1.6L3 6l1.6-.6z" /></svg>,
  Clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>,
  Warning: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.41 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  X: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12" /></svg>,
  ChevronDown: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="6 9 12 15 18 9" /></svg>,
  ArrowRight: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  Box: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L11 21.73a2 2 0 0 0 2 0L20 17.73A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
};

// =========================================================================
// CTA — single reusable button, fixed copy
// =========================================================================
const CTA_LABEL = "Get My OBP Clips Now";
const CHECKOUT_URL = "https://obp.systeme.io/078c0b5d";

const CTAButton = ({ size = "lg", className = "" }) =>
<a
  href={CHECKOUT_URL}
  className={`btn btn--primary btn--${size} ${className}`}
  data-cta="primary">
  
    {CTA_LABEL}
    <span className="arrow"><Icon.ArrowRight style={{ width: 14, height: 14 }} /></span>
  </a>;


// =========================================================================
// Header
// =========================================================================
function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__logo" href="#top">
          <img src="assets/logo-obp.png" alt="OBP — ON3 Best Product" />
        </a>
        <div className="site-header__meta">
          <span className="pill">Ships from Florida</span>
          <span>+1 (239) 696-0417</span>
        </div>
        <a href={CHECKOUT_URL} className="btn btn--primary site-header__cta">
          {CTA_LABEL}
        </a>
      </div>
    </header>);

}

// =========================================================================
// Hero
// =========================================================================
function Hero({ price }) {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy reveal">
          <div className="hero__chip-row">
            <span className="chip chip--filled">
              <Icon.Sparkles /> Most Popular Size
            </span>
            <span className="chip chip--outline">
              <Icon.Truck /> Ships Fast From Florida
            </span>
            <span className="chip chip--outline">
              <Icon.Hammer /> Made for Pros &amp; DIYers
            </span>
          </div>

          <h1>
            Stop <span className="accent">Uneven Tiles</span> Before They Ruin the Job
          </h1>

          <p className="hero__sub">
            OBP 1/16" Tile Leveling Clips help tile installers and DIY remodelers create
            clean, even, professional-looking tile work — with less movement, less lippage
            and faster installation.
          </p>

          <div className="hero__cta-row">
            <CTAButton size="xl" />
          </div>
          <p className="hero__trust">
            <span className="dot">●</span> Fast shipping. Easy to use. Professional results.
          </p>

          <div className="hero__rating">
            <span className="stars">★★★★★</span>
            <span className="label">
              <b>4.9/5</b> &nbsp;from contractors &amp; DIY remodelers across the US
            </span>
          </div>
        </div>

        <div className="hero__visual reveal" data-delay="1">
          <img src="assets/clip-1-16.webp" alt="OBP 1/16 inch tile leveling clip — most popular size" />
          <div className="hero__visual-badge">
            <span className="num">SKU</span> OBP-116
          </div>
          <div className="hero__visual-meta">
            <div className="hero__visual-spec">
              1/16"
              <span>1.5 mm joint</span>
            </div>
            <div className="meta-card">
              <Icon.Box style={{ width: 18, height: 18, color: "var(--brand-red)" }} />
              <span><b>1000</b><br />clips per box</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="num"><em>1.5</em>mm</div>
            <div className="lbl">Joint Width</div>
          </div>
          <div className="hero__stat">
            <div className="num">1/16"</div>
            <div className="lbl">Imperial Size</div>
          </div>
          <div className="hero__stat">
            <div className="num">&lt;1<em>day</em></div>
            <div className="lbl">Dispatch From FL</div>
          </div>
          <div className="hero__stat">
            <div className="num">Pro<em>+</em>DIY</div>
            <div className="lbl">Built For Both</div>
          </div>
        </div>
      </div>
    </section>);

}

// =========================================================================
// Problem
// =========================================================================
const PAINS = [
{
  icon: <Icon.Warning />,
  title: "Tiles Drift While You Work",
  body: "Set six tiles, leave for thinset to grab, and at least one has slid out of plane. Now you're chasing alignment instead of laying tile."
},
{
  icon: <Icon.Layers />,
  title: "Lippage Ruins the Finish",
  body: "A 1mm edge ridge feels like a curb under bare feet — and screams 'amateur job' from across the room."
},
{
  icon: <Icon.Clock />,
  title: "Rework Eats the Margin",
  body: "Pull-up, re-bed, re-grout. One uneven section turns a one-day install into a three-day callback."
}];


function Problem() {
  return (
    <section className="section problem" id="problem">
      <div className="container">
        <span className="eyebrow">The Problem</span>
        <h2 className="section-title">
          Uneven tiles make even expensive jobs look cheap.
        </h2>
        <p className="section-lede">
          Movement during install, inconsistent grout lines, and lippage are the three
          fastest ways to turn a premium tile job into a callback. Every pro has felt it.
          Every DIY remodeler dreads it.
        </p>

        <div className="problem__grid">
          {PAINS.map((p, i) =>
          <div className="pain" key={i}>
              <div className="pain__num">0{i + 1}</div>
              <div className="pain__icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =========================================================================
// Solution
// =========================================================================
function Solution() {
  const points = [
  {
    title: "Consistent spacing, every joint",
    body: "Buried base + wedge holds the gap fixed while thinset cures. No drift, no babysitting."
  },
  {
    title: "Pulls adjacent tiles flush",
    body: "The clip's top arch pinches both tile edges into the same plane — lippage is eliminated before it forms."
  },
  {
    title: "Built for large-format tile",
    body: "Big tiles flex and slope on uneven substrate. The 1/16\" clip system controls them without flexing tools."
  },
  {
    title: "Fast on the install, clean on removal",
    body: "Once the mortar sets, kick the buried base loose — the joint stays perfect, ready to grout."
  }];

  return (
    <section className="section solution">
      <div className="container solution__grid">
        <div className="solution__copy">
          <span className="eyebrow">The Solution</span>
          <h2 className="section-title">
            The simple clip system that keeps your tiles aligned while you work.
          </h2>
          <p className="section-lede">
            OBP leveling clips lock adjacent tile edges into the same plane during the
            critical first 24 hours — when the thinset is still soft enough to move.
            That's the entire game.
          </p>
          <ul className="solution__points">
            {points.map((p, i) =>
            <li key={i}>
                <span className="tick"><Icon.Check /></span>
                <div>
                  <b>{p.title}</b>
                  <span>{p.body}</span>
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="solution__visual">
          <img src="assets/beforeafter.jpg" alt="Tile install before and after OBP clips" />
          <div className="solution__badge">
            <div className="icon"><Icon.Sparkles /></div>
            <div>
              <b>Visible difference, first install</b>
              <span>Flat joints. Tight grout lines. No callbacks.</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// =========================================================================
// Benefits
// =========================================================================
const BENEFITS = [
{
  icon: <Icon.Ruler />,
  title: "Cleaner Grout Lines",
  body: "1/16\" spacing across every joint. Grout fills evenly, the wall reads sharp from any angle."
},
{
  icon: <Icon.Layers />,
  title: "Less Lippage",
  body: "Adjacent edges are pinched flush during cure. No more 'one bad tile' wrecking the row."
},
{
  icon: <Icon.Bolt />,
  title: "Faster Installation",
  body: "Set, wedge, move on. No re-checking with a straight edge every two tiles."
},
{
  icon: <Icon.Shield />,
  title: "Strong, Durable Clips",
  body: "Rigid base, snap-clean tab. Doesn't deform under wedge pressure on porcelain or stone."
}];


function Benefits() {
  return (
    <section className="section benefits" id="benefits">
      <div className="container">
        <div className="benefits__head">
          <div>
            <span className="eyebrow">Why It Works</span>
            <h2 className="section-title">
              Four reasons the 1/16" clip pays for itself in one job.
            </h2>
          </div>
          <p className="section-lede">
            Engineered specifically for tile installers who care about the finish — and
            DIY remodelers who want their work to look like a contractor did it.
          </p>
        </div>

        <div className="benefits__grid">
          {BENEFITS.map((b, i) =>
          <div className="benefit" key={i}>
              <div className="benefit__num">0{i + 1}</div>
              <div className="benefit__icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =========================================================================
// Focus — why 1/16"
// =========================================================================
function Focus() {
  return (
    <section className="section focus">
      <div className="container focus__grid">
        <div className="focus__visual-col">
          <div className="focus__hero">
            <img src="assets/clip-1-16.webp" alt="OBP 1/16 inch clip" />
            <div className="focus__hero-stamp">The Standard</div>
          </div>
          <div className="focus__compare">
            <div className="focus__size">
              <div className="size">1/32"</div>
              <div className="mm">1 mm</div>
              <div className="use">Near-seamless large format</div>
            </div>
            <div className="focus__size active">
              <div className="size">1/16"</div>
              <div className="mm">1.5 mm</div>
              <div className="use">The go-to grout line</div>
            </div>
            <div className="focus__size">
              <div className="size">1/8"</div>
              <div className="mm">3 mm</div>
              <div className="use">Rustic &amp; natural stone</div>
            </div>
          </div>
        </div>

        <div className="focus__copy">
          <span className="eyebrow">The Standard Size</span>
          <h2 className="section-title">
            Why 1/16" is the go-to choice.
          </h2>
          <p className="section-lede">
            Three sizes exist for a reason — but if you're picking one to keep on the
            truck, it's this one. 1/16" (1.5mm) is the joint width that covers most
            residential and commercial tile installs without compromise.
          </p>
          <ul className="solution__points">
            <li>
              <span className="tick"><Icon.Check /></span>
              <div>
                <b>Cleanest grout line for everyday tile</b>
                <span>Reads tight and intentional on porcelain, ceramic, and most stone formats.</span>
              </div>
            </li>
            <li>
              <span className="tick"><Icon.Check /></span>
              <div>
                <b>Forgiving on uneven substrate</b>
                <span>Enough joint width to absorb minor substrate flex without showing it on the surface.</span>
              </div>
            </li>
            <li>
              <span className="tick"><Icon.Check /></span>
              <div>
                <b>Most-used by pros for a reason</b>
                <span>If you only carry one size, this is the one that finishes 80% of the jobs.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>);

}

// =========================================================================
// How it works
// =========================================================================
const STEPS = [
{
  n: "01",
  title: "Place the clips under the tile edges.",
  body: "Slide the buried base of the clip under each tile edge along the joint, before the next tile goes down.",
  art:
  <svg viewBox="0 0 200 120" fill="none">
        <rect x="20" y="55" width="70" height="40" rx="3" fill="#eaeaea" />
        <rect x="110" y="55" width="70" height="40" rx="3" fill="#eaeaea" />
        <rect x="92" y="40" width="16" height="22" fill="rgba(244,194,29,0.9)" />
        <rect x="95" y="60" width="10" height="40" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <text x="100" y="20" fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="Montserrat" fontWeight="700">PLACE</text>
      </svg>

},
{
  n: "02",
  title: "Set the tiles and insert the wedges.",
  body: "Drop the next tile against the clip, then slide the wedge through the clip's upright until it pinches both tiles flush.",
  art:
  <svg viewBox="0 0 200 120" fill="none">
        <rect x="20" y="55" width="70" height="40" rx="3" fill="#eaeaea" />
        <rect x="110" y="55" width="70" height="40" rx="3" fill="#eaeaea" />
        <rect x="92" y="40" width="16" height="22" fill="rgba(255,255,255,0.5)" />
        <polygon points="50,42 130,52 130,62 50,52" fill="rgba(244,194,29,0.95)" />
        <text x="100" y="20" fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="Montserrat" fontWeight="700">WEDGE</text>
      </svg>

},
{
  n: "03",
  title: "Let it set, then snap off the top.",
  body: "Once the thinset cures, kick the wedge out and snap the top of the clip free. The buried base stays — your tile sits flat and grout-ready.",
  art:
  <svg viewBox="0 0 200 120" fill="none">
        <rect x="20" y="55" width="70" height="40" rx="3" fill="#eaeaea" />
        <rect x="110" y="55" width="70" height="40" rx="3" fill="#eaeaea" />
        <rect x="92" y="55" width="16" height="6" fill="rgba(255,255,255,0.6)" />
        <text x="100" y="20" fontSize="11" fill="rgba(244,194,29,0.95)" textAnchor="middle" fontFamily="Montserrat" fontWeight="700">SNAP &amp; DONE</text>
        <path d="M150 35 L165 28 L160 38 L170 38 L155 50 L160 42 L150 42 Z" fill="rgba(244,194,29,0.95)" />
      </svg>

}];


function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <span className="eyebrow">How It Works</span>
        <h2 className="section-title">Level your tile in 3 simple steps.</h2>
        <p className="section-lede">
          The whole system is built around removing thinking. Place. Wedge. Snap. The
          clip does the alignment, you do the install.
        </p>

        <div className="how__steps">
          {STEPS.map((s, i) =>
          <div className="step" key={i}>
              <div className="step__num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="step__visual">{s.art}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =========================================================================
// Offer
// =========================================================================
function Offer({ price, was }) {
  return (
    <section className="section offer" id="offer">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>The Offer</span>
        <h2 className="section-title" style={{ marginLeft: "auto", marginRight: "auto" }}>
          Get the OBP 1/16" Leveling Clips today.
        </h2>
        <p className="section-lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
          One product. One size that works for almost every job. Ships from Florida —
          on your bench in days, not weeks.
        </p>

        <div className="offer__card">
          <div className="offer__visual">
            <img src="assets/clip-1-16.webp" alt="OBP 1/16 inch leveling clips" />
            <div className="offer__visual-tag">Most Popular Size</div>
          </div>
          <div className="offer__body" style={{ textAlign: "left" }}>
            <span className="offer__badge"><Icon.Sparkles style={{ width: 12, height: 12 }} /> Best Seller</span>
            <h2>OBP 1/16" Tile Leveling Clips · 1.5 mm</h2>
            <p className="offer__desc">
              The standard-size leveling clip for clean grout lines and lippage-free
              tile installs. Built for pros, simple enough for DIY.
            </p>
            <ul className="offer__bullets">
              <li>1.5 mm (1/16") joint — the most-used grout width</li>
              <li>[INSERT EXACT QUANTITY PER BOX HERE] clips per box</li>
              <li>Compatible with standard tile leveling pliers / wedges</li>
              <li>Works on porcelain, ceramic, and most natural stone</li>
              <li>Fast Florida-based dispatch &mdash; tracked shipping</li>
            </ul>

            <div className="offer__price">
              <span className="now">${price}</span>
              <span className="was">${was}</span>
              <span className="save">Save ${(was - price).toFixed(2)}</span>
            </div>

            <CTAButton size="xl" className="offer__cta" />

            <div className="offer__notes">
              <div className="offer__note">
                <Icon.Pin /> Ships from<br />Florida, USA
              </div>
              <div className="offer__note">
                <Icon.Bolt /> Dispatch<br />in &lt;1 day
              </div>
              <div className="offer__note">
                <Icon.Shield /> Pro-grade<br />clean install
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// =========================================================================
// FAQ
// =========================================================================
const FAQS = [
{
  q: "What size grout line does this create?",
  a: "A clean 1/16\" (1.5 mm) joint — the most common grout width for residential and light commercial tile installs. It reads tight and intentional without being so narrow that grout struggles to fill."
},
{
  q: "Is this good for DIY projects?",
  a: "Yes. The clip-and-wedge system is designed to be foolproof: drop the clip in, set the tile, push the wedge. If you can lay a tile, you can use these. You'll get a flatter floor on your first install than most weekend remodelers get on their fifth."
},
{
  q: "Does it really help reduce lippage?",
  a: "That's the entire job of the clip. The arch at the top of the clip pinches adjacent tile edges into the same plane while the thinset cures, so neighboring tiles can't drift up or down relative to each other. Lippage is mechanical; the clip removes the mechanism."
},
{
  q: "How fast do orders ship?",
  a: "Orders ship from our Florida warehouse, with dispatch typically within one business day. Most US destinations see delivery in 2–5 business days with tracked shipping."
},
{
  q: "Can professionals use this for bigger jobs?",
  a: "Yes — the 1/16\" clip is the size most working tile installers carry day-to-day. For large-format porcelain (24\" x 48\" and up) the system controls flex and slope on uneven substrate, which is exactly when a single misaligned tile costs you the most time."
}];


function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>FAQ</span>
        <h2 className="section-title">Quick answers before you order.</h2>
        <p className="section-lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
          The things contractors and DIY remodelers ask us most.
        </p>
        <div className="faq__grid">
          {FAQS.map((item, i) =>
          <div className="faq__item" key={i} data-open={open === i}>
              <button
              className="faq__btn"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}>
              
                {item.q}
                <span className="faq__icon"><Icon.ChevronDown /></span>
              </button>
              {open === i && <div className="faq__body">{item.a}</div>}
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =========================================================================
// Final CTA
// =========================================================================
function Final() {
  return (
    <section className="section final" id="buy">
      <div className="container final__inner">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
          Last call
        </span>
        <h2>
          Ready to make your next tile job look cleaner, faster and more professional?
        </h2>
        <CTAButton size="xl" />
        <div className="final__trust">
          <span className="item"><Icon.Pin /> Ships from Florida</span>
          <span className="item"><Icon.Bolt /> Dispatch in &lt;1 day</span>
          <span className="item"><Icon.Shield /> Pro-grade clean install</span>
        </div>
      </div>
    </section>);

}

// =========================================================================
// Footer
// =========================================================================
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <img src="assets/logo-obp.png" alt="OBP — ON3 Best Product" />
          <p className="site-footer__meta" style={{ marginTop: 12 }}>
            OBP USA LLC · Florida, USA<br />
            © 2026 ON3 Best Product. All rights reserved.
          </p>
        </div>
        <div className="site-footer__contact">
          <a href="mailto:hello@on3bestproduct.com">hello@on3bestproduct.com</a>
          <a href="tel:+12396960417">+1 (239) 696-0417</a>
        </div>
      </div>
    </footer>);

}

// =========================================================================
// Sticky mobile CTA bar — fades in after hero scrolls out
// =========================================================================
function MobileCTA({ price, was }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"mobile-cta " + (visible ? "is-visible" : "")}>
      <div className="mobile-cta__price">
        <span className="now">${price}</span>
        <span className="was">was ${was}</span>
      </div>
      <a href={CHECKOUT_URL} className="btn btn--primary">
        {CTA_LABEL}
      </a>
    </div>);

}

// =========================================================================
// Tweaks panel
// =========================================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "price": 24.95,
  "was": 39.95,
  "accent": "red"
} /*EDITMODE-END*/;

const ACCENT_PALETTES = {
  red: { red: "#BE0000", red2: "#8E0000", yellow: "#F4C21D" },
  orange: { red: "#E25A18", red2: "#B83E08", yellow: "#F4C21D" },
  black: { red: "#1A1A1A", red2: "#000000", yellow: "#F4C21D" }
};

function Tweaks({ tweaks, setTweak }) {
  const { TweaksPanel, TweakSection, TweakNumber, TweakRadio } = window;
  if (!TweaksPanel) return null;
  return (
    <TweaksPanel>
      <TweakSection label="Offer" />
      <TweakNumber
        label="Price ($)"
        value={tweaks.price}
        step={0.01}
        onChange={(v) => setTweak("price", v)} />
      
      <TweakNumber
        label="Was ($)"
        value={tweaks.was}
        step={0.01}
        onChange={(v) => setTweak("was", v)} />
      
      <TweakSection label="Brand accent" />
      <TweakRadio
        label="Accent"
        value={tweaks.accent}
        options={["red", "orange", "black"]}
        onChange={(v) => setTweak("accent", v)} />
      
    </TweaksPanel>);

}

// =========================================================================
// App
// =========================================================================
function App() {
  const [tweaks, setTweak] = window.useTweaks ?
  window.useTweaks(TWEAK_DEFAULTS) :
  [TWEAK_DEFAULTS, () => {}];

  // Apply accent palette to CSS variables
  useEffect(() => {
    const palette = ACCENT_PALETTES[tweaks.accent] || ACCENT_PALETTES.red;
    const root = document.documentElement;
    root.style.setProperty("--brand-red", palette.red);
    root.style.setProperty("--brand-red-dark", palette.red2);
    root.style.setProperty("--accent", palette.red);
    root.style.setProperty("--accent-hover", palette.red2);
    root.style.setProperty("--link", palette.red);
    root.style.setProperty("--shadow-red", `0 10px 30px ${palette.red}40`);
  }, [tweaks.accent]);

  return (
    <>
      <Header />
      <Hero price={tweaks.price} />
      <Problem />
      <Solution />
      <Benefits />
      <Focus />
      <HowItWorks />
      <Offer price={tweaks.price.toFixed(2)} was={tweaks.was.toFixed(2)} />
      <FAQ />
      <Final />
      <Footer />
      <MobileCTA price={tweaks.price.toFixed(2)} was={tweaks.was.toFixed(2)} />
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);