import { useEffect, useMemo, useState, type ReactNode } from 'react'

type IconName =
  | 'home'
  | 'book'
  | 'mic'
  | 'compass'
  | 'chart'
  | 'user'
  | 'arrow'
  | 'arrowUp'
  | 'back'
  | 'bell'
  | 'search'
  | 'spark'
  | 'headphones'
  | 'pen'
  | 'volume'
  | 'play'
  | 'check'
  | 'lock'
  | 'chevron'
  | 'clock'
  | 'bolt'
  | 'target'
  | 'grid'
  | 'settings'
  | 'download'
  | 'shield'
  | 'help'
  | 'close'
  | 'more'
  | 'globe'
  | 'message'
  | 'sliders'
  | 'refresh'

type Screen = 'welcome' | 'onboarding' | 'home' | 'learn' | 'practice' | 'immerse' | 'progress' | 'profile' | 'lesson'
type Skill = 'read' | 'write' | 'speak'
type Language = 'Korean' | 'Japanese' | 'Mandarin'

const languages: Array<{ name: Language; script: string; native: string; note: string }> = [
  { name: 'Korean', script: 'Hangul', native: '한국어', note: 'Script, sound, and everyday conversation' },
  { name: 'Japanese', script: 'Hiragana first', native: '日本語', note: 'Reading foundations and situational language' },
  { name: 'Mandarin', script: 'Pinyin + characters', native: '中文', note: 'Tones, characters, and real-world speech' },
]

const navItems: Array<{ id: Exclude<Screen, 'welcome' | 'onboarding' | 'lesson'>; label: string; icon: IconName }> = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'learn', label: 'Learn', icon: 'book' },
  { id: 'practice', label: 'Practise', icon: 'mic' },
  { id: 'immerse', label: 'Immerse', icon: 'compass' },
  { id: 'progress', label: 'Progress', icon: 'chart' },
  { id: 'profile', label: 'Profile', icon: 'user' },
]

const screenTitles: Record<Screen, string> = {
  welcome: 'Welcome',
  onboarding: 'Start your path',
  home: 'Today',
  learn: 'Your path',
  practice: 'Practice studio',
  immerse: 'Immersion world',
  progress: 'Your evidence',
  profile: 'Profile',
  lesson: 'Lesson player',
}

function Icon({ name, size = 18, strokeWidth = 1.8, className = '' }: { name: IconName; size?: number; strokeWidth?: number; className?: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  const paths: Record<IconName, ReactNode> = {
    home: <><path {...common} d="m3 10 9-7 9 7" /><path {...common} d="M5.5 9.5v10h13v-10M9.5 19.5v-6h5v6" /></>,
    book: <><path {...common} d="M4 5.2A2.2 2.2 0 0 1 6.2 3H20v16H6.2A2.2 2.2 0 0 0 4 21.2z" /><path {...common} d="M4 5.2v16M8 7h8M8 11h7" /></>,
    mic: <><rect {...common} x="8" y="3" width="8" height="12" rx="4" /><path {...common} d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
    compass: <><circle {...common} cx="12" cy="12" r="9" /><path {...common} d="m15.5 8.5-2 5-5 2 2-5z" /></>,
    chart: <><path {...common} d="M4 19V5M4 19h16" /><path {...common} d="m7 15 3-4 3 2 5-7" /><circle {...common} cx="7" cy="15" r=".7" /><circle {...common} cx="10" cy="11" r=".7" /><circle {...common} cx="13" cy="13" r=".7" /><circle {...common} cx="18" cy="6" r=".7" /></>,
    user: <><circle {...common} cx="12" cy="8" r="3.5" /><path {...common} d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
    arrow: <><path {...common} d="M4 12h16M14 6l6 6-6 6" /></>,
    arrowUp: <><path {...common} d="M12 20V4M6 10l6-6 6 6" /></>,
    back: <><path {...common} d="M19 12H5M11 18l-6-6 6-6" /></>,
    bell: <><path {...common} d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    search: <><circle {...common} cx="10.8" cy="10.8" r="6.8" /><path {...common} d="m16 16 4.5 4.5" /></>,
    spark: <><path {...common} d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" /><path {...common} d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" /></>,
    headphones: <><path {...common} d="M4 14v-2a8 8 0 0 1 16 0v2" /><path {...common} d="M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1z" /></>,
    pen: <><path {...common} d="m4 20 4.2-1 9.7-9.7a2.1 2.1 0 0 0-3-3L5.2 16zM13.5 7.5l3 3" /></>,
    volume: <><path {...common} d="M4 10v4h4l5 4V6l-5 4z" /><path {...common} d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11" /></>,
    play: <><path {...common} d="m8 5 11 7-11 7z" /></>,
    check: <><path {...common} d="m5 12 4.5 4.5L19 7" /></>,
    lock: <><rect {...common} x="5" y="10" width="14" height="10" rx="2" /><path {...common} d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    chevron: <path {...common} d="m8 10 4 4 4-4" />,
    clock: <><circle {...common} cx="12" cy="12" r="8.5" /><path {...common} d="M12 7v5l3 2" /></>,
    bolt: <path {...common} d="m13 2-8 12h6l-1 8 8-12h-6z" />,
    target: <><circle {...common} cx="12" cy="12" r="8.5" /><circle {...common} cx="12" cy="12" r="4.5" /><circle {...common} cx="12" cy="12" r="1" /></>,
    grid: <><rect {...common} x="4" y="4" width="6" height="6" rx="1" /><rect {...common} x="14" y="4" width="6" height="6" rx="1" /><rect {...common} x="4" y="14" width="6" height="6" rx="1" /><rect {...common} x="14" y="14" width="6" height="6" rx="1" /></>,
    settings: <><circle {...common} cx="12" cy="12" r="3" /><path {...common} d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-1.8 1.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.7v.2h-2.6v-.2a1.8 1.8 0 0 0-1.1-1.7 1.8 1.8 0 0 0-2 .4l-.1.1-1.8-1.8.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.7-1.1H6v-2.6h.2a1.8 1.8 0 0 0 1.7-1.1 1.8 1.8 0 0 0-.4-2l-.1-.1 1.8-1.8.1.1a1.8 1.8 0 0 0 2 .4 1.8 1.8 0 0 0 1.1-1.7V5h2.6v.2a1.8 1.8 0 0 0 1.1 1.7 1.8 1.8 0 0 0 2-.4l.1-.1 1.8 1.8-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.7 1.1h.2v2.6h-.2a1.8 1.8 0 0 0-1.7 1Z" /></>,
    download: <><path {...common} d="M12 4v10M8 11l4 4 4-4M5 19h14" /></>,
    shield: <><path {...common} d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path {...common} d="m9 12 2 2 4-4" /></>,
    help: <><circle {...common} cx="12" cy="12" r="9" /><path {...common} d="M9.6 9a2.5 2.5 0 1 1 4 2c-1.1.7-1.6 1.2-1.6 2.2M12 16.5h.01" /></>,
    close: <><path {...common} d="m6 6 12 12M18 6 6 18" /></>,
    more: <><circle fill="currentColor" cx="5" cy="12" r="1" /><circle fill="currentColor" cx="12" cy="12" r="1" /><circle fill="currentColor" cx="19" cy="12" r="1" /></>,
    globe: <><circle {...common} cx="12" cy="12" r="9" /><path {...common} d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    message: <><path {...common} d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 12.5z" /><path {...common} d="M8 8h8M8 11h5" /></>,
    sliders: <><path {...common} d="M4 6h16M4 12h16M4 18h16" /><circle {...common} cx="9" cy="6" r="2" /><circle {...common} cx="15" cy="12" r="2" /><circle {...common} cx="11" cy="18" r="2" /></>,
    refresh: <><path {...common} d="M20 11a8 8 0 0 0-14.5-4L4 9" /><path {...common} d="M4 4v5h5M4 13a8 8 0 0 0 14.5 4L20 15" /><path {...common} d="M20 20v-5h-5" /></>,
  }

  return <svg aria-hidden="true" className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>
}

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`logo-mark ${small ? 'logo-mark-small' : ''}`} aria-hidden="true">
      <span className="logo-core" />
      <span className="logo-orbit logo-orbit-one" />
      <span className="logo-orbit logo-orbit-two" />
    </span>
  )
}

