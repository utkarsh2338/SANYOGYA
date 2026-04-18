<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Sanyogya — Full Technical Architecture & Implementation Plan

> **Stack**: Next.js 15 (App Router) · TypeScript · Clerk Auth · PostgreSQL (Neon) · Prisma ORM · Redis (Upstash) · BullMQ · Pusher · Shadcn/UI · Tailwind CSS · Vercel

---

## 1. Executive Summary

Sanyogya is an **application-based, curated matchmaking platform** targeting India's top professionals — IIT/IIM alumni, doctors, civil servants, founders, and CXOs. The core differentiator is exclusivity: every member is **screened + verified** before activation. The platform is built for quality over quantity — a controlled onboarding funnel, intelligent matching, and privacy-first messaging.

This document covers the **complete technical architecture** to build the platform from scratch, designed to scale to 100,000+ users while maintaining data integrity, security, and a premium user experience.

---

## 2. Technology Stack — Rationale

| Layer | Technology | Why |
|---|---|---|
| **Frontend Framework** | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components, built-in API routes |
| **Language** | TypeScript (strict mode) | End-to-end type safety, better DX |
| **Auth** | Clerk | Managed auth, OAuth, phone OTP, webhook user sync |
| **Database** | PostgreSQL on Neon | Serverless Postgres, branching for dev/prod, connection pooling |
| **ORM** | Prisma | Type-safe queries, migrations, schema-first approach |
| **Cache / Queue** | Redis on Upstash | Serverless Redis, session cache, rate limiting, BullMQ queues |
| **Background Jobs** | BullMQ | Profile verification queue, matching engine, email dispatch |
| **Real-time** | Pusher Channels | Managed WebSockets for chat, notifications (scales easily) |
| **File Storage** | Cloudinary | Profile photos, document uploads with transformation APIs |
| **Email** | Resend | Transactional email (verification, match alerts, OTP) |
| **Payments** | Razorpay | INR-native, subscription billing, India compliance |
| **UI Library** | Shadcn/UI + Tailwind CSS | Composable components, custom design tokens |
| **Validation** | Zod | Runtime schema validation on all API inputs |
| **Deployment** | Vercel | Edge network, serverless functions, built-in CI/CD |
| **Monitoring** | Sentry + Vercel Analytics | Error tracking, performance monitoring |
| **Admin Panel** | Tremor + custom pages | Member management, verification queue, analytics |

---

## 3. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  Browser (Next.js App)  ←→  Pusher Channels (WebSocket)        │
└──────────────────────────────────┬──────────────────────────────┘
                                   │ HTTPS
