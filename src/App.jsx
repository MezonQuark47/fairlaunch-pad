import { useState, useEffect, useRef } from 'react';

const FairLaunchPad = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [ethosScore, setEthosScore] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({ days: 2, hours: 14, mins: 32, secs: 45 });
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; mins = 0; secs = 0; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const generateMockWallet = () => {
    const chars = '0123456789abcdef';
    let addr = '0x';
    for (let i = 0; i < 40; i++) {
      addr += chars[Math.floor(Math.random() * chars.length)];
    }
    return addr;
  };

  const connectWallet = () => {
    const addr = generateMockWallet();
    setWalletAddress(addr);
    setWalletConnected(true);
  };

  const checkEthosScore = () => {
    setIsChecking(true);
    setShowResult(false);
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 3000);
      setEthosScore(mockScore);
      setIsChecking(false);
      setTimeout(() => setShowResult(true), 200);
    }, 2800);
  };

  const getTier = () => {
    if (ethosScore > 2000) return 'tier1';
    if (ethosScore > 500) return 'tier2';
    return 'rejected';
  };

  const resetDemo = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setEthosScore(null);
    setShowResult(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; }
        
        :root {
          --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --gradient-gold: linear-gradient(135deg, #f5af19 0%, #f12711 100%);
          --glass: rgba(255, 255, 255, 0.03);
          --glass-border: rgba(255, 255, 255, 0.08);
          --text-primary: #ffffff;
          --text-secondary: rgba(255, 255, 255, 0.6);
          --text-muted: rgba(255, 255, 255, 0.4);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes scoreCount {
          from { opacity: 0; transform: scale(0.5) rotateX(90deg); }
          to { opacity: 1; transform: scale(1) rotateX(0); }
        }

        @keyframes borderRotate {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.4)); }
          50% { filter: drop-shadow(0 0 40px rgba(102, 126, 234, 0.8)); }
        }

        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 32px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }

        .btn-primary {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          padding: 20px 48px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: white;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Space Grotesk', sans-serif;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
          padding: 18px 40px;
          font-size: 14px;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Space Grotesk', sans-serif;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.4);
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255,255,255,0.06);
          transform: translateY(-4px);
        }

        .tier-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tier-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(135deg, var(--tier-color-1), var(--tier-color-2));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(102, 126, 234, 0.1);
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .progress-bar {
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
          animation: shimmer 2s linear infinite;
          background-size: 200% 100%;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(102, 126, 234, 0.15);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          color: #a5b4fc;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(255,255,255,0.05);
        }
      `}</style>

      {/* Ambient Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 15s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite'
        }} />
        
        {/* Grid Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }} />

        {/* Noise Texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
          }}>⚡</div>
          <span style={{
            fontSize: '20px',
            fontWeight: '600',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.5px'
          }}>FairLaunch</span>
          <span className="tag" style={{ marginLeft: '8px' }}>BETA</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }}>How It Works</a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }}>Documentation</a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }}>About Ethos</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 12px rgba(34, 197, 94, 0.6)'
          }} />
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Mainnet Live</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 80px'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '100px',
            marginBottom: '32px'
          }}>
            <span style={{ fontSize: '14px' }}>🛡️</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#a5b4fc' }}>Bot Protection Powered by Ethos Network</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: '700',
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: '1.05',
            letterSpacing: '-2px',
            marginBottom: '24px'
          }}>
            <span style={{ color: '#fff' }}>Fair Launches for</span>
            <br />
            <span className="gradient-text">Real Humans</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '520px',
            margin: '0 auto 40px',
            lineHeight: '1.7',
            fontWeight: '400'
          }}>
            Stop bots from sniping your allocation. Ethos-powered verification ensures genuine community members get priority access to NFT drops.
          </p>

          {/* Stats Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginBottom: '48px'
          }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>12,847</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Wallets Verified</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>847</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Bots Blocked</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>$2.4M</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Protected Value</div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="glass-card"
          style={{
            maxWidth: '800px',
            margin: '0 auto 64px',
            padding: '48px',
            position: 'relative'
          }}
        >
          {/* Mouse follow gradient */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            pointerEvents: 'none',
            transition: 'all 0.3s ease-out',
            filter: 'blur(40px)'
          }} />

          {/* Collection Info */}
          <div style={{
            display: 'flex',
            gap: '28px',
            marginBottom: '40px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '56px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              🎵
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '6px',
                marginBottom: '12px'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Minting Soon</span>
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                fontFamily: "'Space Grotesk', sans-serif",
                marginBottom: '8px',
                letterSpacing: '-0.5px'
              }}>Moonveil Genesis</h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
                1,000 unique audio-visual NFTs for true music lovers
              </p>
              
              {/* Countdown */}
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { val: countdown.days, label: 'Days' },
                  { val: countdown.hours, label: 'Hours' },
                  { val: countdown.mins, label: 'Mins' },
                  { val: countdown.secs, label: 'Secs' }
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: '700',
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: '6px'
                    }}>{String(item.val).padStart(2, '0')}</div>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mint Info Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 24px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '16px',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1
          }}>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Price</div>
              <div style={{ fontSize: '18px', fontWeight: '600', fontFamily: "'Space Grotesk', sans-serif" }}>0.08 ETH</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Supply</div>
              <div style={{ fontSize: '18px', fontWeight: '600', fontFamily: "'Space Grotesk', sans-serif" }}>1,000</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Minted</div>
              <div style={{ fontSize: '18px', fontWeight: '600', fontFamily: "'Space Grotesk', sans-serif" }}>0 / 1,000</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Network</div>
              <div style={{ fontSize: '18px', fontWeight: '600', fontFamily: "'Space Grotesk', sans-serif" }}>Ethereum</div>
            </div>
          </div>

          {/* Connection Flow */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {!walletConnected ? (
              <div style={{ textAlign: 'center' }}>
                <button className="btn-primary" onClick={connectWallet}>
                  Connect Wallet
                </button>
                <p style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  Connect to check your eligibility tier
                </p>
              </div>
            ) : ethosScore === null ? (
              <div style={{ textAlign: 'center', animation: 'fadeInUp 0.5s ease-out' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 24px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '12px',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 12px rgba(34, 197, 94, 0.6)'
                  }} />
                  <span style={{ fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.8)' }}>
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>

                {!isChecking ? (
                  <>
                    <button className="btn-secondary" onClick={checkEthosScore}>
                      ⚡ Verify Ethos Score
                    </button>
                    <p style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                      Analyze your on-chain reputation
                    </p>
                  </>
                ) : (
                  <div style={{ padding: '20px 0' }}>
                    <div className="spinner" style={{ margin: '0 auto 24px' }} />
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                      Scanning blockchain activity...
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                      Analyzing transactions, interactions & reputation signals
                    </p>
                    <div className="progress-bar" style={{ maxWidth: '300px', margin: '24px auto 0' }}>
                      <div className="progress-fill" style={{ width: '60%' }} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ 
                animation: showResult ? 'fadeInUp 0.5s ease-out' : 'none',
                opacity: showResult ? 1 : 0
              }}>
                {/* Score Display */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                    Your Ethos Score
                  </div>
                  <div style={{
                    fontSize: '72px',
                    fontWeight: '800',
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '-2px',
                    animation: 'scoreCount 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: getTier() === 'tier1' 
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
                      : getTier() === 'tier2'
                      ? 'linear-gradient(135deg, #667eea, #764ba2)'
                      : 'linear-gradient(135deg, #ef4444, #dc2626)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {ethosScore.toLocaleString()}
                  </div>
                </div>

                {/* Tier Results */}
                {getTier() === 'tier1' && (
                  <div className="tier-card" style={{
                    '--tier-color-1': '#fbbf24',
                    '--tier-color-2': '#f59e0b',
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>👑</div>
                    <h3 style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#fbbf24',
                      marginBottom: '12px'
                    }}>TIER 1: VIP ACCESS</h3>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                      Guaranteed Allocation + <strong style={{ color: '#fbbf24' }}>50% Discount</strong>
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <span className="tag" style={{ background: 'rgba(251, 191, 36, 0.15)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#fbbf24' }}>✓ Priority Mint</span>
                      <span className="tag" style={{ background: 'rgba(251, 191, 36, 0.15)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#fbbf24' }}>✓ 0.04 ETH</span>
                      <span className="tag" style={{ background: 'rgba(251, 191, 36, 0.15)', borderColor: 'rgba(251, 191, 36, 0.3)', color: '#fbbf24' }}>✓ Max 3 NFTs</span>
                    </div>
                  </div>
                )}

                {getTier() === 'tier2' && (
                  <div className="tier-card" style={{
                    '--tier-color-1': '#667eea',
                    '--tier-color-2': '#764ba2',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
                    <h3 style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#a5b4fc',
                      marginBottom: '12px'
                    }}>TIER 2: VERIFIED</h3>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                      FCFS Access (First Come, First Served)
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <span className="tag">✓ Public Sale</span>
                      <span className="tag">✓ 0.08 ETH</span>
                      <span className="tag">✓ Max 2 NFTs</span>
                    </div>
                  </div>
                )}

                {getTier() === 'rejected' && (
                  <div className="tier-card" style={{
                    '--tier-color-1': '#ef4444',
                    '--tier-color-2': '#dc2626',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🤖</div>
                    <h3 style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: '#f87171',
                      marginBottom: '12px'
                    }}>NOT ELIGIBLE</h3>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                      Bot Activity Detected or Insufficient History
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', margin: '0 auto' }}>
                      Your wallet shows patterns consistent with automated behavior. Build your on-chain reputation to gain access.
                    </p>
                  </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <button
                    onClick={resetDemo}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: '8px 16px'
                    }}
                  >
                    ↺ Try Different Wallet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tier Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto 80px'
        }}>
          {[
            { icon: '👑', title: 'Tier 1', range: '> 2,000', perks: 'Guaranteed + 50% off', color: '#fbbf24' },
            { icon: '✅', title: 'Tier 2', range: '500 - 2,000', perks: 'FCFS Access', color: '#a5b4fc' },
            { icon: '🤖', title: 'Rejected', range: '< 500', perks: 'Bot Detected', color: '#f87171' }
          ].map((tier, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{tier.icon}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: tier.color, marginBottom: '4px' }}>{tier.title}</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Score {tier.range}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{tier.perks}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: '16px'
            }}>How It Works</h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>
              Powered by Ethos Network's on-chain reputation system
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            {[
              { num: '01', title: 'Connect Wallet', desc: 'Link your wallet to begin verification' },
              { num: '02', title: 'Score Analysis', desc: 'Ethos scans your on-chain activity & reputation' },
              { num: '03', title: 'Access Granted', desc: 'Get tiered access based on your score' }
            ].map((step, i) => (
              <div key={i} className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '16px'
                }}>{step.num}</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{step.title}</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        padding: '32px 48px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Built for</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.6)' }}>Ethos Vibeathon 2025</span>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          Protecting real communities from bot manipulation
        </div>
      </footer>
    </div>
  );
};

export default FairLaunchPad;