function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo-lockup ${compact ? 'logo-lockup-compact' : ''}`}>
      <LogoMark small={compact} />
      <span className="logo-word">Lingo<span>Lume</span></span>
    </span>
  )
}

function Button({ children, variant = 'primary', icon, onClick, type = 'button', className = '', disabled = false }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'dark'; icon?: IconName; onClick?: () => void; type?: 'button' | 'submit'; className?: string; disabled?: boolean }) {
  return (
    <button type={type} className={`button button-${variant} ${className}`} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={16} />}
    </button>
  )
}

function Pill({ children, tone = 'muted', icon }: { children: ReactNode; tone?: 'muted' | 'cyan' | 'coral' | 'green' | 'dark'; icon?: IconName }) {
  return <span className={`pill pill-${tone}`}>{icon && <Icon name={icon} size={13} />}{children}</span>
}

function ProgressRing({ value, size = 62, label }: { value: number; size?: number; label?: string }) {
  const radius = 25
  const circumference = 2 * Math.PI * radius
  const dash = `${(value / 100) * circumference} ${circumference}`
  return (
    <div className="progress-ring-wrap" style={{ width: size, height: size }}>
      <svg className="progress-ring" viewBox="0 0 60 60" width={size} height={size}>
        <circle className="progress-ring-track" cx="30" cy="30" r={radius} />
        <circle className="progress-ring-value" cx="30" cy="30" r={radius} strokeDasharray={dash} />
      </svg>
      <span className="progress-ring-label">{label ?? `${value}%`}</span>
    </div>
  )
}

function Waveform({ color = 'cyan' }: { color?: 'cyan' | 'coral' }) {
  const bars = [18, 32, 23, 42, 28, 50, 34, 25, 46, 31, 21, 38, 27, 44, 19, 33, 23, 39, 29, 20, 42, 25, 34, 18, 29]
  return <span className={`waveform waveform-${color}`}>{bars.map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%` }} />)}</span>
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Korean')
  const [selectedGoal, setSelectedGoal] = useState('Travel with confidence')
  const [dailyMinutes, setDailyMinutes] = useState('10 min')
  const [exerciseMode, setExerciseMode] = useState<Skill>('read')
  const [lessonAnswer, setLessonAnswer] = useState<string | null>(null)
  const [lessonComplete, setLessonComplete] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    document.title = `LingoLume — ${screenTitles[screen]}`
  }, [screen])

  const activeScreen = screen === 'lesson' ? 'learn' : screen
  const selectedLanguageData = languages.find((language) => language.name === selectedLanguage) ?? languages[0]

  const flash = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const goTo = (next: Screen) => {
    setScreen(next)
    if (next !== 'lesson') {
      setLessonAnswer(null)
      setLessonComplete(false)
    }
  }

  const startOnboarding = () => {
    setOnboardingStep(0)
    setScreen('onboarding')
  }

  const continueOnboarding = () => {
    if (onboardingStep < 3) {
      setOnboardingStep((step) => step + 1)
    } else {
      goTo('home')
      flash('Your first learning plan is ready.')
    }
  }

  const answerLesson = (answer: string) => {
    setLessonAnswer(answer)
    if (answer === 'greeting') {
      flash('That is the polite greeting for a first meeting.')
    }
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen goTo={goTo} setShowPaywall={setShowPaywall} />
      case 'learn': return <LearnScreen goTo={goTo} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      case 'practice': return <PracticeScreen goTo={goTo} setShowPaywall={setShowPaywall} flash={flash} />
      case 'immerse': return <ImmerseScreen goTo={goTo} setShowPaywall={setShowPaywall} />
      case 'progress': return <ProgressScreen />
      case 'profile': return <ProfileScreen goTo={goTo} startOnboarding={startOnboarding} openWelcome={() => goTo('welcome')} setShowPaywall={setShowPaywall} flash={flash} />
      case 'lesson': return <LessonScreen goTo={goTo} exerciseMode={exerciseMode} setExerciseMode={setExerciseMode} lessonAnswer={lessonAnswer} answerLesson={answerLesson} lessonComplete={lessonComplete} setLessonComplete={setLessonComplete} />
      default: return <HomeScreen goTo={goTo} setShowPaywall={setShowPaywall} />
    }
  }

  if (screen === 'welcome') {
    return <WelcomeScreen startOnboarding={startOnboarding} goTo={goTo} />
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen step={onboardingStep} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} dailyMinutes={dailyMinutes} setDailyMinutes={setDailyMinutes} selectedLanguageData={selectedLanguageData} continueOnboarding={continueOnboarding} goTo={goTo} />
  }

  return (
    <div className="app-shell">
      <Sidebar activeScreen={activeScreen as Exclude<Screen, 'welcome' | 'onboarding' | 'lesson'>} goTo={goTo} />
      <div className="app-stage">
        <Topbar screen={screen} goTo={goTo} />
        <main className="content-area">{renderScreen()}</main>
        <MobileNav activeScreen={activeScreen as Exclude<Screen, 'welcome' | 'onboarding' | 'lesson'>} goTo={goTo} />
      </div>
      {showPaywall && <PaywallModal close={() => setShowPaywall(false)} />}
      {toast && <div className="toast"><span className="toast-icon"><Icon name="check" size={15} /></span>{toast}</div>}
    </div>
  )
}

