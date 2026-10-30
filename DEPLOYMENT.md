# UWAISHDEV — Complete Step-by-Step Deployment Guide

Follow this guide to deploy your **UWAISHDEV** portfolio to **GitHub Pages** and connect it to your **Google Sheets + Google Apps Script** backend.

---

## PART 1: Create Your GitHub Repository

1. Log into your GitHub account at [https://github.com](https://github.com).
2. Click the **+** icon in the top-right corner and select **New repository**.
3. Repository name: enter `uwaishdev` (or `uwaishai` or your preferred repo name).
4. Description: `Personal developer portfolio and brand ecosystem for UWAISHDEV`.
5. Set visibility to **Public**.
6. Check **Add a README file** (or leave it unchecked if you are uploading our prepared files).
7. Click **Create repository**.

---

## PART 2: Exactly Which Files to Upload

Only the following **6 core frontend files** + `.nojekyll` are required for GitHub Pages:

| File Name | Purpose | Upload to GitHub? |
| :--- | :--- | :--- |
| `index.html` | Public Portfolio Website | **YES (Required)** |
| `style.css` | Public Theme & Custom Properties | **YES (Required)** |
| `script.js` | Public Application & 3D Engine | **YES (Required)** |
| `admin.html` | CMS Control Center Dashboard | **YES (Required)** |
| `admin.css` | CMS Dashboard Stylesheet | **YES (Required)** |
| `admin.js` | CMS Controller & Auth | **YES (Required)** |
| `.nojekyll` | Disables Jekyll on GitHub Pages | **YES (Required)** |
| `README.md` | Repository Documentation | Recommended |
| `Code.gs` | Google Apps Script Backend | **NO** (Paste into Google Apps Script) |

**How to upload files via GitHub Web Interface:**
1. In your newly created GitHub repository, click **Add file > Upload files**.
2. Drag and drop `index.html`, `style.css`, `script.js`, `admin.html`, `admin.css`, `admin.js`, `.nojekyll`, and `README.md`.
3. In the commit message box, type: `Initial release: UWAISHDEV portfolio ecosystem`.
4. Click **Commit changes**.

---

## PART 3: Enable GitHub Pages

1. In your GitHub repository, click on the **Settings** tab.
2. In the left sidebar under *Code and automation*, click **Pages**.
3. Under **Build and deployment > Source**, ensure **Deploy from a branch** is selected.
4. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**.
6. Wait 1 to 2 minutes. Refresh the page until a green notification box appears:  
   *`Your site is live at https://<username>.github.io/<repository-name>/`*

---

## PART 4: Create Your Google Sheet Database

1. Open [Google Drive](https://drive.google.com).
2. Click **+ New > Google Sheets > Blank spreadsheet**.
3. Rename the sheet in the top-left to: **`UWAISHDEV Database`**.

---

## PART 5: Create and Configure the Apps Script Project

1. Inside your new Google Sheet, click the top menu: **Extensions > Apps Script**.
2. A new tab will open with an editor showing a default `Code.gs` file.
3. Delete all default text inside the editor.
4. Open the `Code.gs` file from this project, copy its entire contents, and paste them into the Apps Script editor.
5. Click the **Save** floppy-disk icon (or press `Ctrl + S`).

---

## PART 6: Initialize the Database Schema

1. At the top of the Apps Script editor, locate the function dropdown menu (it may say `myFunction` or `doGet`).
2. Select **`setupSheets`** from the dropdown.
3. Click the **Run** button.
4. Google will ask for authorization:
   - Click **Review permissions**.
   - Select your Google account.
   - If prompted with *"Google hasn't verified this app"*, click **Advanced**, then click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
5. Switch back to your Google Sheet tab. You will see that 3 tabs have been created automatically:
   - `PublicContent`
   - `Enquiries` (with headers: Timestamp, ID, Name, Phone, Email, Service Required, Budget Range, Message, Status, Admin Notes)
   - `AuditLog`

---

## PART 7: Deploy the Apps Script Web App

1. In the Apps Script editor, click the blue **Deploy** button (top-right) > **New deployment**.
2. Click the gear icon next to *Select type* and choose **Web app**.
3. Fill in the deployment settings:
   - **Description**: `UWAISHDEV Production API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** *(CRITICAL: Must be "Anyone" so static GitHub Pages visitors can submit contact forms without Google login).*
4. Click **Deploy**.
5. Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

## PART 8: Connect Your Frontend to the Backend

1. In your browser, open your deployed admin panel:  
   `https://<username>.github.io/<repository-name>/admin.html`  
   *(or locally open `admin.html`)*.
2. Log into the admin panel (see Part 9).
3. In the sidebar, click on **Google Apps Script** (under *System & Storage*).
4. Paste your copied Web App URL into the **Deployed Apps Script Web App URL** field.
5. Click **Test Connection**. You should see a green alert: *`Connection successful! Backend responded: status "success".`*
6. Click **Push State to Google Sheet** to save your website settings into your sheet.

---

## PART 9: Configure Your Admin Master Password

1. When you first open `admin.html`, you will see:  
   *"First time? Create your master admin password to initialize your CMS."*
2. Choose a strong password (e.g. 10+ characters) and submit.
3. The password is hashed using browser-native SHA-256 and stored safely.
4. You will immediately enter the Control Center dashboard.

---

## PART 10: Test Public Content Loading

1. Open your public site URL: `https://<username>.github.io/<repository-name>/`.
2. Verify:
   - The 3D rotating futuristic core appears in the hero section.
   - Your name (**UWAISH**), tagline (**Code • Create • Grow**), and title display correctly.
   - Projects like *AI Cart* and *Personal Portfolio Reference* load with functional "Visit Live" links.
   - The Education timeline displays your B.Sc., DCA, ITI, and Drone Technician training.

---

## PART 11: Test the Contact Form

1. Scroll to the **Contact** section at the bottom of the public site.
2. Fill in:
   - Name: `Test Visitor`
   - Phone: `9876543210`
   - Email: `test@example.com`
   - Message: `Testing the live enquiry submission system.`
   - Check the consent box.
3. Click **Submit Enquiry**.
4. You should see a confirmation message: *`Thank you! Your enquiry has been received...`*
5. Check your Google Sheet under the **Enquiries** tab. A new row will appear instantly with the details!
6. Also open `admin.html` > **Enquiries Inbox**. The submission is right there, ready for WhatsApp/Email replies or status updates.

---

## PART 12: Test Persistent Content Changes

1. Open `admin.html` > **General Settings**.
2. Change the tagline to: `Code • Innovate • Scale`.
3. Click **Save Changes** in the top bar.
4. Refresh `index.html`. Your new tagline will appear immediately!
5. Navigate to **Theme Studio** in `admin.html`. Pick a preset (e.g. *Matrix Emerald*) and click **Apply & Save**. Refresh `index.html` to see the new theme.

---

## PART 13: Verify Mobile Responsiveness

1. Open Chrome DevTools (`F12`) on desktop and toggle Device Toolbar (`Ctrl + Shift + M`).
2. Test on iPhone SE, Pixel 7, and Galaxy S20 viewports:
   - Confirm there is **no horizontal scrolling**.
   - Click the hamburger menu: the mobile navigation drawer opens smoothly.
   - Cards wrap into single-column layouts cleanly.

---

## PART 14: Troubleshooting Common Issues

- **Web App Returns "Authorization Required"**:
  - In Apps Script, redeploy with **Who has access: Anyone**.
- **Enquiries Not Showing in Google Sheet**:
  - Verify that the `setupSheets()` function was run once and the tab name is exactly `Enquiries`.
- **Three.js 3D Scene Appears Blank**:
  - Ensure WebGL is enabled in your browser settings. The canvas handles hardware acceleration automatically and gracefully falls back to CSS glow if unsupported.
