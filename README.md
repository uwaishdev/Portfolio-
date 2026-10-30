# UWAISHDEV — Ultimate Portfolio Ecosystem

> **Brand**: UWAISHDEV (@uwaishdev)  
> **Developer & Marketer**: Uwaish  
> **Location**: Kareli, Narsinghpur District, Madhya Pradesh, India  
> **Tagline**: *Code • Create • Grow*  
> **Primary Contact**: uwaishk082@gmail.com | +91 8435205075  
> **GitHub**: [https://github.com/aicart-ai](https://github.com/aicart-ai)  

---

## 🌟 Executive Overview

**UWAISHDEV** is a production-grade, highly customizable developer portfolio and personal-brand ecosystem built for static hosting on **GitHub Pages** with a serverless **Google Sheets + Google Apps Script** backend.

It requires **zero build steps, zero Node.js server dependencies, and zero monthly hosting costs**. You can manage projects, update themes, review enquiries, and customize 3D scenes entirely through the built-in, password-protected **Control Center (`admin.html`)**.

---

## 🚀 Key Features

1. **Futuristic Dark Tech Aesthetic**:
   - Near-black canvas (`#070a13`) with deep navy surfaces, neon cyan/blue accents, magenta highlights, and Space Grotesk / Inter typography.
2. **Signature 3D Experience (Three.js)**:
   - Interactive rotating wireframe icosahedron, orbital rings, and glowing cyber particle constellation.
   - Mouse-responsive parallax, automatic pause when tab is inactive, and respects `prefers-reduced-motion`.
3. **Comprehensive Admin CMS (`admin.html`)**:
   - 26 functional modules in an intuitive light software dashboard.
   - Master password authentication with client-side SHA-256 session token generation and progressive rate limiting.
4. **Visual Theme Studio**:
   - Live color pickers and typography controls that dynamically modify CSS custom properties on `:root`.
   - 4 built-in theme presets: *Futuristic Cyber Neon*, *Midnight Sapphire*, *Matrix Emerald*, and *Obsidian Violet*.
5. **Enquiries Inbox & Lead Capture**:
   - Contact form sends submissions straight to your Google Sheet while maintaining a local offline inbox.
   - Status tracking (`New`, `Pending`, `Contacted`, `Qualified`, `Closed`, `Spam`), admin notes, and 1-click WhatsApp/Email actions.
   - CSV export capability.
6. **Project Portfolio Manager**:
   - Manage live web apps, B2B lead platforms, and creative projects with category filtering and real-time search.
7. **Transparent Education & Skills Timelines**:
   - Honest academic foundation with real verifiable entries (B.Sc. Botany with CA, DCA, ITI Electrician, Drone Service Technician at CRISP Bhopal).
8. **100% Static Deployment Ready**:
   - Can be served straight out of GitHub Pages or any static CDN.

---

## 📂 Project Architecture

```
uwaishdev-portfolio/
│
├── index.html        # Public portfolio website (semantic, accessible, 3D hero)
├── style.css         # Futuristic dark theme & dynamic CSS custom properties
├── script.js         # Public state manager, Three.js 3D engine, filters, modal
├── admin.html        # Comprehensive CMS Control Center dashboard
├── admin.css         # Clean, light-theme software dashboard stylesheet
├── admin.js          # Admin controller: SHA-256 auth, CRUD, theme studio, CSV export
├── Code.gs           # Serverless Google Apps Script backend for Google Sheets
├── .nojekyll         # Disables Jekyll processing for GitHub Pages
├── README.md         # Complete project documentation
├── DEPLOYMENT.md     # Step-by-step GitHub Pages & Apps Script guide
└── SECURITY.md       # Security architecture & best practices
```

---

## ⚙️ How to Add Projects Manually

While you can add and edit unlimited projects directly inside `admin.html` without touching code, the fallback projects list is located in `script.js`:

Find the comment:
```javascript
// ADD NEW PROJECTS HERE
{
  id: 'proj-new',
  name: 'Your Project Name',
  category: 'live', // 'live' | 'b2b' | 'creative'
  status: 'Published', // 'Published' | 'In Development' | 'Draft'
  featured: true,
  shortDesc: 'A brief 1-2 sentence description.',
  detailedDesc: 'Full project overview for the detail modal.',
  liveUrl: 'https://your-live-site.com',
  githubUrl: 'https://github.com/aicart-ai/repo',
  techTags: ['HTML5', 'CSS3', 'JavaScript'],
  coverImage: '',
  sortOrder: 6,
  visible: true
}
```

---

## 🔑 Initial Admin CMS Login

1. Open `admin.html` in your browser (or visit `/admin.html` on your deployed site).
2. The first time you launch `admin.html`, it will prompt:
   *"First time? Create your master admin password to initialize your CMS."*
3. Enter your chosen password and click **Authenticate & Unlock**.
4. The system will store a secure SHA-256 hash in your browser's protected storage and grant you access.
5. On subsequent visits, simply enter that password to unlock the dashboard.

---

## 📊 Google Sheets Backend Integration

To link your contact form and CMS directly with Google Sheets:

1. Create a Google Sheet named **"UWAISHDEV Database"**.
2. Go to **Extensions > Apps Script**.
3. Copy the entire contents of `Code.gs` and paste it into the editor.
4. Run `setupSheets()` once to create the required tabs:
   - `PublicContent` (Website JSON state)
   - `Enquiries` (Lead records)
   - `AuditLog` (Timestamped changes)
5. Click **Deploy > New Deployment**:
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the generated Web App URL (`https://script.google.com/macros/s/.../exec`).
7. Open `admin.html`, navigate to the **Google Apps Script** tab, paste the URL, and click **Test Connection** & **Save Changes**.

---

## 📱 Mobile Responsiveness

- Fully optimized for mobile viewports (Android phones, iPhones, tablets, and laptops).
- Touch-friendly navigation drawer.
- Low-power mode: Three.js automatically caps pixel ratio and pauses render loops when the browser tab is hidden to preserve battery life.

---

## 📄 License & Attribution

Designed and maintained for **UWAISHDEV** (@uwaishdev). All personal brand details, qualifications, and project references belong to Uwaish (Kareli, MP, India).
