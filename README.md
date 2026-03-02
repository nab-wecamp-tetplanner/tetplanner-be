# 🎊 Tet Planner - Backend API

<p align="center">
  <i>Planning, celebrating and making every Tet unforgettable</i>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" /></a>
</p>

---

### WeCamp Batch 9 - Team Winx

A RESTful API backend for managing Vietnamese Lunar New Year (Tet) celebrations. Built with NestJS and TypeORM, it enables users to create Tet plans, organize tasks across timeline phases, track budgets with multi-currency support, manage shopping lists with price estimates, collaborate with family members, and get AI-powered planning assistance.

**Deployed at**: Render (free tier)  
**API Documentation**: Swagger UI available at `/api`

---

## 💻 Technologies

**Core Framework**: NestJS • TypeScript • TypeORM  
**Database**: PostgreSQL (Supabase)  
**Authentication**: Passport JWT • bcrypt  
**Email Service**: Brevo (OTP & notifications)  
**AI Integration**: Google Gemini AI  
**Storage**: Supabase Storage (S3-compatible)  
**Validation**: class-validator • class-transformer  
**Scheduling**: @nestjs/schedule (cron jobs)  
**Documentation**: Swagger  
**Deployment**: Render (free tier) • CI/CD with GitHub Actions  
**Tools**: ESLint • Prettier • Jest

---

## ✨ Features

**Authentication & Authorization**

- User registration and login with JWT
- Email verification with OTP via Brevo
- Password reset functionality
- Role-based access control for collaborators

**Tet Configuration Management**

- Create multiple Tet plans for different years
- Set overall budget caps with multi-currency support (VND, USD, etc.)
- Soft delete for dataretention

**Category System**

- Create custom categories or use system-defined ones
- Allocate budgets per category
- Customize with icons and colors

**Timeline Phase Management**

- Define custom phases (e.g., "Preparation", "Tet Eve", "Tet Days", "Post-Tet")
- Set start/end dates with display order
- Organize tasks by time period

**Todo Item Management**

- Create tasks with priority levels (LOW, MEDIUM, HIGH)
- Status tracking (PENDING, IN_PROGRESS, COMPLETED)
- **Shopping mode**: Track items with price estimates, quantities, and purchase status
- **Subtasks**: JSONB-based subtask tracking with auto-calculated progress percentage
- Deadline tracking with automated overdue detection (cron job)
- Assign tasks to collaborators

**Budget Transaction Tracking**

- Record expenses, refunds, and adjustments
- Link transactions to configurations
- Transaction notes and timestamps

**Collaboration System**

- Invite users to collaborate on Tet plans
- Role management (OWNER, EDITOR, VIEWER)
- Invitation status tracking (PENDING, ACCEPTED)

**Notifications**

- Task update notifications
- Read/unread status tracking

**AI Chat Assistant**

- AI-powered planning assistance using Google Gemini
- Context-aware Tet preparation suggestions

**Dashboard & Analytics**

- Budget overview and spending analysis
- Task completion statistics
- Category-wise expense breakdown

**File Storage**

- Avatar/profile image uploads via Supabase Storage

---

## 🗄️ Backend State Structure

The backend is organized around **8 core domain entities**. Everything flows from a user creating a `tet_config` (a plan for a specific Tet year).

### Entity Hierarchy

```
users
  └─ tet_configs (owns)
       ├─ categories
       ├─ timeline_phases
       ├─ todo_items
       ├─ budget_transactions
       └─ collaborators
```

### Core Entities

#### 1. Users - Authentication & Identity

```typescript
{
  id: uuid,
  email: string (unique),
  password_hash: string,
  name: string,
  is_verified: boolean,
  image_url?: string,
  created_at: timestamp,
  deleted_at?: timestamp  // soft delete
}
```

**Relations**: Owns `tet_configs`, can be invited as `collaborator`, assigned to `todo_items`, receives `notifications`.

---

#### 2. Tet Configs - The Central Planning Unit

```typescript
{
  id: uuid,
  owner_id: uuid,          // FK to users
  year: number,
  name: string,
  total_budget: decimal,
  currency: string,        // Default: 'VND'
  created_at: timestamp,
  deleted_at?: timestamp
}
```

Represents a single Tet celebration plan. Users can have multiple configs for different years or family groups.  
**Relations**: Parent to all planning entities. When deleted, all child entities are cascade-deleted (soft delete).

---

#### 3. Categories - Task & Budget Organization

```typescript
{
  id: uuid,
  tet_config_id: uuid,
  name: string,
  icon?: string,
  color?: string,
  is_system: boolean,      // System-defined vs user-created
  allocated_budget?: decimal,
  deleted_at?: timestamp
}
```

Categories belong to `tet_configs`, NOT users. This allows shared categories within a plan.

---

#### 4. Timeline Phases - Temporal Organization

```typescript
{
  id: uuid,
  tet_config_id: uuid,
  name: string,
  start_date: timestamp,
  end_date: timestamp,
  display_order: number
}
```

Divide Tet planning into logical time periods (e.g., Pre-Tet Preparation, Tet Eve, Tet Days, Post-Tet).

---

#### 5. Todo Items - The Core Task Entity

```typescript
{
  id: uuid,
  tet_config_id: uuid, timeline_phase_id: uuid,
  category_id: uuid,
  assigned_to?: uuid,

  title: string,
  priority: enum,              // LOW | MEDIUM | HIGH
  status: enum,                // PENDING | IN_PROGRESS | COMPLETED
  deadline?: timestamp,
  is_overdue: boolean,         // Auto-calculated by cron job

  // Shopping mode
  is_shopping: boolean,
  estimated_price?: decimal,
  quantity: number,
  purchased: boolean,

  // Subtasks
  subtasks: jsonb,             // { "task1": true, "task2": false }
  done_percentage: number,     // Computed from subtasks

  created_at: timestamp,
  deleted_at?: timestamp
}
```