function Sidebar({ activeScreen, goTo }: { activeScreen: Exclude<Screen, 'welcome' | 'onboarding' | 'lesson'>; goTo: (next: Screen) => void }) {
  return (
    <aside className="sidebar">
      <button className="brand-button" onClick={() => goTo('home')} aria-label="Go to LingoLume home"><LogoLockup /></button>
      <div className="sidebar-label">Your learning space</div>
      <nav className="side-nav" aria-label="Primary navigation">
        {navItems.map((item) => <NavItem key={item.id} item={item} active={activeScreen === item.id} onClick={() => goTo(item.id)} />)}
      </nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-streak">
        <span className="streak-glow"><Icon name="bolt" size={17} /></span>
        <div><strong>12 day rhythm</strong><span>Keep the light on.</span></div>
        <Icon name="chevron" size={15} />
      </div>
      <div className="sidebar-user">
        <span className="avatar avatar-small">M</span>
        <div><strong>Mara Okafor</strong><span>Beginner · 한국어</span></div>
        <button className="icon-button subtle" aria-label="Open profile" onClick={() => goTo('profile')}><Icon name="more" size={16} /></button>
      </div>
    </aside>
  )
}

function NavItem({ item, active, onClick }: { item: { id: string; label: string; icon: IconName }; active: boolean; onClick: () => void }) {
  return <button className={`nav-item ${active ? 'nav-item-active' : ''}`} onClick={onClick}><Icon name={item.icon} size={18} /><span>{item.label}</span>{item.id === 'progress' && <span className="nav-dot" />}</button>
}

function MobileNav({ activeScreen, goTo }: { activeScreen: Exclude<Screen, 'welcome' | 'onboarding' | 'lesson'>; goTo: (next: Screen) => void }) {
  const mobileItems = navItems.filter((item) => ['home', 'learn', 'practice', 'immerse', 'profile'].includes(item.id))
  return <nav className="mobile-nav" aria-label="Mobile navigation">{mobileItems.map((item) => <button key={item.id} className={`mobile-nav-item ${activeScreen === item.id ? 'mobile-nav-active' : ''}`} onClick={() => goTo(item.id)}><Icon name={item.icon} size={19} /><span>{item.label}</span></button>)}</nav>
}

function Topbar({ screen, goTo }: { screen: Screen; goTo: (next: Screen) => void }) {
  return (
    <header className="topbar">
      <div className="topbar-context"><span className="topbar-kicker">LINGOLUME /</span><span className="topbar-title">{screenTitles[screen]}</span></div>
      <div className="topbar-actions">
        <span className="mockup-status"><span /> Mockup mode</span>
        <button className="icon-button search-button" aria-label="Search"><Icon name="search" size={18} /></button>
        <button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" size={18} /><span className="notification-dot" /></button>
        <button className="avatar avatar-top" onClick={() => goTo('profile')} aria-label="Open profile">M</button>
      </div>
    </header>
  )
}

function WelcomeScreen({ startOnboarding, goTo }: { startOnboarding: () => void; goTo: (next: Screen) => void }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-copy">
        <LogoLockup />
        <div className="welcome-kicker"><span className="eyebrow-line" /> A new way into language</div>
        <h1>Learn the language.<br /><em>Step into its world.</em></h1>
        <p className="welcome-description">A thoughtful path to reading, writing, and speaking with confidence — grounded in real context and guided by your own pace.</p>
        <div className="welcome-actions"><Button onClick={startOnboarding} icon="arrow">Begin your journey</Button><Button variant="ghost" onClick={() => goTo('home')}>Open the demo</Button></div>
        <div className="welcome-footnote"><Icon name="shield" size={15} /> Built around progress you can actually see.</div>
      </div>
      <div className="welcome-art" style={{ backgroundImage: "url('/assets/lingolume-app-vision.png')" }}>
        <div className="welcome-art-glow" />
        <div className="welcome-art-caption"><span>LINGOLUME / 01</span><strong>Every word is a doorway.</strong></div>
        <div className="floating-chip floating-chip-top"><span className="mini-orb" /><span>Read · Write · Speak</span></div>
        <div className="floating-chip floating-chip-bottom"><Icon name="spark" size={14} /><span>Beginner path / 8 min</span></div>
      </div>
    </div>
  )
}

function OnboardingScreen({ step, selectedLanguage, setSelectedLanguage, selectedGoal, setSelectedGoal, dailyMinutes, setDailyMinutes, selectedLanguageData, continueOnboarding, goTo }: { step: number; selectedLanguage: Language; setSelectedLanguage: (language: Language) => void; selectedGoal: string; setSelectedGoal: (goal: string) => void; dailyMinutes: string; setDailyMinutes: (minutes: string) => void; selectedLanguageData: typeof languages[number]; continueOnboarding: () => void; goTo: (next: Screen) => void }) {
  const steps = ['Language', 'Goal', 'Routine', 'Ready']
  return (
    <div className="onboarding-screen">
      <div className="onboarding-top"><button className="brand-button" onClick={() => goTo('welcome')}><LogoLockup /></button><button className="text-button" onClick={() => goTo('home')}>Skip setup <Icon name="arrow" size={15} /></button></div>
      <div className="onboarding-progress"><span className="onboarding-progress-label">Start your path</span><div className="step-track">{steps.map((label, index) => <span key={label} className={index <= step ? 'step-active' : ''}><i>{index + 1}</i>{label}</span>)}</div></div>
      <div className="onboarding-body">
        <div className="onboarding-panel">
          {step === 0 && <LanguageStep selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />}
          {step === 1 && <GoalStep selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} />}
          {step === 2 && <RoutineStep dailyMinutes={dailyMinutes} setDailyMinutes={setDailyMinutes} />}
          {step === 3 && <ReadyStep selectedLanguageData={selectedLanguageData} selectedGoal={selectedGoal} dailyMinutes={dailyMinutes} />}
          <div className="onboarding-footer"><span>Step {step + 1} of 4</span><Button onClick={continueOnboarding} icon={step === 3 ? 'check' : 'arrow'}>{step === 3 ? 'Enter LingoLume' : 'Continue'}</Button></div>
        </div>
        <div className="onboarding-aside"><div className="aside-orb-large"><LogoMark /></div><span className="aside-caption">Your path adapts to you.</span><p>Start with a small, useful step. LingoLume will make the next one visible.</p></div>
      </div>
    </div>
  )
}

