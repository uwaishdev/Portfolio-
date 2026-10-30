/**
 * ============================================================================
 * UWAISHDEV CONTROL CENTER — ADMIN CONTROLLER (admin.js)
 * Full CRUD, SHA-256 Auth, Theme Studio, Enquiries Inbox, Apps Script Sync
 * ============================================================================
 */

// Storage Keys
const STORAGE_KEY_DATA = 'uwaishdev_portfolio_data';
const STORAGE_KEY_ENQUIRIES = 'uwaishdev_enquiries';
const STORAGE_KEY_AUTH_HASH = 'uwaishdev_admin_hash';
const STORAGE_KEY_AUTH_SESSION = 'uwaishdev_admin_session';
const STORAGE_KEY_BACKEND = 'uwaishdev_backend_url';

// Default initial state (matches script.js)
const DEFAULT_STATE = {
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
    bio1: 'I am a self-directed, AI-assisted web developer and digital marketer based in Kareli, Madhya Pradesh, India. I use modern AI tools to accelerate and refine practical web development, turning real business ideas into usable digital systems, client portals, and lead-generation tools.',
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
    motionMode: 'standard',
    duration: 0.6
  }
};

/**
 * THEME PRESETS
 */
const THEME_PRESETS = {
  'cyber-neon': {
    bgPrimary: '#070a13',
    bgSecondary: '#0d121f',
    accentPrimary: '#00d2ff',
    accentSecondary: '#ec4899',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8'
  },
  'midnight-sapphire': {
    bgPrimary: '#0a0f1d',
    bgSecondary: '#11192e',
    accentPrimary: '#38bdf8',
    accentSecondary: '#818cf8',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8'
  },
  'matrix-emerald': {
    bgPrimary: '#05130b',
    bgSecondary: '#0b2014',
    accentPrimary: '#10b981',
    accentSecondary: '#34d399',
    textPrimary: '#f0fdf4',
    textSecondary: '#a7f3d0'
  },
  'obsidian-violet': {
    bgPrimary: '#0c0714',
    bgSecondary: '#170e26',
    accentPrimary: '#a855f7',
    accentSecondary: '#ec4899',
    textPrimary: '#faf5ff',
    textSecondary: '#d8b4fe'
  }
};

class UwaishDevAdmin {
  constructor() {
    this.state = this.loadState();
    this.enquiries = this.loadEnquiries();
    this.failedAttempts = 0;
    this.currentEditItem = null;
    this.currentEditType = null;
  }

  async init() {
    this.setupAuth();
    this.setupNavigation();
    this.setupQuickSave();
    this.setupThemeStudio();
    this.setupTableActions();
    this.setupModal();
    this.setupBackupRestore();
    this.setupBackendSync();
    this.setupPasswordManager();
    this.setupMobileSidebar();

    // Check existing session
    if (this.isSessionValid()) {
      this.unlockDashboard();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // ==================== AUTHENTICATION ====================
  setupAuth() {
    const authForm = document.getElementById('login-form');
    const pwdInput = document.getElementById('admin-password');
    const alertBox = document.getElementById('login-alert');
    const firstTimeHint = document.getElementById('first-time-hint');
    const logoutBtn = document.getElementById('btn-logout');
    const resetBtn = document.getElementById('btn-emergency-reset');

    const DEFAULT_MASTER_PWD = 'Uwaish@2026';

    // Emergency Reset Handler
    if (resetBtn) {
      resetBtn.addEventListener('click', async () => {
        const defaultHash = await this.hashString(DEFAULT_MASTER_PWD);
        localStorage.setItem(STORAGE_KEY_AUTH_HASH, defaultHash);
        if (pwdInput) pwdInput.value = DEFAULT_MASTER_PWD;
        this.showAuthAlert(`Password reset to default: ${DEFAULT_MASTER_PWD}. Click Authenticate to login.`, 'success');
        this.showToast(`Password reset to: ${DEFAULT_MASTER_PWD}`, 'success');
      });
    }

    if (authForm) {
      authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pwd = pwdInput.value;
        if (!pwd) return;

        // Progressive throttling if multiple failed attempts
        if (this.failedAttempts >= 3) {
          this.showAuthAlert('Too many failed attempts. Please wait 5 seconds before retrying.', 'danger');
          await new Promise(r => setTimeout(r, 5000));
        }

        const inputHash = await this.hashString(pwd);
        const defaultHash = await this.hashString(DEFAULT_MASTER_PWD);

        // Case 1: First time setup or matches default password
        if (!localStorage.getItem(STORAGE_KEY_AUTH_HASH)) {
          localStorage.setItem(STORAGE_KEY_AUTH_HASH, inputHash);
          this.createSession();
          this.showToast('Master password successfully initialized!', 'success');
          this.unlockDashboard();
          return;
        }

        // Case 2: Verification (matches stored hash OR matches master recovery password Uwaish@2026)
        const currentHash = localStorage.getItem(STORAGE_KEY_AUTH_HASH);
        if (inputHash === currentHash || pwd === DEFAULT_MASTER_PWD || inputHash === defaultHash) {
          // Sync stored hash if master recovery password was used
          if (pwd === DEFAULT_MASTER_PWD) {
            localStorage.setItem(STORAGE_KEY_AUTH_HASH, defaultHash);
          }
          this.failedAttempts = 0;
          this.createSession();
          this.unlockDashboard();
          this.showToast('Authentication successful. Welcome, Uwaish!', 'success');
        } else {
          this.failedAttempts++;
          this.showAuthAlert('Incorrect password. Click "Reset to default (Uwaish@2026)" below if you forgot it.', 'danger');
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY_AUTH_SESSION);
        window.location.reload();
      });
    }
  }

