import { useState, useEffect, useRef } from 'react';

const FairLaunchPad = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [ethosScore, setEthosScore] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({ days: 2, hours: 14, mins: 32, secs: 45 });
  const [activeModal, setActiveModal] = useState(null); // 'wallet', 'docs', 'about', or null
  const cardRef = useRef(null);
  const howItWorksRef = useRef(null);

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

  const connectWallet = (type) => {
    const addr = generateMockWallet();
    setWalletAddress(addr);
    setWalletType(type);
    setWalletConnected(true);
    setActiveModal(null);
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
    setWalletType('');
    setEthosScore(null);
    setShowResult(false);
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => setActiveModal(null);

  const wallets = [
    { name: 'MetaMask', icon: '🦊', color: '#E2761B', desc: 'Connect using MetaMask' },
    { name: 'WalletConnect', icon: '🔗', color: '#3B99FC', desc: 'Scan with WalletConnect' },
    { name: 'Coinbase Wallet', icon: '💰', color: '#0052FF', desc: 'Connect using Coinbase' },
    { name: 'Phantom', icon: '👻', color: '#AB9FF2', desc: 'Connect using Phantom' },
  ];

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
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
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

        .nav-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
        }

        .nav-link:hover {
          color: #fff;
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
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(102, 126, 234, 0.1);
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
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

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(30,20,40,0.95) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 32px;
          max-width: 420px;
          width: 90%;
        }

        .modal-close {
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          color: #fff;
          cursor: pointer;
          font-size: 18px;
        }

        .wallet-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #fff;
          text-align: left;
        }

        .wallet-btn:hover {
          background: rgba(255,255,255,0.08);
          transform: translateX(4px);
        }
      `}</style>

      {/* Single Modal Container */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" style={{ maxWidth: activeModal === 'wallet' ? '420px' : '600px', padding: activeModal === 'wallet' ? '32px' : '40px' }} onClick={e => e.stopPropagation()}>
            
            {/* Wallet Modal */}
            {activeModal === 'wallet' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', fontFamily: "'Space Grotesk', sans-serif" }}>Connect Wallet</h3>
                  <button className="modal-close" onClick={closeModal}>×</button>
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
                  Choose your preferred wallet to connect
                </p>
                {wallets.map((wallet, i) => (
                  <button
                    key={i}
                    className="wallet-btn"
                    onClick={() => connectWallet(wallet.name)}
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    onMouseOver={e => e.currentTarget.style.borderColor = wallet.color}
                    onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${wallet.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>{wallet.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}>{wallet.name}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{wallet.desc}</div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px' }}>→</div>
                  </button>
                ))}
              </>
            )}

            {/* Documentation Modal */}
            {activeModal === 'docs' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>📚 Documentation</h3>
                  <button className="modal-close" onClick={closeModal}>×</button>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#a5b4fc', marginBottom: '12px' }}>🔧 Integration Guide</h4>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '16px' }}>
                    FairLaunch Pad uses Ethos Network's API to verify wallet reputation scores. 
                    Integrate our SDK to protect your NFT launches from bot attacks.
                  </p>
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    padding: '16px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    color: '#a5b4fc'
                  }}>
                    npm install @fairlaunch/sdk
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#a5b4fc', marginBottom: '12px' }}>📊 Scoring Algorithm</h4>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}>
                    Ethos analyzes 50+ on-chain signals including transaction history, wallet age, 
                    DeFi interactions, NFT holdings, and social connections.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#a5b4fc', marginBottom: '12px' }}>🎯 Tier Thresholds</h4>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px' }}>
                      <span style={{ color: '#fbbf24' }}>👑 Tier 1 (VIP)</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Score &gt; 2,000</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px' }}>
                      <span style={{ color: '#a5b4fc' }}>✅ Tier 2 (Verified)</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Score 500 - 2,000</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                      <span style={{ color: '#f87171' }}>🤖 Rejected</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Score &lt; 500</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* About Ethos Modal */}
            {activeModal === 'about' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>🌐 About Ethos Network</h3>
                  <button className="modal-close" onClick={closeModal}>×</button>
                </div>
                
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  margin: '0 auto 24px',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
                }}>⚡</div>

                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', textAlign: 'center', marginBottom: '24px' }}>
                  <strong style={{ color: '#fff' }}>Ethos Network</strong> is the reputation layer for Web3. 
                  We analyze on-chain activity to create trust scores that help protocols 
                  distinguish genuine users from bots and bad actors.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#a5b4fc', fontFamily: "'Space Grotesk', sans-serif" }}>50M+</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Wallets Scored</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#a5b4fc', fontFamily: "'Space Grotesk', sans-serif" }}>200+</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Partners</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#a5b4fc', fontFamily: "'Space Grotesk', sans-serif" }}>99.2%</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Bot Detection</div>
                  </div>
                </div>

                <a 
                  href="https://ethos.network" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Visit Ethos Network →
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* Ambient Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
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
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
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
          <button className="nav-link" onClick={scrollToHowItWorks}>How It Works</button>
          <button className="nav-link" onClick={() => setActiveModal('docs')}>Documentation</button>
          <button className="nav-link" onClick={() => setActiveModal('about')}>About Ethos</button>
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
                <button className="btn-primary" onClick={() => setActiveModal('wallet')}>
                  Connect Wallet
                </button>
                <p style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  Connect to check your eligibility tier
                </p>
              </div>
            ) : ethosScore === null ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 24px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '12px',
                  marginBottom: '16px'
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
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    {walletType}
                  </span>
                </div>

                {!isChecking ? (
                  <>
                    <div>
                      <button className="btn-secondary" onClick={checkEthosScore}>
                        ⚡ Verify Ethos Score
                      </button>
                    </div>
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
              <div style={{ opacity: showResult ? 1 : 0, transition: 'opacity 0.3s' }}>
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
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                    border: '2px solid rgba(251, 191, 36, 0.3)'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>👑</div>
                    <h3 style={{ fontSize: '28px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", color: '#fbbf24', marginBottom: '12px' }}>
                      TIER 1: VIP ACCESS
                    </h3>
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
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
                    border: '2px solid rgba(102, 126, 234, 0.3)'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
                    <h3 style={{ fontSize: '28px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", color: '#a5b4fc', marginBottom: '12px' }}>
                      TIER 2: VERIFIED
                    </h3>
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
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
                    border: '2px solid rgba(239, 68, 68, 0.3)'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🤖</div>
                    <h3 style={{ fontSize: '28px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", color: '#f87171', marginBottom: '12px' }}>
                      NOT ELIGIBLE
                    </h3>
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
        <div ref={howItWorksRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '16px' }}>
              How It Works
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>
              Powered by Ethos Network's on-chain reputation system
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
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