function LanguageStep({ selectedLanguage, setSelectedLanguage }: { selectedLanguage: Language; setSelectedLanguage: (language: Language) => void }) {
  return <div className="step-content"><span className="eyebrow">01 / Target language</span><h1>Choose your language.</h1><p className="step-lede">Your path will be built around its sounds, script, and way of seeing the world.</p><div className="language-options">{languages.map((language) => <button key={language.name} className={`language-option ${selectedLanguage === language.name ? 'language-option-selected' : ''}`} onClick={() => setSelectedLanguage(language.name)}><span className="language-symbol">{language.native}</span><span className="language-info"><strong>{language.name}</strong><small>{language.script}</small><em>{language.note}</em></span><span className="radio-check">{selectedLanguage === language.name && <Icon name="check" size={14} />}</span></button>)}</div></div>
}

function GoalStep({ selectedGoal, setSelectedGoal }: { selectedGoal: string; setSelectedGoal: (goal: string) => void }) {
  const goals = ['Travel with confidence', 'Culture and curiosity', 'Study or career', 'Everyday conversation']
  return <div className="step-content"><span className="eyebrow">02 / Your reason</span><h1>What brings you here?</h1><p className="step-lede">We will use your goal to shape the moments you practise.</p><div className="goal-grid">{goals.map((goal, index) => <button key={goal} className={`goal-option ${selectedGoal === goal ? 'goal-option-selected' : ''}`} onClick={() => setSelectedGoal(goal)}><span className={`goal-icon goal-icon-${index}`}><Icon name={index === 0 ? 'compass' : index === 1 ? 'spark' : index === 2 ? 'target' : 'message'} size={18} /></span><span>{goal}</span>{selectedGoal === goal && <Icon name="check" size={16} />}</button>)}</div></div>
}

function RoutineStep({ dailyMinutes, setDailyMinutes }: { dailyMinutes: string; setDailyMinutes: (minutes: string) => void }) {
  const routines = [{ value: '5 min', label: 'A small spark', note: '5 minutes a day' }, { value: '10 min', label: 'A steady rhythm', note: '10 minutes a day' }, { value: '20 min', label: 'A deeper session', note: '20 minutes a day' }]
  return <div className="step-content"><span className="eyebrow">03 / Your rhythm</span><h1>How much space do you have?</h1><p className="step-lede">A consistent rhythm is more useful than a perfect plan.</p><div className="routine-options">{routines.map((routine, index) => <button key={routine.value} className={`routine-option ${dailyMinutes === routine.value ? 'routine-option-selected' : ''}`} onClick={() => setDailyMinutes(routine.value)}><span className="routine-number">0{index + 1}</span><span><strong>{routine.label}</strong><small>{routine.note}</small></span><span className="radio-check">{dailyMinutes === routine.value && <Icon name="check" size={14} />}</span></button>)}</div><div className="routine-note"><Icon name="clock" size={15} /><span>Your daily plan will include reading, writing, speaking, and review.</span></div></div>
}

function ReadyStep({ selectedLanguageData, selectedGoal, dailyMinutes }: { selectedLanguageData: typeof languages[number]; selectedGoal: string; dailyMinutes: string }) {
  return <div className="step-content ready-step"><span className="eyebrow">04 / Your first light</span><h1>Your path is ready.</h1><p className="step-lede">A gentle first session built around what matters to you.</p><div className="ready-card"><div className="ready-language"><span className="ready-orb"><LogoMark small /></span><div><small>Target language</small><strong>{selectedLanguageData.name} · {selectedLanguageData.native}</strong></div></div><div className="ready-details"><span><Icon name="target" size={15} /> {selectedGoal}</span><span><Icon name="clock" size={15} /> {dailyMinutes} rhythm</span><span><Icon name="grid" size={15} /> Read · Write · Speak</span></div></div><p className="ready-footnote"><Icon name="spark" size={15} /> You can change any choice later in Profile.</p></div>
}

function PageIntro({ eyebrow, title, description, action, onAction }: { eyebrow: string; title: string; description?: string; action?: string; onAction?: () => void }) {
  return <div className="page-intro"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <Button variant="secondary" onClick={onAction} icon="arrow">{action}</Button>}</div>
}

function HomeScreen({ goTo, setShowPaywall }: { goTo: (next: Screen) => void; setShowPaywall: (value: boolean) => void }) {
  return <div className="screen-content home-screen"><div className="home-greeting"><div><span className="eyebrow">Tuesday, November 18</span><h1>Good evening, Mara<span className="title-dot">.</span></h1><p>Keep the light on. Your next useful step is ready.</p></div><div className="goal-meter"><ProgressRing value={72} size={58} label="72" /><span><strong>Today’s focus</strong><small>3 of 4 complete</small></span></div></div><div className="home-grid"><section className="continue-card card-dark"><div className="continue-card-copy"><div className="card-topline"><Pill tone="cyan" icon="play">Up next</Pill><span>8 min</span></div><h2>Make an introduction</h2><p>Read a friendly greeting, write your name, and say it naturally.</p><div className="lesson-skill-row"><span><Icon name="book" size={14} /> Read</span><span><Icon name="pen" size={14} /> Write</span><span><Icon name="mic" size={14} /> Speak</span></div><Button onClick={() => goTo('lesson')} icon="arrow">Continue lesson</Button></div><div className="continue-visual"><div className="visual-halo" /><div className="tutor-orb"><LogoMark small /></div><span className="visual-caption">안녕하세요</span><span className="visual-caption-sub">Meet someone new</span></div></section><section className="rhythm-card card-light"><div className="section-heading"><div><span className="eyebrow">Your rhythm</span><h3>12 days in motion</h3></div><span className="streak-icon"><Icon name="bolt" size={17} /></span></div><div className="week-dots">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={`${day}-${index}`} className={index < 5 ? 'week-dot-done' : index === 5 ? 'week-dot-today' : ''}><i>{index < 5 ? <Icon name="check" size={12} /> : day}</i><small>{day}</small></span>)}</div><div className="rhythm-footer"><span><strong>5</strong> day goal</span><span><strong>2</strong> day best</span><Icon name="arrowUp" size={15} /></div></section></div><div className="section-row-heading"><div><span className="eyebrow">Today’s practice</span><h2>Build the whole skill.</h2></div><button className="text-button" onClick={() => goTo('practice')}>Open practice studio <Icon name="arrow" size={15} /></button></div><div className="practice-grid"><SkillCard icon="book" title="Read" label="Hiragana foundations" progress={68} meta="6 min" tone="cyan" onClick={() => goTo('learn')} /><SkillCard icon="pen" title="Write" label="Build a sentence" progress={42} meta="4 min" tone="coral" onClick={() => goTo('lesson')} /><SkillCard icon="mic" title="Speak" label="Meet Nari" progress={28} meta="5 min" tone="violet" onClick={() => goTo('practice')} /></div><section className="home-lower-grid"><div className="momentum-card card-light"><div className="section-heading"><div><span className="eyebrow">Learning evidence</span><h3>Your momentum</h3></div><Pill tone="green" icon="arrowUp">+8% this week</Pill></div><div className="chart-wrap"><div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area"><div className="chart-lines"><i /><i /><i /><i /><i /></div><svg className="line-chart" viewBox="0 0 510 160" preserveAspectRatio="none"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#73e4ef" stopOpacity=".24" /><stop offset="1" stopColor="#73e4ef" stopOpacity="0" /></linearGradient></defs><path d="M0,126 C40,120 52,105 84,111 S123,91 157,98 S197,71 226,83 S268,65 300,72 S334,49 365,61 S402,38 433,48 S470,22 510,32 V160 H0 Z" fill="url(#areaFill)" /><path d="M0,126 C40,120 52,105 84,111 S123,91 157,98 S197,71 226,83 S268,65 300,72 S334,49 365,61 S402,38 433,48 S470,22 510,32" fill="none" stroke="#74e6ee" strokeWidth="3" strokeLinecap="round" /></svg><div className="chart-x-labels"><span>Nov 12</span><span>Nov 14</span><span>Nov 16</span><span>Today</span></div></div></div></div><div className="review-card card-light"><div className="section-heading"><div><span className="eyebrow">Review queue</span><h3>Keep it close.</h3></div><span className="review-count">12</span></div><p>Words and patterns waiting to come back into focus.</p><div className="review-preview"><span className="review-glyph">안녕</span><div><strong>안녕하세요</strong><small>Polite greeting</small></div><button aria-label="Open review" onClick={() => goTo('practice')}><Icon name="arrow" size={15} /></button></div><button className="link-row" onClick={() => setShowPaywall(true)}>Unlock deeper review <Icon name="chevron" size={15} /></button></div></section><section className="world-strip" style={{ backgroundImage: "url('/assets/lingolume-app-vision.png')" }}><div><span className="eyebrow">A small world, today</span><h2>Step into a Seoul café.</h2><p>Practise a useful order when you are ready for the real moment.</p></div><Button variant="dark" onClick={() => goTo('immerse')} icon="arrow">Enter immersion</Button></section></div>
}