  // ==================== PASSWORD MANAGER & GOOGLE SHEETS SYNC ====================
  setupPasswordManager() {
    const form = document.getElementById('password-change-form');
    const newPwdInput = document.getElementById('pwd-new');
    const confirmPwdInput = document.getElementById('pwd-confirm');
    const statusBox = document.getElementById('pwd-change-status');
    const submitBtn = document.getElementById('btn-save-new-pwd');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPwd = newPwdInput.value;
      const confirmPwd = confirmPwdInput.value;

      if (!newPwd || newPwd.length < 6) {
        this.showPasswordStatus('Password must be at least 6 characters long.', 'danger');
        return;
      }

      if (newPwd !== confirmPwd) {
        this.showPasswordStatus('Passwords do not match. Please re-enter.', 'danger');
        return;
      }

      submitBtn.disabled = true;
      this.showPasswordStatus('Encrypting and saving password...', 'info');

      try {
        const newHash = await this.hashString(newPwd);
        localStorage.setItem(STORAGE_KEY_AUTH_HASH, newHash);

        // Sync to Google Sheets if Web App is configured
        const backendUrl = localStorage.getItem(STORAGE_KEY_BACKEND);
        let syncedToSheets = false;

        if (backendUrl && backendUrl.startsWith('https://script.google.com/')) {
          const payload = new URLSearchParams();
          payload.append('action', 'updateAdminPassword');
          payload.append('data', JSON.stringify({ hash: newHash }));

          await fetch(backendUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload.toString()
          });
          syncedToSheets = true;
        }

        form.reset();
        const successMsg = syncedToSheets
          ? 'Password successfully updated and synced to your Google Sheets database!'
          : 'Password successfully updated locally! (Connect Google Apps Script URL in Advanced tab to sync to Google Sheets).';

        this.showPasswordStatus(successMsg, 'success');
        this.showToast('Master password updated!', 'success');
      } catch (err) {
        this.showPasswordStatus('Failed to update password: ' + err.message, 'danger');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  showPasswordStatus(msg, type = 'info') {
    const box = document.getElementById('pwd-change-status');
    if (!box) return;
    box.className = `alert alert-${type === 'info' ? 'success' : type}`;
    box.textContent = msg;
    box.classList.remove('hidden');
  }

  async hashString(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  createSession() {
    const session = {
      token: 'sess_' + Math.random().toString(36).substring(2),
      expiresAt: Date.now() + 8 * 60 * 60 * 1000 // 8 hours
    };
    localStorage.setItem(STORAGE_KEY_AUTH_SESSION, JSON.stringify(session));
  }

  isSessionValid() {
    try {
      const sess = JSON.parse(localStorage.getItem(STORAGE_KEY_AUTH_SESSION));
      if (sess && sess.expiresAt > Date.now()) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  showAuthAlert(msg, type = 'danger') {
    const el = document.getElementById('login-alert');
    if (!el) return;
    el.className = `alert alert-${type}`;
    el.textContent = msg;
    el.classList.remove('hidden');
  }

  unlockDashboard() {
    const modal = document.getElementById('auth-modal');
    const app = document.getElementById('admin-app');
    if (modal) modal.classList.add('hidden');
    if (app) app.classList.remove('hidden');

    this.populateAllForms();
    this.renderOverviewStats();
    this.renderProjectsTable();
    this.renderServicesTable();
    this.renderSkillsTable();
    this.renderEducationTable();
    this.renderSocialsTable();
    this.renderEnquiriesTable();
    if (window.lucide) window.lucide.createIcons();
  }

  // ==================== STATE MANAGEMENT ====================
  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DATA);
      if (stored) return { ...DEFAULT_STATE, ...JSON.parse(stored) };
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(this.state));
      this.updateSaveIndicator('Changes Saved', 'saved');
      this.renderOverviewStats();
    } catch (e) {
      console.error('Save state failed:', e);
      this.showToast('Failed to save state locally', 'danger');
    }
  }

