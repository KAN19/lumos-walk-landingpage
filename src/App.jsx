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

          {/* Right Column: Exact Mobile Phone UI from user's app screenshot */}
          <div className="phone-showcase-wrap">
            <div className="editorial-phone">
              <div style={{ padding: '16px 14px 18px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
                
                {/* 1. Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#111827', letterSpacing: '-0.02em' }}>
                      LumosWalk
                    </span>
                  </div>

                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '999px',
                      padding: '4px 11px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>📍 Łódź</span>
                    <span style={{ color: '#9ca3af' }}>•</span>
                    <span>8°C</span>
                    <span>🌙 Night</span>
                  </div>
                </div>

                {/* 2. Active Sunlight Path Card (Dark Navy Card) */}
                <div
                  style={{
                    background: '#0e1726',
                    color: '#ffffff',
                    borderRadius: '24px',
                    padding: '16px',
                    boxShadow: '0 10px 24px rgba(14, 23, 38, 0.25)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.04em' }}>
                        ACTIVE SUNLIGHT PATH
                      </span>
                    </div>
                    <span
                      style={{
                        background: '#064e3b',
                        color: '#34d399',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '0.68rem',
                        fontWeight: 700
                      }}
                    >
                      GPS Verified
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#ffffff' }}>
                        Pinned [51.776, 19.447] → Pin...
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                        Nighttime walk in progress
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>
                        +0m
                      </div>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        THIS SESSION
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      style={{
                        flex: 1,
                        background: '#f59e0b',
                        color: '#0f172a',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        padding: '10px 14px',
                        borderRadius: '14px',
                        textAlign: 'center'
                      }}
                    >
                      Return to Session
                    </button>
                    <button
                      type="button"
                      style={{
                        background: '#1e293b',
                        color: '#f1f5f9',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        padding: '10px 18px',
                        borderRadius: '14px'
                      }}
                    >
                      End
                    </button>
                  </div>
                </div>

                {/* 3. Weekly Sun Accumulation Card */}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '16px 18px',
                    border: '1.5px solid #fef08a',
                    boxShadow: '0 6px 18px rgba(245, 158, 11, 0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309', letterSpacing: '0.04em' }}>
                        WEEKLY SUN ACCUMULATION
                      </div>
                      <div style={{ marginTop: '2px' }}>
                        <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>3h 07m</span>
                        <span style={{ fontSize: '0.82rem', color: '#64748b', marginLeft: '6px' }}>/ 3h 00m</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#334155', fontWeight: 600, marginTop: '2px' }}>
                        🎉 3h weekly café reward unlocked! Ready to redeem
                      </div>
                    </div>

                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        border: '3px solid #f59e0b',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>100%</span>
                      <span style={{ fontSize: '0.6rem', color: '#64748b' }}>Week</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '8px', background: '#f59e0b', borderRadius: '999px', marginTop: '12px' }} />
                </div>

                {/* 4. Today's Solar Window Card */}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '16px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                      ☀️ Today&apos;s Solar Window
                    </span>
                    <span
                      style={{
                        background: '#ecfdf5',
                        color: '#065f46',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '0.7rem',
                        fontWeight: 700
                      }}
                    >
                      🌙 Night (-45.6°)
                    </span>
                  </div>

                  <p style={{ fontSize: '0.73rem', color: '#475569', lineHeight: 1.45 }}>
                    <strong>Clear sky window 11:00–14:45</strong> (~12,500 Lux). Tap any hour to inspect sunlit areas:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '10px', textAlign: 'center' }}>
                    <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '14px', padding: '6px 2px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#713f12' }}>12:00</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#854d0e' }}>☀️ 90%</div>
                    </div>
                    <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: '14px', padding: '6px 2px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#713f12' }}>13:00</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#854d0e' }}>☀️ 85%</div>
                    </div>
                    <div style={{ background: '#fef08a', border: '2px solid #f59e0b', borderRadius: '14px', padding: '5px 2px' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#713f12' }}>14:00</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#713f12' }}>🌤️ 65%</div>
                    </div>
                    <div style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '6px 2px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>15:00</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>☁️ 20%</div>
                    </div>
                  </div>
                </div>

                {/* 5. Bento Grid Row (Sunlight Path & Sunny Spots) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      padding: '14px',
                      border: '2px solid #f59e0b',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#fffbeb',
                          border: '1px solid #fde68a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem'
                        }}
                      >
                        🧭
                      </span>
                      <span
                        style={{
                          background: '#fffbeb',
                          color: '#b45309',
                          padding: '2px 7px',
                          borderRadius: '999px',
                          fontSize: '0.68rem',
                          fontWeight: 700
                        }}
                      >
                        0% 🌙
                      </span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>Sunlight Path</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '1px' }}>Sunniest A → B walk</div>
                  </div>

                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      padding: '14px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem'
                        }}
                      >
                        🕒
                      </span>
                      <span
                        style={{
                          background: '#f1f5f9',
                          color: '#334155',
                          padding: '2px 7px',
                          borderRadius: '999px',
                          fontSize: '0.68rem',
                          fontWeight: 700
                        }}
                      >
                        14 Spots
                      </span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>Sunny Spots</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '1px' }}>Near your GPS area</div>
                  </div>
                </div>

                {/* 6. Café Voucher Perks Card */}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '12px 14px',
                    border: '1px solid #a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#10b981',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem'
                      }}
                    >
                      ☕
                    </span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>Café Voucher Perks</div>
                      <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 600 }}>
                        3h 07m accumulated • 2 unlocked
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      background: '#ffffff',
                      border: '1px solid #a7f3d0',
                      color: '#047857',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.74rem',
                      fontWeight: 800
                    }}
                  >
                    View ›
                  </span>
                </div>

              </div>
            </div>
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

      {/* ==================== SECTION 3: APP SCREENSHOTS PLACEHOLDERS ==================== */}
      <section
        id="app-screenshots"
        className="editorial-section"
        style={{
          background: 'rgba(245, 158, 11, 0.06)',
          borderTop: '1px solid rgba(229, 231, 235, 0.8)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.8)'
        }}
      >
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="eyebrow-solar">
                APP PREVIEW · DESIGNED FOR MOBILE
              </div>
              <h2 className="section-serif-heading">
                Screens from LumosWalk.
              </h2>
              <p className="section-subcopy">
                Designed for Central European winters — clean, fast, and light-focused. Here is a preview of the core application screens.
              </p>
            </div>
          </div>

          <div className="screenshots-gallery-grid">
            {/* Screenshot 1 Placeholder: Sunlight Path */}
            <div className="screenshot-placeholder-card">
              <div className="screenshot-frame-placeholder">
                <div
                  style={{
                    background: '#f59e0b',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    color: '#0f172a',
                    marginBottom: '10px'
                  }}
                >
                  🧭 Screenshot 01
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                  Sunlight Path Router
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', textAlign: 'center', padding: '0 20px' }}>
                  [ App Screenshot Placeholder ]
                  <br />
                  3D Shadow Polygons &amp; Route Comparison
                </div>
              </div>
              <div style={{ padding: '0 4px' }}>
                <div className="card-num-tag">Screen 01 · A to B Walking</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.28rem', fontWeight: 700, marginBottom: '6px' }}>
                  Sunlight Path Router
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
                  Calculates pedestrian walking routes optimized for direct sunlight exposure using 3D building geometry, comparing Sunniest vs. Shortest routes.
                </p>
              </div>
            </div>

            {/* Screenshot 2 Placeholder: Sunny Spots */}
            <div className="screenshot-placeholder-card">
              <div className="screenshot-frame-placeholder">
                <div
                  style={{
                    background: '#0e1726',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    color: '#f59e0b',
                    marginBottom: '10px'
                  }}
                >
                  🕒 Screenshot 02
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                  Sunny Spots by Time
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', textAlign: 'center', padding: '0 20px' }}>
                  [ App Screenshot Placeholder ]
                  <br />
                  Time Scrubber &amp; Sunlit Area Footprint
                </div>
              </div>
              <div style={{ padding: '0 4px' }}>
                <div className="card-num-tag gold">Screen 02 · Stationary Soaking</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.28rem', fontWeight: 700, marginBottom: '6px' }}>
                  Sunny Spots Explorer
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
                  Interactive time-of-day scrubber with GPS locate to find unshaded benches, plazas, and parks at any specific hour in Łódź.
                </p>
              </div>
            </div>

            {/* Screenshot 3 Placeholder: Voucher Wallet */}
            <div className="screenshot-placeholder-card">
              <div className="screenshot-frame-placeholder">
                <div
                  style={{
                    background: '#fef08a',
                    border: '1.5px solid #f59e0b',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    color: '#0f172a',
                    marginBottom: '10px'
                  }}
                >
                  ☕ Screenshot 03
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                  Weekly Sunlight Bank
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', textAlign: 'center', padding: '0 20px' }}>
                  [ App Screenshot Placeholder ]
                  <br />
                  Weekly Progress &amp; Café Voucher Codes
                </div>
              </div>
              <div style={{ padding: '0 4px' }}>
                <div className="card-num-tag">Screen 03 · Local Rewards</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.28rem', fontWeight: 700, marginBottom: '6px' }}>
                  Café Voucher Wallet
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
                  Accumulate verified sunlight hours toward 2h, 3h, and 5h weekly goals and redeem warm beverage discounts at partner cafés.
                </p>
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
            <article className="editorial-card surface-white">
              <div>
                <div className="card-num-tag">Tier 01 · 2 hours / week</div>
                <h3 className="card-serif-title">
                  50% off warm winter tea or infusion
                </h3>
                <p className="card-body-text">
                  Four 30-minute sunlit walks across your workweek. Brings
                  steady afternoon visitors to Piotrkowska cafés during quiet
                  winter hours.
                </p>
              </div>
              <div className="dashed-voucher-pill">
                <span>
                  <strong>Drukarz Café</strong> · code <strong>LUMOS2H</strong>
                </span>
              </div>
            </article>

            <article className="editorial-card surface-gold">
              <div>
                <div className="card-num-tag">
                  Tier 02 · 3 hours / week (Clinical target)
                </div>
                <h3 className="card-serif-title">
                  Free barista coffee or craft matcha
                </h3>
                <p className="card-body-text" style={{ color: '#0f172a' }}>
                  Our core weekly target (~25 mins of verified outdoor daylight
                  per day) proven to combat Winter Blues and Seasonal Affective
                  Disorder.
                </p>
              </div>
              <div
                className="dashed-voucher-pill"
                style={{ borderColor: '#0f172a', background: '#ffffff' }}
              >
                <span>
                  <strong>Kawiarnia Ranny Ptaszek</strong> · code{' '}
                  <strong>SUN3H</strong>
                </span>
              </div>
            </article>

            <article className="editorial-card surface-sand">
              <div>
                <div className="card-num-tag">Tier 03 · 5 hours / week</div>
                <h3 className="card-serif-title">
                  2-for-1 weekend pastry &amp; filter coffee
                </h3>
                <p className="card-body-text">
                  Bring a friend outdoors! Encourages social connection and
                  weekend sunlit strolls through Park Sienkiewicza and
                  Manufaktura.
                </p>
              </div>
              <div className="dashed-voucher-pill">
                <span>
                  <strong>Manufaktura Bakery</strong> · code{' '}
                  <strong>BRUNCH5H</strong>
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
