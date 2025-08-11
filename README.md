# WebApp Starter Template

This repository serves as a starter template for building web applications using the following tech stack:

- **Next.js**: A React-based framework for server-rendered applications.
- **Supabase**: A backend-as-a-service for authentication, database, and storage.
- **Stripe**: A payment gateway for handling subscriptions and payments.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN UI Components**: Pre-built, customizable components for modern web design.

## Features

### Authentication

- User sign-up and sign-in flows powered by Supabase authentication.
- Secure user session management.

### Database Operations

- CRUD (Create, Read, Update, Delete) operations on the Supabase database.
- Integration with Stripe for storing and syncing subscription data.

### Payment Integration

- Stripe checkout and customer portal sessions for seamless payment management.
- Webhooks to handle subscription, product, and price updates.

### UI Design

- Responsive design using TailwindCSS.
- Pre-designed components from ShadCN for a polished look and feel.

## Project Structure

```plaintext
├── pages/               # Next.js pages and routes
├── components/ui        # Reusable UI components (ShadCN-based)
├── styles/              # TailwindCSS configuration and global styles
├── lib/                 # Helper functions for API and database operations
├── supabase/            # Supabase configuration and queries
```

## Setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/webapp-starter-template.git
   cd webapp-starter-template
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Access the app at `http://localhost:3000`.

## Scripts

The following scripts are available in the `package.json`:

### Development

- `dev`: Starts the Next.js development server with Turbo mode.
- `lint`: Runs ESLint to check for linting errors.
- `prettier-fix`: Formats the codebase using Prettier.

### Stripe

- `stripe:login`: Logs into your Stripe account.
- `stripe:listen`: Starts Stripe CLI to forward webhooks to your local API.
- `stripe:fixtures`: Loads Stripe fixtures for setting up products, prices, etc.

### Supabase

- `supabase:start`: Starts the Supabase local development environment.
- `supabase:stop`: Stops the Supabase local environment.
- `supabase:status`: Checks the status of the Supabase local environment.
- `supabase:restart`: Restarts the Supabase local environment.
- `supabase:reset`: Resets the Supabase database.
- `supabase:link`: Links your local project to a Supabase project.
- `supabase:generate-types`: Generates TypeScript types from your database schema. If you are not using a local Supabase instance, you should also change the --local flag to --linked or --project-id <string> in the supabase:generate-types script in package.json. See -> [Generating TypeScript Types](https://supabase.com/docs/guides/api/rest/generating-types).
- `supabase:generate-migration`: Creates a new migration based on database changes.
- `supabase:generate-seed`: Generates seed data from your local database.
- `supabase:push`: Applies migrations to your Supabase database.
- `supabase:pull`: Pulls the current database schema to your local project.

## TailwindCSS Setup

TailwindCSS is pre-configured with custom utilities and responsive breakpoints. You can customize it in `tailwind.config.js`.

## ShadCN Components

Reusable components from ShadCN are located in the `components/ui` directory. These components are designed for seamless integration with TailwindCSS.

## Deployment

### Vercel

This template is optimized for deployment on Vercel:

1. Push your repository to GitHub.
2. Connect the repository to Vercel.
3. Set environment variables in Vercel.
4. Deploy the application.

### Supabase

Ensure your Supabase project is set up with the required database schema:

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.