**Key Features**:

- Shopping mode tracks purchases with price/quantity
- Subtasks stored in JSONB for flexibility
- Progress auto-calculated from subtask completion
- Overdue detection via automated cron job

---

#### 6. Budget Transactions - Financial Tracking

```typescript
{
  id: uuid,
  tet_config_id: uuid,
  category_id?: uuid,
  todo_item_id?: uuid,
  recorded_by?: uuid,

  amount: decimal,
  type: enum,                 // EXPENSE | REFUND | ADJUSTMENT
  note?: string,
  transaction_date: timestamp
}
```

---

#### 7. Collaborators - Shared Planning

```typescript
{
  id: uuid,
  tet_config_id: uuid,
  user_id: uuid,
  role: enum,                 // OWNER | EDITOR | VIEWER
  status: enum,               // PENDING | ACCEPTED
  accepted_at?: timestamp
}
```

**Workflow**: Owner invites user (PENDING) → User accepts (ACCEPTED) → Access controlled by role

---

#### 8. Notifications - Activity Alerts

```typescript
{
  id: uuid,
  user_id: uuid,
  todo_item_id?: uuid,
  title: string,
  is_read: boolean,
  created_at: timestamp
}
```

---

### State Management Patterns

- **Soft Deletes**: `users`, `tet_configs`, `categories`, `todo_items` use `deleted_at` for data retention
- **Cascade Deletes**: When `tet_config` is deleted, all related entities auto-cleanup
- **Computed Fields**: `done_percentage` calculated from subtasks, `is_overdue` updated by cron
- **Enums**: TodoPriority, TodoStatus, TransactionType, CollaboratorRole, CollaboratorStatus

---

## ⚠️ Known Limitations

Working under tight WeCamp deadlines meant making tough choices about what to prioritize. Here's what's missing or incomplete:

### 🐌 Performance - Free Tier Reality

The backend runs on Render's free tier:

| Issue             | What Happens                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| **Cold Starts**   | Server sleeps after 15min idle → first request takes 20-50 seconds to wake up |
| **Response Time** | Shared resources = noticeably slower than production-grade hosting            |
| **Auto-Sleep**    | Can't maintain persistent connections or real-time features                   |

Chose free hosting because this is a student project - Supabase for database, Render for backend, both free. Gets the job done for demonstrating functionality.

---

### 🧪 Tests - Haven't Written Them

The `.spec.ts` files exist. Jest is configured. But actual test implementations? Missing.

```
❌ Unit tests - just scaffolding
❌ E2E tests - basic setup only
❌ Integration tests - external services not mocked
❌ Load testing - no benchmarks
```

During WeCamp, faced a choice: spend time writing tests or implement more features. Chose features. Deadlines are deadlines.

---

### 🔒 What's Missing (Security & Scale)

- **No rate limiting** - endpoints wide open to abuse
- **No caching** - every request hits database directly
- **File uploads** - no validation on file types or sizes
- **Connection pooling** - Supabase's 100 connection limit could be hit under load
- **API versioning** - breaking changes affect all clients

---

### 🚧 Half-Finished Features

- **Email verification** - OTP works but no resend mechanism or proper expiration
- **Real-time notifications** - stored in DB but require polling, no WebSocket
- **Budget analytics** - transactions tracked but no visualizations or trends
- **Collaboration permissions** - roles exist but enforcement inconsistent
- **AI chat** - Gemini integration works but no conversation memory

---

## 🚀 Getting Started

### Installation

```bash
# Clone repository
git clone <repository-url>
cd tetplanner-be

# Install dependencies
npm install
```

### Environment Configuration

Create `.env` file:

```env
# Database
DATABASE_HOST=your-supabase-db-host
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password
DATABASE_NAME=postgres

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=7d

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key

# Google AI
GOOGLE_API_KEY=your-gemini-api-key

# Brevo Email
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=noreply@tetplanner.com

# Application
PORT=3001
NODE_ENV=development
```

### Running

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### API Documentation

Swagger UI: `http://localhost:3001/api`

---

## 👥 Contributors

### Backend Development

| Avatar                                                  | Name          | Role              | GitHub                                     |
| ------------------------------------------------------- | ------------- | ----------------- | ------------------------------------------ |
| <img src="https://github.com/hankhongg.png" width="50"> | **Han Khong** | Backend Developer | [@hankhongg](https://github.com/hankhongg) |

### Frontend Development

| Avatar                                                   | Name                    | Role               | GitHub                                       |
| -------------------------------------------------------- | ----------------------- | ------------------ | -------------------------------------------- |
| <img src="https://github.com/viLam11.png" width="50">    | **Huỳnh Bảo Ngọc**      | Frontend Developer | [@viLam11](https://github.com/viLam11)       |
| <img src="https://github.com/ynhind.png" width="50">     | **Yen Nhi**             | Frontend Developer | [@ynhind](https://github.com/ynhind)         |
| <img src="https://github.com/linhlk123.png" width="50">  | **Luu Khanh Linh**      | Frontend Developer | [@linhlk123](https://github.com/linhlk123)   |
| <img src="https://github.com/lngphgthao.png" width="50"> | **Le Ngoc Phuong Thao** | Frontend Developer | [@lngphgthao](https://github.com/lngphgthao) |

> **Team Winx** - 5 members working together to make Tet planning effortless

---

<p align="center">
  <i>Developed for <b>NAB WeCamp Batch 9</b> • Making every Tet celebration unforgettable! 🎊</i>
</p>
