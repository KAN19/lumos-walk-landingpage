import React, { useState } from 'react';

const HOURLY_SOLAR_CURVE = [
  { hour: 8, pct: 24, lux: '18,500 lux', cloud: '35% clouds', isPeak: false },
  { hour: 9, pct: 46, lux: '38,000 lux', cloud: '28% clouds', isPeak: false },
  { hour: 10, pct: 68, lux: '62,000 lux', cloud: '20% clouds', isPeak: false },
  { hour: 11, pct: 88, lux: '84,000 lux', cloud: '15% clouds', isPeak: true },
  { hour: 12, pct: 95, lux: '92,000 lux', cloud: '12% clouds', isPeak: true },
  { hour: 13, pct: 91, lux: '88,500 lux', cloud: '15% clouds', isPeak: true },
  { hour: 14, pct: 74, lux: '65,000 lux', cloud: '25% clouds', isPeak: false },
  { hour: 15, pct: 44, lux: '34,000 lux', cloud: '55% clouds', isPeak: false },
  { hour: 16, pct: 18, lux: '11,000 lux', cloud: '75% clouds', isPeak: false }
];

export default function App() {
  // Bento Section Interactive State
  const [bentoRouteChoice, setBentoRouteChoice] = useState('sunniest');
  const [bentoSpotHour, setBentoSpotHour] = useState(12);
  const [bentoWeekDays, setBentoWeekDays] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    false
  ]);
  const [bentoBriefHour, setBentoBriefHour] = useState(12);

  // Waitlist State
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  // Helpers
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToScreenshots = () => {
    const el = document.getElementById('app-screenshots');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleBentoDay = (idx) => {
    setBentoWeekDays((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setWaitlistJoined(true);
      setWaitlistEmail('');
    }
  };

  const bentoSliderPct = ((bentoSpotHour - 8) / 8) * 100;
  const sunPctByHour = {
    8: 36,
    9: 55,
    10: 74,
    11: 86,
    12: 92,
    13: 89,
    14: 78,
    15: 58,
    16: 22
  };
  const bentoDirectSun = sunPctByHour[bentoSpotHour] || 92;
  const selectedBriefObj =
    HOURLY_SOLAR_CURVE.find((h) => h.hour === bentoBriefHour) ||
    HOURLY_SOLAR_CURVE[4];

  return (
    <div>
      {/* ==================== STICKY EDITORIAL NAVBAR ==================== */}
      <header className="editorial-nav">
        <div className="container editorial-nav-inner">
          <a href="#top" className="brand-mark">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4.5" fill="#f59e0b" />
              <line x1="12" y1="2" x2="12" y2="4.5" />
              <line x1="12" y1="19.5" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
              <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="4.5" y2="12" />
              <line x1="19.5" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
              <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
            </svg>
            <span>LumosWalk</span>
            <span className="brand-pilot-pill">Łódź Pilot</span>
          </a>

          <nav className="nav-links-row">
            <a href="#four-ways">Four Core Pillars</a>
            <a href="#app-screenshots">App Screens</a>
            <a href="#weekly-economics">3h Weekly Rewards</a>
            <a href="#lodz-pilot">Łódź Pilot</a>
          </nav>

          <div className="nav-cta-group">
            <button
              type="button"
              onClick={scrollToScreenshots}
              className="pill-btn pill-btn-sm pill-btn-warm-outline"
            >
              App Screens
            </button>
            <button
              type="button"
              onClick={scrollToWaitlist}
              className="pill-btn pill-btn-sm pill-btn-solar"
            >
              Join waitlist
            </button>
          </div>
        </div>
      </header>

      {/* ==================== SECTION 1: HERO (EDITORIAL COPY + REAL APP UI MOCKUP) ==================== */}
      <section id="top" className="hero-section">
        <div className="container hero-grid">
          {/* Left Column: Editorial Headline + Łódź Winter Prescription */}
          <div>
            <div className="eyebrow-solar">
              YOUR DIGITAL PRESCRIPTION FOR WINTER SUNLIGHT · ŁÓDŹ
            </div>

            <h1 className="hero-serif-title">
              Walk on the
              <br />
              <span className="serif-italic-accent">sunny</span> side.
            </h1>

            <p className="hero-lead">
              Standard navigation apps route you down the shortest street — even
              when it is trapped in freezing building shadows.{' '}
              <strong>LumosWalk</strong> uses 3D urban shadow geometry and live
              solar forecasts to guide you along sunlit paths, pinpoint unshaded
              benches at any hour, and turn your{' '}
              <strong>3-hour weekly sunlight bank</strong> into local Łódź
              coffee.
            </p>

            <div className="hero-cta-row">
              <button
                type="button"
                onClick={scrollToWaitlist}
                className="pill-btn pill-btn-lg pill-btn-solar"
              >
                Join in the waitlist
              </button>
              <button
                type="button"
                onClick={scrollToScreenshots}
                className="pill-btn pill-btn-lg pill-btn-warm-outline"
              >
                View App Screens
              </button>
            </div>

            {/* 3 Quick Editorial Feature Jumpers */}
            <div className="hero-pillars-strip">
              <a href="#four-ways" className="hero-mini-card">
                <div className="hero-mini-num">01 · A to B Router</div>
                <div className="hero-mini-title">Sunlight Path</div>
                <div className="hero-mini-meta">
                  87% sunniest vs. 34% shortest walk
                </div>
              </a>

              <a href="#four-ways" className="hero-mini-card">
                <div className="hero-mini-num">02 · Time Scrubber</div>
                <div className="hero-mini-title">Sunny Spots</div>
                <div className="hero-mini-meta">
                  Nearby GPS pins → whole sunlit area
                </div>
              </a>

              <a href="#weekly-economics" className="hero-mini-card">
                <div className="hero-mini-num">03 · Weekly Bank</div>
                <div className="hero-mini-title">3h Café Perks</div>
                <div className="hero-mini-meta">
                  Verified minutes → Łódź cafe codes
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Single App Dashboard Screen */}
          <div className="hero-clean-screen-wrap">
            <img
              src="/screens/screen-dashboard.png"
              alt="LumosWalk App Dashboard"
              className="hero-clean-screen-img"
            />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: FOUR WAYS EDITORIAL BENTO GRID ==================== */}
      <section id="four-ways" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="eyebrow-solar">
                BUILT FOR CENTRAL EUROPEAN WINTERS (SZARUGA)
              </div>
              <h2 className="section-serif-heading">
                Four ways to get more sun,
                <br />
                every day.
              </h2>
              <p className="section-subcopy">
                From November to March in Poland, daylight drops below 8 hours
                and urban canyons block low-angle light. Here is how LumosWalk
                turns scarce winter photons into a daily habit.
              </p>
            </div>
          </div>

          <div className="bento-2x2">
            {/* 01 · A to B router */}
            <article className="editorial-card surface-white">
              <div>
                <div className="card-num-tag">01 · A to B router</div>
                <h3 className="card-serif-title">Find the sunlight path</h3>
                <p className="card-body-text">
                  3D building shadows and live cloud cover shape a walking route
                  built for light — side-by-side with the shortest one.
                </p>

                <div className="route-compare-grid">
                  <button
                    type="button"
                    onClick={() => setBentoRouteChoice('sunniest')}
                    className={`route-pill-box gold ${
                      bentoRouteChoice === 'sunniest' ? 'active-outline' : ''
                    }`}
                  >
                    <div
                      style={{
                        fontSize: '0.96rem',
                        fontWeight: 800,
                        marginBottom: '4px'
                      }}
                    >
                      Sunniest
                    </div>
                    <div style={{ fontSize: '0.84rem', opacity: 0.88 }}>
                      87% sun · 18 min · 1.4 km
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBentoRouteChoice('shortest')}
                    className={`route-pill-box sand ${
                      bentoRouteChoice === 'shortest' ? 'active-outline' : ''
                    }`}
                  >
                    <div
                      style={{
                        fontSize: '0.96rem',
                        fontWeight: 700,
                        marginBottom: '4px'
                      }}
                    >
                      Shortest
                    </div>
                    <div style={{ fontSize: '0.84rem', opacity: 0.88 }}>
                      34% sun · 15 min · 1.2 km
                    </div>
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.86rem',
                  color: '#6b5b4d'
                }}
              >
                <span>Live GPS speed checks verify minutes as you walk.</span>
              </div>
            </article>

            {/* 02 · Sunny spots (Dark Midnight Navy Card) */}
            <article className="editorial-card surface-navy">
              <div>
                <div className="card-num-tag gold">02 · Sunny spots</div>
                <h3 className="card-serif-title">
                  See where the sun falls — at any hour
                </h3>
                <p className="card-body-text navy-muted">
                  Slide through the day, locate yourself via GPS, then tap any
                  nearby spot to zoom into its full sunlit footprint, benches,
                  and sun window.
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.92rem',
                    fontWeight: 500
                  }}
                >
                  <span>{String(bentoSpotHour).padStart(2, '0')}:00</span>
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                    {bentoDirectSun}% direct sun
                  </span>
                </div>

                <input
                  type="range"
                  min={8}
                  max={16}
                  step={1}
                  value={bentoSpotHour}
                  onChange={(e) => setBentoSpotHour(Number(e.target.value))}
                  className="navy-range-slider"
                  style={{
                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${bentoSliderPct}%, #283142 ${bentoSliderPct}%, #283142 100%)`
                  }}
                  aria-label="Scrub time of day"
                />

                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    background: '#283142',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginBottom: '18px'
                  }}
                >
                  <div
                    style={{
                      width: `${bentoDirectSun}%`,
                      height: '100%',
                      background: '#f59e0b',
                      borderRadius: '999px',
                      transition: 'width 0.2s ease'
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.86rem',
                  color: '#94a3b8'
                }}
              >
                <span>
                  Pasaż Rubinsteina · 6 sunlit benches · sun until 14:40
                </span>
              </div>
            </article>

            {/* 03 · Sunlight bank */}
            <article className="editorial-card surface-white">
              <div>
                <div className="card-num-tag">03 · Sunlight bank</div>
                <h3 className="card-serif-title">
                  Bank minutes, redeem at cafes
                </h3>
                <p className="card-body-text">
                  Walks and geofence-verified soaking sessions add up toward 2h,
                  3h and 5h weekly goals — presented in a pure wallet with zero
                  live timer clutter.
                </p>

                <div className="week-strip-7">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleBentoDay(i)}
                      className={`day-circle-pill ${
                        bentoWeekDays[i] ? 'lit' : 'unlit'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dashed-voucher-pill">
                <span>
                  <strong>Kawiarnia Ranny Ptaszek</strong> — 20% off · code{' '}
                  <strong>SUN3H</strong>
                </span>
              </div>
            </article>

            {/* 04 · Home dashboard (Warm Sand Card) */}
            <article className="editorial-card surface-sand">
              <div>
                <div className="card-num-tag">04 · Home dashboard</div>
                <h3 className="card-serif-title">
                  Your solar microclimate brief
                </h3>
                <p className="card-body-text">
                  Before any map loads: weekly progress, a mutually exclusive
                  live session banner, and today’s peak windows with Lux and
                  hourly sun instead of noisy weather news.
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(9, 1fr)',
                    gap: '10px',
                    alignItems: 'end',
                    height: '76px',
                    marginBottom: '14px'
                  }}
                >
                  {HOURLY_SOLAR_CURVE.map((item) => (
                    <div
                      key={item.hour}
                      onClick={() => setBentoBriefHour(item.hour)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '100%',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '28px',
                          height: `${Math.max(14, item.pct * 0.56)}px`,
                          borderRadius: '8px',
                          background:
                            item.isPeak || bentoBriefHour === item.hour
                              ? '#f59e0b'
                              : 'rgba(245, 158, 11, 0.28)',
                          transition: 'all 0.2s ease'
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#6b5b4d',
                          fontWeight: 600
                        }}
                      >
                        {item.hour}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}
                >
                  <span>
                    Peak 11:30–13:30 · {selectedBriefObj.lux} (
                    {selectedBriefObj.cloud})
                  </span>
                  <span style={{ color: '#b45309', fontWeight: 700 }}>
                    {selectedBriefObj.hour}:00 selected
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: CLEAN APP SCREENSHOTS SHOWCASE ==================== */}
      <section
        id="app-screenshots"
        className="editorial-section"
        style={{
          background: 'rgba(245, 158, 11, 0.05)',
          borderTop: '1px solid rgba(229, 231, 235, 0.8)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.8)'
        }}
      >
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="eyebrow-solar">
                APP SHOWCASE · BUILT FOR MOBILE
              </div>
              <h2 className="section-serif-heading">
                Real screens from LumosWalk.
              </h2>
              <p className="section-subcopy">
                Clean, focused, and light-oriented. Explore how LumosWalk guides your daily sunlight habits across central Łódź.
              </p>
            </div>
          </div>

          <div className="screenshots-gallery-grid">
            {/* Screen 01: Sunlight Path Router */}
            <div className="screenshot-showcase-card">
              <div className="clean-screen-card">
                <div className="phone-corner-tag">13% SUNLIT · +2m SUN</div>
                <img
                  src="/screens/screen-path.png"
                  alt="Sunlight Path Router - Manufaktura to Plac Wolności"
                  className="clean-screen-img"
                />
              </div>

              <div style={{ padding: '0 4px' }}>
                <div className="card-num-tag">Screen 01 · A to B Navigation</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                  Sunlight Path Router
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                  Calculates walking routes optimized for direct sun. Compares <strong>Sunniest (13 min · 0.97 km · 13% sunlit)</strong> vs. <strong>Shortest (12 min · 0.87 km · 7% sunlit)</strong> from Manufaktura to Plac Wolności.
                </p>

                <div className="screen-specs-list">
                  <div className="screen-spec-item">
                    <span className="screen-spec-bullet">✓</span>
                    <span><strong>Double Sun Exposure:</strong> Just +1 min walk (+11% detour) adds +2 min of verified sunlight.</span>
                  </div>
                  <div className="screen-spec-item">
                    <span className="screen-spec-bullet">✓</span>
                    <span><strong>3D Building Shadows:</strong> Accurately raytraces real-time shadow geometries along urban corridors.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 02: Sunny Spots City Map */}
            <div className="screenshot-showcase-card">
              <div className="clean-screen-card">
                <div className="phone-corner-tag">TIME SCRUBBER · 13:00</div>
                <img
                  src="/screens/screen-spots-overview.png"
                  alt="Sunny Spots City Map - 12 Sunlit Spots"
                  className="clean-screen-img"
                />
              </div>

              <div style={{ padding: '0 4px' }}>
                <div className="card-num-tag gold">Screen 02 · Stationary Soaking</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                  Sunny Spots City Map
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                  Time scrubber (08:00–16:00) highlights 12 active unshaded spots in central Łódź at the 13:00 peak, including Plac Dąbrowskiego (90% sun) and EC1 Łódź.
                </p>

                <div className="screen-specs-list">
                  <div className="screen-spec-item">
                    <span className="screen-spec-bullet">✓</span>
                    <span><strong>12 Sunlit Pockets:</strong> Real-time unshaded locations across Plac Dąbrowskiego, EC1, and Piotrkowska.</span>
                  </div>
                  <div className="screen-spec-item">
                    <span className="screen-spec-bullet">✓</span>
                    <span><strong>Distance &amp; Hours:</strong> Shows walking distance (1847m) and clear sun windows (11:15–14:40).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 03: Sun Rewards Catalog */}
            <div className="screenshot-showcase-card">
              <div className="clean-screen-card">
                <div className="phone-corner-tag">SUN BANK · 4h 58m</div>
                <img
                  src="/screens/screen-rewards.png"
                  alt="Sun Rewards Catalog"
                  className="clean-screen-img"
                />
              </div>

              <div style={{ padding: '0 4px' }}>
                <div className="card-num-tag">Screen 03 · Local Rewards</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                  Sun Rewards Catalog
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                  Tracks verified daylight (4h 58m / 298 mins accumulated) toward the clinical 3-hour weekly goal. Automatically unlocks vouchers across Łódź.
                </p>

                <div className="screen-specs-list">
                  <div className="screen-spec-item">
                    <span className="screen-spec-bullet">✓</span>
                    <span><strong>Drukarz Café (Piotrkowska 102):</strong> -30% Warm Winter Latte with code <code>LUMOS-2HR-LATTE</code>.</span>
                  </div>
                  <div className="screen-spec-item">
                    <span className="screen-spec-bullet">✓</span>
                    <span><strong>Owoce i Warzywa (Traugutta 1):</strong> Free Fresh Cinnamon Roll + Tea with code <code>LUMOS-3HR-ROLL</code>.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: SUSTAINABLE 3-HOUR WEEKLY REWARD TIERS ==================== */}
      <section id="weekly-economics" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="eyebrow-solar">
                HABIT ECONOMICS · WHY 15 MINUTES IS NOT ENOUGH
              </div>
              <h2 className="section-serif-heading">
                Built for weekly habits —
                <br />
                not 15-minute gimmicks.
              </h2>
              <p className="section-subcopy">
                Clinicians recommend 2 to 3 hours of outdoor daylight per week
                during winter to regulate serotonin and circadian alignment.
                LumosWalk rewards accumulated weekly exposure while driving
                sustainable foot traffic to independent Łódź cafés.
              </p>
            </div>
          </div>

          <div className="bento-3col">
            {/* Tier 01: 1 hour */}
            <article className="editorial-card surface-white">
              <div>
                <div className="card-num-tag">Tier 01 · 1 hour / week</div>
                <h3 className="card-serif-title">
                  Free Hot Dog or Hot Drink at Żabka
                </h3>
                <p className="card-body-text">
                  Two 30-minute sunlit walks across your workweek. Provides quick, accessible motivation right around the corner in over 120 stores across Łódź.
                </p>
              </div>
              <div className="dashed-voucher-pill">
                <span>
                  <strong>Żabka Café</strong> · code <strong>ZABKA-1HR-HOTDOG</strong>
                </span>
              </div>
            </article>

            {/* Tier 02: 2 hours */}
            <article className="editorial-card surface-gold">
              <div>
                <div className="card-num-tag">
                  Tier 02 · 2 hours / week
                </div>
                <h3 className="card-serif-title">
                  -30% Warm Winter Latte at Drukarz
                </h3>
                <p className="card-body-text" style={{ color: '#0f172a' }}>
                  Four steady afternoon walks to recharge your circadian rhythm. Redeemed at Drukarz Café (Piotrkowska 102).
                </p>
              </div>
              <div
                className="dashed-voucher-pill"
                style={{ borderColor: '#0f172a', background: '#ffffff' }}
              >
                <span>
                  <strong>Drukarz Café (Piotrkowska 102)</strong> · code{' '}
                  <strong>LUMOS-2HR-LATTE</strong>
                </span>
              </div>
            </article>

            {/* Tier 03: 3 hours */}
            <article className="editorial-card surface-sand">
              <div>
                <div className="card-num-tag">Tier 03 · 3 hours / week (Clinical Target)</div>
                <h3 className="card-serif-title">
                  Free Fresh Cinnamon Roll + Tea
                </h3>
                <p className="card-body-text">
                  Our core weekly target (~25 mins per day) proven to combat Winter Blues. Enjoy a freshly baked cinnamon roll and spiced winter tea at Owoce i Warzywa (Traugutta 1).
                </p>
              </div>
              <div className="dashed-voucher-pill">
                <span>
                  <strong>Owoce i Warzywa (Traugutta 1)</strong> · code{' '}
                  <strong>LUMOS-3HR-ROLL</strong>
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: STEP INTO THE SUN IN ŁÓDŹ TODAY ==================== */}
      <section id="lodz-pilot" className="editorial-section">
        <div className="container">
          <div className="step-lodz-card">
            <span className="step-lodz-badge">ŁÓDŹ URBAN PILOT · HEALTH SHIFT</span>
            <h2 className="step-lodz-heading">
              Step Into the Sun in Łódź Today.
            </h2>
            <p className="step-lodz-subcopy">
              Join the Health Shift urban pilot. Experience our bright, minimalist
              map-free home dashboard, real-time 3D sunlight routing, and local
              café rewards.
            </p>

            <div className="step-lodz-actions">
              <button
                type="button"
                onClick={scrollToWaitlist}
                className="btn-waitlist-lodz"
              >
                Join in the waitlist
              </button>
              <button
                type="button"
                onClick={scrollToWaitlist}
                className="btn-partner-lodz"
              >
                ☕ Partner Your Café
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: APP-MATCHED MIDNIGHT NAVY & SOLAR WAITLIST BANNER ==================== */}
      <section id="waitlist" className="cta-banner-wrap">
        <div className="container">
          <div className="cta-navy-card">
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.15rem, 3.8vw, 3.1rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '10px'
              }}
            >
              Chase the <span style={{ color: '#f59e0b', fontStyle: 'italic' }}>light</span> this week.
            </h2>
            <p
              style={{
                fontSize: '1.06rem',
                color: '#94a3b8'
              }}
            >
              Be first to try LumosWalk in Łódź — or partner your local café.
            </p>

            {waitlistJoined ? (
              <div
                style={{
                  display: 'inline-block',
                  marginTop: '28px',
                  background: '#f59e0b',
                  color: '#0f172a',
                  padding: '16px 30px',
                  borderRadius: '999px',
                  fontSize: '0.96rem',
                  fontWeight: 700
                }}
              >
                ✓ You’re on the Łódź pilot list — see you on the sunny side!
              </div>
            ) : (
              <form
                onSubmit={handleWaitlistSubmit}
                className="cta-waitlist-form"
              >
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="cta-waitlist-input"
                />
                <button
                  type="submit"
                  className="pill-btn pill-btn-lg pill-btn-solar"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
