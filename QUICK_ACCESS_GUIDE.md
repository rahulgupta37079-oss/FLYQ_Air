# 🚀 Quick Access Guide - FLYQ Website

## 📊 Admin Dashboard Access

### Step 1: Login as Admin

**Production URL**: https://0e26643a.flyq-air.pages.dev/login

1. Go to the login page
2. Create an account or login with existing credentials
3. Your account needs to have `is_admin = 1` in the database

### Step 2: Access Admin Dashboard

**Direct Link**: https://0e26643a.flyq-air.pages.dev/admin/dashboard

Once logged in, navigate to:
```
/admin/dashboard
```

### What You'll See:

#### Statistics Overview:
- 📊 **Total Users** - Number of registered users
- 🛒 **Total Orders** - Number of orders placed
- 🔐 **Active Sessions** - Currently logged-in users
- 💰 **Total Revenue** - Sum of all paid orders

#### Data Tables:

**1. Registered Users**
| Column | Description |
|--------|-------------|
| User ID | Database ID |
| Name | Full name |
| Email | Email address |
| Registration Date | Signup date |
| Admin | Yes/No badge |

**2. Recent Orders (Last 50)**
| Column | Description |
|--------|-------------|
| Order # | Order number |
| Customer | Name & email |
| Total | Amount in ₹ |
| Status | Paid/Pending |
| Date | Order date |

**3. Active Sessions**
| Column | Description |
|--------|-------------|
| User | Email address |
| Session ID | Unique identifier |
| Expires | Expiration time |

---

## 🎨 New Design Sections

### Location: Documentation Page

**URL**: https://0e26643a.flyq-air.pages.dev/docs

**New Sections Added** (after Hardware Architecture, before Programming):

1. **Design Philosophy** - Introduction
2. **Easy Assembly & Affordable** - Kit contents, pricing
3. **WiFi-Based Smart Control** - Control methods, technical specs
4. **Expansion & Compatibility** - Pins, sensors, CrazyFlie API
5. **Open Source Hardware** - Schematics, PCB files, 3D models

---

## 🔐 Creating Admin User

### Local Development (Already Done):
Admin user created with email: `admin@passion3dworld.com`

### Production (You Need To Do):

**Option 1: Via Signup Page**
1. Go to https://0e26643a.flyq-air.pages.dev/signup
2. Create account with email: `admin@passion3dworld.com`
3. Use wrangler to set admin flag:
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote \
  --command="UPDATE users SET is_admin = 1 WHERE email = 'admin@passion3dworld.com'"
```

**Option 2: Direct Database Insert**
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote \
  --command="INSERT INTO users (email, name, password_hash, is_admin) VALUES ('admin@passion3dworld.com', 'Admin User', '\$2a\$10\$abcdefghijklmnopqrstuuO7xV6R2fQBQGXGxlNnZ.YwR0uD5Z5Y8', 1)"
```

**Option 3: Promote Existing User**
If you already have an account:
```bash
npx wrangler d1 execute webapp-production --remote \
  --command="UPDATE users SET is_admin = 1 WHERE email = 'your-email@example.com'"
```

---

## 🌐 All Important URLs

### Public Pages:
- **Homepage**: https://0e26643a.flyq-air.pages.dev/
- **Products**: https://0e26643a.flyq-air.pages.dev/products
- **Documentation**: https://0e26643a.flyq-air.pages.dev/docs ⭐ NEW CONTENT!
- **About**: https://0e26643a.flyq-air.pages.dev/about
- **Contact**: https://0e26643a.flyq-air.pages.dev/contact

### Authentication:
- **Login**: https://0e26643a.flyq-air.pages.dev/login
- **Signup**: https://0e26643a.flyq-air.pages.dev/signup

### Protected Pages (Login Required):
- **My Account**: https://0e26643a.flyq-air.pages.dev/account
- **Curriculum**: https://0e26643a.flyq-air.pages.dev/curriculum (hidden from navigation)
- **Admin Dashboard**: https://0e26643a.flyq-air.pages.dev/admin/dashboard ⭐ NEW!

### Local Development:
- **Local Server**: http://localhost:3000
- **Public Sandbox**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai

---

## 📞 Contact Information (Integrated Throughout)

- **Email**: info@passion3dworld.com
- **Phone**: +91 9137361474
- **WhatsApp**: https://wa.me/919137361474

You'll find these contact details in:
- Documentation page header
- Hardware support section
- Troubleshooting section
- Footer
- Contact page

---

## 🎯 Quick Test Checklist

### ✅ Test Admin Dashboard:
1. [ ] Visit login page
2. [ ] Login with admin credentials
3. [ ] Navigate to /admin/dashboard
4. [ ] Verify statistics cards show data
5. [ ] Verify users table shows registered users
6. [ ] Verify orders table (if any orders exist)
7. [ ] Verify sessions table shows active sessions

### ✅ Test New Design Sections:
1. [ ] Visit /docs page
2. [ ] Scroll to "Design Philosophy" section
3. [ ] Check "Easy Assembly & Affordable" section
4. [ ] Check "WiFi-Based Smart Control" section
5. [ ] Check "Expansion & Compatibility" section
6. [ ] Check "Open Source Hardware" section

### ✅ Test Curriculum Hidden:
1. [ ] Check navigation - curriculum link removed ✓
2. [ ] Check homepage - no curriculum links ✓
3. [ ] Try accessing /curriculum without login - should redirect ✓
4. [ ] Login and access /curriculum - should work ✓

---

## 🔧 Troubleshooting

### "Access Denied - Please login first"
→ You're not logged in. Go to /login first.

### "Access Denied - Admin access only"
→ Your account isn't admin. Run the UPDATE command above.

### "Database Not Available"
→ D1 binding issue. Check wrangler.jsonc configuration.

### Production Database Commands Not Working
→ API token might lack D1 permissions. Use signup + promote method instead.

---

## 📚 Documentation Files

All documentation is in the `/home/user/webapp/` directory:

1. **ADMIN_SETUP.md** - Detailed admin dashboard setup guide
2. **DEPLOYMENT_SUMMARY.md** - Complete deployment summary
3. **QUICK_ACCESS_GUIDE.md** - This file (quick reference)
4. **README.md** - Project README (update if needed)

---

## 🎉 Everything is LIVE!

Your FLYQ website is fully deployed with:
- ✅ Comprehensive 4600+ line documentation
- ✅ FLYQ-branded design philosophy sections
- ✅ Admin dashboard for database monitoring
- ✅ Curriculum hidden from public (accessible to logged-in users only)
- ✅ Contact information integrated throughout
- ✅ All existing features intact

**Production Website**: https://0e26643a.flyq-air.pages.dev  
**Enjoy your enhanced FLYQ website! ✈️🚀**
