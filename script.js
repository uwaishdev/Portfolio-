/**
 * ============================================================================
 * UWAISHDEV — ULTIMATE PORTFOLIO ECOSYSTEM
 * Client-Side Application Engine (script.js)
 * Vanilla JS, Three.js 3D Engine, Dynamic Content, Google Sheets Sync
 * ============================================================================
 */

// Storage keys
const STORAGE_KEY_DATA = 'uwaishdev_portfolio_data';
const STORAGE_KEY_ENQUIRIES = 'uwaishdev_enquiries';
const STORAGE_KEY_BACKEND = 'uwaishdev_backend_url';

/**
 * DEFAULT APPLICATION DATA SCHEMA
 * Contains verified UWAISHDEV personal brand data.
 */
const DEFAULT_DATA = {
  general: {
    brandName: 'UWAISHDEV',
    personalName: 'UWAISH',
    brandHandle: '@uwaishdev',
    professionalTitle: 'Web Developer & Digital Marketer',
    tagline: 'Code • Create • Grow',
    location: 'Kareli, Narsinghpur district, Madhya Pradesh, India',
    primaryPhone: '8435205075',
    secondaryPhone: '7470832663',
    publicPhoneVisible: true,
    email: 'uwaishk082@gmail.com',
    githubOrg: 'https://github.com/aicart-ai',
    introCopy: 'I build modern websites, lead-generation systems, and digital experiences that help businesses establish and grow their online presence.',
    profilePhotoUrl: '',
    profileFrameStyle: 'rounded',
    resumeUrl: '',
    resumeButtonLabel: 'Download Resume',
    resumeVisible: true
  },
  about: {
    bio1: 'I am a self-directed, AI-assisted web developer and digital marketer based in India. I use modern AI tools to accelerate and refine practical web development, turning real business ideas into usable digital systems, client portals, and lead-generation tools.',
    bio2: 'My core mission is to empower local businesses, coaching institutes, service providers, and emerging brands with high-quality, mobile-friendly websites that do not require exorbitant budgets or complex monthly hosting costs.',
    bio3: 'I place high value on honesty and transparency: I do not claim false certifications or exaggerate accomplishments. I focus on reliable static websites, Google Sheets data workflows, and Google Apps Script integrations that genuinely work.'
  },
  skills: [
    { id: 'sk-1', name: 'Web Development (HTML/CSS/JS)', category: 'Core Web', icon: 'code', description: 'Semantic, mobile-first responsive web applications with clean zero-bloat code.', sortOrder: 1, visible: true },
    { id: 'sk-2', name: 'AI-Assisted Development', category: 'Workflow', icon: 'cpu', description: 'Leveraging cutting-edge AI tools to accelerate development and debug complex workflows.', sortOrder: 2, visible: true },
    { id: 'sk-3', name: 'Admin Dashboard Interfaces', category: 'UI/UX', icon: 'layout-dashboard', description: 'Designing practical, light and dark CMS control panels for easy content management.', sortOrder: 3, visible: true },
    { id: 'sk-4', name: 'Google Apps Script & Sheets', category: 'Backend', icon: 'database', description: 'Building serverless APIs using Google Sheets as a database for enquiries and content.', sortOrder: 4, visible: true },
    { id: 'sk-5', name: 'GitHub Pages & Static Hosting', category: 'DevOps', icon: 'github', description: 'Configuring cost-effective, high-speed static deployment without complex build pipelines.', sortOrder: 5, visible: true },
    { id: 'sk-6', name: 'Digital Marketing & Lead Growth', category: 'Marketing', icon: 'trending-up', description: 'Search optimization, local business positioning, and conversion-focused landing pages.', sortOrder: 6, visible: true }
  ],
  education: [
    { id: 'edu-1', qualification: 'B.Sc. Botany with Computer Applications', institution: 'University College', score: '76%', startYear: '2020', endYear: '2023', status: 'Completed', description: 'Combined scientific research methodology with computer application fundamentals.', visible: true },
    { id: 'edu-2', qualification: 'Diploma in Computer Applications (DCA)', institution: 'Recognized Institute', score: '67% (Final 2 Sems)', startYear: '2021', endYear: '2022', status: 'Completed', description: 'Practical computer systems, office automation, database operations, and scripting.', visible: true },
    { id: 'edu-3', qualification: 'ITI Electrician', institution: 'Industrial Training Institute', score: '', startYear: '2019', endYear: '2021', status: 'Completed', description: 'Hands-on electrical safety, circuit wiring, hardware maintenance, and troubleshooting.', visible: true },
    { id: 'edu-4', qualification: 'Class 12 (Biology Stream)', institution: 'Higher Secondary School', score: '', startYear: '2018', endYear: '2019', status: 'Completed', description: 'Senior secondary education with physics, chemistry, and biology.', visible: true },
    { id: 'edu-5', qualification: 'M.Sc. Biotechnology', institution: 'University Department', score: '', startYear: '2023', endYear: 'Present', status: 'Enrolled / Paused', description: 'Advanced biotechnology and computational biology study (in progress / editable).', visible: true },
    { id: 'edu-6', qualification: 'Drone Service Technician', institution: 'CRISP Bhopal', score: 'Pursuing', startYear: '2026', endYear: '2026 (Exam planned)', status: 'Pursuing / Ongoing', description: 'Comprehensive training in drone mechanics, avionics, assembly, and service maintenance.', visible: true }
  ],
  services: [
    { id: 'srv-1', title: 'Website Design & Development', description: 'Custom, mobile-friendly websites built with clean code and modern aesthetics.', icon: 'globe', ctaText: 'Request Website', visible: true, sortOrder: 1 },
    { id: 'srv-2', title: 'Business Websites & Landing Pages', description: 'High-conversion landing pages designed for coaching institutes, shops, and service providers.', icon: 'layout', ctaText: 'Get Started', visible: true, sortOrder: 2 },
    { id: 'srv-3', title: 'Lead-Capture & Enquiry Systems', description: 'Interactive enquiry forms directly linked to your WhatsApp and Google Sheets.', icon: 'target', ctaText: 'Setup Leads', visible: true, sortOrder: 3 },
    { id: 'srv-4', title: 'Admin Dashboard Design', description: 'Easy-to-use custom admin panels so you can update prices, images, and content.', icon: 'sliders', ctaText: 'Build Dashboard', visible: true, sortOrder: 4 },
    { id: 'srv-5', title: 'Google Sheets & Apps Script', description: 'Automate customer data collection and notifications without paying for costly databases.', icon: 'table', ctaText: 'Automate Data', visible: true, sortOrder: 5 },
    { id: 'srv-6', title: 'Digital Marketing & Local SEO', description: 'Optimize your Google presence and attract local customers in your district or city.', icon: 'search', ctaText: 'Grow Visibility', visible: true, sortOrder: 6 }
  ],
  projects: [
    // ADD NEW PROJECTS HERE
    {
      id: 'proj-1',
      name: 'AI Cart',
      category: 'live',
      status: 'Published',
      featured: true,
      shortDesc: 'Curated directory and discovery platform for modern artificial intelligence tools.',
      detailedDesc: 'AI Cart is a comprehensive web directory spotlighting AI applications, tools, and productivity solutions. Built for rapid browsing and searchability.',
      liveUrl: 'https://aicart-ai.github.io/aicart.ai/',
      githubUrl: 'https://github.com/aicart-ai',
      techTags: ['HTML5', 'CSS3', 'JavaScript', 'AI Tools', 'GitHub Pages'],
      coverImage: '',
      sortOrder: 1,
      visible: true
    },
    {
      id: 'proj-2',
      name: 'Personal Portfolio Reference',
      category: 'live',
      status: 'Published',
      featured: true,
      shortDesc: 'Early portfolio and personal developer brand experience.',
      detailedDesc: 'A live personal portfolio demonstrating web presence, mobile layout capabilities, and contact integration.',
      liveUrl: 'https://aicart-ai.github.io/uwaishai/',
      githubUrl: 'https://github.com/aicart-ai',
      techTags: ['Web Development', 'Portfolio', 'Responsive Design'],
      coverImage: '',
      sortOrder: 2,
      visible: true
    },
    {
      id: 'proj-3',
      name: 'Hunter B2B / Hunter CRM',
      category: 'b2b',
      status: 'Draft',
      featured: false,
      shortDesc: 'B2B lead discovery and customer relationship management application.',
      detailedDesc: 'Architectural reference for a B2B lead discovery tool and CRM dashboard interface. Deployment URL awaiting final verification.',
      liveUrl: '',
      githubUrl: 'https://github.com/aicart-ai',
      techTags: ['CRM', 'B2B Leads', 'Dashboard', 'In Review'],
      coverImage: '',
      sortOrder: 3,
      visible: true
    },
    {
      id: 'proj-4',
      name: 'Romantic Interactive Proposal Web Card',
      category: 'creative',
      status: 'In Development',
      featured: false,
      shortDesc: 'Interactive digital proposal web experience with creative micro-animations.',
      detailedDesc: 'A creative web project featuring custom animations, interactive questions, customizable messages, and potential admin controls.',
      liveUrl: '',
      githubUrl: '',
      techTags: ['Creative Web', 'Animations', 'Interactive', 'Concept'],
      coverImage: '',
      sortOrder: 4,
      visible: true
    },
    {
      id: 'proj-5',
      name: 'AVM Academy & Library',
      category: 'b2b',
      status: 'Draft',
      featured: false,
      shortDesc: 'Educational institute and library management website prototype.',
      detailedDesc: 'A dedicated coaching and library web concept with student registration, course information, and admin management.',
      liveUrl: '',
      githubUrl: '',
      techTags: ['Education', 'Coaching Portal', 'Lead Form', 'Draft'],
      coverImage: '',
      sortOrder: 5,
      visible: true
    }
  ],
  socialLinks: [
    { id: 'soc-1', platform: 'GitHub', displayName: '@aicart-ai', url: 'https://github.com/aicart-ai', icon: 'github', visible: true },
    { id: 'soc-2', platform: 'WhatsApp', displayName: '+91 8435205075', url: 'https://wa.me/918435205075', icon: 'message-circle', visible: true },
    { id: 'soc-3', platform: 'Email', displayName: 'uwaishk082@gmail.com', url: 'mailto:uwaishk082@gmail.com', icon: 'mail', visible: true }
  ],
  theme: {
    bgPrimary: '#070a13',
    bgSecondary: '#0d121f',
    bgCard: 'rgba(15, 23, 42, 0.75)',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    accentPrimary: '#00d2ff',
    accentSecondary: '#ec4899',
    cardRadius: '12px',
    btnRadius: '8px',
    glassBlur: '16px'
  },
  threeSettings: {
    enabled: true,
    preset: 'cyber-core',
    speed: 1.0,
    scale: 1.0,
    density: 50,
    mouseParallax: true
  },
  animationSettings: {
    motionMode: 'standard', // 'off' | 'reduced' | 'standard' | 'enhanced'
    duration: 0.6
  }
};