  loadEnquiries() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_ENQUIRIES) || '[]');
    } catch (e) {
      return [];
    }
  }

  saveEnquiries() {
    try {
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(this.enquiries));
      this.renderEnquiriesTable();
      this.renderOverviewStats();
    } catch (e) {}
  }

  updateSaveIndicator(text, status) {
    const el = document.getElementById('save-status-indicator');
    if (!el) return;
    el.textContent = text;
    el.className = `status-pill status-${status}`;
  }

  // ==================== POPULATE FORMS ====================
  populateAllForms() {
    const { general, about, theme, threeSettings, animationSettings } = this.state;

    // General
    this.setVal('cfg-brandName', general?.brandName);
    this.setVal('cfg-personalName', general?.personalName);
    this.setVal('cfg-brandHandle', general?.brandHandle);
    this.setVal('cfg-professionalTitle', general?.professionalTitle);
    this.setVal('cfg-tagline', general?.tagline);
    this.setVal('cfg-location', general?.location);

    // Profile & Hero
    this.setVal('cfg-introCopy', general?.introCopy);
    this.setVal('cfg-profilePhotoUrl', general?.profilePhotoUrl);
    this.setVal('cfg-profileFrameStyle', general?.profileFrameStyle || 'rounded');
    this.setVal('cfg-resumeUrl', general?.resumeUrl);
    this.setVal('cfg-resumeButtonLabel', general?.resumeButtonLabel || 'Download Resume');
    this.setVal('cfg-resumeVisible', String(general?.resumeVisible !== false));

    // About
    this.setVal('cfg-about-bio1', about?.bio1);
    this.setVal('cfg-about-bio2', about?.bio2);
    this.setVal('cfg-about-bio3', about?.bio3);

    // Contacts
    this.setVal('cfg-primaryPhone', general?.primaryPhone || '8435205075');
    this.setVal('cfg-secondaryPhone', general?.secondaryPhone || '7470832663');
    this.setVal('cfg-email', general?.email || 'uwaishk082@gmail.com');
    this.setVal('cfg-publicPhoneVisible', String(general?.publicPhoneVisible !== false));

    // Resume tab duplicates
    this.setVal('cfg-resume-url-2', general?.resumeUrl);
    this.setVal('cfg-resume-label-2', general?.resumeButtonLabel);
    this.setVal('cfg-resume-visible-2', String(general?.resumeVisible !== false));

    // Theme Studio
    this.setVal('theme-bgPrimary', theme?.bgPrimary || '#070a13');
    this.setVal('theme-bgPrimary-text', theme?.bgPrimary || '#070a13');
    this.setVal('theme-bgSecondary', theme?.bgSecondary || '#0d121f');
    this.setVal('theme-bgSecondary-text', theme?.bgSecondary || '#0d121f');
    this.setVal('theme-accentPrimary', theme?.accentPrimary || '#00d2ff');
    this.setVal('theme-accentPrimary-text', theme?.accentPrimary || '#00d2ff');
    this.setVal('theme-accentSecondary', theme?.accentSecondary || '#ec4899');
    this.setVal('theme-accentSecondary-text', theme?.accentSecondary || '#ec4899');
    this.setVal('theme-textPrimary', theme?.textPrimary || '#f8fafc');
    this.setVal('theme-textPrimary-text', theme?.textPrimary || '#f8fafc');
    this.setVal('theme-textSecondary', theme?.textSecondary || '#94a3b8');
    this.setVal('theme-textSecondary-text', theme?.textSecondary || '#94a3b8');
    this.setVal('theme-cardRadius', theme?.cardRadius || '12px');
    this.setVal('theme-btnRadius', theme?.btnRadius || '8px');

    // 3D Scene
    this.setVal('cfg-three-enabled', String(threeSettings?.enabled !== false));
    this.setVal('cfg-three-preset', threeSettings?.preset || 'cyber-core');
    this.setVal('cfg-three-speed', threeSettings?.speed || 1.0);
    const speedValEl = document.getElementById('cfg-three-speed-val');
    if (speedValEl) speedValEl.textContent = (threeSettings?.speed || 1.0) + 'x';
    this.setVal('cfg-three-parallax', String(threeSettings?.mouseParallax !== false));

    // Animations
    this.setVal('cfg-anim-mode', animationSettings?.motionMode || 'standard');

    // Backend URL
    const backendUrl = localStorage.getItem(STORAGE_KEY_BACKEND) || '';
    this.setVal('cfg-backend-url', backendUrl);
    this.updateBackendStatusText(backendUrl);

    // Watch for input changes to mark unsaved
    document.querySelectorAll('.form-control, .form-range').forEach(input => {
      input.addEventListener('input', () => {
        this.updateSaveIndicator('Unsaved Changes', 'unsaved');
      });
    });
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) {
      el.value = val;
    }
  }

  getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // ==================== NAVIGATION TABS ====================
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewTitle = document.getElementById('current-view-title');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = item.getAttribute('data-tab');
        if (!targetTab) return;

        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.view-panel').forEach(panel => {
          panel.classList.remove('active');
        });

        const targetPanel = document.getElementById(`view-${targetTab}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
          if (viewTitle) {
            viewTitle.textContent = item.querySelector('span')?.textContent || 'Dashboard';
          }
        }

        // Close mobile sidebar if open
        const sidebar = document.getElementById('admin-sidebar');
        if (sidebar && window.innerWidth < 992) {
          sidebar.classList.remove('open');
        }
      });
    });
  }

  setupMobileSidebar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('admin-sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }

  // ==================== QUICK SAVE ====================
  setupQuickSave() {
    const saveBtn = document.getElementById('btn-quick-save');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
      this.collectFormData();
      this.saveState();
      this.showToast('All configurations saved successfully!', 'success');
    });
  }

  collectFormData() {
    // General
    this.state.general.brandName = this.getVal('cfg-brandName') || 'UWAISHDEV';
    this.state.general.personalName = this.getVal('cfg-personalName') || 'UWAISH';
    this.state.general.brandHandle = this.getVal('cfg-brandHandle') || '@uwaishdev';
    this.state.general.professionalTitle = this.getVal('cfg-professionalTitle') || 'Web Developer & Digital Marketer';
    this.state.general.tagline = this.getVal('cfg-tagline') || 'Code • Create • Grow';
    this.state.general.location = this.getVal('cfg-location') || 'Kareli, Madhya Pradesh, India';

    // Hero & Profile
    this.state.general.introCopy = this.getVal('cfg-introCopy');
    this.state.general.profilePhotoUrl = this.getVal('cfg-profilePhotoUrl');
    this.state.general.profileFrameStyle = this.getVal('cfg-profileFrameStyle');
    this.state.general.resumeUrl = this.getVal('cfg-resumeUrl');
    this.state.general.resumeButtonLabel = this.getVal('cfg-resumeButtonLabel') || 'Download Resume';
    this.state.general.resumeVisible = this.getVal('cfg-resumeVisible') === 'true';

    // About
    this.state.about.bio1 = this.getVal('cfg-about-bio1');
    this.state.about.bio2 = this.getVal('cfg-about-bio2');
    this.state.about.bio3 = this.getVal('cfg-about-bio3');

    // Contacts
    this.state.general.primaryPhone = this.getVal('cfg-primaryPhone');
    this.state.general.secondaryPhone = this.getVal('cfg-secondaryPhone');
    this.state.general.email = this.getVal('cfg-email');
    this.state.general.publicPhoneVisible = this.getVal('cfg-publicPhoneVisible') === 'true';

    // Theme
    this.state.theme.bgPrimary = this.getVal('theme-bgPrimary-text') || this.getVal('theme-bgPrimary');
    this.state.theme.bgSecondary = this.getVal('theme-bgSecondary-text') || this.getVal('theme-bgSecondary');
    this.state.theme.accentPrimary = this.getVal('theme-accentPrimary-text') || this.getVal('theme-accentPrimary');
    this.state.theme.accentSecondary = this.getVal('theme-accentSecondary-text') || this.getVal('theme-accentSecondary');
    this.state.theme.textPrimary = this.getVal('theme-textPrimary-text') || this.getVal('theme-textPrimary');
    this.state.theme.textSecondary = this.getVal('theme-textSecondary-text') || this.getVal('theme-textSecondary');
    this.state.theme.cardRadius = this.getVal('theme-cardRadius') || '12px';
    this.state.theme.btnRadius = this.getVal('theme-btnRadius') || '8px';

    // 3D Scene
    this.state.threeSettings.enabled = this.getVal('cfg-three-enabled') === 'true';
    this.state.threeSettings.preset = this.getVal('cfg-three-preset');
    this.state.threeSettings.speed = parseFloat(this.getVal('cfg-three-speed')) || 1.0;
    this.state.threeSettings.mouseParallax = this.getVal('cfg-three-parallax') === 'true';

    // Animations
    this.state.animationSettings.motionMode = this.getVal('cfg-anim-mode');

    // Backend URL
    const backendUrl = this.getVal('cfg-backend-url');
    localStorage.setItem(STORAGE_KEY_BACKEND, backendUrl);
    this.updateBackendStatusText(backendUrl);
  }

  // ==================== OVERVIEW STATS ====================
  renderOverviewStats() {
    const elProjects = document.getElementById('stat-projects-count');
    const elEnquiries = document.getElementById('stat-enquiries-count');
    const elServices = document.getElementById('stat-services-count');
    const elSkills = document.getElementById('stat-skills-count');
    const badgeEnquiries = document.getElementById('badge-enquiries-count');

    if (elProjects) elProjects.textContent = (this.state.projects || []).length;
    if (elEnquiries) elEnquiries.textContent = this.enquiries.length;
    if (elServices) elServices.textContent = (this.state.services || []).length;
    if (elSkills) elSkills.textContent = (this.state.skills || []).length;
    if (badgeEnquiries) badgeEnquiries.textContent = this.enquiries.filter(e => e.status === 'New').length;
  }

  updateBackendStatusText(url) {
    const textEl = document.getElementById('backend-status-text');
    if (!textEl) return;
    if (url && url.startsWith('https://script.google.com/')) {
      textEl.innerHTML = '<span class="text-green font-bold">Connected:</span> Web App configured for Google Sheets synchronization.';
    } else {
      textEl.textContent = 'Local fallback active. Connect your Web App URL in Advanced Settings.';
    }
  }

  // ==================== PROJECTS CRUD ====================
  renderProjectsTable() {
    const tbody = document.getElementById('projects-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (this.state.projects || []).forEach(p => {
      const tr = document.createElement('tr');
      const badgeClass = p.status === 'Published' ? 'badge-success' : (p.status === 'In Development' ? 'badge-warning' : 'badge-muted');
      tr.innerHTML = `
        <td><strong>${this.escape(p.name)}</strong></td>
        <td><span class="text-muted font-mono">${this.escape(p.category)}</span></td>
        <td><span class="badge ${badgeClass}">${this.escape(p.status)}</span></td>
        <td>${p.liveUrl ? `<a href="${encodeURI(p.liveUrl)}" target="_blank" class="text-blue text-sm">Open Link</a>` : '<span class="text-muted">Draft / None</span>'}</td>
        <td>
          <div class="flex-gap">
            <button class="btn btn-secondary btn-sm" onclick="window.adminApp.openEditItem('project', '${p.id}')">Edit</button>
            <button class="btn btn-outline-danger btn-sm" onclick="window.adminApp.deleteItem('project', '${p.id}')">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==================== SERVICES CRUD ====================
  renderServicesTable() {
    const tbody = document.getElementById('services-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (this.state.services || []).forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${this.escape(s.title)}</strong></td>
        <td><span class="font-mono text-muted">${this.escape(s.icon || 'briefcase')}</span></td>
        <td><span class="text-muted">${this.escape(s.ctaText || 'Inquire')}</span></td>
        <td><span class="badge badge-success">Active</span></td>
        <td>
          <div class="flex-gap">
            <button class="btn btn-secondary btn-sm" onclick="window.adminApp.openEditItem('service', '${s.id}')">Edit</button>
            <button class="btn btn-outline-danger btn-sm" onclick="window.adminApp.deleteItem('service', '${s.id}')">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==================== SKILLS CRUD ====================
  renderSkillsTable() {
    const tbody = document.getElementById('skills-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (this.state.skills || []).forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${this.escape(s.name)}</strong></td>
        <td><span class="font-mono text-muted">${this.escape(s.category)}</span></td>
        <td><span class="font-mono text-muted">${this.escape(s.icon || 'code')}</span></td>
        <td>
          <div class="flex-gap">
            <button class="btn btn-secondary btn-sm" onclick="window.adminApp.openEditItem('skill', '${s.id}')">Edit</button>
            <button class="btn btn-outline-danger btn-sm" onclick="window.adminApp.deleteItem('skill', '${s.id}')">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==================== EDUCATION CRUD ====================
  renderEducationTable() {
    const tbody = document.getElementById('education-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (this.state.education || []).forEach(e => {
      const tr = document.createElement('tr');
      const badgeClass = e.status === 'Completed' ? 'badge-success' : 'badge-warning';
      tr.innerHTML = `
        <td><strong>${this.escape(e.qualification)}</strong></td>
        <td>${this.escape(e.institution)}</td>
        <td><span class="font-mono text-muted">${this.escape(e.startYear)} - ${this.escape(e.endYear)}</span></td>
        <td><span class="badge ${badgeClass}">${this.escape(e.status)}</span></td>
        <td>
          <div class="flex-gap">
            <button class="btn btn-secondary btn-sm" onclick="window.adminApp.openEditItem('education', '${e.id}')">Edit</button>
            <button class="btn btn-outline-danger btn-sm" onclick="window.adminApp.deleteItem('education', '${e.id}')">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==================== SOCIALS CRUD ====================
  renderSocialsTable() {
    const tbody = document.getElementById('socials-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (this.state.socialLinks || []).forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${this.escape(s.platform)}</strong></td>
        <td>${this.escape(s.displayName)}</td>
        <td><a href="${encodeURI(s.url)}" target="_blank" class="text-blue">${this.escape(s.url)}</a></td>
        <td><span class="badge badge-success">Visible</span></td>
        <td>
          <div class="flex-gap">
            <button class="btn btn-secondary btn-sm" onclick="window.adminApp.openEditItem('social', '${s.id}')">Edit</button>
            <button class="btn btn-outline-danger btn-sm" onclick="window.adminApp.deleteItem('social', '${s.id}')">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==================== ENQUIRIES INBOX ====================
  renderEnquiriesTable() {
    const tbody = document.getElementById('enquiries-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (this.enquiries.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center text-muted py-4">No enquiries received yet. Submissions from the contact form will appear here.</td>
        </tr>
      `;
      return;
    }

    this.enquiries.forEach((enq, index) => {
      const tr = document.createElement('tr');
      const timeStr = enq.timestamp ? new Date(enq.timestamp).toLocaleDateString() + ' ' + new Date(enq.timestamp).toLocaleTimeString() : 'N/A';
      
      const cleanPhone = (enq.phone || '').replace(/\D/g, '');
      const waLink = cleanPhone ? `https://wa.me/91${cleanPhone.slice(-10)}` : '#';

      tr.innerHTML = `
        <td class="font-mono text-xs">${timeStr}</td>
        <td>
          <strong>${this.escape(enq.name)}</strong>
          <div class="text-xs text-muted">${this.escape(enq.email)}</div>
        </td>
        <td>
          <a href="${waLink}" target="_blank" class="text-green flex-gap text-xs">
            <i data-lucide="message-circle" class="icon-xs"></i>
            <span>${this.escape(enq.phone)}</span>
          </a>
        </td>
        <td>${this.escape(enq.service || 'General')}</td>
        <td><span class="text-muted text-xs">${this.escape(enq.budget || 'Unspecified')}</span></td>
        <td>
          <select class="form-control btn-sm" onchange="window.adminApp.updateEnquiryStatus(${index}, this.value)">
            <option value="New" ${enq.status === 'New' ? 'selected' : ''}>New</option>
            <option value="Pending" ${enq.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Contacted" ${enq.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Qualified" ${enq.status === 'Qualified' ? 'selected' : ''}>Qualified</option>
            <option value="Closed" ${enq.status === 'Closed' ? 'selected' : ''}>Closed</option>
            <option value="Spam" ${enq.status === 'Spam' ? 'selected' : ''}>Spam</option>
          </select>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="window.adminApp.viewEnquiryDetails(${index})">View Note</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  updateEnquiryStatus(index, newStatus) {
    if (this.enquiries[index]) {
      this.enquiries[index].status = newStatus;
      this.saveEnquiries();
      this.showToast(`Enquiry status updated to ${newStatus}`, 'success');
    }
  }

  viewEnquiryDetails(index) {
    const enq = this.enquiries[index];
    if (!enq) return;

    const modal = document.getElementById('item-modal');
    const title = document.getElementById('item-modal-title');
    const body = document.getElementById('item-modal-body');
    const saveBtn = document.getElementById('item-modal-save');

    if (title) title.textContent = `Enquiry from ${enq.name}`;
    if (saveBtn) saveBtn.textContent = 'Save Notes';

    body.innerHTML = `
      <div class="space-y-3">
        <div>
          <label class="font-bold text-xs">Message</label>
          <div class="p-3 bg-slate-50 border rounded text-sm">${this.escape(enq.message)}</div>
        </div>
        <div class="form-group">
          <label class="font-bold text-xs">Internal Admin Notes</label>
          <textarea id="modal-enquiry-notes" rows="4" class="form-control">${this.escape(enq.notes || '')}</textarea>
        </div>
      </div>
    `;

    this.currentEditType = 'enquiry-note';
    this.currentEditItem = index;
    modal.classList.remove('hidden');
  }

  // ==================== THEME STUDIO ====================
  setupThemeStudio() {
    // Color Swatch to Text Sync
    const pairs = [
      ['theme-bgPrimary', 'theme-bgPrimary-text'],
      ['theme-bgSecondary', 'theme-bgSecondary-text'],
      ['theme-accentPrimary', 'theme-accentPrimary-text'],
      ['theme-accentSecondary', 'theme-accentSecondary-text'],
      ['theme-textPrimary', 'theme-textPrimary-text'],
      ['theme-textSecondary', 'theme-textSecondary-text']
    ];

    pairs.forEach(([colorId, textId]) => {
      const c = document.getElementById(colorId);
      const t = document.getElementById(textId);
      if (c && t) {
        c.addEventListener('input', () => { t.value = c.value; });
        t.addEventListener('input', () => { c.value = t.value; });
      }
    });

    // Theme Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pKey = btn.getAttribute('data-preset');
        const preset = THEME_PRESETS[pKey];
        if (preset) {
          this.setVal('theme-bgPrimary', preset.bgPrimary);
          this.setVal('theme-bgPrimary-text', preset.bgPrimary);
          this.setVal('theme-bgSecondary', preset.bgSecondary);
          this.setVal('theme-bgSecondary-text', preset.bgSecondary);
          this.setVal('theme-accentPrimary', preset.accentPrimary);
          this.setVal('theme-accentPrimary-text', preset.accentPrimary);
          this.setVal('theme-accentSecondary', preset.accentSecondary);
          this.setVal('theme-accentSecondary-text', preset.accentSecondary);
          this.setVal('theme-textPrimary', preset.textPrimary);
          this.setVal('theme-textPrimary-text', preset.textPrimary);
          this.setVal('theme-textSecondary', preset.textSecondary);
          this.setVal('theme-textSecondary-text', preset.textSecondary);
          this.showToast(`Applied preset: ${btn.textContent}`, 'success');
        }
      });
    });

    // Reset Theme
    const resetBtn = document.getElementById('btn-reset-theme');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.state.theme = { ...DEFAULT_STATE.theme };
        this.populateAllForms();
        this.showToast('Theme reset to default futuristic dark', 'success');
      });
    }

    // Apply & Save Theme
    const applyBtn = document.getElementById('btn-apply-theme');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.collectFormData();
        this.saveState();
        this.showToast('Theme saved! Refresh index.html to see changes.', 'success');
      });
    }

    // Speed Slider Live Feedback
    const speedRange = document.getElementById('cfg-three-speed');
    const speedVal = document.getElementById('cfg-three-speed-val');
    if (speedRange && speedVal) {
      speedRange.addEventListener('input', (e) => {
        speedVal.textContent = e.target.value + 'x';
      });
    }
  }

  // ==================== MODAL SYSTEM ====================
  setupModal() {
    const modal = document.getElementById('item-modal');
    const closeBtn = document.getElementById('item-modal-close');
    const cancelBtn = document.getElementById('item-modal-cancel');
    const saveBtn = document.getElementById('item-modal-save');

    const closeModal = () => {
      if (modal) modal.classList.add('hidden');
      this.currentEditItem = null;
      this.currentEditType = null;
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (saveBtn) {
      saveBtn.onclick = () => {
        this.saveModalItem();
        closeModal();
      };
    }
  }

  openEditItem(type, id) {
    const modal = document.getElementById('item-modal');
    const title = document.getElementById('item-modal-title');
    const body = document.getElementById('item-modal-body');
    const saveBtn = document.getElementById('item-modal-save');
    if (!modal || !body) return;

    this.currentEditType = type;
    this.currentEditItem = id;
    if (saveBtn) saveBtn.textContent = 'Save Record';

    if (type === 'project') {
      const item = id ? this.state.projects.find(p => p.id === id) : { name: '', category: 'live', status: 'Published', liveUrl: '', githubUrl: '', shortDesc: '', techTags: [] };
      if (title) title.textContent = id ? `Edit Project: ${item.name}` : 'Add New Project';

      body.innerHTML = `
        <div class="form-grid">
          <div class="form-group span-2">
            <label>Project Name *</label>
            <input type="text" id="m-proj-name" required value="${this.escape(item.name)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>Category</label>
            <select id="m-proj-category" class="form-control">
              <option value="live" ${item.category === 'live' ? 'selected' : ''}>Live Web</option>
              <option value="b2b" ${item.category === 'b2b' ? 'selected' : ''}>B2B & CRM</option>
              <option value="creative" ${item.category === 'creative' ? 'selected' : ''}>Creative & Cards</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="m-proj-status" class="form-control">
              <option value="Published" ${item.status === 'Published' ? 'selected' : ''}>Published (Live)</option>
              <option value="In Development" ${item.status === 'In Development' ? 'selected' : ''}>In Development</option>
              <option value="Draft" ${item.status === 'Draft' ? 'selected' : ''}>Draft Reference</option>
            </select>
          </div>
          <div class="form-group span-2">
            <label>Live Website URL</label>
            <input type="url" id="m-proj-liveUrl" value="${this.escape(item.liveUrl || '')}" placeholder="https://..." class="form-control" />
          </div>
          <div class="form-group span-2">
            <label>GitHub Repository URL</label>
            <input type="url" id="m-proj-githubUrl" value="${this.escape(item.githubUrl || '')}" placeholder="https://github.com/..." class="form-control" />
          </div>
          <div class="form-group span-2">
            <label>Short Description *</label>
            <textarea id="m-proj-shortDesc" rows="2" class="form-control">${this.escape(item.shortDesc || '')}</textarea>
          </div>
          <div class="form-group span-2">
            <label>Technologies (Comma separated)</label>
            <input type="text" id="m-proj-tags" value="${(item.techTags || []).join(', ')}" class="form-control" placeholder="HTML5, CSS3, JavaScript" />
          </div>
        </div>
      `;
    } else if (type === 'service') {
      const item = id ? this.state.services.find(s => s.id === id) : { title: '', description: '', icon: 'briefcase', ctaText: 'Request Service' };
      if (title) title.textContent = id ? `Edit Service: ${item.title}` : 'Add New Service';

      body.innerHTML = `
        <div class="form-grid">
          <div class="form-group span-2">
            <label>Service Title *</label>
            <input type="text" id="m-srv-title" required value="${this.escape(item.title)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>Lucide Icon Name</label>
            <input type="text" id="m-srv-icon" value="${this.escape(item.icon || 'briefcase')}" class="form-control" />
          </div>
          <div class="form-group">
            <label>CTA Button Text</label>
            <input type="text" id="m-srv-cta" value="${this.escape(item.ctaText || 'Get Started')}" class="form-control" />
          </div>
          <div class="form-group span-2">
            <label>Description</label>
            <textarea id="m-srv-desc" rows="3" class="form-control">${this.escape(item.description || '')}</textarea>
          </div>
        </div>
      `;
    } else if (type === 'skill') {
      const item = id ? this.state.skills.find(s => s.id === id) : { name: '', category: 'Web Development', icon: 'code', description: '' };
      if (title) title.textContent = id ? `Edit Skill: ${item.name}` : 'Add New Skill';

      body.innerHTML = `
        <div class="form-grid">
          <div class="form-group span-2">
            <label>Skill Name *</label>
            <input type="text" id="m-sk-name" required value="${this.escape(item.name)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>Category</label>
            <input type="text" id="m-sk-cat" value="${this.escape(item.category)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>Lucide Icon Name</label>
            <input type="text" id="m-sk-icon" value="${this.escape(item.icon || 'code')}" class="form-control" />
          </div>
          <div class="form-group span-2">
            <label>Description</label>
            <textarea id="m-sk-desc" rows="2" class="form-control">${this.escape(item.description || '')}</textarea>
          </div>
        </div>
      `;
    } else if (type === 'education') {
      const item = id ? this.state.education.find(e => e.id === id) : { qualification: '', institution: '', score: '', startYear: '2023', endYear: '2026', status: 'Completed', description: '' };
      if (title) title.textContent = id ? `Edit Education: ${item.qualification}` : 'Add Academic Record';

      body.innerHTML = `
        <div class="form-grid">
          <div class="form-group span-2">
            <label>Qualification / Degree *</label>
            <input type="text" id="m-edu-qual" required value="${this.escape(item.qualification)}" class="form-control" />
          </div>
          <div class="form-group span-2">
            <label>Institution / Board</label>
            <input type="text" id="m-edu-inst" value="${this.escape(item.institution)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>Academic Score / Percentage</label>
            <input type="text" id="m-edu-score" value="${this.escape(item.score || '')}" placeholder="e.g. 76%" class="form-control" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select id="m-edu-status" class="form-control">
              <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Pursuing / Ongoing" ${item.status === 'Pursuing / Ongoing' ? 'selected' : ''}>Pursuing / Ongoing</option>
              <option value="Enrolled / Paused" ${item.status === 'Enrolled / Paused' ? 'selected' : ''}>Enrolled / Paused</option>
              <option value="Hidden" ${item.status === 'Hidden' ? 'selected' : ''}>Hidden</option>
            </select>
          </div>
          <div class="form-group">
            <label>Start Year</label>
            <input type="text" id="m-edu-start" value="${this.escape(item.startYear)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>End Year</label>
            <input type="text" id="m-edu-end" value="${this.escape(item.endYear)}" class="form-control" />
          </div>
          <div class="form-group span-2">
            <label>Description / Notes</label>
            <textarea id="m-edu-desc" rows="2" class="form-control">${this.escape(item.description || '')}</textarea>
          </div>
        </div>
      `;
    } else if (type === 'social') {
      const item = id ? this.state.socialLinks.find(s => s.id === id) : { platform: 'GitHub', displayName: '', url: 'https://', icon: 'link' };
      if (title) title.textContent = id ? `Edit Social: ${item.platform}` : 'Add Social Channel';

      body.innerHTML = `
        <div class="form-grid">
          <div class="form-group">
            <label>Platform Name</label>
            <input type="text" id="m-soc-plat" required value="${this.escape(item.platform)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>Display Name</label>
            <input type="text" id="m-soc-name" value="${this.escape(item.displayName)}" class="form-control" />
          </div>
          <div class="form-group span-2">
            <label>Target URL</label>
            <input type="url" id="m-soc-url" required value="${this.escape(item.url)}" class="form-control" />
          </div>
          <div class="form-group">
            <label>Icon Name (Lucide)</label>
            <input type="text" id="m-soc-icon" value="${this.escape(item.icon || 'link')}" class="form-control" />
          </div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
  }

  saveModalItem() {
    const type = this.currentEditType;
    const id = this.currentEditItem;

    if (type === 'enquiry-note') {
      const notes = this.getVal('modal-enquiry-notes');
      if (this.enquiries[id]) {
        this.enquiries[id].notes = notes;
        this.saveEnquiries();
        this.showToast('Enquiry notes updated.', 'success');
      }
      return;
    }

    if (type === 'project') {
      const name = this.getVal('m-proj-name');
      if (!name) return;
      const category = this.getVal('m-proj-category');
      const status = this.getVal('m-proj-status');
      const liveUrl = this.getVal('m-proj-liveUrl');
      const githubUrl = this.getVal('m-proj-githubUrl');
      const shortDesc = this.getVal('m-proj-shortDesc');
      const tags = this.getVal('m-proj-tags').split(',').map(t => t.trim()).filter(Boolean);

      if (id) {
        const item = this.state.projects.find(p => p.id === id);
        if (item) {
          Object.assign(item, { name, category, status, liveUrl, githubUrl, shortDesc, techTags: tags });
        }
      } else {
        this.state.projects.push({
          id: 'proj-' + Date.now(),
          name, category, status, liveUrl, githubUrl, shortDesc, techTags: tags, visible: true
        });
      }
      this.saveState();
      this.renderProjectsTable();
    } else if (type === 'service') {
      const title = this.getVal('m-srv-title');
      if (!title) return;
      const icon = this.getVal('m-srv-icon');
      const ctaText = this.getVal('m-srv-cta');
      const description = this.getVal('m-srv-desc');

      if (id) {
        const item = this.state.services.find(s => s.id === id);
        if (item) Object.assign(item, { title, icon, ctaText, description });
      } else {
        this.state.services.push({ id: 'srv-' + Date.now(), title, icon, ctaText, description, visible: true });
      }
      this.saveState();
      this.renderServicesTable();
    } else if (type === 'skill') {
      const name = this.getVal('m-sk-name');
      if (!name) return;
      const category = this.getVal('m-sk-cat');
      const icon = this.getVal('m-sk-icon');
      const description = this.getVal('m-sk-desc');

      if (id) {
        const item = this.state.skills.find(s => s.id === id);
        if (item) Object.assign(item, { name, category, icon, description });
      } else {
        this.state.skills.push({ id: 'sk-' + Date.now(), name, category, icon, description, visible: true });
      }
      this.saveState();
      this.renderSkillsTable();
    } else if (type === 'education') {
      const qualification = this.getVal('m-edu-qual');
      if (!qualification) return;
      const institution = this.getVal('m-edu-inst');
      const score = this.getVal('m-edu-score');
      const status = this.getVal('m-edu-status');
      const startYear = this.getVal('m-edu-start');
      const endYear = this.getVal('m-edu-end');
      const description = this.getVal('m-edu-desc');

      if (id) {
        const item = this.state.education.find(e => e.id === id);
        if (item) Object.assign(item, { qualification, institution, score, status, startYear, endYear, description });
      } else {
        this.state.education.push({ id: 'edu-' + Date.now(), qualification, institution, score, status, startYear, endYear, description, visible: true });
      }
      this.saveState();
      this.renderEducationTable();
    } else if (type === 'social') {
      const platform = this.getVal('m-soc-plat');
      const displayName = this.getVal('m-soc-name');
      const url = this.getVal('m-soc-url');
      const icon = this.getVal('m-soc-icon');

      if (id) {
        const item = this.state.socialLinks.find(s => s.id === id);
        if (item) Object.assign(item, { platform, displayName, url, icon });
      } else {
        this.state.socialLinks.push({ id: 'soc-' + Date.now(), platform, displayName, url, icon, visible: true });
      }
      this.saveState();
      this.renderSocialsTable();
    }

    this.showToast('Item saved successfully!', 'success');
  }

  deleteItem(type, id) {
    if (!confirm('Are you sure you want to remove this record?')) return;

    if (type === 'project') {
      this.state.projects = this.state.projects.filter(p => p.id !== id);
      this.renderProjectsTable();
    } else if (type === 'service') {
      this.state.services = this.state.services.filter(s => s.id !== id);
      this.renderServicesTable();
    } else if (type === 'skill') {
      this.state.skills = this.state.skills.filter(s => s.id !== id);
      this.renderSkillsTable();
    } else if (type === 'education') {
      this.state.education = this.state.education.filter(e => e.id !== id);
      this.renderEducationTable();
    } else if (type === 'social') {
      this.state.socialLinks = this.state.socialLinks.filter(s => s.id !== id);
      this.renderSocialsTable();
    }

    this.saveState();
    this.showToast('Record deleted.', 'success');
  }

  setupTableActions() {
    const addProjBtn = document.getElementById('btn-add-project');
    const addSrvBtn = document.getElementById('btn-add-service');
    const addSkBtn = document.getElementById('btn-add-skill');
    const addEduBtn = document.getElementById('btn-add-education');
    const addSocBtn = document.getElementById('btn-add-social');
    const clearEnqBtn = document.getElementById('btn-clear-enquiries');
    const exportCsvBtn = document.getElementById('btn-export-enquiries-csv');

    if (addProjBtn) addProjBtn.onclick = () => this.openEditItem('project', null);
    if (addSrvBtn) addSrvBtn.onclick = () => this.openEditItem('service', null);
    if (addSkBtn) addSkBtn.onclick = () => this.openEditItem('skill', null);
    if (addEduBtn) addEduBtn.onclick = () => this.openEditItem('education', null);
    if (addSocBtn) addSocBtn.onclick = () => this.openEditItem('social', null);

    if (clearEnqBtn) {
      clearEnqBtn.onclick = () => {
        if (confirm('Clear all stored enquiry records?')) {
          this.enquiries = [];
          this.saveEnquiries();
          this.showToast('Enquiries inbox cleared.', 'success');
        }
      };
    }

    if (exportCsvBtn) {
      exportCsvBtn.onclick = () => this.exportEnquiriesCSV();
    }
  }

  exportEnquiriesCSV() {
    if (this.enquiries.length === 0) {
      this.showToast('No enquiries to export.', 'danger');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,Timestamp,Name,Phone,Email,Service,Budget,Status,Notes\n';
    this.enquiries.forEach(e => {
      const row = [
        `"${e.timestamp || ''}"`,
        `"${(e.name || '').replace(/"/g, '""')}"`,
        `"${(e.phone || '').replace(/"/g, '""')}"`,
        `"${(e.email || '').replace(/"/g, '""')}"`,
        `"${(e.service || '').replace(/"/g, '""')}"`,
        `"${(e.budget || '').replace(/"/g, '""')}"`,
        `"${(e.status || '').replace(/"/g, '""')}"`,
        `"${(e.notes || '').replace(/"/g, '""')}"`
      ];
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `uwaishdev_enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('CSV downloaded successfully.', 'success');
  }

  // ==================== BACKUP & RESTORE ====================
  setupBackupRestore() {
    const exportBtn = document.getElementById('btn-export-backup');
    const triggerRestore = document.getElementById('btn-trigger-restore');
    const restoreInput = document.getElementById('file-restore-input');
    const resetDefaults = document.getElementById('btn-reset-defaults');

    if (exportBtn) {
      exportBtn.onclick = () => {
        const fullBackup = {
          version: '2.0.0',
          exportedAt: new Date().toISOString(),
          data: this.state,
          enquiries: this.enquiries
        };
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `uwaishdev_backup_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        this.showToast('JSON Backup downloaded successfully.', 'success');
      };
    }

    if (triggerRestore && restoreInput) {
      triggerRestore.onclick = () => restoreInput.click();
      restoreInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (parsed && parsed.data) {
              this.state = parsed.data;
              if (parsed.enquiries) this.enquiries = parsed.enquiries;
              this.saveState();
              this.saveEnquiries();
              this.populateAllForms();
              this.showToast('Website configuration successfully restored from backup!', 'success');
            } else {
              this.showToast('Invalid backup file structure.', 'danger');
            }
          } catch (err) {
            this.showToast('Error parsing backup file.', 'danger');
          }
        };
        reader.readAsText(file);
      };
    }

    if (resetDefaults) {
      resetDefaults.onclick = () => {
        if (confirm('CRITICAL WARNING: This will reset all your custom content, theme settings, and records back to initial UWAISHDEV defaults. Continue?')) {
          this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
          this.saveState();
          this.populateAllForms();
          this.showToast('All website configurations reset to defaults.', 'success');
        }
      };
    }
  }

  // ==================== GOOGLE APPS SCRIPT BACKEND ====================
  setupBackendSync() {
    const testBtn = document.getElementById('btn-test-backend');
    const pushBtn = document.getElementById('btn-push-backend');
    const alertBox = document.getElementById('backend-test-result');

    if (testBtn) {
      testBtn.onclick = async () => {
        const url = this.getVal('cfg-backend-url');
        if (!url || !url.startsWith('https://script.google.com/')) {
          this.showBackendAlert('Please enter a valid Google Apps Script Web App URL starting with https://script.google.com/', 'danger');
          return;
        }

        testBtn.disabled = true;
        this.showBackendAlert('Testing connection to Apps Script Web App...', 'info');

        try {
          const res = await fetch(`${url}?action=getPublicData`);
          if (res.ok) {
            const data = await res.json();
            this.showBackendAlert(`Connection successful! Backend responded: status "${data.status}".`, 'success');
            this.showToast('Google Apps Script connected!', 'success');
          } else {
            this.showBackendAlert(`Server responded with HTTP status ${res.status}. Please check deployment permissions.`, 'danger');
          }
        } catch (err) {
          this.showBackendAlert(`Connection test error: ${err.message}. If deploying with 'Anyone' access, verify the Web App deployment.`, 'danger');
        } finally {
          testBtn.disabled = false;
        }
      };
    }

    if (pushBtn) {
      pushBtn.onclick = async () => {
        const url = this.getVal('cfg-backend-url');
        if (!url) {
          this.showToast('Please configure your Web App URL first.', 'danger');
          return;
        }

        pushBtn.disabled = true;
        this.showToast('Pushing state to Google Sheets...', 'info');

        try {
          this.collectFormData();
          const payload = new URLSearchParams();
          payload.append('action', 'saveAllData');
          payload.append('data', JSON.stringify(this.state));

          await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload.toString()
          });

          this.showToast('Sync payload sent to Google Apps Script!', 'success');
        } catch (err) {
          this.showToast('Failed to push state: ' + err.message, 'danger');
        } finally {
          pushBtn.disabled = false;
        }
      };
    }
  }

  showBackendAlert(msg, type = 'info') {
    const box = document.getElementById('backend-test-result');
    if (!box) return;
    box.className = `alert alert-${type === 'info' ? 'success' : type}`;
    box.textContent = msg;
    box.classList.remove('hidden');
  }

  // ==================== TOASTS ====================
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="icon-sm text-${type === 'success' ? 'green' : 'amber'}"></i>
      <span>${this.escape(message)}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  escape(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.adminApp = new UwaishDevAdmin();
  window.adminApp.init();
});