┌──────────────────────────────────▼──────────────────────────────┐
│                     NEXT.JS APP (Vercel Edge)                   │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐   │
│  │  App Router  │  │  API Routes │  │  Clerk Middleware     │   │
│  │  (RSC + SSR) │  │  /api/v1/*  │  │  (Auth Guard)        │   │
│  └─────────────┘  └──────┬──────┘  └──────────────────────┘   │
└─────────────────────────┬─┴──────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
┌────────▼──────┐ ┌───────▼──────┐ ┌──────▼────────┐
│  PostgreSQL   │ │  Redis Cache │ │  BullMQ        │
│  (Neon DB)    │ │  (Upstash)   │ │  Workers       │
│               │ │              │ │                │
│  -Users       │ │  -Sessions   │ │  -Verify Jobs  │
│  -Profiles    │ │  -Rate limit │ │  -Match Engine │
│  -Matches     │ │  -Feed cache │ │  -Email Queue  │
│  -Messages    │ │  -Match cache│ │  -Notif Queue  │
│  -Payments    │ └──────────────┘ └────────────────┘
└───────────────┘
         │
┌────────▼──────────────────────────────────────────┐
│              EXTERNAL SERVICES                     │
│  Cloudinary (files) · Resend (email) ·            │
│  Razorpay (payments) · Pusher (realtime)          │
└───────────────────────────────────────────────────┘
```

---

## 4. Project Directory Structure

```
sanyogya/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Public pages (no auth)
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── about/page.tsx
│   │   │   ├── apply/page.tsx        # Waitlist/Application form
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (auth)/                   # Clerk auth pages
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/              # Authenticated user area
│   │   │   ├── layout.tsx            # Dashboard shell + nav
│   │   │   ├── home/page.tsx         # Feed / matches overview
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx          # Own profile
│   │   │   │   └── edit/page.tsx     # Profile editor
│   │   │   ├── discover/page.tsx     # Browse curated matches
│   │   │   ├── matches/
│   │   │   │   ├── page.tsx          # All matches
│   │   │   │   └── [matchId]/page.tsx
│   │   │   ├── messages/
│   │   │   │   ├── page.tsx          # Conversation list
│   │   │   │   └── [conversationId]/page.tsx
│   │   │   ├── notifications/page.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx
│   │   │       ├── privacy/page.tsx
│   │   │       └── membership/page.tsx
│   │   │
│   │   ├── (onboarding)/             # Post-signup profile setup
│   │   │   ├── step-1/page.tsx       # Basic info
│   │   │   ├── step-2/page.tsx       # Professional details
│   │   │   ├── step-3/page.tsx       # Partner preferences
│   │   │   ├── step-4/page.tsx       # Photo upload
│   │   │   └── pending/page.tsx      # Awaiting admin review
│   │   │
│   │   ├── (admin)/                  # Admin panel (role-gated)
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── applications/
│   │   │   │   ├── page.tsx          # Review queue
│   │   │   │   └── [userId]/page.tsx # Individual review
│   │   │   ├── members/page.tsx
│   │   │   ├── matches/page.tsx
│   │   │   └── analytics/page.tsx
│   │   │
│   │   └── api/
│   │       ├── webhooks/
│   │       │   ├── clerk/route.ts    # Clerk user sync webhook
│   │       │   └── razorpay/route.ts # Payment event webhook
│   │       └── v1/
│   │           ├── applications/route.ts
│   │           ├── profile/route.ts
│   │           ├── matches/route.ts
│   │           ├── conversations/route.ts
│   │           ├── messages/route.ts
│   │           ├── notifications/route.ts
│   │           ├── admin/
│   │           │   ├── applications/route.ts
│   │           │   └── members/route.ts
│   │           └── payments/route.ts
│   │
│   ├── components/
│   │   ├── ui/                       # Shadcn/UI primitives
│   │   ├── marketing/                # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── WhySanyogya.tsx
│   │   │   ├── WhoItsFor.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── TrustSafety.tsx
│   │   │   ├── MembershipSection.tsx
│   │   │   ├── FounderNote.tsx
│   │   │   ├── FinalCta.tsx
│   │   │   └── Footer.tsx
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── MatchCard.tsx
│   │   │   └── NotificationBell.tsx
│   │   ├── messaging/
│   │   │   ├── ConversationList.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   └── MessageBubble.tsx
│   │   └── admin/
│   │       ├── ApplicationReviewCard.tsx
│   │       ├── StatsGrid.tsx
│   │       └── MemberTable.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma singleton
│   │   ├── redis.ts                  # Upstash Redis client
│   │   ├── pusher.ts                 # Pusher server client
│   │   ├── cloudinary.ts             # Cloudinary config
│   │   ├── resend.ts                 # Resend email client
│   │   ├── razorpay.ts               # Razorpay client
│   │   ├── matching/
│   │   │   ├── engine.ts             # Core matching algorithm
│   │   │   └── scoring.ts            # Compatibility scoring
│   │   ├── queue/
│   │   │   ├── workers/
│   │   │   │   ├── verification.worker.ts
│   │   │   │   ├── matching.worker.ts
│   │   │   │   └── email.worker.ts
│   │   │   └── queues.ts             # BullMQ queue definitions
│   │   └── utils/
│   │       ├── auth.ts               # Auth helpers
│   │       └── rate-limit.ts         # Rate limiting helpers
│   │
│   ├── hooks/
│   │   ├── useMatches.ts
│   │   ├── useConversation.ts
│   │   ├── useNotifications.ts
│   │   └── useProfile.ts
│   │
│   ├── types/
│   │   ├── index.ts                  # Shared TypeScript types
│   │   ├── api.ts                    # API request/response types
│   │   └── matching.ts               # Matching engine types
│   │
│   └── middleware.ts                 # Clerk auth middleware
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── migrations/                  # Auto-generated migrations
│
├── public/
│   ├── fonts/
│   └── images/
│
├── .env.local                        # Environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")   // for migrations with Neon
}

// ─────────────────────────────────────
// ENUMS
// ─────────────────────────────────────

enum ApplicationStatus {
  PENDING
  UNDER_REVIEW
  APPROVED
  REJECTED
  WAITLISTED
}

enum UserStatus {
  PENDING_VERIFICATION
  ACTIVE
  SUSPENDED
  BANNED
}

enum VerificationStatus {
  UNVERIFIED
  PARTIAL     // some docs submitted
  VERIFIED
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum Religion {
  HINDU
  MUSLIM
  CHRISTIAN
  SIKH
  JAIN
  BUDDHIST
  OTHER
}

enum MatchStatus {
  PENDING      // system generated, not shown yet
  SHOWN        // shown to user A
  MUTUAL       // both interested
  REJECTED     // user explicitly rejected
  EXPIRED
}

enum ConversationStatus {
  ACTIVE
  ARCHIVED
  BLOCKED
}

enum MessageStatus {
  SENT
  DELIVERED
  READ
}

enum MembershipTier {
  BASIC
  PREMIUM
  ELITE
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

// ─────────────────────────────────────
// CORE MODELS
// ─────────────────────────────────────

model User {
  id              String        @id @default(cuid())
  clerkId         String        @unique          // Clerk user ID
  email           String        @unique
  phone           String?       @unique
  status          UserStatus    @default(PENDING_VERIFICATION)
  role            String        @default("member") // member | admin | moderator
  membershipTier  MembershipTier @default(BASIC)
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  lastActiveAt    DateTime?

  // Relations
  profile         Profile?
  application     Application?
  membership      Membership?
  sentRequests    Match[]       @relation("MatchFromUser")
  receivedRequests Match[]      @relation("MatchToUser")
  conversationsA  Conversation[] @relation("ConversationUserA")
  conversationsB  Conversation[] @relation("ConversationUserB")
  sentMessages    Message[]
  notifications   Notification[]
  payments        Payment[]
  blockedUsers    Block[]       @relation("Blocker")
  blockedByUsers  Block[]       @relation("Blocked")

  @@index([clerkId])
  @@index([status])
  @@index([membershipTier])
}

model Profile {
  id                String            @id @default(cuid())
  userId            String            @unique
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Personal Info
  firstName         String
  lastName          String
  dateOfBirth       DateTime
  gender            Gender
  height            Int?              // in cm
  motherTongue      String?
  religion          Religion?
  caste             String?
  subCaste          String?
  manglik           Boolean?
  maritalStatus     String            @default("Never Married")
  
  // Location
  city              String
  state             String
  country           String            @default("India")
  pincode           String?

  // Education & Career
  highestEducation  String
  educationDetails  Json              // [{degree, institution, year, tier}]
  institutionTier   String?           // IIT/IIM/Top-10/Other
  occupation        String
  employmentType    String            // Full-time/Business/Government
  companyName       String?
  designation       String?
  annualIncome      String?           // Range bracket
  workLocation      String?

  // Lifestyle
  diet              String?           // Veg/Non-Veg/Eggetarian
  drinking          String?
  smoking           String?
  exercise          String?
  hobbies           String[]
  languages         String[]

  // About
  bio               String?           @db.Text
  lookingFor        String?           @db.Text

  // Partner Preferences
  prefAgeMin        Int?
  prefAgeMax        Int?
  prefHeightMin     Int?
  prefHeightMax     Int?
  prefReligions     String[]
  prefCities        String[]
  prefEducation     String[]
  prefOccupations   String[]

  // Media
  photos            ProfilePhoto[]
  
  // Verification
  verificationStatus VerificationStatus @default(UNVERIFIED)
  verifiedAt         DateTime?
  verifiedBy         String?           // Admin user ID

  // Matching Metadata (computed, cached)
  matchScore        Float?
  profileCompleteness Int?             // 0-100

  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  @@index([city, state])
  @@index([verificationStatus])
  @@index([institutionTier])
}

model ProfilePhoto {
  id          String   @id @default(cuid())
  profileId   String
  profile     Profile  @relation(fields: [profileId], references: [id], onDelete: Cascade)
  url         String
  publicId    String   // Cloudinary public ID
  isPrimary   Boolean  @default(false)
  isApproved  Boolean  @default(false)
  position    Int      @default(0)
  createdAt   DateTime @default(now())

  @@index([profileId])
}

model Application {
  id          String            @id @default(cuid())
  userId      String            @unique
  user        User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  status      ApplicationStatus @default(PENDING)
  
  // Application fields
  fullName    String
  email       String
  phone       String
  occupation  String
  institution String            // Current or notable institution
  city        String
  referral    String?
  motivation  String?           @db.Text // Why do they want to join?
  linkedinUrl String?
  
  // Admin review
  reviewedBy  String?           // Admin user ID
  reviewNote  String?           @db.Text
  reviewedAt  DateTime?
  
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  @@index([status])
  @@index([createdAt])
}

model Match {
  id            String      @id @default(cuid())
  fromUserId    String
  fromUser      User        @relation("MatchFromUser", fields: [fromUserId], references: [id])
  toUserId      String
  toUser        User        @relation("MatchToUser", fields: [toUserId], references: [id])
  
  status        MatchStatus @default(PENDING)
  compatibilityScore Float?  // 0-100
  scoreBreakdown Json?       // {education: 30, location: 20, values: 50, ...}
  
  // Interest signals
  fromUserInterested Boolean?
  toUserInterested   Boolean?
  
  // System metadata
  generatedBy   String      @default("algorithm") // algorithm | admin | recommendation
  shownAt       DateTime?
  mutualAt      DateTime?
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  // If mutual, a conversation is created
  conversation  Conversation?

  @@unique([fromUserId, toUserId])
  @@index([fromUserId, status])
  @@index([toUserId, status])
  @@index([status])
}

model Conversation {
  id          String             @id @default(cuid())
  matchId     String?            @unique
  match       Match?             @relation(fields: [matchId], references: [id])
  userAId     String
  userA       User               @relation("ConversationUserA", fields: [userAId], references: [id])
  userBId     String
  userB       User               @relation("ConversationUserB", fields: [userBId], references: [id])
  status      ConversationStatus @default(ACTIVE)
  
  messages    Message[]
  lastMessage DateTime?
  
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  @@index([userAId])
  @@index([userBId])
}

model Message {
  id             String         @id @default(cuid())
  conversationId String
  conversation   Conversation   @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  senderId       String
  sender         User           @relation(fields: [senderId], references: [id])
  
  content        String         @db.Text
  messageType    String         @default("text") // text | image | emoji
  mediaUrl       String?
  
  status         MessageStatus  @default(SENT)
  readAt         DateTime?
  
  deleted        Boolean        @default(false)
  deletedAt      DateTime?
  
  createdAt      DateTime       @default(now())

  @@index([conversationId, createdAt])
  @@index([senderId])
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type      String   // new_match | message | application_update | system
  title     String
  body      String
  data      Json?    // extra context (matchId, conversationId, etc.)
  read      Boolean  @default(false)
  readAt    DateTime?
  
  createdAt DateTime @default(now())

  @@index([userId, read])
  @@index([userId, createdAt])
}

model Membership {
  id        String         @id @default(cuid())
  userId    String         @unique
  user      User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  tier      MembershipTier
  startDate DateTime
  endDate   DateTime?
  isActive  Boolean        @default(true)
  
  autoRenew Boolean        @default(false)
  
  createdAt DateTime       @default(now())
  updatedAt DateTime       @updatedAt

  payments  Payment[]
}

model Payment {
  id              String        @id @default(cuid())
  userId          String
  user            User          @relation(fields: [userId], references: [id])
  membershipId    String?
  membership      Membership?   @relation(fields: [membershipId], references: [id])
  
  razorpayOrderId String?       @unique
  razorpayPaymentId String?     @unique
  
  amount          Int           // in paise (INR base)
  currency        String        @default("INR")
  status          PaymentStatus @default(PENDING)
  
  metadata        Json?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([userId])
  @@index([status])
}

model Block {
  id          String   @id @default(cuid())
  blockerId   String
  blocker     User     @relation("Blocker", fields: [blockerId], references: [id])
  blockedId   String
  blocked     User     @relation("Blocked", fields: [blockedId], references: [id])
  reason      String?
  createdAt   DateTime @default(now())

  @@unique([blockerId, blockedId])
}

model VerificationDocument {
  id          String   @id @default(cuid())
  userId      String
  docType     String   // linkedin | degree | employee_id | aadhaar | pan
  fileUrl     String
  publicId    String
  isVerified  Boolean  @default(false)
  verifiedAt  DateTime?
  verifiedBy  String?
  createdAt   DateTime @default(now())

  @@index([userId])
}
```

---

## 6. API Route Design

### Authentication & Webhooks
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/webhooks/clerk` | Sync Clerk user events to DB |
| `POST` | `/api/webhooks/razorpay` | Handle payment confirmations |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/applications` | Submit waitlist application |
| `GET` | `/api/v1/admin/applications` | List all (admin) |
| `PATCH` | `/api/v1/admin/applications/[id]` | Approve/reject/waitlist |

### Profile
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/profile/me` | Get own profile |
| `PUT` | `/api/v1/profile/me` | Update own profile |
| `GET` | `/api/v1/profile/[userId]` | View another member's profile |
| `POST` | `/api/v1/profile/photos` | Upload photo to Cloudinary |
| `DELETE` | `/api/v1/profile/photos/[id]` | Remove photo |

### Matching
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/matches` | Get my curated matches |
| `POST` | `/api/v1/matches/[matchId]/interest` | Express interest (true/false) |
| `GET` | `/api/v1/discover` | Browse profiles (paginated) |

### Messaging
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/conversations` | List all conversations |
| `GET` | `/api/v1/conversations/[id]/messages` | Paginated message history |
| `POST` | `/api/v1/conversations/[id]/messages` | Send a message |

### Notifications
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/notifications` | Get notifications (paginated) |
| `PATCH` | `/api/v1/notifications/[id]/read` | Mark as read |
| `PATCH` | `/api/v1/notifications/read-all` | Mark all read |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/payments/create-order` | Create Razorpay order |
| `POST` | `/api/v1/payments/verify` | Verify payment signature |

---

## 7. Matching Engine Architecture

The matching engine runs as a **BullMQ background worker** — completely decoupled from the Next.js request cycle.

### Compatibility Scoring Formula

```typescript
// src/lib/matching/scoring.ts

interface ScoringWeights {
  education:       0.20  // Institution tier match
  profession:      0.15  // Career alignment
  location:        0.15  // City/state proximity preference
  age:             0.15  // Age bracket compatibility
  religion:        0.10  // Religious preference match
  lifestyle:       0.10  // Diet, habits alignment
  values:          0.10  // Hobbies, interests overlap
  profileQuality:  0.05  // Photo count, bio completeness
}

function computeCompatibilityScore(userA: Profile, userB: Profile): {
  totalScore: number;      // 0-100
  breakdown: ScoreBreakdown;
  explanation: string[];
}
```

### Matching Flow
```
Trigger: User profile verified (admin approval)
    │
    ▼
BullMQ: "matching" queue receives job { userId }
    │
    ▼
Worker: matching.worker.ts
  1. Fetch verified, active profiles from DB
  2. Filter by hard constraints (gender, age, religion preferences)
  3. Compute compatibility scores for remaining candidates
  4. Sort by score DESC
  5. Select top N matches (e.g. top 10)
  6. INSERT into Match table (status: PENDING)
  7. Schedule daily reveal: queue "show_matches" job at 9AM IST
    │
    ▼
Cron (daily): Reveal top 3 unseen matches to user
    │
    ▼
Pusher: Trigger "new_match" event on user's private channel
    │
    ▼
Create Notification record in DB
```

### Redis Caching Strategy
```
Key Pattern                    TTL      Use
─────────────────────────────────────────────────────
profile:{userId}               10m      Profile cache
matches:{userId}:list          5m       Match list cache  
discover:{userId}:page:{n}     5m       Discovery page cache
notifications:{userId}:count   1m       Unread count cache
rate:{ip}:{endpoint}           1m       Rate limiting
session:{clerkSessionId}       30m      Session data
```

---

## 8. Real-Time Architecture (Pusher)

### Channel Structure
```
Private channels (authenticated):
  private-user-{userId}         # Personal notifications, match alerts
  private-conversation-{convId} # Real-time messages in a chat
  
Presence channels (admin):
  presence-admin                # Admin dashboard live updates
```

### Event Types
```typescript
// Events pushed server → client
"new_match"            // New match revealed
"match_interest"       // Other user expressed interest
"match_mutual"         // Both users interested → chat unlocked
"new_message"          // New message in conversation
"notification"         // Generic notification
"application_update"   // Application status changed
"profile_verified"     // Profile verification complete
```

---

## 9. Authentication & Authorization

### Clerk Integration
```typescript
// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/apply',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/v1/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth()
    if (sessionClaims?.metadata?.role !== 'admin') {
      return Response.redirect(new URL('/home', req.url))
    }
  }
})
```

### User Status Gating
- `PENDING_VERIFICATION` → Redirected to `/onboarding/pending`
- `ACTIVE` → Full dashboard access
- `SUSPENDED` / `BANNED` → Blocked with explanation page
- Admin role stored in **Clerk Public Metadata** and synced to DB

---

## 10. Onboarding Funnel

```
/apply (public)
  └─ Submit application form
  └─ Status: ApplicationStatus.PENDING
  
/sign-up (Clerk)
  └─ Email/Google/Phone OTP sign-up

/onboarding/step-1  → Basic personal info
/onboarding/step-2  → Professional + education
/onboarding/step-3  → Partner preferences
/onboarding/step-4  → Photo upload (min 2 photos)
/onboarding/pending → "Application under review"
                      [Admin receives task in queue]

Admin Reviews in /admin/applications/[id]:
  └─ Approve → User status → ACTIVE, queue "matching" job
  └─ Reject → Notification sent
  └─ Waitlist → Hold with FOMO email sequence
```

---

## 11. Admin Panel

### Key Admin Features
- **Application Queue**: Sortable list with filters, one-click approve/reject/waitlist
- **Profile Verify**: Doc upload review, tick verification status per field
- **Match Management**: View/override system matches, manually pair profiles
- **Member Management**: Search, filter by city/tier/status, suspend/ban
- **Analytics Dashboard**: 
  - Applications per week
  - Verification queue length
  - Match creation rate
  - Mutual match rate (conversion)
  - Active members per city
  - Message volume
- **Content Moderation**: Report queue for inappropriate messages/photos

---

## 12. Security & Privacy Architecture

| Concern | Implementation |
|---|---|
| **Auth** | Clerk (MFA available, session rotation) |
| **API Security** | Rate limiting via Upstash Ratelimit on all endpoints |
| **Data Access** | Users can only query their own data (enforced in API layer, not just frontend) |
| **Profile Visibility** | Profiles only shown to verified active members who pass preference filter |
| **Photo Privacy** | Photos served via signed Cloudinary URLs with short TTL |
| **Message Privacy** | Only conversation participants can read messages (enforced server-side) |
| **Input Validation** | Zod schemas validate every API request body |
| **SQL Injection** | Prisma ORM parameterizes all queries |
| **XSS** | Next.js auto-escapes, Content Security Policy header |
| **CSRF** | Clerk handles CSRF for authenticated sessions |
| **GDPR/IT Act** | Data export endpoint, account deletion, privacy policy + consent flow |
| **Blocked Users** | Blocked users never appear in discovery or matches |

---

## 13. Environment Variables

```bash
# Database (Neon)
DATABASE_URL=postgresql://...?sslmode=require&pgbouncer=true
DIRECT_URL=postgresql://...?sslmode=require

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding/step-1

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Pusher
NEXT_PUBLIC_PUSHER_APP_KEY=...
PUSHER_APP_ID=...
PUSHER_APP_SECRET=...
PUSHER_CLUSTER=ap2

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Resend (Email)
RESEND_API_KEY=re_...
FROM_EMAIL=hello@sanyogya.in

# Razorpay
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# App
NEXT_PUBLIC_APP_URL=https://sanyogya.in
CRON_SECRET=...
```

---

## 14. CI/CD & Deployment Pipeline

```
Developer Push to GitHub
         │
         ▼
GitHub Actions
  ├─ Lint (ESLint + TypeScript check)
  ├─ Unit Tests (Vitest)
  ├─ Prisma validate schema
  └─ Build check (next build)
         │
         ▼
Vercel Preview Deploy (PR)
  └─ Preview URL for review
         │
         ▼ (merge to main)
Vercel Production Deploy
  ├─ prisma generate
  ├─ prisma migrate deploy (Neon prod DB)
  └─ next build
         │
         ▼
Production Live ✅
```

### Infrastructure Summary
| Service | Provider | Tier |
|---|---|---|
| Frontend + API | Vercel | Pro |
| Database | Neon | Launch |
| Redis + Queues | Upstash | Pay-per-use |
| Real-time | Pusher | Starter |
| Media Storage | Cloudinary | Free → Growth |
| Email | Resend | Pro |
| Payments | Razorpay | Live |
| Error Tracking | Sentry | Team |
| Analytics | Vercel Analytics + PostHog | Free |

---

## 15. Phased Development Roadmap

### Phase 1 — Foundation (Weeks 1–3)
> Goal: Project bootstrapped, auth working, DB live

- [ ] Init Next.js 15 project with TypeScript + Tailwind + Shadcn
- [ ] Setup Prisma schema + Neon DB + run initial migration
- [ ] Integrate Clerk auth (sign-in, sign-up, middleware)
- [ ] Implement Clerk webhook → sync user to DB
- [ ] Build Marketing Landing Page (all sections from copy)
- [ ] Setup Upstash Redis + rate limiting utility
- [ ] Setup environment variables + .env structure

### Phase 2 — Onboarding & Application Flow (Weeks 4–5)
> Goal: Users can apply and complete profile setup

- [ ] Build `/apply` public application form + API + DB
- [ ] Build 4-step onboarding wizard (post sign-up)
- [ ] Cloudinary photo upload integration
- [ ] Profile completeness scoring
- [ ] `/onboarding/pending` holding page
- [ ] Admin can see applications list + approve/reject

### Phase 3 — Admin Panel (Weeks 6–7)
> Goal: Admin can manage all applications and members

- [ ] Admin layout + role gating
- [ ] Application review queue UI + API
- [ ] Member management table (search, filter, suspend)
- [ ] Document verification review flow
- [ ] Basic analytics dashboard (Tremor charts)

### Phase 4 — Matching Engine (Weeks 8–9)
> Goal: Approved users get intelligent matches

- [ ] Setup BullMQ with Upstash Redis
- [ ] Build compatibility scoring algorithm
- [ ] Matching worker (triggers on approval)
- [ ] Daily match reveal cron job
- [ ] Match list UI + interest signal (interested / pass)
- [ ] Pusher integration for real-time match notifications

### Phase 5 — Messaging (Weeks 10–11)
> Goal: Mutually interested users can converse

- [ ] Conversation creation on mutual match
- [ ] Real-time chat UI with Pusher
- [ ] Message persistence + pagination
- [ ] Read receipts + typing indicators
- [ ] Block user flow

### Phase 6 — Notifications & Membership (Weeks 12–13)
> Goal: Full notification system + paid tiers

- [ ] In-app notification center
- [ ] Email notifications (Resend) for key events
- [ ] Razorpay subscription integration
- [ ] Membership tier enforcement (feature gating)
- [ ] Settings pages (privacy controls, membership management)

### Phase 7 — Polish & Launch Prep (Weeks 14–16)
> Goal: Production-ready, performant, secure

- [ ] SEO optimization (metadata, sitemap, OG tags)
- [ ] Performance audit (Core Web Vitals)
- [ ] Security audit (rate limits, input validation review)
- [ ] Sentry error monitoring
- [ ] Load testing (k6 or Artillery)
- [ ] Privacy Policy + Terms of Service pages
- [ ] Onboarding email sequence (Resend)
- [ ] Soft launch with limited city rollout

---

## 16. Scalability Considerations

| Concern | Strategy |
|---|---|
| **DB Connections** | Neon serverless + PgBouncer pool, Prisma singleton |
| **API Rate Limits** | Upstash Ratelimit per user + per IP |
| **Heavy Computations** | Matching engine runs in BullMQ workers, not in API routes |
| **Cache Invalidation** | Profile updates purge Redis cache keys |
| **File Delivery** | Cloudinary CDN with image optimization |
| **Real-time Scale** | Pusher handles WebSocket infra (10k+ concurrent) |
| **Database Indexes** | Indexed on: userId, status, city, createdAt, clerkId |
| **Pagination** | Cursor-based pagination for all list endpoints |
| **Observability** | Structured logging, Sentry, Vercel Analytics |
| **Multi-City Rollout** | City-based member limits enforced at admin onboarding |

---

## 17. Open Questions & Decisions Required

> [!IMPORTANT]
> Please review and confirm the following decisions before implementation begins.

> [!WARNING]
> **Matching Visibility Model**: Should users see a list of curated matches (our pick), OR browse a filtered discover feed themselves, OR both? This affects UI and matching engine complexity significantly.

> [!IMPORTANT]
> **Paid Tier Structure**: What are the specific features per membership tier (Basic/Premium/Elite)? E.g., how many matches visible per month per tier? Can free members message?

> [!IMPORTANT]
> **Photo Privacy**: Should profile photos be blurred/hidden until a mutual match is established? Many premium platforms use this model.

> [!NOTE]
> **City Rollout Strategy**: Which cities to launch first? This informs the DB seed and admin onboarding caps.

> [!NOTE]
> **Indian Institution Tier Classification**: Need a definitive list of which institutions qualify as "top-tier" for the scoring algorithm (IITs, IIMs, NIT, AIIMS, etc.)

---

*Last updated: April 2026 | Version 1.0*
>>>>>>> 98538c8025b5f066c436a12dbcfdd25a300d0a4d
