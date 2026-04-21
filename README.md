# Google Calendar Viewer

A password-protected web app that displays your Google Calendar events (titles and times) in a clean, read-only view. Built with Next.js and deployed to Vercel.

## Setup

### 1. Google Cloud Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select or create a project
3. Enable the **Google Calendar API** (APIs & Services > Library > search "Google Calendar API")
4. Create a **Service Account** (APIs & Services > Credentials > Create Credentials > Service Account)
5. Create a key for the service account (JSON format) and download it

### 2. Share Your Calendar

1. Open [Google Calendar](https://calendar.google.com/)
2. Click the three dots next to your calendar > **Settings and sharing**
3. Under **Share with specific people**, add the service account email (from the JSON key file, the `client_email` field)
4. Set permission to **See all event details**

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The `client_email` from your service account JSON key |
| `GOOGLE_PRIVATE_KEY` | The `private_key` from your service account JSON key (keep the quotes) |
| `GOOGLE_CALENDAR_ID` | Your calendar ID (usually your Gmail address) |
| `ACCESS_PASSWORD` | The shared password to access the viewer |

### 4. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and enter your password.

### 5. Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in [Vercel](https://vercel.com/new)
3. Add the four environment variables above in the Vercel project settings
4. Deploy — that's it

## Tech Stack

- **Next.js 14** (App Router)
- **Google Calendar API** via service account
- **Tailwind CSS** for styling
- **Vercel** for hosting