/**
 * APPLICATION CONTROLLER
 */
class UwaishDevApp {
  constructor() {
    this.state = this.loadState();
    this.threeScene = null;
    this.threeAnimationId = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    this.applyTheme(this.state.theme);
    this.renderHero();
    this.renderAbout();
    this.renderSkills();
    this.renderProjects();
    this.renderServices();
    this.renderEducation();
    this.renderContact();
    this.setupNavigation();
    this.setupProjectFilters();
    this.setupContactForm();
    this.setupScrollObserver();
    this.setupBackToTop();
    this.setupCardSpotlightAndTilt();
    this.setupSecretAdminTrigger();
    
    // Initialize Three.js 3D Background if enabled and supported
    if (this.state.threeSettings?.enabled && !this.isReducedMotion) {
      this.initThreeJs();
    }

    // Refresh icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Optional: Synchronize with backend if URL is defined
    this.syncFromBackend();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DATA);
      if (stored) {
        return { ...DEFAULT_DATA, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using default data:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  applyTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.bgPrimary) root.style.setProperty('--bg-primary', theme.bgPrimary);
    if (theme.bgSecondary) root.style.setProperty('--bg-secondary', theme.bgSecondary);
    if (theme.bgCard) root.style.setProperty('--bg-card', theme.bgCard);
    if (theme.textPrimary) root.style.setProperty('--text-primary', theme.textPrimary);
    if (theme.textSecondary) root.style.setProperty('--text-secondary', theme.textSecondary);
    if (theme.accentPrimary) {
      root.style.setProperty('--accent-primary', theme.accentPrimary);
      root.style.setProperty('--glow-color', `${theme.accentPrimary}33`);
    }
    if (theme.accentSecondary) root.style.setProperty('--accent-secondary', theme.accentSecondary);
    if (theme.cardRadius) root.style.setProperty('--card-radius', theme.cardRadius);
    if (theme.btnRadius) root.style.setProperty('--btn-radius', theme.btnRadius);
    if (theme.glassBlur) root.style.setProperty('--glass-blur', theme.glassBlur);
  }