function SkillCard({ icon, title, label, progress, meta, tone, onClick }: { icon: IconName; title: string; label: string; progress: number; meta: string; tone: 'cyan' | 'coral' | 'violet'; onClick: () => void }) {
  return <button className="skill-card card-light" onClick={onClick}><span className={`skill-icon skill-icon-${tone}`}><Icon name={icon} size={18} /></span><span className="skill-card-main"><span className="skill-card-heading"><strong>{title}</strong><small>{meta}</small></span><span className="skill-card-label">{label}</span><span className="mini-progress"><i style={{ width: `${progress}%` }} /></span></span><Icon name="arrow" size={16} className="skill-card-arrow" /></button>
}

function LearnScreen({ goTo, selectedLanguage, setSelectedLanguage }: { goTo: (next: Screen) => void; selectedLanguage: Language; setSelectedLanguage: (language: Language) => void }) {
  const units = [{ number: '01', name: 'Hello, world', note: 'Script and first introductions', progress: 100, state: 'complete' }, { number: '02', name: 'In the city', note: 'Read signs and find your way', progress: 64, state: 'current' }, { number: '03', name: 'Meet me there', note: 'Make plans and ask questions', progress: 18, state: 'next' }, { number: '04', name: 'Make it yours', note: 'Preferences, choices, and rhythm', progress: 0, state: 'locked' }]
  return <div className="screen-content learn-screen"><PageIntro eyebrow="Your path / Beginner" title="Learn with a clear next step." description="A carefully sequenced path across script, reading, writing, speaking, and real-world use." action="Course map" onAction={() => goTo('learn')} /><div className="course-switcher"><div className="course-language"><span className="course-orb"><LogoMark small /></span><div><small>Learning path</small><strong>{selectedLanguage} · Beginner</strong></div><button className="icon-button subtle"><Icon name="chevron" size={15} /></button></div><div className="language-tabs">{languages.map((language) => <button key={language.name} className={selectedLanguage === language.name ? 'language-tab-active' : ''} onClick={() => setSelectedLanguage(language.name)}>{language.name}</button>)}</div></div><div className="learn-layout"><section className="unit-path"><div className="path-heading"><div><span className="eyebrow">Unit sequence</span><h2>From first marks to real moments.</h2></div><Pill tone="cyan" icon="target">18% complete</Pill></div><div className="unit-list">{units.map((unit, index) => <button key={unit.number} className={`unit-card unit-${unit.state}`} onClick={() => unit.state !== 'locked' ? (unit.state === 'current' ? goTo('lesson') : undefined) : undefined}><span className="unit-index">{unit.state === 'complete' ? <Icon name="check" size={16} /> : unit.state === 'locked' ? <Icon name="lock" size={15} /> : unit.number}</span><span className="unit-copy"><span className="unit-topline"><small>UNIT {unit.number}</small>{unit.state === 'current' && <Pill tone="coral">Current</Pill>}{unit.state === 'complete' && <Pill tone="green">Complete</Pill>}</span><strong>{unit.name}</strong><span>{unit.note}</span><span className="unit-progress"><i style={{ width: `${unit.progress}%` }} /></span></span><span className="unit-action">{unit.state === 'current' ? <Icon name="arrow" size={17} /> : unit.state === 'complete' ? <Icon name="refresh" size={16} /> : unit.state === 'locked' ? <Icon name="lock" size={15} /> : <Icon name="chevron" size={17} />}</span></button>)}</div></section><aside className="learn-aside"><div className="script-lab card-light"><span className="aside-card-icon"><Icon name="grid" size={17} /></span><span className="eyebrow">Script lab</span><h3>Make the marks feel familiar.</h3><p>Five minutes of focused recognition before your next lesson.</p><Button variant="secondary" onClick={() => goTo('lesson')} icon="arrow">Open script lab</Button></div><div className="learn-tools card-light"><span className="eyebrow">Study tools</span><button onClick={() => goTo('practice')}><span><Icon name="headphones" size={17} /> Listening shelf</span><Icon name="arrow" size={15} /></button><button onClick={() => goTo('practice')}><span><Icon name="pen" size={17} /> Writing desk</span><Icon name="arrow" size={15} /></button><button onClick={() => goTo('progress')}><span><Icon name="chart" size={17} /> Skill report</span><Icon name="arrow" size={15} /></button></div></aside></div></div>
}

