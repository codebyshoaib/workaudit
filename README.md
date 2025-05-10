# WorkAudit - Next.js (v2.0)

## Installation

### Prerequisites

To get started with this Application, ensure you have the following prerequisites installed and set up:

- Node.js 18.x or later (recommended to use Node.js 20.x or later)

### Getting Started

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
   > Use `--legacy-peer-deps` flag if you face peer-dependency error during installation.

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Folder Structure
   ```bash
   
   WORKAUDIT_MAIN_V1/
   ├── .env                        # Secrets (DB, JWT, Email credentials)
   ├── .gitignore
   ├── next.config.ts
   ├── next-env.d.ts
   ├── package-lock.json
   ├── package.json
   ├── tsconfig.json
   ├── middleware.ts              # Global middleware (JWT protect)
   │
   ├── public/                    # Static assets
   │
   ├── prisma/                    # Prisma schema and migrations
   │   ├── schema.prisma
   │   └── migrations/
   │
   ├── src/
   │   ├── app/                   # App Router pages
   │   │   ├── layout.tsx         # Root layout
   │   │   ├── page.tsx           # Homepage
   │   │   ├── globals.css
   │   │   ├── favicon.ico
   │   │   ├── not-found.tsx
   │   │   │
   │   │   └── api/               # API routes (server-side)
   │   │       └── auth/
   │   │           ├── [...nextauth]/route.ts   # OAuth via NextAuth
   │   │           ├── login/route.ts           # Custom login (email/password)
   │   │           ├── register/route.ts        # Custom register
   │   │           ├── reset-password/route.ts  # Password reset
   │   │           └── two-factor/route.ts      # 2FA (OTP logic)
   │   │
   │   │   └── (admin)/            # Protected admin dashboard
   │   │   └── (full-width-pages)/ # Public pages
   │
   │   ├── components/            # UI components (buttons, inputs, etc.)
   │   ├── context/               # React context (e.g., auth state)
   │   ├── hooks/                 # Custom React hooks
   │   ├── icons/                 # SVG or icon components
   │   ├── layout/                # Layout-related components (Navbar, Sidebar)
   │
   │   └── server/                # Secure server-side business logic
   │       ├── auth/              # Auth logic
   │       │   ├── login.ts
   │       │   ├── register.ts
   │       │   ├── resetPassword.ts
   │       │   ├── sendOtp.ts
   │       │   └── twoFactor.ts
   │       │
   │       ├── lib/               # Backend helpers/utilities
   │       │   ├── db.ts           # Prisma client
   │       │   ├── jwt.ts          # JWT sign/verify
   │       │   ├── bcrypt.ts       # Password hashing
   │       │   └── sendEmail.ts    # Nodemailer or similar
   │       │
   │       ├── schemas/           # Zod validation schemas
   │       │   ├── loginSchema.ts
   │       │   ├── registerSchema.ts
   │       │   └── passwordSchema.ts
   │       │
   │       └── errors/            # Error handling
   │           ├── AppError.ts
   │           └── errorHandler.ts

   ```

## License

Refer to our [LICENSE](https://tailadmin.com/license) page for more information.