  renderHero() {
    const { general } = this.state;
    if (!general) return;

    const nameEl = document.getElementById('hero-name');
    const titleEl = document.getElementById('hero-title');
    const taglineEl = document.getElementById('hero-tagline');
    const introEl = document.getElementById('hero-intro');
    const handleEl = document.getElementById('hero-handle');
    const cardLocationEl = document.getElementById('card-location');
    const cardWaBtn = document.getElementById('card-whatsapp-btn');
    const navBrandEl = document.getElementById('nav-brand-name');
    const profileImgEl = document.getElementById('hero-profile-img');
    const profilePlaceholderEl = document.getElementById('hero-photo-placeholder');
    const resumeBtnEl = document.getElementById('hero-btn-resume');

    if (nameEl) nameEl.textContent = general.personalName || 'UWAISH';
    if (titleEl) titleEl.textContent = general.professionalTitle || 'Web Developer & Digital Marketer';
    if (taglineEl) taglineEl.textContent = general.tagline || 'Code • Create • Grow';
    if (introEl) introEl.textContent = general.introCopy || '';
    if (handleEl) handleEl.textContent = general.brandHandle || '@uwaishdev';
    if (cardLocationEl) cardLocationEl.textContent = general.displayRegion || 'India';
    if (navBrandEl) navBrandEl.textContent = general.brandName || 'UWAISHDEV';

    if (cardWaBtn) {
      const rawPhone = (general.primaryPhone || '8435205075').replace(/\D/g, '');
      const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
      cardWaBtn.href = `https://wa.me/${cleanPhone}?text=Hello%20Uwaish,%20I%20found%20your%20portfolio`;
    }

    // Profile Photo Handling
    if (general.profilePhotoUrl && profileImgEl) {
      profileImgEl.src = general.profilePhotoUrl;
      profileImgEl.classList.remove('hidden');
      if (profilePlaceholderEl) profilePlaceholderEl.classList.add('hidden');
    } else if (profileImgEl && profilePlaceholderEl) {
      profileImgEl.classList.add('hidden');
      profilePlaceholderEl.classList.remove('hidden');
    }

    // Resume button
    if (resumeBtnEl) {
      if (general.resumeVisible && general.resumeUrl) {
        resumeBtnEl.href = general.resumeUrl;
        resumeBtnEl.target = '_blank';
        resumeBtnEl.classList.remove('hidden');
        const label = document.getElementById('hero-resume-text');
        if (label) label.textContent = general.resumeButtonLabel || 'Resume';
      } else if (!general.resumeVisible) {
        resumeBtnEl.classList.add('hidden');
      }
    }
  }

