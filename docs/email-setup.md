# Email Setup Guide

## 1. Verify Your Domain in Resend

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (for example, `yourdomain.com`)
4. Add the provided DNS records (MX, TXT, CNAME)
5. Wait for verification (usually 1-15 minutes)

## 2. Create API Key

1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it "ROBOxRISE Production"
4. Copy the key (starts with `re_`)
5. Add to `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

## 3. Set Sender Email

Use an email from your verified domain:

```env
EMAIL_FROM="RoboxRise Orders <orders@yourdomain.com>"
```

## 4. Set Notification Inbox

```env
ADMIN_EMAIL=you@example.com
```

## 5. Test Email Delivery

Run this in your browser console on local development:

```js
fetch("/api/test-email", { method: "POST" })
  .then((r) => r.json())
  .then(console.log);
```
