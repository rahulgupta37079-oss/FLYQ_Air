# 🌐 Custom Domain Setup Guide: flyqdrone.in

## Overview
Connect your Hostinger domain **flyqdrone.in** to your Cloudflare Pages deployment.

---

## 📋 Quick Summary
- **Domain**: flyqdrone.in
- **Registrar**: Hostinger
- **Hosting**: Cloudflare Pages
- **Project**: flyq-air
- **Current URL**: https://6ea3369a.flyq-air.pages.dev

---

## 🚀 Step-by-Step Setup

### Step 1: Add Domain in Cloudflare Dashboard

1. **Open Cloudflare Pages Dashboard**:
   - URL: https://dash.cloudflare.com/1e68c8783130a13e82b2bcc76fa109f1/pages/view/flyq-air
   - Login: rahulgupta37079@gmail.com

2. **Navigate to Custom Domains**:
   - Click on your **flyq-air** project (if not already there)
   - Click on **"Custom domains"** tab in the top navigation
   - Click **"Set up a custom domain"** button

3. **Enter Your Domain**:
   - Type: `flyqdrone.in`
   - Click **"Continue"**

4. **Copy DNS Instructions**:
   - Cloudflare will show you the DNS records needed
   - Keep this page open for reference

---

### Step 2: Configure DNS at Hostinger

1. **Login to Hostinger**:
   - URL: https://hpanel.hostinger.com
   - Use your Hostinger account credentials

2. **Access DNS Zone Editor**:
   - Go to **"Domains"** section
   - Click on **flyqdrone.in**
   - Click **"DNS / Name Servers"** or **"Manage DNS"**

3. **Add DNS Records**:

   #### Option A: CNAME Method (Recommended)

   **Root Domain:**
   ```
   Type: CNAME
   Name: @ (or leave blank for root)
   Target: flyq-air.pages.dev
   TTL: 3600 (or Automatic)
   ```

   **WWW Subdomain:**
   ```
   Type: CNAME
   Name: www
   Target: flyq-air.pages.dev
   TTL: 3600 (or Automatic)
   ```

   #### Option B: If CNAME Not Allowed for Root (Alternative)

   If Hostinger doesn't allow CNAME for root domain:

   **Root Domain (Use A Records):**
   
   Get the IP addresses from Cloudflare dashboard or use Cloudflare's anycast IPs:
   ```
   Type: A
   Name: @
   Value: (Check Cloudflare dashboard for specific IPs)
   TTL: 3600
   ```

   Then use CNAME for www:
   ```
   Type: CNAME
   Name: www
   Target: flyq-air.pages.dev
   TTL: 3600
   ```

4. **Remove Conflicting Records**:
   - Delete any existing A records for `@` or root
   - Delete any existing CNAME records for `@` or `www`
   - Keep MX records (for email) if you have email setup

5. **Save Changes**:
   - Click **"Save"** or **"Add Record"** button
   - Wait for confirmation

---

### Step 3: Verify Setup

1. **Wait for DNS Propagation**:
   - Initial propagation: 5-30 minutes
   - Full propagation: up to 48 hours
   - Most changes are visible within 1 hour

2. **Check DNS Records**:
   - Use online tool: https://dnschecker.org
   - Enter: `flyqdrone.in`
   - Select: CNAME record type
   - Should show: `flyq-air.pages.dev`

3. **Test Domain**:
   ```bash
   # Check if domain is resolving
   nslookup flyqdrone.in
   
   # Or use dig
   dig flyqdrone.in
   ```

4. **Access Website**:
   - Try: http://flyqdrone.in
   - Try: https://flyqdrone.in
   - Try: https://www.flyqdrone.in

---

## 🔒 SSL Certificate

Cloudflare automatically provisions SSL certificates for custom domains:

- **Provisioning Time**: 5-15 minutes after DNS is configured
- **Certificate Type**: Universal SSL (free)
- **Coverage**: Both root and www subdomains
- **Auto-Renewal**: Yes

**Status Check**:
- In Cloudflare dashboard, go to your project
- Check "Custom domains" section
- Wait for green checkmark and "Active" status

---

## ⚡ Expected Results

Once setup is complete:

✅ **flyqdrone.in** → FLYQ Air homepage
✅ **www.flyqdrone.in** → FLYQ Air homepage  
✅ **flyqdrone.in/vision** → FLYQ Vision page
✅ **HTTPS enabled** with automatic SSL certificate
✅ **Global CDN** for fast loading worldwide

---

## 🐛 Troubleshooting

### Issue: Domain not resolving after 24 hours

**Solution**:
1. Check DNS records in Hostinger are correct
2. Verify no typos in target: `flyq-air.pages.dev`
3. Clear your DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
4. Try different DNS server: 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)

### Issue: SSL certificate not provisioning

**Solution**:
1. Wait 30 minutes after DNS is verified
2. Check DNS is properly pointing to Cloudflare
3. Visit Cloudflare dashboard and check SSL/TLS settings
4. Set SSL mode to "Full" or "Full (strict)"

### Issue: "This site can't be reached"

**Solution**:
1. DNS records not propagated yet - wait longer
2. Check DNS records are saved correctly in Hostinger
3. Try accessing via: https://6ea3369a.flyq-air.pages.dev (original URL should still work)

### Issue: Showing different website

**Solution**:
1. Clear browser cache: Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)
2. Try incognito/private browsing mode
3. Check if old hosting at Hostinger is still active - disable it

---

## 📞 Support

**Cloudflare Support**:
- Dashboard: https://dash.cloudflare.com
- Community: https://community.cloudflare.com
- Docs: https://developers.cloudflare.com/pages

**Hostinger Support**:
- Help: https://support.hostinger.com
- Live Chat: Available in Hostinger panel
- DNS Guide: https://support.hostinger.com/en/articles/1696715-how-to-manage-dns-records

---

## 🎯 Post-Setup Checklist

After domain is working:

- [ ] Test homepage: https://flyqdrone.in
- [ ] Test Vision page: https://flyqdrone.in/vision
- [ ] Test www subdomain: https://www.flyqdrone.in
- [ ] Verify SSL certificate (green padlock in browser)
- [ ] Test on mobile devices
- [ ] Update social media links to new domain
- [ ] Update README.md with new domain
- [ ] Update any hardcoded URLs in code (if any)

---

## 📝 Notes

- **DNS TTL**: Lower values (like 300) allow faster changes but more queries
- **HTTPS**: Cloudflare forces HTTPS redirect automatically
- **Backups**: Original URL (6ea3369a.flyq-air.pages.dev) continues to work
- **Email**: Domain DNS changes won't affect Hostinger email if you keep MX records

---

**Setup Date**: October 30, 2025  
**Domain**: flyqdrone.in  
**Status**: Awaiting DNS configuration  
**Next Step**: Configure DNS records at Hostinger