  renderAbout() {
    const { about } = this.state;
    if (!about) return;
    const b1 = document.getElementById('about-bio-1');
    const b2 = document.getElementById('about-bio-2');
    const b3 = document.getElementById('about-bio-3');
    if (b1 && about.bio1) b1.innerHTML = about.bio1;
    if (b2 && about.bio2) b2.innerHTML = about.bio2;
    if (b3 && about.bio3) b3.innerHTML = about.bio3;
  }

  renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const visibleSkills = (this.state.skills || [])
      .filter(s => s.visible !== false)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    visibleSkills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'card-surface p-5 rounded-xl space-y-3';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400">
            <i data-lucide="${this.sanitize(skill.icon) || 'check-circle'}" class="w-5 h-5"></i>
          </div>
          <span class="text-xs font-mono text-slate-400">${this.sanitize(skill.category) || 'General'}</span>
        </div>
        <div>
          <h3 class="text-base font-semibold text-white tracking-tight">${this.sanitize(skill.name)}</h3>
          <p class="text-xs text-slate-400 mt-1 leading-relaxed">${this.sanitize(skill.description)}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderProjects(filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const query = searchQuery.toLowerCase().trim();
    const visibleProjects = (this.state.projects || [])
      .filter(p => p.visible !== false)
      .filter(p => {
        if (filterCategory === 'all') return true;
        return (p.category || '').toLowerCase() === filterCategory.toLowerCase();
      })
      .filter(p => {
        if (!query) return true;
        const nameMatch = (p.name || '').toLowerCase().includes(query);
        const descMatch = (p.shortDesc || '').toLowerCase().includes(query);
        const techMatch = (p.techTags || []).some(t => t.toLowerCase().includes(query));
        return nameMatch || descMatch || techMatch;
      })
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    if (visibleProjects.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400 text-sm">
          No projects found matching the selected filter or search term.
        </div>
      `;
      return;
    }

    visibleProjects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'card-surface flex flex-col justify-between overflow-hidden cursor-pointer group';
      
      const statusBadge = proj.status === 'Published' 
        ? '<span class="text-xs font-mono text-emerald-400">Live</span>'
        : (proj.status === 'In Development' 
          ? '<span class="text-xs font-mono text-amber-400">In Development</span>' 
          : '<span class="text-xs font-mono text-slate-400">Draft Reference</span>');

      const tagsHtml = (proj.techTags || [])
        .map(t => `<span class="text-xs font-mono text-slate-400">${this.sanitize(t)}</span>`)
        .join('<span class="text-slate-600">·</span>');

      const liveBtn = proj.liveUrl 
        ? `<a href="${encodeURI(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs py-1.5 px-3 rounded-md flex items-center gap-1.5" onclick="event.stopPropagation()">
            <span>Visit Live</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
           </a>`
        : '';

      const githubBtn = proj.githubUrl
        ? `<a href="${encodeURI(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white p-1.5 rounded" title="View Source" onclick="event.stopPropagation()">
            <i data-lucide="github" class="w-4 h-4"></i>
           </a>`
        : '';

      card.innerHTML = `
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-wider">${this.sanitize(proj.category)}</span>
            ${statusBadge}
          </div>
          
          <div class="space-y-1">
            <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">${this.sanitize(proj.name)}</h3>
            <p class="text-xs text-slate-300 leading-relaxed">${this.sanitize(proj.shortDesc)}</p>
          </div>

          <div class="flex flex-wrap items-center gap-2 pt-2">
            ${tagsHtml}
          </div>
        </div>

        <div class="px-6 py-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-mono flex items-center gap-1">
            <span>Details</span>
            <i data-lucide="arrow-right" class="w-3 h-3"></i>
          </span>
          <div class="flex items-center gap-2">
            ${githubBtn}
            ${liveBtn}
          </div>
        </div>
      `;

      card.addEventListener('click', () => this.openProjectModal(proj));
      grid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  openProjectModal(proj) {
    const modal = document.getElementById('project-modal');
    const container = document.getElementById('project-modal-content');
    if (!modal || !container) return;

    const liveAction = proj.liveUrl 
      ? `<a href="${encodeURI(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-primary py-2 px-4 rounded-lg text-xs font-medium flex items-center gap-1.5">
          <span>Open Live Site</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>`
      : '<span class="text-xs font-mono text-slate-500">Live URL: In Development / Private</span>';

    const githubAction = proj.githubUrl
      ? `<a href="${encodeURI(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-secondary py-2 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5">
          <i data-lucide="github" class="w-4 h-4"></i>
          <span>GitHub</span>
        </a>`
      : '';

    const tagsHtml = (proj.techTags || [])
      .map(t => `<span class="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">${this.sanitize(t)}</span>`)
      .join(' ');

    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>${this.sanitize(proj.category).toUpperCase()}</span>
            <span>·</span>
            <span>${this.sanitize(proj.status)}</span>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-white mb-2 font-heading">${this.sanitize(proj.name)}</h2>
          <p class="text-sm text-slate-300 leading-relaxed">${this.sanitize(proj.detailedDesc || proj.shortDesc)}</p>
        </div>

        <div class="space-y-2 pt-2">
          <h4 class="text-xs font-semibold uppercase text-slate-400 font-mono">Technologies & Concepts</h4>
          <div class="flex flex-wrap gap-2">
            ${tagsHtml}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center gap-3">
          ${liveAction}
          ${githubAction}
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();

    const closeBtn = document.getElementById('project-modal-close');
    if (closeBtn) {
      closeBtn.onclick = () => modal.classList.add('hidden');
    }

    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    };
  }

  renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const visibleServices = (this.state.services || [])
      .filter(s => s.visible !== false)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    visibleServices.forEach(srv => {
      const card = document.createElement('div');
      card.className = 'card-surface p-6 rounded-xl space-y-4 flex flex-col justify-between';
      card.innerHTML = `
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400">
            <i data-lucide="${this.sanitize(srv.icon) || 'briefcase'}" class="w-5 h-5"></i>
          </div>
          <h3 class="text-base font-bold text-white tracking-tight">${this.sanitize(srv.title)}</h3>
          <p class="text-xs text-slate-300 leading-relaxed">${this.sanitize(srv.description)}</p>
        </div>
        <div class="pt-3 border-t border-slate-800/60">
          <a href="#contact" class="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1.5">
            <span>${this.sanitize(srv.ctaText) || 'Inquire'}</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderEducation() {
    const container = document.getElementById('education-timeline');
    if (!container) return;
    container.innerHTML = '';

    const visibleEdu = (this.state.education || [])
      .filter(e => e.visible !== false && e.status !== 'Hidden');

    visibleEdu.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item space-y-1 pb-6';
      
      const statusColor = item.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400';
      const scoreTag = item.score ? `<span class="text-slate-400">· Score: ${this.sanitize(item.score)}</span>` : '';

      el.innerHTML = `
        <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <span>${this.sanitize(item.startYear)} - ${this.sanitize(item.endYear)}</span>
          <span>·</span>
          <span class="${statusColor}">${this.sanitize(item.status)}</span>
          ${scoreTag}
        </div>
        <h3 class="text-base font-bold text-white tracking-tight">${this.sanitize(item.qualification)}</h3>
        <p class="text-xs text-cyan-400 font-medium">${this.sanitize(item.institution)}</p>
        <p class="text-xs text-slate-300 leading-relaxed mt-1">${this.sanitize(item.description)}</p>
      `;
      container.appendChild(el);
    });
  }