function LessonScreen({ goTo, exerciseMode, setExerciseMode, lessonAnswer, answerLesson, lessonComplete, setLessonComplete }: { goTo: (next: Screen) => void; exerciseMode: Skill; setExerciseMode: (skill: Skill) => void; lessonAnswer: string | null; answerLesson: (answer: string) => void; lessonComplete: boolean; setLessonComplete: (complete: boolean) => void }) {
  const stageLabels: Array<{ id: Skill; label: string; icon: IconName }> = [{ id: 'read', label: 'Read', icon: 'book' }, { id: 'write', label: 'Write', icon: 'pen' }, { id: 'speak', label: 'Speak', icon: 'mic' }]
  return <div className="lesson-screen"><div className="lesson-top"><button className="icon-button lesson-close" onClick={() => goTo('home')} aria-label="Exit lesson"><Icon name="close" size={19} /></button><div className="lesson-progress-copy"><span>MAKE AN INTRODUCTION</span><strong>3 of 8</strong></div><div className="lesson-progress-track"><i style={{ width: '38%' }} /></div><button className="text-button lesson-exit" onClick={() => goTo('home')}>Save & exit</button></div><div className="lesson-body"><div className="lesson-breadcrumb"><span>Unit 01</span><Icon name="chevron" size={13} /><span>Hello, world</span><Icon name="chevron" size={13} /><strong>Lesson 03</strong></div><div className="lesson-heading"><span className="eyebrow">A useful first meeting</span><h1>Which greeting fits this moment?</h1><p>Listen, read the context, then choose the respectful greeting.</p></div><div className="lesson-skill-tabs">{stageLabels.map((stage) => <button key={stage.id} className={exerciseMode === stage.id ? 'lesson-tab-active' : ''} onClick={() => setExerciseMode(stage.id)}><Icon name={stage.icon} size={16} />{stage.label}</button>)}</div>{exerciseMode === 'read' && <ReadExercise lessonAnswer={lessonAnswer} answerLesson={answerLesson} />}{exerciseMode === 'write' && <WriteExercise />}{exerciseMode === 'speak' && <SpeakExercise />}{lessonAnswer && exerciseMode === 'read' && <div className={`answer-feedback ${lessonAnswer === 'greeting' ? 'answer-good' : 'answer-soft'}`}><span className="feedback-icon"><Icon name={lessonAnswer === 'greeting' ? 'check' : 'spark'} size={16} /></span><div><strong>{lessonAnswer === 'greeting' ? 'A thoughtful choice.' : 'Take another look.'}</strong><span>{lessonAnswer === 'greeting' ? '안녕하세요 is the polite greeting for a first meeting.' : 'Think about the relationship and the setting.'}</span></div><button onClick={() => setLessonComplete(true)}><Icon name="arrow" size={15} /></button></div>}{lessonComplete && <div className="lesson-complete"><span><Icon name="check" size={17} /></span><div><strong>Lesson step complete</strong><small>Your reading evidence has been saved in this mockup.</small></div><Button variant="secondary" onClick={() => goTo('home')}>Back to home</Button></div>}</div><div className="lesson-bottom"><span><Icon name="shield" size={14} /> Nothing is graded as perfect or wrong without context.</span><button className="text-button" onClick={() => goTo('practice')}>Ask Nari for a hint <Icon name="arrow" size={14} /></button></div></div>
}

function ReadExercise({ lessonAnswer, answerLesson }: { lessonAnswer: string | null; answerLesson: (answer: string) => void }) {
  return <div className="exercise-panel"><div className="context-card"><span className="context-label">THE MOMENT</span><div className="context-visual"><span className="context-avatar context-avatar-one">M</span><span className="context-line" /><span className="context-avatar context-avatar-two">N</span></div><p>You are meeting a new person for the first time. You want to greet them politely.</p></div><div className="audio-row"><button className="play-button"><Icon name="play" size={17} /></button><div><strong>Listen to the moment</strong><small>Natural pace · 0:03</small></div><Waveform /><button className="icon-button subtle"><Icon name="volume" size={17} /></button></div><div className="answer-heading"><span>Choose the best greeting</span><small>Tap to hear each one</small></div><div className="answer-options"><button className={lessonAnswer === 'greeting' ? 'answer-option answer-selected' : 'answer-option'} onClick={() => answerLesson('greeting')}><span className="answer-script">안녕하세요</span><span>Polite hello</span><span className="answer-radio">{lessonAnswer === 'greeting' && <Icon name="check" size={13} />}</span></button><button className={lessonAnswer === 'casual' ? 'answer-option answer-selected' : 'answer-option'} onClick={() => answerLesson('casual')}><span className="answer-script">안녕</span><span>Casual hello</span><span className="answer-radio">{lessonAnswer === 'casual' && <Icon name="check" size={13} />}</span></button><button className={lessonAnswer === 'thanks' ? 'answer-option answer-selected' : 'answer-option'} onClick={() => answerLesson('thanks')}><span className="answer-script">감사합니다</span><span>Thank you</span><span className="answer-radio">{lessonAnswer === 'thanks' && <Icon name="check" size={13} />}</span></button></div><button className="hint-link"><Icon name="spark" size={14} /> Need a hint?</button></div>
}

function WriteExercise() {
  return <div className="exercise-panel write-exercise"><div className="write-prompt"><span className="context-label">WRITE IT</span><h2>Build the greeting from its parts.</h2><p>Notice how each syllable block carries its own shape.</p></div><div className="writing-board"><div className="writing-guide"><span>안</span><span>녕</span><span>하</span><span>세</span></div><div className="writing-input"><span>안</span><span className="writing-caret" /></div><small>Tap a block, then place it in order</small></div><div className="writing-tools"><button><Icon name="refresh" size={15} /> Reset</button><button><Icon name="spark" size={15} /> Show a hint</button><span>1 of 3 blocks</span></div></div>
}

function SpeakExercise() {
  return <div className="exercise-panel speak-exercise"><div className="speak-prompt"><span className="context-label">SAY IT</span><h2>Greet Nari politely.</h2><p>Listen once, then make the phrase your own.</p></div><div className="reference-phrase"><span className="phrase-orb"><LogoMark small /></span><div><strong>안녕하세요</strong><small>Polite hello · Listen first</small></div><button className="play-button play-button-small"><Icon name="play" size={14} /></button></div><button className="record-button"><span><Icon name="mic" size={21} /></span><strong>Press to speak</strong><small>Your microphone is off</small></button><div className="speak-controls"><button><Icon name="volume" size={15} /> Replay</button><button><Icon name="sliders" size={15} /> Slow down</button><span>Feedback prioritises intelligibility.</span></div></div>
}

