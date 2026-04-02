# Exytex Backend API

Complete backend system for handling form submissions, admin panel, and invoice generation.

## Features

- ✅ Form submission handling for all form types
- ✅ MongoDB integration with proper schemas
- ✅ Admin authentication with JWT
- ✅ Email notifications (confirmation + admin alerts)
- ✅ PDF invoice generation
- ✅ Admin panel API endpoints
- ✅ Rate limiting and security
- ✅ Data export (CSV)
- ✅ Comprehensive error handling

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env` file and update with your settings:
- MongoDB connection string
- Email service credentials
- JWT secret
- Admin credentials

### 3. Initialize Admin User
```bash
npm run init-admin
```

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Forms
- `POST /api/forms/submit` - Submit any form
- `GET /api/forms/stats` - Get form statistics
- `GET /api/forms/submission/:id` - Get submission details

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Admin Panel
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/submissions` - List submissions (with filters)
- `GET /api/admin/submissions/:id` - Get submission details
- `PUT /api/admin/submissions/:id` - Update submission
- `DELETE /api/admin/submissions/:id` - Delete submission
- `POST /api/admin/submissions/:id/invoice` - Generate invoice
- `GET /api/admin/export/csv` - Export to CSV

## Form Types Supported

1. **Contact Form** (`contact`)
2. **IT Staffing Form** (`it-staffing`)
3. **Digital Marketing Form** (`digital-marketing`)
4. **About Contact Form** (`about-contact`)
5. **Hire Developer Modal** (`hire-developer`)
6. **Hi-Tech Form** (`hi-tech`)
7. **General Form** (`general`)

## Database Schema

### FormSubmission
- Basic fields: name, email, phone, company, message
- Form-specific fields: service, role, budget, etc.
- Metadata: IP, user agent, timestamp
- Admin fields: status, notes, priority
- Invoice fields: number, date, amount

### Admin
- Authentication: username, password (hashed)
- Security: login attempts, account locking
- Roles: admin, super-admin

## Email Configuration

Configure your email service in `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Security Features

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- Input validation (Joi)
- CORS protection
- Helmet security headers
- Account lockout after failed attempts

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**⚠️ Change these credentials after first login!**

## Environment Variables

```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@exytex.com
FRONTEND_URL=http://localhost:5173
```