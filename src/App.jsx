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

const LODZ_SUNNY_SPOTS = [
  {
    id: 1,
    rank: '#1 Nearest',
    name: 'Pasaż Rubinsteina Courtyard',
    shortName: 'Pasaż Rubinsteina',
    distance: '180m',
    walkTime: '2 min walk',
    sunWindow: '11:15 – 14:40',
    directSunPct: 88,
    benches: '6 sunlit benches',
    lux: '88,500 lux',
    partnerCafe: 'Drukarz Café (40m away)'
  },
  {
    id: 2,
    rank: '#2 Nearby',
    name: 'Park im. Sienkiewicza South Lawn',
    shortName: 'Park Sienkiewicza',
    distance: '310m',
    walkTime: '4 min walk',
    sunWindow: '10:30 – 15:10',
    directSunPct: 92,
    benches: '9 sunlit benches',
    lux: '92,000 lux',
    partnerCafe: 'Kawiarnia Parkowa (60m away)'
  },
  {
    id: 3,
    rank: '#3 Nearby',
    name: 'Plac Wolności South Terrace',
    shortName: 'Plac Wolności',
    distance: '480m',
    walkTime: '6 min walk',
    sunWindow: '10:00 – 14:55',
    directSunPct: 95,
    benches: '8 sunlit benches',
    lux: '94,000 lux',
    partnerCafe: 'Piotrkowska Roast (30m away)'
  },
  {
    id: 4,
    rank: '#4 Nearby',
    name: 'Manufaktura Market Square Benches',
    shortName: 'Manufaktura Square',
    distance: '650m',
    walkTime: '8 min walk',
    sunWindow: '11:45 – 15:30',
    directSunPct: 90,
    benches: '12 sunlit benches',
    lux: '90,000 lux',
    partnerCafe: 'Manufaktura Bakery (25m away)'
  }
];

const VOUCHER_WALLET_TIERS = [
  {
    id: 'tier-2h',
    tier: '2h / week tier',
    status: 'unlocked',
    cafe: 'Drukarz Café Piotrkowska',
    perk: '50% off warm winter spiced tea',
    code: 'LUMOS2H',
    progressText: 'Unlocked · 2h 00m banked'
  },
  {
    id: 'tier-3h',
    tier: '3h / week clinical goal',
    status: 'almost',
    cafe: 'Kawiarnia Ranny Ptaszek',
    perk: 'Free specialty flat white or matcha',
    code: 'SUN3H',
    progressText: '15m more sunlight needed (2h 45m / 3h)'
  },
  {
    id: 'tier-5h',
    tier: '5h / week social tier',
    status: 'locked',
    cafe: 'Manufaktura Artisan Bakery',
    perk: '2-for-1 weekend cardamom bun & coffee',
    code: 'BRUNCH5H',
    progressText: '2h 15m more sunlight needed'
  }
];