function PracticeScreen({ goTo, setShowPaywall, flash }: { goTo: (next: Screen) => void; setShowPaywall: (value: boolean) => void; flash: (message: string) => void }) {
  return <div className="screen-content practice-screen"><PageIntro eyebrow="Practice / Your tutor" title="Make the lesson yours." description="Short, focused practice for the moments you want to handle in the real world." action="See progress" onAction={() => goTo('progress')} /><section className="tutor-studio card-dark"><div className="tutor-studio-copy"><div className="card-topline"><Pill tone="cyan" icon="spark">Your learning companion</Pill><span>Context-aware</span></div><h2>Meet Nari.</h2><p>A patient practice partner who knows your current unit, recurring mistakes, and the next useful challenge.</p><div className="tutor-actions"><Button onClick={() => flash('Microphone practice is ready in this mockup.')} icon="mic">Start speaking</Button><Button variant="ghost" onClick={() => flash('Nari will explain the current lesson context.')}>Ask for an explanation</Button></div><div className="tutor-trust"><span><Icon name="shield" size={14} /> Curriculum grounded</span><span><Icon name="clock" size={14} /> 5 min session</span></div></div><div className="tutor-studio-art"><div className="tutor-ring tutor-ring-one" /><div className="tutor-ring tutor-ring-two" /><div className="tutor-face"><div className="face-eyes"><i /><i /></div><div className="face-smile" /></div><span className="tutor-name-tag">Nari · Korean guide</span></div></section><div className="section-row-heading practice-heading"><div><span className="eyebrow">Practice menu</span><h2>Choose the right kind of work.</h2></div><button className="text-button" onClick={() => setShowPaywall(true)}>View Plus practice <Icon name="arrow" size={15} /></button></div><div className="practice-menu-grid"><PracticeMenuCard icon="book" title="Reading room" label="See it in context" note="Short texts, signs, and messages" tone="cyan" onClick={() => goTo('learn')} /><PracticeMenuCard icon="pen" title="Writing desk" label="Make it yours" note="Build sentences and useful replies" tone="coral" onClick={() => goTo('lesson')} /><PracticeMenuCard icon="headphones" title="Listening pulse" label="Train your ear" note="Natural voices at your pace" tone="violet" onClick={() => flash('Listening pulse queued for your next session.')} /><PracticeMenuCard icon="mic" title="Pronunciation lab" label="Say it clearly" note="Replay, compare, try again" tone="green" onClick={() => flash('Pronunciation lab is ready for a supported language.')} /></div><section className="recent-sessions card-light"><div className="section-heading"><div><span className="eyebrow">Recent practice</span><h3>Small sessions add up.</h3></div><button className="icon-button subtle"><Icon name="more" size={16} /></button></div><div className="session-row"><span className="session-icon session-icon-cyan"><Icon name="book" size={16} /></span><div><strong>Read a name card</strong><small>Unit 01 · 6 minutes ago</small></div><Pill tone="green">Complete</Pill><Icon name="chevron" size={16} /></div><div className="session-row"><span className="session-icon session-icon-coral"><Icon name="pen" size={16} /></span><div><strong>Build a sentence</strong><small>Unit 01 · Yesterday</small></div><Pill tone="muted">Continue</Pill><Icon name="chevron" size={16} /></div></section></div>
}

function PracticeMenuCard({ icon, title, label, note, tone, onClick }: { icon: IconName; title: string; label: string; note: string; tone: 'cyan' | 'coral' | 'violet' | 'green'; onClick: () => void }) {
  return <button className="practice-menu-card card-light" onClick={onClick}><span className={`practice-menu-icon practice-menu-icon-${tone}`}><Icon name={icon} size={19} /></span><span className="practice-menu-copy"><strong>{title}</strong><span>{label}</span><small>{note}</small></span><Icon name="arrow" size={16} /></button>
}

function ImmerseScreen({ goTo, setShowPaywall }: { goTo: (next: Screen) => void; setShowPaywall: (value: boolean) => void }) {
  return <div className="screen-content immerse-screen"><PageIntro eyebrow="Immerse / Real moments" title="Step into the moment." description="Scenarios are connected to your course, so every conversation has something to teach you." action="How immersion works" onAction={() => setShowPaywall(true)} /><section className="immerse-feature" style={{ backgroundImage: "url('/assets/lingolume-app-vision.png')" }}><div className="immerse-feature-overlay" /><div className="immerse-feature-copy"><Pill tone="coral" icon="spark">Featured scenario</Pill><h2>Order at a café.</h2><p>Read the menu, ask one useful question, and place your order with confidence.</p><div className="scenario-meta"><span><Icon name="mic" size={14} /> Speaking</span><span><Icon name="book" size={14} /> Reading</span><span><Icon name="clock" size={14} /> 8 min</span></div><Button onClick={() => goTo('practice')} icon="arrow">Enter the moment</Button></div><div className="immerse-scene-label">SEOUL / 01</div></section><div className="filter-row"><span className="eyebrow">Scenario library</span><button className="filter-active">All moments</button><button>Everyday</button><button>Travel</button><button>Culture</button></div><div className="scenario-grid"><ScenarioCard imageClass="scenario-card-cafe" title="Order at a café" note="Read a menu · Ask a question" tag="Current" onClick={() => goTo('practice')} /><ScenarioCard imageClass="scenario-card-station" title="Find the right platform" note="Read a sign · Ask for directions" tag="Soon" onClick={() => setShowPaywall(true)} /><ScenarioCard imageClass="scenario-card-meet" title="Meet a new friend" note="Introduce yourself · Make a plan" tag="Soon" onClick={() => setShowPaywall(true)} /></div></div>
}

function ScenarioCard({ imageClass, title, note, tag, onClick }: { imageClass: string; title: string; note: string; tag: string; onClick: () => void }) {
  return <button className="scenario-card card-light" onClick={onClick}><span className={`scenario-image ${imageClass}`}><span className="scenario-tag">{tag}</span></span><span className="scenario-card-copy"><strong>{title}</strong><small>{note}</small><span><Icon name="arrow" size={15} /> Open scenario</span></span></button>
}

