import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Code2, 
  Trophy, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Zap, 
  Award,
  Target,
  Rocket,
  BookOpen,
  BarChart3,
  Terminal,
  ArrowRight,
  Star,
  Shield,
  Cpu,
  Globe,
  Lightbulb
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Code2 size={40} />,
      title: 'Multi-Language Support',
      description: 'Write code in C++, Java, Python, or JavaScript with our powerful Monaco code editor.',
      color: '#667eea'
    },
    {
      icon: <Zap size={40} />,
      title: 'Instant Feedback',
      description: 'Get immediate results with detailed test case execution and comprehensive verdicts.',
      color: '#f59e0b'
    },
    {
      icon: <Trophy size={40} />,
      title: 'Competitive Leaderboard',
      description: 'Compete with developers worldwide and climb the global rankings.',
      color: '#10b981'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Track Your Progress',
      description: 'Monitor improvement with detailed statistics, charts, and performance analytics.',
      color: '#3b82f6'
    },
    {
      icon: <Shield size={40} />,
      title: 'Secure Execution',
      description: 'Docker-based isolated code execution ensures safety and reliability.',
      color: '#8b5cf6'
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'Smart Analytics',
      description: 'Get personalized tips and recommendations based on your performance.',
      color: '#ec4899'
    }
  ];

  const languages = [
    { name: 'C++', icon: '⚡', color: '#00599C' },
    { name: 'Java', icon: '☕', color: '#ED8B00' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'JavaScript', icon: '🟨', color: '#F7DF1E' }
  ];

  const stats = [
    { label: 'Coding Problems', value: '1000+', icon: <BookOpen /> },
    { label: 'Active Users', value: '10K+', icon: <Users /> },
    { label: 'Languages', value: '4', icon: <Terminal /> },
    { label: 'Submissions', value: '100K+', icon: <CheckCircle /> }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      text: 'This platform helped me prepare for my tech interviews. The instant feedback and comprehensive problems are outstanding!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CS Student',
      text: 'The personalized tips and progress tracking keep me motivated. I\'ve solved over 200 problems and counting!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Full Stack Developer',
      text: 'Love the multi-language support and the competitive leaderboard. It makes learning fun and engaging!',
      rating: 5
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={16} />
              <span>Trusted by 10,000+ developers</span>
            </div>
            <h1 className="hero-title">
              Master Coding Through
              <span className="gradient-text"> Practice & Competition</span>
            </h1>
            <p className="hero-subtitle">
              Elevate your programming skills with our comprehensive platform. 
              Solve challenging problems, compete with peers, and prepare for your dream job.
            </p>
            <div className="hero-buttons">
              {isAuthenticated ? (
                <>
                  <Link to="/problems" className="btn btn-primary btn-hero">
                    <Rocket size={20} />
                    Browse Problems
                  </Link>
                  <Link to="/dashboard" className="btn btn-secondary btn-hero">
                    <BarChart3 size={20} />
                    View Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-hero">
                    <Rocket size={20} />
                    Start Free Today
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-hero">
                    Sign In
                  </Link>
                </>
              )}
            </div>
            
            {/* Language Tags */}
            <div className="language-tags">
              {languages.map((lang, index) => (
                <div key={index} className="language-tag" style={{ borderColor: lang.color }}>
                  <span className="lang-icon">{lang.icon}</span>
                  <span className="lang-name">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="hero-visual">
            <div className="code-window">
              <div className="code-window-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="window-title">solution.py</div>
              </div>
              <div className="code-window-body">
                <pre className="code-snippet">
{`def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`}
                </pre>
              </div>
            </div>
            <div className="verdict-badge verdict-accepted">
              <CheckCircle size={20} />
              <span>All Test Cases Passed!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid-home">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card-home">
                <div className="stat-icon-home">{stat.icon}</div>
                <div className="stat-value-home">{stat.value}</div>
                <div className="stat-label-home">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header-home">
            <span className="section-badge">Features</span>
            <h2 className="section-title-home">Everything You Need to Excel</h2>
            <p className="section-subtitle-home">
              Powerful tools and features designed to accelerate your learning journey
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-modern" style={{ background: `${feature.color}15`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header-home">
            <span className="section-badge">How It Works</span>
            <h2 className="section-title-home">Start Coding in 3 Simple Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon-circle">
                <Users size={32} />
              </div>
              <h3>Create Your Account</h3>
              <p>Sign up for free and verify your email to get started</p>
            </div>

            <div className="step-connector"></div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon-circle">
                <Target size={32} />
              </div>
              <h3>Choose a Problem</h3>
              <p>Browse our extensive library and pick challenges that match your level</p>
            </div>

            <div className="step-connector"></div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon-circle">
                <Award size={32} />
              </div>
              <h3>Code & Compete</h3>
              <p>Write your solution, submit, and climb the leaderboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header-home">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title-home">Loved by Developers Worldwide</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <Cpu size={48} />
            </div>
            <h2>Ready to Level Up Your Coding Skills?</h2>
            <p>Join thousands of developers improving their programming skills every day</p>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-primary btn-hero">
                Create Free Account
                <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>
      </section>
      <div class="footer">
        <p>&copy; 2026 Anmol Tiwari | All Rights Reserved CopyRight 2026</p>
        
    </div>
    </div>
  );
};

export default Home;
