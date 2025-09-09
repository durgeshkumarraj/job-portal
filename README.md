# MERN Job Portal – README

A professional, production-ready Job Portal built with the **MERN stack (MongoDB, Express, React, Node.js)**. This README covers the full project with separate setup instructions for **frontend** and **backend**, environment variables, scripts, deployment, and common workflows.

> Tip: Use this as your root `README.md`. If you keep frontend and backend in separate folders (`/client`, `/server`), you can copy the relevant section into each project’s own README too.

---

## Table of Contents

* [Overview](#overview)
* [Screenshots](#screenshots)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Project Structure](#project-structure)
* [Local Setup](#local-setup)

  * [Prerequisites](#prerequisites)
  * [Backend Setup (Node/Express)](#backend-setup-nodeexpress)
  * [Frontend Setup (React)](#frontend-setup-react)
* [Environment Variables](#environment-variables)

  * [Backend `.env` Example](#backend-env-example)
  * [Frontend `.env` Example](#frontend-env-example)
* [Available Scripts](#available-scripts)

  * [Backend Scripts](#backend-scripts)
  * [Frontend Scripts](#frontend-scripts)
* [API Design](#api-design)

  * [Auth Routes](#auth-routes)
  * [User Routes](#user-routes)
  * [Job Routes](#job-routes)
  * [Application Routes](#application-routes)
* [Data Models](#data-models)
* [Validation & Error Handling](#validation--error-handling)
* [Security](#security)
* [Testing](#testing)
* [Production Build & Deployment](#production-build--deployment)
* [Common Workflows](#common-workflows)
* [Troubleshooting](#troubleshooting)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

---

## Overview

This Job Portal lets recruiters post and manage jobs, while candidates can search, filter, and apply with their profile/resume. It includes authentication, role-based access, application tracking, and an admin view.

**Roles:**

* **Candidate**: Create profile, upload resume, search & filter jobs, save jobs, apply, track status.
* **Recruiter**: Create & manage company, post jobs, view applications, change application status.
* **Admin (optional)**: Moderate users/jobs, analytics dashboard.

---

## Architecture

```
client/ (React, Vite or CRA)
server/ (Node, Express)
   ├─ src/
   │   ├─ config/ (db, cloud, mail)
   │   ├─ models/ (User, Job, Company, Application)
   │   ├─ routes/ (auth, users, jobs, applications)
   │   ├─ controllers/
   │   ├─ middleware/ (auth, roles, error, rateLimit)
   │   ├─ utils/ (email, upload, logger)
   │   └─ app.js / server.js
   └─ tests/
```

**Frontend** communicates with **Backend REST API** via JSON over HTTPS. JWT stored in httpOnly cookies or Authorization header (choose one). Static assets served via CDN/host. MongoDB Atlas or self-hosted MongoDB.

---

## Tech Stack

**Frontend:** React, React Router, Axios/Fetch, Tailwind CSS/Material UI/Ant Design, Zustand/Redux (optional), Vite or CRA.

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens, bcrypt, Multer/Cloud storage (for resumes/logos), Zod/Yup/Joi validation.

**Dev & Quality:** ESLint, Prettier, Jest + Supertest (backend), React Testing Library/Vitest (frontend), Husky + lint-staged.

---

## Features

* ✅ Email/password auth, password reset, email verification (optional)
* ✅ Role-based access control (candidate/recruiter/admin)
* ✅ Candidate profile: bio, skills, experience, education, resume upload
* ✅ Company & recruiter profile management
* ✅ Job CRUD: post, edit, delete, publish/draft, pagination
* ✅ Job discovery: search, filters (title, location, type, salary range, experience, tech stack), saved jobs
* ✅ Application flow: apply with resume/profile, track statuses (applied → shortlisted → interviewed → hired/rejected)
* ✅ Dashboards: candidate (applications), recruiter (jobs & applicants), admin (optional)
* ✅ Notifications (email/in-app) (optional)
* ✅ Dark mode (optional)

---

## Project Structure

```
root
├─ client/                # React app
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ hooks/
│  │  ├─ store/          # Zustand/Redux (optional)
│  │  ├─ services/       # API clients
│  │  ├─ routes/
│  │  └─ main.jsx
│  └─ index.html
└─ server/
   ├─ src/
   │  ├─ config/
   │  ├─ controllers/
   │  ├─ middleware/
   │  ├─ models/
   │  ├─ routes/
   │  ├─ utils/
   │  └─ app.js / server.js
   └─ package.json
```

---

## Local Setup

### Prerequisites

* Node.js LTS (>= 18)
* npm or yarn or pnpm
* MongoDB Atlas account (or local MongoDB)
* (Optional) Cloud storage for resumes/logos (Cloudinary/S3)

### Backend Setup (Node/Express)

```bash
# from project root
cd server
npm install
# create .env (see sample below)
npm run dev
```

The server runs by default on `http://localhost:5000`.

### Frontend Setup (React)

```bash
# from project root
cd client
npm install
# create .env (see sample below)
npm run dev
```

The client runs by default on `http://localhost:5173` (Vite).

---

## Environment Variables

### Backend `.env` Example

```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/jobportal

JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=superrefreshsecret
REFRESH_TOKEN_EXPIRES_IN=30d

# Email (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=example@example.com
SMTP_PASS=app_password
FROM_EMAIL="Job Portal <noreply@yourapp.com>"

# File storage
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Logging / Misc
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

### Frontend `.env` Example

```
# Vite style env vars must start with VITE_
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Job Portal
```

---

## Available Scripts

### Backend Scripts

Add to `server/package.json` (if not already):

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "lint": "eslint .",
    "test": "jest --runInBand"
  }
}
```

### Frontend Scripts

Add to `client/package.json` (if not already):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 4173",
    "lint": "eslint .",
    "test": "vitest"
  }
}
```

---

## API Design

Base URL: `http://localhost:5000/api`

### Auth Routes

```
POST   /auth/register            # role: candidate|recruiter
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password/:token
```

### User Routes

```
GET    /users/me                 # get current profile
PATCH  /users/me                 # update profile
PATCH  /users/me/password        # change password
```

### Job Routes

```
GET    /jobs                     # list jobs (query: q, location, type, minSalary, maxSalary, page, limit)
GET    /jobs/:id                 # job details
POST   /jobs                     # recruiter only
PATCH  /jobs/:id                 # recruiter only (owner)
DELETE /jobs/:id                 # recruiter only (owner)
```

### Application Routes

```
POST   /applications             # candidate apply { jobId, resume(optional) }
GET    /applications/me          # candidate list own applications
GET    /jobs/:id/applications    # recruiter: view applicants for a job
PATCH  /applications/:id/status  # recruiter: update status (applied|shortlisted|interview|hired|rejected)
```

> Protect routes using JWT middleware; add `role` checks where necessary.

---

## Data Models

> Using **Mongoose** (simplified):

**User**

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  role: { type: String, enum: ['candidate', 'recruiter', 'admin'], default: 'candidate' },
  avatarUrl: String,
  // Candidate fields
  profile: {
    headline: String,
    location: String,
    skills: [String],
    experience: [ { title: String, company: String, start: Date, end: Date, desc: String } ],
    education: [ { school: String, degree: String, start: Date, end: Date } ],
    resumeUrl: String
  },
  // Recruiter fields
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
}
```

**Company**

```js
{
  name: String,
  website: String,
  logoUrl: String,
  location: String,
  about: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
```

**Job**

```js
{
  title: String,
  description: String,
  skills: [String],
  type: { type: String, enum: ['full-time','part-time','contract','internship','remote'] },
  location: String,
  salary: { min: Number, max: Number, currency: String },
  experienceLevel: { type: String, enum: ['junior','mid','senior'] },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft','published'], default: 'published' }
}
```

**Application**

```js
{
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  candidate: {
```
