# Editor access and email password recovery

Local editor allowlist is configured for:
- echemartins47@gmail.com
- favourchomzy69@gmail.com

Restart the running local application to pick up .env.local changes. Set the same CONTENT_EDITOR_EMAILS value in production hosting and redeploy; the hosting environment has not been changed.

Use /login → Forgot password? Reset by email code, or /forgot-password:
1. Enter a registered account email.
2. Receive a six-digit code at that address.
3. Enter the code and a new password twice.
4. Sign in with the new password.

Codes expire in 10 minutes, have five verification attempts, and are consumed atomically once. A new code replaces the earlier code. Resends have a 60-second cooldown and persistent per-email/per-IP hourly limits. Reset codes are stored as nonce-bound keyed hashes, not plaintext. Passwords are bcrypt hashed. Existing passwords are never emailed or displayed.
Requests return the same public message for known and unknown email addresses. Delivery failures are reported in server logs without codes, passwords or account identifiers. The mailbox may take a short time to deliver mail; check spam.

Required server settings: MONGODB_URI, JWT_SECRET (or a dedicated PASSWORD_RESET_SECRET in addition to the JWT secret), EMAIL_USER, EMAIL_PASS. Gmail EMAIL_PASS must be a working app password / supported SMTP credential. Never commit environment files.
This feature uses the existing Gmail/Nodemailer setup and adds no paid dependency. Password resets do not revoke other already-issued login tokens; they expire under the existing one-day token policy.
No real account password was changed and no reset message was sent as an implementation test.

Automated checks: node --test tests/artworks.test.mjs tests/password-recovery.test.mjs (14 tests).
Recovery tests use an in-memory store with the same atomic query contract; live reset persistence and end-to-end delivery still need a user-initiated check on the deployed site.

Verification results: production build passed; /login and /forgot-password returned HTTP 200, the recovery link appears on the login page, malformed recovery inputs returned HTTP 400 and a cross-origin request returned HTTP 403. Existing SMTP authentication was verified successfully without sending a message. All 14 automated tests passed. Browser visual QA and a real user-initiated reset remain unverified.

Admin access update: login now uses an HttpOnly session cookie, and admin page requests are guarded before rendering. Older localStorage-only logins must sign in again. See docs/ADMIN-ACCESS-AND-THEME.md for current session and interface behaviour.

## Recovery flow update: verify code before choosing a password
The form now separates recovery into email, OTP verification, and new-password steps. /api/auth/verify-reset-code checks the six-digit OTP, enforces the existing expiry/attempt limit, and exchanges it once for a random 256-bit reset grant. Only the grant hash is stored. The grant expires after five minutes and is consumed atomically by /api/auth/reset-password. Supplying an OTP directly to the password-change endpoint no longer works. Requesting another code invalidates the earlier grant.

Login, registration and recovery password fields now use a shared eye/eye-off visibility control with keyboard-accessible buttons and descriptive labels. Password fields remain hidden initially, with independent toggles for new and confirmation passwords.

22 automated tests passed, including separate validation, inability to bypass verification, grant expiry and simultaneous one-use consumption. No real password was changed or reset email sent during verification.

The production build passed after the staged-recovery update. HTTP checks confirmed login/registration render eye-icon controls, the initial recovery screen has no password input, and malformed verification/reset requests return 400. Interactive browser checks and real email resets remain unverified.