export default function App() {
  // Home Dashboard Phone Mockup State (Hero)
  const [homeCardStyle, setHomeCardStyle] = useState('bento'); // 'bento' | 'rows'

  // Mutually Exclusive Active Session State ('idle' | 'path' | 'spot')
  const [sessionMode, setSessionMode] = useState('idle');

  // Section 2 (4 Editorial Bento Cards) Interactive State
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

  // Section 3 (Interactive Mobile App Walkthrough) State
  const [activeAppScreen, setActiveAppScreen] = useState('path'); // 'path' | 'spots' | 'vouchers'
  const [appRouteType, setAppRouteType] = useState('sunniest');
  const [isPathSheetCollapsed, setIsPathSheetCollapsed] = useState(false);

  // Screen 3 (Sunny Spots 2-Step Map Zoom) State
  const [appSpotHour, setAppSpotHour] = useState(13);
  const [selectedSpotId, setSelectedSpotId] = useState(null); // null = Step 1 (Nearby GPS Overview), number = Step 2 (Whole Sunlit Area)
  const [isSpotListExpanded, setIsSpotListExpanded] = useState(false);
  const [gpsLocatePulse, setGpsLocatePulse] = useState(false);

  // Screen 4 (Voucher Wallet) State
  const [redeemedCodes, setRedeemedCodes] = useState({});

  // Footer Waitlist State
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  // Helpers
  const jumpToInteractiveScreen = (screenName) => {
    setActiveAppScreen(screenName);
    const el = document.getElementById('interactive-app');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerSessionState = (mode) => {
    setSessionMode(mode);
    if (mode === 'path') {
      setActiveAppScreen('path');
      setIsPathSheetCollapsed(false);
    } else if (mode === 'spot') {
      setActiveAppScreen('spots');
      if (!selectedSpotId) setSelectedSpotId(1);
    }
  };

  const handleGpsLocateMe = () => {
    setSelectedSpotId(null);
    setGpsLocatePulse(true);
    setTimeout(() => setGpsLocatePulse(false), 1600);
  };

  const toggleBentoDay = (idx) => {
    setBentoWeekDays((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const toggleVoucherRedeem = (id) => {
    setRedeemedCodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setWaitlistJoined(true);
      setWaitlistEmail('');
    }
  };

  // Dynamic values for Bento Card 02 & App Screen 2
  const bentoSliderPct = ((bentoSpotHour - 8) / 8) * 100;
  const appSliderPct = ((appSpotHour - 8) / 8) * 100;
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
  const appDirectSun = sunPctByHour[appSpotHour] || 89;
  const selectedBriefObj =
    HOURLY_SOLAR_CURVE.find((h) => h.hour === bentoBriefHour) ||
    HOURLY_SOLAR_CURVE[4];
  const activeSpotObj =
    LODZ_SUNNY_SPOTS.find((s) => s.id === selectedSpotId) ||
    LODZ_SUNNY_SPOTS[0];

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
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4.5" fill="currentColor" />
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
            <a href="#interactive-app">Interactive Mobile UI</a>
            <a href="#weekly-economics">3h Weekly Rewards</a>
          </nav>

          <div className="nav-cta-group">
            <button
              type="button"
              onClick={() => jumpToInteractiveScreen('path')}
              className="pill-btn pill-btn-sm pill-btn-warm-outline"
            >
              Try App Demo
            </button>
            <a href="#waitlist" className="pill-btn pill-btn-sm pill-btn-espresso">
              Join waitlist
            </a>
          </div>
        </div>
      </header>

      {/* ==================== SECTION 1: HERO (EDITORIAL COPY + MAP-FREE HOME DASHBOARD PHONE) ==================== */}
      <section id="top" className="hero-section">
        <div className="container hero-grid">
          {/* Left Column: Editorial Headline + Łódź Winter Prescription */}
          <div>
            <div className="eyebrow-orange">
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
                onClick={() => jumpToInteractiveScreen('path')}
                className="pill-btn pill-btn-lg pill-btn-orange"
              >
                Explore interactive app
              </button>
              <a
                href="#four-ways"
                className="pill-btn pill-btn-lg pill-btn-warm-outline"
              >
                How it works
              </a>
            </div>

            {/* 3 Quick Editorial Feature Jumpers */}
            <div className="hero-pillars-strip">
              <button
                type="button"
                onClick={() => jumpToInteractiveScreen('path')}
                className="hero-mini-card"
              >
                <div className="hero-mini-num">01 · A to B Router</div>
                <div className="hero-mini-title">Sunlight Path</div>
                <div className="hero-mini-meta">
                  87% sunniest vs. 34% shortest walk
                </div>
              </button>

              <button
                type="button"
                onClick={() => jumpToInteractiveScreen('spots')}
                className="hero-mini-card"
              >
                <div className="hero-mini-num">02 · Time Scrubber</div>
                <div className="hero-mini-title">Sunny Spots</div>
                <div className="hero-mini-meta">
                  Nearby GPS pins → whole sunlit area
                </div>
              </button>

              <button
                type="button"
                onClick={() => jumpToInteractiveScreen('vouchers')}
                className="hero-mini-card"
              >
                <div className="hero-mini-num">03 · Weekly Bank</div>
                <div className="hero-mini-title">3h Café Perks</div>
                <div className="hero-mini-meta">
                  Verified minutes → Łódź cafe codes
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Map-Free Home Dashboard Phone Mockup (Styled in Warm Editorial Palette) */}
          <div className="phone-showcase-wrap">
            <div className="editorial-phone">
              <div className="phone-top-bar">
                <span>09:41</span>
                <span
                  style={{
                    background: '#f3e6cc',
                    color: '#23170b',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}
                >
                  Map-Free Home · &lt;50ms
                </span>
                <span>100%</span>
              </div>

              <div
                style={{
                  padding: '8px 18px 18px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Greeting Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: '#df6e00',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em'
                        }}
                      >
                        Łódź · Śródmieście
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.22rem',
                          fontWeight: 700,
                          color: '#23170b'
                        }}
                      >
                        Good morning, Kiet
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => jumpToInteractiveScreen('vouchers')}
                      style={{
                        background: '#f4c842',
                        color: '#23170b',
                        padding: '7px 13px',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      2h 45m / 3h
                    </button>
                  </div>

                  {/* Mutually Exclusive Active Session Banner (Only shown when sessionMode !== 'idle') */}
                  {sessionMode !== 'idle' && (
                    <div
                      onClick={() =>
                        jumpToInteractiveScreen(
                          sessionMode === 'path' ? 'path' : 'spots'
                        )
                      }
                      style={{
                        background: '#111826',
                        color: '#fffdf9',
                        padding: '11px 14px',
                        borderRadius: '18px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#f4b62a'
                          }}
                        >
                          ●{' '}
                          {sessionMode === 'path'
                            ? 'Live Sunlight Path Active'
                            : 'Live Sunny Spot Soaking'}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            marginTop: '2px'
                          }}
                        >
                          {sessionMode === 'path'
                            ? 'Piotrkowska → Manufaktura (87% sun)'
                            : 'Pasaż Rubinsteina · 6 sunlit benches'}
                        </div>
                      </div>
                      <span
                        style={{
                          background: '#df6e00',
                          color: '#fffdf9',
                          padding: '5px 11px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        Resume
                      </span>
                    </div>
                  )}

                  {/* Card 1: Weekly Sunlight Bank Progress */}
                  <div
                    style={{
                      background: '#fffdf9',
                      borderRadius: '22px',
                      padding: '15px 16px',
                      marginBottom: '10px',
                      boxShadow: '0 12px 30px rgba(155, 110, 45, 0.07)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem',
                        fontWeight: 700
                      }}
                    >
                      <span>Weekly sunlight bank</span>
                      <span style={{ color: '#df6e00' }}>
                        15m to free coffee
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '9px',
                        background: '#efe8d8',
                        borderRadius: '999px',
                        overflow: 'hidden',
                        margin: '9px 0'
                      }}
                    >
                      <div
                        style={{
                          width: '91%',
                          height: '100%',
                          background: '#df6e00',
                          borderRadius: '999px'
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.74rem',
                        color: '#6b5b4d'
                      }}
                    >
                      <span>2h 45m accumulated</span>
                      <span style={{ fontWeight: 700, color: '#23170b' }}>
                        Goal: 3h / week
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Solar Microclimate Brief (Warm Sand Surface) */}
                  <div
                    style={{
                      background: '#f3e6cc',
                      borderRadius: '22px',
                      padding: '14px 16px',
                      marginBottom: '12px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          color: '#df6e00'
                        }}
                      >
                        Today’s solar microclimate brief
                      </span>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#23170b'
                        }}
                      >
                        Peak 92,000 lux
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.74rem',
                        color: '#6b5b4d',
                        marginTop: '3px'
                      }}
                    >
                      Clear golden window <strong>11:30–14:40</strong> before
                      afternoon cloud cover rolls in.
                    </p>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '6px',
                        marginTop: '9px',
                        textAlign: 'center'
                      }}
                    >
                      <div
                        style={{
                          background: '#fffdf9',
                          borderRadius: '12px',
                          padding: '5px',
                          fontSize: '0.7rem'
                        }}
                      >
                        <div style={{ color: '#6b5b4d' }}>12:00</div>
                        <div style={{ fontWeight: 700, color: '#df6e00' }}>
                          92% sun
                        </div>
                      </div>
                      <div
                        style={{
                          background: '#f4c842',
                          borderRadius: '12px',
                          padding: '5px',
                          fontSize: '0.7rem'
                        }}
                      >
                        <div style={{ fontWeight: 700, color: '#23170b' }}>
                          13:00
                        </div>
                        <div style={{ fontWeight: 800, color: '#23170b' }}>
                          89% sun
                        </div>
                      </div>
                      <div
                        style={{
                          background: '#fffdf9',
                          borderRadius: '12px',
                          padding: '5px',
                          fontSize: '0.7rem'
                        }}
                      >
                        <div style={{ color: '#6b5b4d' }}>14:00</div>
                        <div style={{ fontWeight: 700, color: '#df6e00' }}>
                          74% sun
                        </div>
                      </div>
                      <div
                        style={{
                          background: '#efe8d8',
                          borderRadius: '12px',
                          padding: '5px',
                          fontSize: '0.7rem'
                        }}
                      >
                        <div style={{ color: '#8a7968' }}>15:00</div>
                        <div style={{ fontWeight: 600, color: '#6b5b4d' }}>
                          44% sun
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Feature Launchers (Bento Grid vs Clean Rows, Zero "Open Map" Redundancy) */}
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#8a7968',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '7px'
                    }}
                  >
                    Tap a mode to launch map
                  </div>

                  {homeCardStyle === 'bento' ? (
                    <div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                          marginBottom: '8px'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => jumpToInteractiveScreen('path')}
                          style={{
                            background: '#f4c842',
                            borderRadius: '20px',
                            padding: '13px',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            color: '#23170b'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          >
                            <span>01 · Router</span>
                            <span
                              style={{
                                background: '#fffdf9',
                                padding: '2px 8px',
                                borderRadius: '999px'
                              }}
                            >
                              87% sun
                            </span>
                          </div>
                          <div>
                            <div
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '0.95rem',
                                fontWeight: 700
                              }}
                            >
                              Sunlight path
                            </div>
                            <div style={{ fontSize: '0.72rem', opacity: 0.82 }}>
                              Sunniest A to B
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => jumpToInteractiveScreen('spots')}
                          style={{
                            background: '#111826',
                            borderRadius: '20px',
                            padding: '13px',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            color: '#fffdf9'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: '#f4b62a'
                            }}
                          >
                            <span>02 · Spots</span>
                            <span>12 places</span>
                          </div>
                          <div>
                            <div
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '0.95rem',
                                fontWeight: 700
                              }}
                            >
                              Sunny spots
                            </div>
                            <div
                              style={{
                                fontSize: '0.72rem',
                                color: '#b2bccb'
                              }}
                            >
                              Scrub any hour
                            </div>
                          </div>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => jumpToInteractiveScreen('vouchers')}
                        style={{
                          width: '100%',
                          background: '#fffdf9',
                          border: '1.5px dashed #e59849',
                          borderRadius: '18px',
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              color: '#23170b'
                            }}
                          >
                            Café voucher wallet
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#6b5b4d' }}>
                            Drukarz Café &amp; Ranny Ptaszek · code{' '}
                            <strong>SUN3H</strong>
                          </div>
                        </div>
                        <span
                          style={{
                            background: '#df6e00',
                            color: '#fffdf9',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          Redeem
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '7px'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => jumpToInteractiveScreen('path')}
                        style={{
                          width: '100%',
                          background: '#f4c842',
                          borderRadius: '16px',
                          padding: '11px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                            Find the sunlight path
                          </div>
                          <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                            Sunniest A to B walking route
                          </div>
                        </div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                          87% sun ›
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => jumpToInteractiveScreen('spots')}
                        style={{
                          width: '100%',
                          background: '#111826',
                          color: '#fffdf9',
                          borderRadius: '16px',
                          padding: '11px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                            Sunny spots by time
                          </div>
                          <div
                            style={{ fontSize: '0.7rem', color: '#b2bccb' }}
                          >
                            Unshaded benches &amp; plazas at any hour
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: '#f4b62a'
                          }}
                        >
                          12 spots ›
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => jumpToInteractiveScreen('vouchers')}
                        style={{
                          width: '100%',
                          background: '#fffdf9',
                          border: '1.5px dashed #e59849',
                          borderRadius: '16px',
                          padding: '11px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                            Weekly sunlight bank &amp; vouchers
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#6b5b4d' }}>
                            2h, 3h &amp; 5h Łódź café tiers
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: '#df6e00'
                          }}
                        >
                          1 ready ›
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Home Card Layout Switcher under Hero Phone */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '14px'
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#6b5b4d',
                  fontWeight: 600
                }}
              >
                Home launcher style:
              </span>
              <button
                type="button"
                onClick={() => setHomeCardStyle('bento')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  background:
                    homeCardStyle === 'bento' ? '#23170b' : '#fffdf9',
                  color: homeCardStyle === 'bento' ? '#fffdf9' : '#23170b',
                  border: '1px solid #d4c5ad'
                }}
              >
                Bento Grid
              </button>
              <button
                type="button"
                onClick={() => setHomeCardStyle('rows')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  background: homeCardStyle === 'rows' ? '#23170b' : '#fffdf9',
                  color: homeCardStyle === 'rows' ? '#fffdf9' : '#23170b',
                  border: '1px solid #d4c5ad'
                }}
              >
                Clean Rows
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: FOUR WAYS EDITORIAL BENTO GRID ==================== */}
      <section id="four-ways" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="eyebrow-orange">
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
                        fontWeight: 700,
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
                <button
                  type="button"
                  onClick={() => jumpToInteractiveScreen('path')}
                  style={{
                    fontWeight: 700,
                    color: '#df6e00',
                    fontSize: '0.84rem'
                  }}
                >
                  Test in phone ›
                </button>
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
                  <span style={{ color: '#f4b62a', fontWeight: 600 }}>
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
                    background: `linear-gradient(to right, #f4b62a 0%, #f4b62a ${bentoSliderPct}%, #283142 ${bentoSliderPct}%, #283142 100%)`
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
                      background: '#f4b62a',
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
                  color: '#b2bccb'
                }}
              >
                <span>
                  Pasaż Rubinsteina · 6 sunlit benches · sun until 14:40
                </span>
                <button
                  type="button"
                  onClick={() => jumpToInteractiveScreen('spots')}
                  style={{
                    fontWeight: 700,
                    color: '#f4b62a',
                    fontSize: '0.84rem'
                  }}
                >
                  Open spot map ›
                </button>
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

              <button
                type="button"
                onClick={() => jumpToInteractiveScreen('vouchers')}
                className="dashed-voucher-pill"
              >
                <span>
                  <strong>Kawiarnia Ranny Ptaszek</strong> — 20% off · code{' '}
                  <strong>SUN3H</strong>
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#df6e00'
                  }}
                >
                  Wallet ›
                </span>
              </button>
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
                              ? '#df6e00'
                              : 'rgba(223, 110, 0, 0.25)',
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
                    color: '#23170b'
                  }}
                >
                  <span>
                    Peak 11:30–13:30 · {selectedBriefObj.lux} (
                    {selectedBriefObj.cloud})
                  </span>
                  <span style={{ color: '#df6e00' }}>
                    {selectedBriefObj.hour}:00 selected
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: INTERACTIVE MOBILE APP WALKTHROUGH ==================== */}
      <section
        id="interactive-app"
        className="editorial-section"
        style={{
          background: 'rgba(243, 230, 204, 0.45)',
          borderTop: '1px solid rgba(228, 217, 198, 0.7)',
          borderBottom: '1px solid rgba(228, 217, 198, 0.7)'
        }}
      >
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="eyebrow-orange">
                INTERACTIVE MOBILE PROTOTYPE · NO BOTTOM BAR ARCHITECTURE
              </div>
              <h2 className="section-serif-heading">
                Test the full mobile flow.
              </h2>
              <p className="section-subcopy">
                Without a persistent bottom tab bar, the map gets +15% more
                vertical breathing room. Switch features on the left or simulate
                an active GPS session below.
              </p>
            </div>

            {/* Mutually Exclusive Session State Simulator */}
            <div
              style={{
                background: '#fffdf9',
                border: '1px solid #e4d9c6',
                borderRadius: '999px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexWrap: 'wrap'
              }}
            >
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: '#6b5b4d',
                  padding: '0 10px'
                }}
              >
                Session state:
              </span>
              <button
                type="button"
                onClick={() => setSessionMode('idle')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  background:
                    sessionMode === 'idle' ? '#23170b' : 'transparent',
                  color: sessionMode === 'idle' ? '#fffdf9' : '#6b5b4d'
                }}
              >
                Idle
              </button>
              <button
                type="button"
                onClick={() => triggerSessionState('path')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  background:
                    sessionMode === 'path' ? '#df6e00' : 'transparent',
                  color: sessionMode === 'path' ? '#fffdf9' : '#6b5b4d'
                }}
              >
                Active: Sunlight Path
              </button>
              <button
                type="button"
                onClick={() => triggerSessionState('spot')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  background:
                    sessionMode === 'spot' ? '#111826' : 'transparent',
                  color: sessionMode === 'spot' ? '#f4b62a' : '#6b5b4d'
                }}
              >
                Active: Sunny Spot
              </button>
            </div>
          </div>

          <div className="walkthrough-split">
            {/* Left Column: 3 Detailed UX Cards */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <button
                type="button"
                onClick={() => setActiveAppScreen('path')}
                className={`walkthrough-selector-card ${
                  activeAppScreen === 'path' ? 'selected' : ''
                }`}
              >
                <div className="card-num-tag">
                  Screen 01 · Full-Bleed Sunlight Path Router
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.42rem',
                    fontWeight: 700,
                    marginBottom: '8px'
                  }}
                >
                  Compare Sunniest vs. Shortest A to B
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#6b5b4d',
                    lineHeight: 1.6
                  }}
                >
                  Displays 3D building shadow polygons along Piotrkowska Street
                  and a collapsible bottom route drawer. Starting a walk
                  transforms the sheet into a live GPS-verified exposure session
                  that banks minutes toward your weekly coffee.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveAppScreen('spots')}
                className={`walkthrough-selector-card ${
                  activeAppScreen === 'spots' ? 'selected' : ''
                }`}
              >
                <div className="card-num-tag">
                  Screen 02 · 2-Step Sunny Spots + GPS Locate
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.42rem',
                    fontWeight: 700,
                    marginBottom: '8px'
                  }}
                >
                  Nearby Overview → Whole Sunlit Area Footprint
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#6b5b4d',
                    lineHeight: 1.6
                  }}
                >
                  <strong>Step 1:</strong> Centers on your GPS with a floating
                  locate button, showing nearby sunlit pins and listing the{' '}
                  <strong>#1 nearest place first</strong> in a pull-up sheet.
                  <br />
                  <strong>Step 2:</strong> Tap any spot to zoom into its whole
                  sunlit area footprint, unshaded percentage, and bench count.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveAppScreen('vouchers')}
                className={`walkthrough-selector-card ${
                  activeAppScreen === 'vouchers' ? 'selected' : ''
                }`}
              >
                <div className="card-num-tag">
                  Screen 03 · Pure Voucher Redemption Wallet
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.42rem',
                    fontWeight: 700,
                    marginBottom: '8px'
                  }}
                >
                  Weekly Sunlight Bank &amp; Łódź Café Codes
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#6b5b4d',
                    lineHeight: 1.6
                  }}
                >
                  Strictly separated from live exposure timers so you can redeem
                  codes effortlessly at the cafe counter. Shows your weekly
                  accumulated hours, 7-day consistency pills, and dashed
                  voucher cards for 2h, 3h, and 5h tiers.
                </p>
              </button>
            </div>

            {/* Right Column: Live Interactive Phone Frame */}
            <div className="phone-showcase-wrap">
              <div className="editorial-phone">
                {/* ==================== PHONE VIEW 1: SUNLIGHT PATH (A -> B) ==================== */}
                {activeAppScreen === 'path' && (
                  <div
                    className="warm-map-grid"
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    {/* Top Floating Route Bar */}
                    <div style={{ padding: '14px', zIndex: 10 }}>
                      <div
                        style={{
                          background: '#fffdf9',
                          borderRadius: '22px',
                          padding: '13px',
                          boxShadow: '0 10px 28px rgba(70, 42, 10, 0.1)'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                          }}
                        >
                          <span
                            style={{
                              background: '#efe8d8',
                              padding: '4px 11px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          >
                            ← Home
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '0.88rem',
                              fontWeight: 700
                            }}
                          >
                            Sunlight path
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveAppScreen('vouchers')}
                            style={{
                              background: '#f4c842',
                              color: '#23170b',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          >
                            2h 45m
                          </button>
                        </div>

                        <div
                          style={{
                            background: '#fbf6ec',
                            borderRadius: '14px',
                            padding: '9px 12px',
                            fontSize: '0.74rem'
                          }}
                        >
                          <div
                            style={{
                              color: '#6b5b4d',
                              fontWeight: 600,
                              marginBottom: '4px'
                            }}
                          >
                            Origin: My GPS (Piotrkowska 104)
                          </div>
                          <div
                            style={{
                              color: '#23170b',
                              fontWeight: 700
                            }}
                          >
                            Destination: Manufaktura Courtyard
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Map Canvas: Shaded Corridor vs Sunlit Corridor */}
                    <div
                      style={{
                        flex: 1,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: '24px',
                          top: '28px',
                          width: '96px',
                          height: '92px',
                          background: 'rgba(17, 24, 38, 0.14)',
                          border: '1.5px dashed #6b5b4d',
                          borderRadius: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          textAlign: 'center'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: '#23170b'
                          }}
                        >
                          Building shade
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#6b5b4d' }}>
                          Shortest · 34% sun
                        </span>
                      </div>

                      <div
                        style={{
                          width: '204px',
                          height: '124px',
                          borderRadius: '26px',
                          background:
                            appRouteType === 'sunniest'
                              ? '#f4c842'
                              : 'rgba(244, 200, 66, 0.45)',
                          boxShadow: '0 16px 36px rgba(223, 110, 0, 0.18)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '14px',
                          textAlign: 'center',
                          marginLeft: '48px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span
                          style={{
                            background: '#23170b',
                            color: '#fffdf9',
                            padding: '4px 12px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          Sunniest route · 87% sun
                        </span>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: '#23170b',
                            marginTop: '7px'
                          }}
                        >
                          18 min · 1.4 km · +16m banked
                        </span>
                      </div>
                    </div>

                    {/* Collapsible Bottom Route Sheet */}
                    <div
                      style={{
                        margin: '14px',
                        background: '#fffdf9',
                        borderRadius: '26px',
                        padding: '16px',
                        boxShadow: '0 16px 40px rgba(70, 42, 10, 0.14)',
                        zIndex: 10
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '10px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: '#df6e00',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {sessionMode === 'path'
                            ? 'Live GPS Walk Session'
                            : 'Side-by-side route choice'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setIsPathSheetCollapsed(!isPathSheetCollapsed)
                          }
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: '#6b5b4d'
                          }}
                        >
                          {isPathSheetCollapsed ? 'Expand ↑' : 'Minimize ↓'}
                        </button>
                      </div>

                      {!isPathSheetCollapsed && (
                        <>
                          {sessionMode !== 'path' ? (
                            <div>
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr',
                                  gap: '8px',
                                  marginBottom: '12px'
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => setAppRouteType('sunniest')}
                                  style={{
                                    background: '#f4c842',
                                    borderRadius: '16px',
                                    padding: '12px',
                                    textAlign: 'left',
                                    boxShadow:
                                      appRouteType === 'sunniest'
                                        ? '0 0 0 2px #23170b'
                                        : 'none'
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: '0.82rem',
                                      fontWeight: 700
                                    }}
                                  >
                                    Sunniest
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '0.74rem',
                                      marginTop: '2px'
                                    }}
                                  >
                                    87% sun · 18 min
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '0.72rem',
                                      fontWeight: 700,
                                      marginTop: '3px'
                                    }}
                                  >
                                    +16m banked
                                  </div>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setAppRouteType('shortest')}
                                  style={{
                                    background: '#efe8d8',
                                    borderRadius: '16px',
                                    padding: '12px',
                                    textAlign: 'left',
                                    boxShadow:
                                      appRouteType === 'shortest'
                                        ? '0 0 0 2px #23170b'
                                        : 'none'
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: '0.82rem',
                                      fontWeight: 700
                                    }}
                                  >
                                    Shortest
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '0.74rem',
                                      marginTop: '2px'
                                    }}
                                  >
                                    34% sun · 15 min
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '0.72rem',
                                      color: '#6b5b4d',
                                      marginTop: '3px'
                                    }}
                                  >
                                    +6m banked
                                  </div>
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSessionMode('path')}
                                style={{
                                  width: '100%',
                                  padding: '12px',
                                  borderRadius: '999px',
                                  background: '#df6e00',
                                  color: '#fffdf9',
                                  fontWeight: 700,
                                  fontSize: '0.82rem'
                                }}
                              >
                                Start sunlight path session
                              </button>
                            </div>
                          ) : (
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  margin: '8px 0 12px'
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      fontSize: '0.72rem',
                                      color: '#6b5b4d'
                                    }}
                                  >
                                    Verified walk exposure
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'var(--font-serif)',
                                      fontSize: '1.45rem',
                                      fontWeight: 700
                                    }}
                                  >
                                    +16 mins
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div
                                    style={{
                                      fontSize: '0.72rem',
                                      color: '#6b5b4d'
                                    }}
                                  >
                                    Weekly bank
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '0.92rem',
                                      fontWeight: 700,
                                      color: '#df6e00'
                                    }}
                                  >
                                    3h 01m · Goal met!
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSessionMode('idle')}
                                style={{
                                  width: '100%',
                                  padding: '11px',
                                  borderRadius: '999px',
                                  background: '#23170b',
                                  color: '#fffdf9',
                                  fontWeight: 700,
                                  fontSize: '0.8rem'
                                }}
                              >
                                End session
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== PHONE VIEW 2: SUNNY SPOTS BY TIME (2-STEP MAP ZOOM + DARK NAVY SLIDER) ==================== */}
                {activeAppScreen === 'spots' && (
                  <div
                    className="warm-map-grid"
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    {/* Top Midnight Navy Time Scrubber Card (Matching Reference Image 2) */}
                    <div style={{ padding: '14px', zIndex: 10 }}>
                      <div
                        style={{
                          background: '#111826',
                          color: '#fffdf9',
                          borderRadius: '22px',
                          padding: '14px 16px',
                          boxShadow: '0 14px 32px rgba(17, 24, 38, 0.22)'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.78rem',
                            marginBottom: '6px'
                          }}
                        >
                          <span style={{ fontWeight: 700 }}>
                            {String(appSpotHour).padStart(2, '0')}:00
                          </span>
                          <span style={{ color: '#f4b62a', fontWeight: 700 }}>
                            {appDirectSun}% direct sun
                          </span>
                        </div>

                        <input
                          type="range"
                          min={8}
                          max={16}
                          step={1}
                          value={appSpotHour}
                          onChange={(e) =>
                            setAppSpotHour(Number(e.target.value))
                          }
                          className="navy-range-slider"
                          style={{
                            margin: '6px 0 10px',
                            background: `linear-gradient(to right, #f4b62a 0%, #f4b62a ${appSliderPct}%, #283142 ${appSliderPct}%, #283142 100%)`
                          }}
                          aria-label="Time of day slider"
                        />

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.7rem',
                            color: '#b2bccb'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setAppSpotHour(10)}
                            style={{ color: '#b2bccb' }}
                          >
                            10:00
                          </button>
                          <button
                            type="button"
                            onClick={() => setAppSpotHour(12)}
                            style={{ color: '#f4b62a', fontWeight: 700 }}
                          >
                            12:00 Noon
                          </button>
                          <button
                            type="button"
                            onClick={() => setAppSpotHour(14)}
                            style={{ color: '#b2bccb' }}
                          >
                            14:00
                          </button>
                          <button
                            type="button"
                            onClick={() => setAppSpotHour(15)}
                            style={{ color: '#b2bccb' }}
                          >
                            15:00
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Map Canvas: Step 1 (Nearby Pins around User GPS) vs Step 2 (Zoomed Whole Sunlit Area Footprint) */}
                    <div
                      style={{
                        flex: 1,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      {selectedSpotId === null ? (
                        /* STEP 1: NEIGHBORHOOD OVERVIEW */
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <div
                            style={{
                              width: '185px',
                              height: '185px',
                              borderRadius: '999px',
                              border: '1.5px dashed rgba(223, 110, 0, 0.45)',
                              background: 'rgba(244, 200, 66, 0.14)'
                            }}
                          />

                          {/* User GPS Dot */}
                          <div
                            style={{
                              position: 'absolute',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              transform: gpsLocatePulse
                                ? 'scale(1.22)'
                                : 'scale(1)',
                              transition: 'transform 0.3s ease'
                            }}
                          >
                            <div
                              style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <span className="gps-pulse-ring" />
                              <span
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '999px',
                                  background: '#23170b',
                                  border: '2.5px solid #fffdf9',
                                  zIndex: 2
                                }}
                              />
                            </div>
                            <span
                              style={{
                                marginTop: '4px',
                                background: '#23170b',
                                color: '#fffdf9',
                                padding: '2px 8px',
                                borderRadius: '999px',
                                fontSize: '0.68rem',
                                fontWeight: 700
                              }}
                            >
                              You (GPS)
                            </span>
                          </div>

                          {/* Nearby Spot Pins */}
                          <button
                            type="button"
                            onClick={() => setSelectedSpotId(1)}
                            style={{
                              position: 'absolute',
                              top: '20px',
                              left: '22px',
                              background: '#f4c842',
                              color: '#23170b',
                              padding: '7px 12px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              boxShadow: '0 6px 16px rgba(35, 23, 11, 0.14)'
                            }}
                          >
                            #1 Rubinsteina · 180m
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedSpotId(2)}
                            style={{
                              position: 'absolute',
                              top: '36px',
                              right: '18px',
                              background: '#fffdf9',
                              border: '1px solid #d4c5ad',
                              color: '#23170b',
                              padding: '6px 11px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          >
                            #2 Sienkiewicza · 310m
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedSpotId(3)}
                            style={{
                              position: 'absolute',
                              bottom: '22px',
                              left: '30px',
                              background: '#fffdf9',
                              border: '1px solid #d4c5ad',
                              color: '#23170b',
                              padding: '6px 11px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          >
                            #3 Plac Wolności · 480m
                          </button>
                        </div>
                      ) : (
                        /* STEP 2: CLICKED SPOT -> WHOLE SUNLIT AREA FOOTPRINT */
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '24px',
                              background: 'rgba(17, 24, 38, 0.18)',
                              padding: '4px 10px',
                              borderRadius: '8px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              color: '#23170b'
                            }}
                          >
                            Adjacent building shade
                          </div>

                          <div
                            style={{
                              width: '236px',
                              height: '136px',
                              borderRadius: '28px',
                              background: '#f4c842',
                              boxShadow: '0 16px 36px rgba(223, 110, 0, 0.22)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '14px',
                              textAlign: 'center'
                            }}
                          >
                            <span
                              style={{
                                background: '#23170b',
                                color: '#fffdf9',
                                padding: '3px 11px',
                                borderRadius: '999px',
                                fontSize: '0.72rem',
                                fontWeight: 700
                              }}
                            >
                              {activeSpotObj.shortName}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '0.92rem',
                                fontWeight: 700,
                                color: '#23170b',
                                marginTop: '6px'
                              }}
                            >
                              Whole sunlit area · {activeSpotObj.directSunPct}%
                              sun
                            </span>
                            <span
                              style={{
                                fontSize: '0.74rem',
                                color: '#3e2b17',
                                marginTop: '2px'
                              }}
                            >
                              {activeSpotObj.benches} · until 14:40
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Floating GPS Locate Button */}
                      <button
                        type="button"
                        onClick={handleGpsLocateMe}
                        title="Center on my GPS location"
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '14px',
                          padding: '7px 12px',
                          borderRadius: '999px',
                          background: '#23170b',
                          color: '#fffdf9',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          boxShadow: '0 6px 16px rgba(35, 23, 11, 0.22)'
                        }}
                      >
                        GPS Locate
                      </button>
                    </div>

                    {/* Bottom Sheet: Step 1 (Nearest First + Pull Up) OR Step 2 (Whole Area Details) */}
                    <div
                      style={{
                        margin: '14px',
                        background: '#fffdf9',
                        borderRadius: '26px',
                        padding: '16px',
                        boxShadow: '0 16px 40px rgba(70, 42, 10, 0.14)',
                        zIndex: 10
                      }}
                    >
                      {sessionMode === 'spot' ? (
                        <div>
                          <div
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: '#df6e00',
                              textTransform: 'uppercase'
                            }}
                          >
                            ● Live Geofence Session · {activeSpotObj.shortName}
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              margin: '8px 0 12px'
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: '0.72rem',
                                  color: '#6b5b4d'
                                }}
                              >
                                Session exposure
                              </div>
                              <div
                                style={{
                                  fontFamily: 'var(--font-serif)',
                                  fontSize: '1.4rem',
                                  fontWeight: 700
                                }}
                              >
                                +15 mins
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div
                                style={{
                                  fontSize: '0.72rem',
                                  color: '#6b5b4d'
                                }}
                              >
                                Weekly bank
                              </div>
                              <div
                                style={{
                                  fontSize: '0.92rem',
                                  fontWeight: 700,
                                  color: '#df6e00'
                                }}
                              >
                                3h 00m · Goal met!
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSessionMode('idle')}
                            style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '999px',
                              background: '#23170b',
                              color: '#fffdf9',
                              fontWeight: 700,
                              fontSize: '0.78rem'
                            }}
                          >
                            End spot session
                          </button>
                        </div>
                      ) : selectedSpotId === null ? (
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              setIsSpotListExpanded(!isSpotListExpanded)
                            }
                            style={{
                              width: '100%',
                              marginBottom: '8px',
                              textAlign: 'center'
                            }}
                          >
                            <div
                              style={{
                                width: '36px',
                                height: '4px',
                                background: '#d4c5ad',
                                borderRadius: '999px',
                                margin: '0 auto 6px'
                              }}
                            />
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.74rem'
                              }}
                            >
                              <span style={{ fontWeight: 700 }}>
                                Nearest sunlit place
                              </span>
                              <span
                                style={{ fontWeight: 700, color: '#df6e00' }}
                              >
                                {isSpotListExpanded
                                  ? '↓ Collapse list'
                                  : '↑ Scroll up for 3 more places'}
                              </span>
                            </div>
                          </button>

                          {/* #1 Nearest Spot Always Shown First */}
                          <div
                            onClick={() => setSelectedSpotId(1)}
                            style={{
                              background: '#f4c842',
                              borderRadius: '18px',
                              padding: '12px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer'
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: '0.7rem',
                                  fontWeight: 700
                                }}
                              >
                                #1 Nearest · 180m · {LODZ_SUNNY_SPOTS[0].sunWindow}
                              </div>
                              <div
                                style={{
                                  fontFamily: 'var(--font-serif)',
                                  fontSize: '0.92rem',
                                  fontWeight: 700,
                                  marginTop: '2px'
                                }}
                              >
                                {LODZ_SUNNY_SPOTS[0].name}
                              </div>
                              <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>
                                {LODZ_SUNNY_SPOTS[0].benches}
                              </div>
                            </div>
                            <span
                              style={{
                                background: '#23170b',
                                color: '#fffdf9',
                                padding: '6px 11px',
                                borderRadius: '999px',
                                fontSize: '0.72rem',
                                fontWeight: 700
                              }}
                            >
                              View area
                            </span>
                          </div>

                          {/* Expandable List of More Nearby Spots */}
                          {isSpotListExpanded && (
                            <div
                              style={{
                                maxHeight: '125px',
                                overflowY: 'auto',
                                marginTop: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px'
                              }}
                            >
                              {LODZ_SUNNY_SPOTS.slice(1).map((spot, idx) => (
                                <div
                                  key={spot.id}
                                  onClick={() => setSelectedSpotId(spot.id)}
                                  style={{
                                    background: '#efe8d8',
                                    borderRadius: '14px',
                                    padding: '10px 12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <div>
                                    <div
                                      style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: '#6b5b4d'
                                      }}
                                    >
                                      {spot.distance} · {spot.sunWindow}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 700
                                      }}
                                    >
                                      {idx + 2}. {spot.name}
                                    </div>
                                  </div>
                                  <span
                                    style={{
                                      fontSize: '0.72rem',
                                      fontWeight: 700,
                                      color: '#df6e00'
                                    }}
                                  >
                                    View ›
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* STEP 2 SHEET: Selected Spot Whole Area Action */
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '6px'
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedSpotId(null)}
                              style={{
                                background: '#efe8d8',
                                padding: '4px 10px',
                                borderRadius: '999px',
                                fontSize: '0.72rem',
                                fontWeight: 700
                              }}
                            >
                              ← All nearby places
                            </button>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#df6e00'
                              }}
                            >
                              {activeSpotObj.distance} ·{' '}
                              {activeSpotObj.sunWindow}
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '0.98rem',
                              fontWeight: 700
                            }}
                          >
                            {activeSpotObj.name}
                          </div>
                          <div
                            style={{
                              fontSize: '0.74rem',
                              color: '#6b5b4d',
                              marginBottom: '10px'
                            }}
                          >
                            {activeSpotObj.benches} · Near{' '}
                            {activeSpotObj.partnerCafe}
                          </div>
                          <button
                            type="button"
                            onClick={() => setSessionMode('spot')}
                            style={{
                              width: '100%',
                              padding: '11px',
                              borderRadius: '999px',
                              background: '#df6e00',
                              color: '#fffdf9',
                              fontWeight: 700,
                              fontSize: '0.8rem'
                            }}
                          >
                            Start soaking in this area
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== PHONE VIEW 3: PURE WEEKLY VOUCHER WALLET ==================== */}
                {activeAppScreen === 'vouchers' && (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '16px',
                      overflowY: 'auto',
                      background: '#fbf6ec'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px'
                      }}
                    >
                      <span
                        style={{
                          background: '#efe8d8',
                          padding: '4px 11px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        ← Home
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.95rem',
                          fontWeight: 700
                        }}
                      >
                        Sunlight bank
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#df6e00'
                        }}
                      >
                        Pure wallet
                      </span>
                    </div>

                    {/* Weekly Bank Summary */}
                    <div
                      style={{
                        background: '#fffdf9',
                        borderRadius: '22px',
                        padding: '16px',
                        marginBottom: '12px',
                        boxShadow: '0 12px 30px rgba(155, 110, 45, 0.07)'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: '#6b5b4d'
                        }}
                      >
                        Verified exposure accumulated this week
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          marginTop: '4px'
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.75rem',
                            fontWeight: 700
                          }}
                        >
                          2h 45m
                        </span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#df6e00'
                          }}
                        >
                          Goal: 3h 00m / week
                        </span>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(7, 1fr)',
                          gap: '5px',
                          marginTop: '12px'
                        }}
                      >
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => (
                          <div
                            key={idx}
                            style={{
                              height: '34px',
                              borderRadius: '999px',
                              background: idx < 5 ? '#df6e00' : '#efe8d8',
                              color: idx < 5 ? '#fffdf9' : '#6b5b4d',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.74rem',
                              fontWeight: 700
                            }}
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dashed Voucher Cards */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      {VOUCHER_WALLET_TIERS.map((v) => (
                        <div
                          key={v.id}
                          style={{
                            background: '#fffdf9',
                            border: '1.5px dashed #e59849',
                            borderRadius: '18px',
                            padding: '13px 15px'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              color: '#df6e00'
                            }}
                          >
                            <span>{v.tier}</span>
                            <span>{v.status === 'unlocked' ? 'Ready' : 'Locked'}</span>
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '0.92rem',
                              fontWeight: 700,
                              marginTop: '3px'
                            }}
                          >
                            {v.cafe}
                          </div>
                          <div
                            style={{
                              fontSize: '0.78rem',
                              color: '#6b5b4d',
                              marginTop: '2px'
                            }}
                          >
                            {v.perk}
                          </div>

                          {v.status === 'unlocked' ? (
                            <button
                              type="button"
                              onClick={() => toggleVoucherRedeem(v.id)}
                              style={{
                                marginTop: '9px',
                                width: '100%',
                                padding: '8px 12px',
                                borderRadius: '999px',
                                background: redeemedCodes[v.id]
                                  ? '#23170b'
                                  : '#df6e00',
                                color: '#fffdf9',
                                fontSize: '0.75rem',
                                fontWeight: 700
                              }}
                            >
                              {redeemedCodes[v.id]
                                ? `Code: ${v.code} (Show at counter)`
                                : `Redeem · code ${v.code}`}
                            </button>
                          ) : (
                            <div
                              style={{
                                fontSize: '0.72rem',
                                color: '#8a7968',
                                marginTop: '6px',
                                fontWeight: 600
                              }}
                            >
                              {v.progressText}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              <div className="eyebrow-orange">
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
                <div className="card-num-tag espresso">
                  Tier 02 · 3 hours / week (Clinical target)
                </div>
                <h3 className="card-serif-title">
                  Free barista coffee or craft matcha
                </h3>
                <p className="card-body-text espresso-muted">
                  Our core weekly target (~25 mins of verified outdoor daylight
                  per day) proven to combat Winter Blues and Seasonal Affective
                  Disorder.
                </p>
              </div>
              <div
                className="dashed-voucher-pill"
                style={{ borderColor: '#23170b' }}
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

      {/* ==================== SECTION 5: BURNT-ORANGE WAITLIST BANNER ==================== */}
      <section id="waitlist" className="cta-banner-wrap">
        <div className="container">
          <div className="cta-burnt-orange-card">
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.15rem, 3.8vw, 3.1rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '10px'
              }}
            >
              Chase the light this week.
            </h2>
            <p
              style={{
                fontSize: '1.06rem',
                color: 'rgba(255, 253, 249, 0.92)'
              }}
            >
              Be first to try LumosWalk in Łódź — or partner your local café.
            </p>

            {waitlistJoined ? (
              <div
                style={{
                  display: 'inline-block',
                  marginTop: '28px',
                  background: '#23170b',
                  color: '#fffdf9',
                  padding: '16px 30px',
                  borderRadius: '999px',
                  fontSize: '0.96rem',
                  fontWeight: 600
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
                  className="pill-btn pill-btn-lg pill-btn-espresso"
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