  renderContact() {
    const { general, socialLinks } = this.state;
    if (!general) return;

    // Direct WhatsApp Link normalizing to country code 91
    const rawPhone = (general.primaryPhone || '8435205075').replace(/\D/g, '');
    const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20Uwaish,%20I%20found%20your%20portfolio`;

    const waLinkEl = document.getElementById('contact-whatsapp-link');
    const waBtnEl = document.getElementById('btn-quick-whatsapp');
    if (waLinkEl) {
      waLinkEl.href = whatsappUrl;
      waLinkEl.textContent = `+91 ${general.primaryPhone}`;
    }
    if (waBtnEl) {
      waBtnEl.href = whatsappUrl;
    }

    // Social Links
    const socialContainer = document.getElementById('social-links-container');
    if (socialContainer) {
      socialContainer.innerHTML = '';
      (socialLinks || []).filter(s => s.visible !== false).forEach(s => {
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-2 text-xs';
        a.innerHTML = `
          <i data-lucide="${this.sanitize(s.icon) || 'link'}" class="w-4 h-4 text-cyan-400"></i>
          <span>${this.sanitize(s.displayName || s.platform)}</span>
        `;
        socialContainer.appendChild(a);
      });
    }
  }

  setupNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          if (openIcon) openIcon.classList.add('hidden');
          if (closeIcon) closeIcon.classList.remove('hidden');
        } else {
          mobileMenu.classList.add('hidden');
          if (openIcon) openIcon.classList.remove('hidden');
          if (closeIcon) closeIcon.classList.add('hidden');
        }
      });

      // Close mobile menu when link is clicked
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          if (openIcon) openIcon.classList.remove('hidden');
          if (closeIcon) closeIcon.classList.add('hidden');
        });
      });
    }
  }

  setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search-input');

    let currentFilter = 'all';
    let currentSearch = '';

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-slate-800', 'text-white');
          b.classList.add('text-slate-400');
        });
        btn.classList.add('active', 'bg-slate-800', 'text-white');
        btn.classList.remove('text-slate-400');
        currentFilter = btn.getAttribute('data-category') || 'all';
        this.renderProjects(currentFilter, currentSearch);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        this.renderProjects(currentFilter, currentSearch);
      });
    }
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    const statusBox = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = document.getElementById('form-btn-text');
    const btnIcon = document.getElementById('form-btn-icon');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const budget = document.getElementById('form-budget')?.value;
      const message = document.getElementById('form-message')?.value.trim();
      const consent = document.getElementById('form-consent')?.checked;

      if (!name || !phone || !email || !message || !consent) {
        this.showFormStatus('Please complete all required fields and confirm consent.', 'error');
        return;
      }

      // UI Loading state
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending Enquiry...';

      const enquiryData = {
        id: 'enq-' + Date.now(),
        timestamp: new Date().toISOString(),
        name,
        phone,
        email,
        service,
        budget,
        message,
        status: 'New',
        notes: ''
      };

      // 1. Always store locally so enquiries are never lost
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_ENQUIRIES) || '[]');
        stored.unshift(enquiryData);
        localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(stored));
      } catch (err) {
        console.error('LocalStorage error saving enquiry:', err);
      }

      // 2. Post to Google Apps Script Web App if configured
      const backendUrl = localStorage.getItem(STORAGE_KEY_BACKEND);
      let sentToBackend = false;

      if (backendUrl && backendUrl.startsWith('https://script.google.com/')) {
        try {
          const payload = new URLSearchParams();
          payload.append('action', 'submitEnquiry');
          payload.append('data', JSON.stringify(enquiryData));

          await fetch(backendUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload.toString()
          });
          sentToBackend = true;
        } catch (fetchErr) {
          console.warn('Apps Script submission error:', fetchErr);
        }
      }

      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Submit Enquiry';

      const successMsg = sentToBackend
        ? 'Thank you! Your enquiry has been received and saved to our Google Sheets backend. Uwaish will reach out shortly.'
        : 'Thank you! Your enquiry was recorded successfully. Uwaish will contact you via WhatsApp or Email within 24 hours.';

      this.showFormStatus(successMsg, 'success');
      form.reset();
    });
  }

  showFormStatus(message, type = 'success') {
    const box = document.getElementById('form-status');
    if (!box) return;

    box.classList.remove('hidden', 'bg-emerald-950/80', 'text-emerald-300', 'border-emerald-800', 'bg-rose-950/80', 'text-rose-300', 'border-rose-800');
    box.classList.add('border');

    if (type === 'success') {
      box.classList.add('bg-emerald-950/80', 'text-emerald-300', 'border-emerald-800');
    } else {
      box.classList.add('bg-rose-950/80', 'text-rose-300', 'border-rose-800');
    }

    box.textContent = message;
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  setupScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.remove('opacity-0', 'pointer-events-none');
        btn.classList.add('opacity-100');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none');
        btn.classList.remove('opacity-100');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * INTERACTIVE CARD SPOTLIGHT & 3D PERSPECTIVE TILT
   * Apple / Vercel / Linear Style Dynamic Cursor Interaction
   */
  setupCardSpotlightAndTilt() {
    const attachSpotlight = () => {
      const cards = document.querySelectorAll('.card-surface');
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          // 3D Perspective Tilt on project cards
          if (card.closest('#projects-grid') && !this.isReducedMotion) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = -((y - centerY) / centerY) * 5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
          }
        });

        card.addEventListener('mouseleave', () => {
          if (card.closest('#projects-grid')) {
            card.style.transform = '';
          }
        });
      });
    };

    attachSpotlight();
    // Re-attach whenever dynamic cards render
    const origRenderProjects = this.renderProjects.bind(this);
    this.renderProjects = (...args) => {
      origRenderProjects(...args);
      attachSpotlight();
    };
  }

  /**
   * SECRET ADMIN TRIGGER (No Public Links)
   * 1. Click logo 3 times within 1.5 seconds
   * 2. Keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
   */
  setupSecretAdminTrigger() {
    // 1. Triple click on logo
    let clickCount = 0;
    let timer = null;
    const logo = document.querySelector('.brand-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        clickCount++;
        clearTimeout(timer);
        if (clickCount >= 3) {
          clickCount = 0;
          window.location.href = 'admin.html';
          return;
        }
        timer = setTimeout(() => { clickCount = 0; }, 1200);
      });
    }

    // 2. Keyboard shortcut
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.href = 'admin.html';
      }
    });
  }

  /**
   * THREE.JS 3D SCENE — MINIMALIST DARK LUXURY (Apple / Vercel Aesthetic)
   * Procedural Torus Knot Core, Dual Orbital Rings, & Celestial Dust Field
   */
  initThreeJs() {
    const canvas = document.getElementById('hero-three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = document.getElementById('canvas-container');
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 26;

    // Renderer with ACESFilmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (THREE.ACESFilmicToneMapping) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    }

    // Master 3D Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Luxurious Geometric Core (Torus Knot)
    const knotGeo = new THREE.TorusKnotGeometry(4.8, 1.15, 128, 32, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    masterGroup.add(knotMesh);

    // 2. Inner Glowing Core Sphere
    const innerGeo = new THREE.IcosahedronGeometry(2.6, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // 3. Concentric Orbital Rings
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(8.5, 0.05, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
    );
    orbitRing1.rotation.x = Math.PI / 4;
    masterGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(11, 0.04, 16, 140),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.3 })
    );
    orbitRing2.rotation.y = Math.PI / 3;
    masterGroup.add(orbitRing2);

    // 4. Subtle Ambient Floating Cosmic Dust Field
    const starCount = 220;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 60;
      starPositions[i + 1] = (Math.random() - 0.5) * 50;
      starPositions[i + 2] = (Math.random() - 0.5) * 40;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.55
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Lighting Rig
    const keyLight = new THREE.DirectionalLight(0x00d2ff, 1.5);
    keyLight.position.set(10, 10, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xec4899, 1.2);
    fillLight.position.set(-10, -8, -10);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.0);
    scene.add(ambientLight);

    // Mouse Parallax Interaction with Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      const newWidth = container ? container.clientWidth : window.innerWidth;
      const newHeight = container ? container.clientHeight : window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // Page Visibility Handler
    let isPaused = false;
    document.addEventListener('visibilitychange', () => {
      isPaused = document.hidden;
    });

    // Animation Loop
    const animate = () => {
      this.threeAnimationId = requestAnimationFrame(animate);
      if (isPaused) return;

      const speed = this.state.threeSettings?.speed || 1.0;

      // Smooth exponential damping
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      masterGroup.rotation.y += 0.0035 * speed;
      masterGroup.rotation.x += 0.0018 * speed;
      orbitRing1.rotation.z += 0.0025 * speed;
      orbitRing2.rotation.z -= 0.002 * speed;
      starField.rotation.y -= 0.0005 * speed;

      // Parallax rotation
      masterGroup.rotation.y += targetX * 0.25;
      masterGroup.rotation.x += targetY * 0.25;

      renderer.render(scene, camera);
    };

    animate();
    this.threeScene = { scene, renderer };
  }

  async syncFromBackend() {
    const backendUrl = localStorage.getItem(STORAGE_KEY_BACKEND);
    if (!backendUrl || !backendUrl.startsWith('https://script.google.com/')) return;

    try {
      const response = await fetch(`${backendUrl}?action=getPublicData`);
      if (response.ok) {
        const result = await response.json();
        if (result && result.status === 'success' && result.data) {
          this.state = { ...this.state, ...result.data };
          this.saveState();
          this.applyTheme(this.state.theme);
          this.renderHero();
          this.renderSkills();
          this.renderProjects();
          this.renderServices();
          this.renderEducation();
          this.renderContact();
        }
      }
    } catch (err) {
      // Graceful fallback: local state is preserved without error prompt
      console.log('Static fallback active. Backend sync skipped:', err.message);
    }
  }

  sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.uwaishDevApp = new UwaishDevApp();
  window.uwaishDevApp.init();
});