function ProgressScreen() {
  const skills = [{ name: 'Reading', value: 64, note: 'Recognises familiar script in context', tone: 'cyan', icon: 'book' as IconName }, { name: 'Writing', value: 42, note: 'Builds short supported sentences', tone: 'coral', icon: 'pen' as IconName }, { name: 'Speaking', value: 51, note: 'Completes a polite introduction', tone: 'violet', icon: 'mic' as IconName }, { name: 'Listening', value: 57, note: 'Catches familiar words at a calm pace', tone: 'green', icon: 'headphones' as IconName }]
  return <div className="screen-content progress-screen"><PageIntro eyebrow="Progress / Evidence" title="See what is becoming yours." description="A clear view of the skills you are building, not just the time you spend inside the app." action="Download report" onAction={() => undefined} /><div className="progress-summary-grid"><div className="progress-summary card-dark"><div><span className="eyebrow">This week</span><h2>Four useful sessions.</h2><p>You are building a steady rhythm across the whole skill.</p></div><div className="summary-stat-row"><span><strong>42</strong><small>minutes</small></span><span><strong>18</strong><small>new words</small></span><span><strong>7</strong><small>tasks</small></span></div></div><div className="report-card card-light"><span className="report-icon"><Icon name="target" size={19} /></span><span><strong>Current focus</strong><small>Polite introductions</small></span><ProgressRing value={72} label="72" /></div></div><div className="skill-section-heading"><div><span className="eyebrow">Four-skill view</span><h2>Progress with evidence.</h2></div><Pill tone="green" icon="arrowUp">Growing steadily</Pill></div><div className="evidence-grid">{skills.map((skill) => <div key={skill.name} className="evidence-card card-light"><div className="evidence-top"><span className={`evidence-icon evidence-icon-${skill.tone}`}><Icon name={skill.icon} size={17} /></span><span className="evidence-value">{skill.value}<small>%</small></span></div><strong>{skill.name}</strong><p>{skill.note}</p><div className="evidence-progress"><i className={`bar-${skill.tone}`} style={{ width: `${skill.value}%` }} /></div><span className="evidence-footer"><span>{skill.value > 55 ? 'Getting reliable' : 'Practising'}</span><Icon name="arrow" size={14} /></span></div>)}</div><div className="progress-lower-grid"><div className="evidence-timeline card-light"><div className="section-heading"><div><span className="eyebrow">Recent evidence</span><h3>Moments that count.</h3></div><button className="icon-button subtle"><Icon name="more" size={16} /></button></div><TimelineItem date="Today" title="Read a name card" detail="Reading · reliable in context" tone="cyan" /><TimelineItem date="Yesterday" title="Write your introduction" detail="Writing · one more review" tone="coral" /><TimelineItem date="Nov 15" title="Greet Nari politely" detail="Speaking · intelligible response" tone="violet" /></div><div className="next-focus card-light"><span className="eyebrow">Next useful focus</span><div className="next-focus-icon"><Icon name="spark" size={19} /></div><h3>Bring writing into the moment.</h3><p>Your next lesson will ask you to build the sentence before you say it.</p><button className="link-row">Open recommendation <Icon name="arrow" size={15} /></button></div></div></div>
}

function TimelineItem({ date, title, detail, tone }: { date: string; title: string; detail: string; tone: 'cyan' | 'coral' | 'violet' }) {
  return <div className="timeline-item"><span className={`timeline-dot timeline-dot-${tone}`} /><span className="timeline-copy"><small>{date}</small><strong>{title}</strong><span>{detail}</span></span><Icon name="check" size={15} /></div>
}

function ProfileScreen({ goTo, startOnboarding, openWelcome, setShowPaywall, flash }: { goTo: (next: Screen) => void; startOnboarding: () => void; openWelcome: () => void; setShowPaywall: (value: boolean) => void; flash: (message: string) => void }) {
  const settings = [{ icon: 'sliders' as IconName, label: 'Learning preferences', note: 'Goals, routine, and difficulty' }, { icon: 'volume' as IconName, label: 'Tutor voice', note: 'Nari · Warm and measured' }, { icon: 'download' as IconName, label: 'Downloads and offline', note: '2 packs ready' }, { icon: 'shield' as IconName, label: 'Privacy and data', note: 'Control recordings and history' }]
  return <div className="screen-content profile-screen"><PageIntro eyebrow="Profile / Your space" title="Keep the path yours." description="Your preferences, privacy, and learning choices in one calm place." action="Replay welcome" onAction={openWelcome} /><div className="profile-overview card-dark"><div className="profile-person"><span className="avatar avatar-large">M</span><div><span className="eyebrow">Learner since today</span><h2>Mara Okafor</h2><p>Beginner · Korean · Travel with confidence</p><div className="profile-badges"><Pill tone="cyan" icon="globe">한국어</Pill><Pill tone="coral" icon="bolt">12 day rhythm</Pill></div></div></div><div className="profile-stat"><ProgressRing value={18} size={86} label="18%" /><span><strong>Path complete</strong><small>Unit 01 of 08</small></span></div></div><div className="profile-columns"><section className="settings-list card-light"><div className="section-heading"><div><span className="eyebrow">Preferences</span><h3>Shape your practice.</h3></div><button className="icon-button subtle"><Icon name="settings" size={17} /></button></div>{settings.map((setting) => <button key={setting.label} className="setting-row" onClick={() => flash(`${setting.label} is ready to customise in this mockup.`)}><span className="setting-icon"><Icon name={setting.icon} size={17} /></span><span><strong>{setting.label}</strong><small>{setting.note}</small></span><Icon name="chevron" size={16} /></button>)}</section><aside className="plan-card"><span className="plan-spark"><Icon name="spark" size={18} /></span><span className="eyebrow">LingoLume Plus</span><h3>More room to practise.</h3><p>Unlock deeper review, longer tutor sessions, and the full immersion library.</p><Button onClick={() => setShowPaywall(true)} icon="arrow">View your plan</Button><span className="plan-note"><Icon name="shield" size={13} /> No hidden usage surprises.</span></aside></div><div className="profile-footer-links"><button onClick={() => flash('Help centre is part of the next product phase.')}><Icon name="help" size={16} /> Help and feedback</button><button onClick={() => goTo('progress')}><Icon name="chart" size={16} /> View learning report</button><button onClick={() => flash('Sign out is disabled in mockup mode.')}><Icon name="close" size={16} /> Sign out</button></div></div>
}

function PaywallModal({ close }: { close: () => void }) {
  return <div className="modal-backdrop" role="presentation" onClick={close}><section className="paywall-modal" role="dialog" aria-modal="true" aria-labelledby="plus-title" onClick={(event) => event.stopPropagation()}><button className="icon-button modal-close" onClick={close} aria-label="Close"><Icon name="close" size={18} /></button><div className="modal-orb"><LogoMark /></div><span className="eyebrow">LingoLume Plus</span><h2 id="plus-title">More room for the language.</h2><p>Keep your core path free. Plus opens longer tutor sessions, deeper review, and every guided immersion moment.</p><div className="plus-list"><span><Icon name="check" size={14} /> Full beginner pathway</span><span><Icon name="check" size={14} /> Expanded reading and writing review</span><span><Icon name="check" size={14} /> More guided speaking practice</span></div><Button onClick={close} icon="arrow">Keep exploring the demo</Button><small className="modal-note">Plans and pricing will be validated for each launch market.</small></section></div>
}

export default App
