/**
 * HourStory's Privacy Policy & Terms of Service — transcribed verbatim from
 * the source document supplied by the app's operator. Do not paraphrase or
 * "improve" the wording here; any change to a legal document like this one
 * must come from the person who is bound by it, not from an editing pass.
 *
 * English only, deliberately: this is a binding legal document with
 * liability caps and jurisdiction-specific rights (GDPR/CCPA/COPPA). A
 * machine translation of that kind of text carries real legal risk if a
 * nuance shifts in translation, so every locale route renders the same
 * English text rather than a translated version. See LegalDocPage.
 */

export const HOURSTORY_LAST_UPDATED = "2026-07-05";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "shout"; text: string }; // ALL-CAPS disclaimer/liability text in the source

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

const PREAMBLE: LegalBlock[] = [
  {
    type: "p",
    text: 'HourStory is operated by Faizan Gillani ("we," "us," "our," "HourStory"). This document has two parts: a Privacy Policy — what we collect, why, and your rights — and a Terms of Service — the rules for using the app.',
  },
  {
    type: "p",
    text: 'Both apply to the HourStory mobile application (iOS and Android) and any related services (collectively, the "App" or "Service"). By creating an account or using the App, you agree to both.',
  },
  { type: "p", text: "If you have questions at any point, email fyizannn@gmail.com." },
];

export const hourStoryPrivacy: { title: string; sections: LegalSection[] } = {
  title: "Privacy Policy",
  sections: [
    {
      id: "overview",
      heading: "1. Overview",
      blocks: [
        {
          type: "p",
          text: "HourStory is a private, two-person journal. It exists so you and one paired partner can capture small moments — a photo, a short video, a voice note, a few words — throughout the day, and see each other's day unfold hour by hour. There is no public feed, no stranger discovery, no algorithmic timeline, and no advertising.",
        },
        {
          type: "p",
          text: "We designed HourStory around a simple principle: collect as little as possible, share it with no one but the two of you, and never sell it. This policy explains exactly what that means in practice.",
        },
        {
          type: "p",
          text: 'This policy is written to comply with the Apple App Store Review Guidelines, Google Play\'s Developer Program Policies (including the Data Safety and User Data Policy requirements), the EU/UK General Data Protection Regulation ("GDPR"/"UK GDPR"), the California Consumer Privacy Act as amended by the California Privacy Rights Act ("CCPA/CPRA"), and the U.S. Children\'s Online Privacy Protection Act ("COPPA").',
        },
      ],
    },
    {
      id: "information-we-collect",
      heading: "2. Information We Collect",
      blocks: [
        {
          type: "p",
          text: "a. Account information. When you sign up, we collect your name, email address, and a password. Your password is processed by Firebase Authentication and is never visible to us in plain text.",
        },
        {
          type: "p",
          text: 'b. Your content. The photos, short videos, voice notes, text entries, and captions you create ("Snaps"), plus the messages, photos, videos, and voice notes you send in your shared chat thread with your paired partner ("Messages").',
        },
        {
          type: "p",
          text: "c. Partner-pairing data. A unique invite code generated for your account, and — once you pair — your partner's user ID (not their email or password), the date you paired, and (if applicable) when your shared free-trial period started.",
        },
        {
          type: "p",
          text: 'd. Presence & device data. The approximate time you last opened the app ("last seen"), your device\'s UTC time-zone offset (so your partner\'s hourly timeline lines up correctly with your local time), and a device push-notification token (see Section 8).',
        },
        {
          type: "p",
          text: "e. Subscription status. Whether your account is on the free tier, a paid plan, or the honeymoon trial, and — if you subscribe — a subscription identifier from Apple/Google and RevenueCat used to verify your entitlement. We do not receive or store your credit card, debit card, or full payment details — those are collected and processed directly by Apple (App Store) or Google (Google Play) under their own privacy policies.",
        },
        {
          type: "p",
          text: "f. Biometric authentication (optional, on-device only). If you enable App Lock with Face ID, Touch ID, or your device passcode, authentication is handled entirely by your device's operating system. HourStory never receives, transmits, or stores your biometric data or facial/fingerprint templates — your device simply tells our app \"yes\" or \"no.\"",
        },
        {
          type: "p",
          text: "g. Customer support communications. If you email us, we retain that correspondence to help you and to improve the app.",
        },
      ],
    },
    {
      id: "information-we-do-not-collect",
      heading: "3. Information We Do Not Collect",
      blocks: [
        { type: "p", text: "To be equally explicit about what we deliberately avoid:" },
        {
          type: "list",
          items: [
            "No location or GPS data. We do not request or use your device's location.",
            "No location metadata in photos. EXIF location data embedded in photos is stripped before upload.",
            "No advertising identifiers. We do not collect IDFA (iOS), Android Advertising ID, or any identifier used for cross-app/cross-site advertising.",
            "No contacts, calendar, or other app data. HourStory does not request access to your address book, calendar, or other apps' data.",
            "No browsing history or web tracking.",
            "No health, financial, or government-ID data.",
            "No analytics or crash-reporting SDKs are currently integrated into the app, so no behavioral analytics profile is built from your usage.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      heading: "4. How We Use Your Information",
      blocks: [
        { type: "p", text: "We use the information above only to:" },
        {
          type: "list",
          items: [
            "Create and secure your account, and let you sign in.",
            "Let you and your paired partner see each other's Snaps and Messages, and no one else's.",
            "Generate and validate invite codes so two people can pair.",
            "Show accurate hourly timestamps across time zones.",
            "Deliver push notifications about your partner's activity (new Snaps, reactions, messages).",
            "Process and validate your subscription/trial status.",
            "Respond to support requests.",
            "Maintain the security, integrity, and reliability of the Service (e.g., detecting abuse of the security rules that protect your data).",
          ],
        },
        {
          type: "p",
          text: "We do not use your content or account data to train third-party AI models, to build an advertising profile, or to sell or rent to data brokers.",
        },
      ],
    },
    {
      id: "legal-bases",
      heading: "5. Legal Bases for Processing (EEA/UK/Switzerland)",
      blocks: [
        {
          type: "p",
          text: "If you are located in the European Economic Area, the United Kingdom, or Switzerland, we process your personal data under the following legal bases:",
        },
        {
          type: "list",
          items: [
            "Performance of a contract — to provide the core pairing, capture, and messaging features you signed up for.",
            "Consent — for optional features you affirmatively opt into, such as push notifications, App Lock, or starting the honeymoon trial.",
            "Legitimate interests — to secure the Service, prevent abuse, and maintain reliability, balanced against your rights.",
            "Legal obligation — where we must retain or disclose information to comply with law.",
          ],
        },
      ],
    },
    {
      id: "how-content-is-shared",
      heading: "6. How Your Content Is Shared",
      blocks: [
        {
          type: "p",
          text: "Your Snaps and Messages are visible only to you and the single partner you are currently paired with. Specifically:",
        },
        {
          type: "list",
          items: [
            "Content marked Private mode is visible only to you — never to your partner, regardless of pairing status.",
            "There is no public feed, explore page, or search that surfaces any user's content to anyone outside their pair.",
            "Our backend security rules are scoped so that even other authenticated HourStory users cannot read your profile, Snaps, or Messages unless they are your linked partner (and, for Private-mode Snaps, not even then).",
            "If you unpair from a partner, they immediately lose access to future content; previously shared Snaps and the shared chat thread are only fully removed if either of you deletes your account (see Section 10).",
          ],
        },
      ],
    },
    {
      id: "service-providers",
      heading: "7. Third-Party Service Providers",
      blocks: [
        {
          type: "p",
          text: "We use the following service providers to operate HourStory. Each acts as a data processor on our behalf under its own security and privacy commitments — none of them are permitted to use your data for their own advertising purposes.",
        },
        {
          type: "table",
          headers: ["Provider", "Purpose", "Data involved"],
          rows: [
            [
              "Google Firebase (Authentication, Cloud Firestore, Cloud Storage, Cloud Functions, Cloud Messaging)",
              "Account sign-in, database, media storage, backend logic, push delivery",
              "Account info, content, device push tokens",
            ],
            [
              "RevenueCat",
              "Subscription/entitlement management",
              "Subscription status, anonymized purchase/receipt identifiers",
            ],
            [
              "Apple App Store / Google Play Billing",
              "Payment processing",
              "Payment details (held entirely by Apple/Google, not by us)",
            ],
          ],
        },
        {
          type: "p",
          text: "We do not use any advertising network, analytics-for-advertising SDK, or data broker.",
        },
      ],
    },
    {
      id: "push-notifications",
      heading: "8. Push Notifications",
      blocks: [
        {
          type: "p",
          text: "If you allow notifications, your device receives a push token which we store so we can notify you when your partner captures a Snap, reacts to one of yours, or sends a message. You can disable notifications at any time in your device settings; doing so stops future pushes and we remove the token when you sign out.",
        },
      ],
    },
    {
      id: "data-retention",
      heading: "9. Data Retention",
      blocks: [
        {
          type: "p",
          text: "We retain your account information and content for as long as your account is active, so the core pairing and history features work as intended. If you delete your account, your data is deleted as described in Section 10. We may retain minimal information (such as an email address) where necessary to comply with legal obligations, resolve disputes, or enforce our agreements.",
        },
      ],
    },
    {
      id: "deleting-your-data",
      heading: "10. Deleting Your Data",
      blocks: [
        {
          type: "p",
          text: "You can permanently delete your account at any time from Settings → Delete Account. Deleting your account:",
        },
        {
          type: "list",
          items: [
            "Removes your shared chat thread with your partner (for both of you) and unpairs you from them.",
            "Permanently deletes every Snap you created, including its stored photo/video/voice media.",
            "Permanently deletes your profile document (name, email, invite code, subscription status, device tokens).",
            "Removes your Firebase Authentication record.",
          ],
        },
        {
          type: "p",
          text: "This action is immediate and cannot be undone. Your partner's own Snaps and profile are not affected, other than losing the pairing link and the shared chat history.",
        },
      ],
    },
    {
      id: "data-security",
      heading: "11. Data Security",
      blocks: [
        { type: "p", text: "We protect your data with:" },
        {
          type: "list",
          items: [
            "Encryption in transit (TLS) for all traffic between the app and our backend.",
            "Backend security rules that scope every read and write to the content's owner and, where applicable, their linked partner only — enforced at the database level, not just in the app's UI.",
            "Password-based re-authentication required before sensitive actions like account deletion.",
            "No storage of raw payment card data on our systems.",
          ],
        },
        {
          type: "p",
          text: "No method of transmission or storage is 100% secure, and we cannot guarantee absolute security, but we design every part of the system around minimizing what could ever be exposed.",
        },
      ],
    },
    {
      id: "international-transfers",
      heading: "12. International Data Transfers",
      blocks: [
        {
          type: "p",
          text: "Our infrastructure (Google Firebase / Google Cloud) may process and store data in the United States or other countries where Google operates data centers. Where required, such transfers rely on appropriate safeguards, such as standard contractual clauses, as implemented by our service providers.",
        },
      ],
    },
    {
      id: "your-privacy-rights",
      heading: "13. Your Privacy Rights",
      blocks: [
        {
          type: "p",
          text: "Regardless of where you live, you may contact us at fyizannn@gmail.com to:",
        },
        {
          type: "list",
          items: [
            "Request a copy of the personal data we hold about you.",
            "Request correction of inaccurate data.",
            "Request deletion of your data (or use in-app account deletion directly).",
            "Withdraw consent for optional features (e.g., notifications).",
            "Ask questions about how your data is handled.",
          ],
        },
        {
          type: "p",
          text: "We will respond within the time required by applicable law (generally within 30 days).",
        },
      ],
    },
    {
      id: "california-rights",
      heading: "14. California Privacy Rights (CCPA/CPRA)",
      blocks: [
        { type: "p", text: "If you are a California resident, you have the right to:" },
        {
          type: "list",
          items: [
            "Know what personal information we collect, use, and disclose.",
            "Request deletion of your personal information.",
            "Correct inaccurate personal information.",
            'Opt out of the "sale" or "sharing" of personal information — we do not sell or share your personal information, so no opt-out action is necessary, but you may still submit a request for confirmation.',
            "Not receive discriminatory treatment for exercising your privacy rights.",
          ],
        },
        {
          type: "p",
          text: "We do not sell personal information as defined by the CCPA/CPRA, and have not done so in the preceding 12 months.",
        },
      ],
    },
    {
      id: "european-rights",
      heading: "15. European Privacy Rights (GDPR/UK GDPR)",
      blocks: [
        {
          type: "p",
          text: "If you are in the EEA, UK, or Switzerland, you additionally have the right to:",
        },
        {
          type: "list",
          items: [
            'Access, rectify, or erase your personal data ("right to be forgotten").',
            "Restrict or object to certain processing.",
            "Data portability — receive your data in a structured, machine-readable format.",
            "Lodge a complaint with your local data protection supervisory authority.",
          ],
        },
      ],
    },
    {
      id: "childrens-privacy",
      heading: "16. Children's Privacy",
      blocks: [
        {
          type: "p",
          text: "HourStory is not directed at children and is not intended for use by anyone under 13 years old (the age threshold under COPPA). If you are in the EEA/UK and your country sets a higher age of digital consent (up to 16), you must have parental permission to use the Service. We do not knowingly collect personal information from children below the applicable minimum age. If we learn that we have, we will delete it promptly — contact us at fyizannn@gmail.com if you believe this has happened.",
        },
      ],
    },
    {
      id: "tracking-advertising",
      heading: "17. Tracking & Advertising",
      blocks: [
        {
          type: "p",
          text: "HourStory does not track you across other companies' apps or websites, does not use advertising identifiers, and does not serve third-party ads. Because we do not track users for advertising purposes, the App does not require an App Tracking Transparency (ATT) prompt on iOS.",
        },
      ],
    },
    {
      id: "privacy-changes",
      heading: "18. Changes to This Privacy Policy",
      blocks: [
        {
          type: "p",
          text: 'We may update this Privacy Policy as the app evolves. If we make material changes, we will update the "Last updated" date above and, where appropriate, notify you in the app. Continued use of HourStory after an update means you accept the revised policy.',
        },
      ],
    },
    {
      id: "privacy-contact",
      heading: "19. Privacy Contact",
      blocks: [
        { type: "p", text: "Questions, requests, or concerns about your privacy: fyizannn@gmail.com." },
      ],
    },
  ],
};

export const hourStoryTerms: { title: string; sections: LegalSection[] } = {
  title: "Terms of Service",
  sections: [
    {
      id: "acceptance",
      heading: "20. Acceptance of Terms",
      blocks: [
        {
          type: "p",
          text: "By creating an account or otherwise using HourStory, you agree to be bound by these Terms of Service and the Privacy Policy above. If you do not agree, do not use the App.",
        },
      ],
    },
    {
      id: "eligibility",
      heading: "21. Eligibility",
      blocks: [
        {
          type: "p",
          text: "You must be at least 13 years old to use HourStory (or the minimum age of digital consent in your country, if higher). By using the App, you represent that you meet this requirement and that you have the legal capacity to enter into these Terms.",
        },
      ],
    },
    {
      id: "your-account",
      heading: "22. Your Account",
      blocks: [
        { type: "p", text: "You are responsible for:" },
        {
          type: "list",
          items: [
            "Providing accurate information when you sign up.",
            "Keeping your password confidential and secure.",
            "All activity that occurs under your account.",
            "Notifying us promptly at fyizannn@gmail.com if you suspect unauthorized access to your account.",
          ],
        },
      ],
    },
    {
      id: "description-of-service",
      heading: "23. Description of the Service",
      blocks: [
        {
          type: "p",
          text: 'HourStory lets you capture "Snaps" (photos, short videos, voice notes, or text) tied to specific hours of your day, pair with one partner, and view each other\'s day. It includes an optional shared chat, a "Private mode" for entries only you can see, and optional premium features described in Section 25. We may add, change, or remove features at any time.',
        },
      ],
    },
    {
      id: "partner-pairing",
      heading: "24. Partner Pairing & Shared Content",
      blocks: [
        {
          type: "list",
          items: [
            "Pairing is initiated by sharing your unique invite code with one other person, who must not already be paired with someone else.",
            "Once paired, non-private Snaps and chat Messages are visible to both of you. By pairing, you consent to this sharing.",
            "You may unpair at any time from Settings. Unpairing stops future sharing, but does not retroactively delete content your partner already had access to unless one of you deletes your account.",
            "You are solely responsible for confirming the identity and consent of the person you pair with. HourStory has no way to verify real-world relationships between paired accounts.",
          ],
        },
      ],
    },
    {
      id: "subscriptions",
      heading: "25. Subscriptions, Trials & Payments",
      blocks: [
        {
          type: "p",
          text: 'a. Free tier. HourStory is free to use with limited access to certain features (e.g., a capped number of videos, edits, and other "taste" allowances described in the app).',
        },
        {
          type: "p",
          text: 'b. Honeymoon trial. Newly paired couples may be offered a 14-day full-feature trial ("Honeymoon"). This trial:',
        },
        {
          type: "list",
          items: [
            "Requires no payment method and is not a paid subscription of any kind.",
            'Only begins when a user explicitly taps "Start" on the offer screen — it is never started automatically.',
            "Automatically ends after 14 days, at which point both accounts return to the free tier. Nothing is ever charged as a result of the Honeymoon trial.",
            "Can only be started once per pairing.",
          ],
        },
        {
          type: "p",
          text: "c. Premium subscription plans. We offer the following paid plans (prices shown in USD; actual price is set by the App Store/Play Store for your region and currency):",
        },
        {
          type: "table",
          headers: ["Plan", "Price", "Billing", "Notes"],
          rows: [
            ["Yearly", "$49.99/year", "Auto-renewing", "May include a free trial period at signup, shown at purchase"],
            ["Monthly", "$8.99/month", "Auto-renewing", "—"],
            ["Lifetime", "$99.99 one-time", "Non-renewing", "One-time purchase, no recurring charge"],
          ],
        },
        {
          type: "p",
          text: "d. Auto-renewal. Yearly and Monthly plans automatically renew unless auto-renew is turned off at least 24 hours before the end of the current billing period. Your payment method (Apple ID or Google Play account) will be charged for renewal within 24 hours prior to the end of the current period, at the price then in effect (you will be notified in advance of any price increase as required by law).",
        },
        {
          type: "p",
          text: "e. Managing or cancelling your subscription. Subscriptions are billed and managed by Apple or Google, not by HourStory directly. To manage or cancel:",
        },
        {
          type: "list",
          items: [
            "iOS: Settings → [your name] → Subscriptions.",
            "Android: Google Play Store → Profile → Payments & subscriptions → Subscriptions.",
          ],
        },
        {
          type: "p",
          text: "f. Refunds. All purchases are subject to the refund policies of the App Store or Google Play, as applicable. We do not process refunds directly.",
        },
        {
          type: "p",
          text: 'g. Shared ("via partner") premium. If one partner in a pair has an active paid subscription, both paired accounts receive premium access for as long as the pairing and the subscription remain active. Premium access ends for both accounts if the subscription lapses or the pair unlinks.',
        },
      ],
    },
    {
      id: "content-license",
      heading: "26. Your Content & License Grant",
      blocks: [
        {
          type: "p",
          text: "You retain ownership of all content you create in HourStory. By uploading a Snap or Message, you grant HourStory a limited, worldwide, non-exclusive license solely to store, process, and display that content to you and your paired partner, for as long as necessary to provide the Service. This license ends when the relevant content or your account is deleted.",
        },
      ],
    },
    {
      id: "acceptable-use",
      heading: "27. Acceptable Use",
      blocks: [
        { type: "p", text: "You agree to use HourStory only for lawful, personal purposes, and not to:" },
        {
          type: "list",
          items: [
            "Upload content that is illegal, obscene, harassing, defamatory, or that violates another person's rights (including privacy or intellectual property rights).",
            "Pair with, or attempt to pair with, someone without their knowledge or consent.",
            "Attempt to access another user's account, content, or data without authorization, or attempt to circumvent the app's security or entitlement systems.",
            "Reverse-engineer, decompile, or scrape the App, or use automated means to access it outside its intended interface.",
            "Use the App in any way that violates applicable law.",
          ],
        },
        {
          type: "p",
          text: "We reserve the right to suspend or terminate accounts that violate these terms.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "28. Intellectual Property",
      blocks: [
        {
          type: "p",
          text: "The HourStory name, logo, app design, and underlying software are owned by us and protected by intellectual property laws. These Terms do not grant you any right to use our branding except as necessary to use the App as intended.",
        },
      ],
    },
    {
      id: "third-party-services",
      heading: "29. Third-Party Services & Links",
      blocks: [
        {
          type: "p",
          text: "The App relies on third-party infrastructure described in Section 7. We are not responsible for the availability, content, or practices of third-party services beyond our reasonable control.",
        },
      ],
    },
    {
      id: "termination",
      heading: "30. Termination",
      blocks: [
        {
          type: "p",
          text: "You may stop using HourStory, or delete your account, at any time. We may suspend or terminate your access if you violate these Terms, if required by law, or if we discontinue the Service, with notice where practicable.",
        },
      ],
    },
    {
      id: "disclaimer",
      heading: "31. Disclaimer of Warranties",
      blocks: [
        {
          type: "shout",
          text: 'THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. KEEP YOUR OWN BACKUPS OF ANY CONTENT THAT MATTERS TO YOU — we are not liable for lost or corrupted content.',
        },
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "32. Limitation of Liability",
      blocks: [
        {
          type: "shout",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, HOURSTORY AND FAIZAN GILLANI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, CONTENT, GOODWILL, OR PROFITS, ARISING FROM YOUR USE OF THE APP, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR THE APP SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM, OR (B) TWENTY U.S. DOLLARS ($20).",
        },
        {
          type: "p",
          text: "Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you, and nothing in these Terms limits any right that cannot be limited under applicable law.",
        },
      ],
    },
    {
      id: "indemnification",
      heading: "33. Indemnification",
      blocks: [
        {
          type: "p",
          text: "You agree to indemnify and hold harmless HourStory and Faizan Gillani from any claims, damages, losses, or expenses (including reasonable legal fees) arising from your violation of these Terms, your content, or your misuse of the App.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "34. Governing Law & Dispute Resolution",
      blocks: [
        {
          type: "p",
          text: "These Terms are intended to apply globally and should be interpreted in a manner consistent with general, internationally recognized principles of contract and consumer-protection law. Nothing in this section overrides any mandatory consumer-protection right you have under the law of your own country or state of residence, which will always take precedence where these Terms conflict with it.",
        },
        {
          type: "p",
          text: "Before pursuing a formal claim, you agree to first contact us at fyizannn@gmail.com so we can try to resolve the issue informally. If a dispute cannot be resolved informally, it should be resolved in the courts or dispute-resolution forum applicable to your place of residence, applying the consumer-protection law that would ordinarily apply to you as a consumer in that location, to the extent such rights cannot be waived.",
        },
      ],
    },
    {
      id: "apple-terms",
      heading: "35. Apple App Store Terms",
      blocks: [
        {
          type: "p",
          text: "If you downloaded HourStory from the Apple App Store, the following additional terms apply and, in the event of any conflict, take precedence for App Store users:",
        },
        {
          type: "list",
          items: [
            'This agreement is between you and HourStory (Faizan Gillani) only, not with Apple Inc. ("Apple"). Apple is not responsible for the App or its content.',
            "Your license to use the App is a non-transferable license to use it only on an Apple-branded device that you own or control, as permitted by the App Store's Usage Rules.",
            "Apple has no obligation to provide maintenance or support for the App.",
            "In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any) for the App to you; to the maximum extent permitted by law, Apple has no other warranty obligation with respect to the App.",
            "Apple is not responsible for addressing any claims by you or a third party relating to the App, including product liability claims, claims that the App fails to conform to legal or regulatory requirements, and claims arising under consumer protection or similar legislation.",
            "Apple is not responsible for the investigation, defense, settlement, or discharge of any third-party claim that the App infringes that third party's intellectual property rights.",
            "You represent that you are not located in a country subject to a U.S. Government embargo, and that you are not on any U.S. Government list of prohibited or restricted parties.",
            "Apple, and Apple's subsidiaries, are third-party beneficiaries of these Terms, and upon your acceptance, Apple has the right to enforce these Terms against you as a third-party beneficiary.",
          ],
        },
      ],
    },
    {
      id: "google-play-terms",
      heading: "36. Google Play Terms",
      blocks: [
        {
          type: "p",
          text: "If you downloaded HourStory from Google Play, your use is also subject to the Google Play Terms of Service. In-app purchases made through Google Play are governed by Google Play's own payment terms in addition to Section 25 above.",
        },
      ],
    },
    {
      id: "severability",
      heading: "37. Severability & Entire Agreement",
      blocks: [
        {
          type: "p",
          text: "If any provision of these Terms is found unenforceable, the remaining provisions remain in full force. These Terms, together with the Privacy Policy, constitute the entire agreement between you and us regarding the App, superseding any prior agreements.",
        },
      ],
    },
    {
      id: "terms-changes",
      heading: "38. Changes to These Terms",
      blocks: [
        {
          type: "p",
          text: 'We may update these Terms as the App evolves. If we make material changes, we will update the "Last updated" date and, where appropriate, notify you in the app. Continued use after an update means you accept the revised Terms.',
        },
      ],
    },
    {
      id: "terms-contact",
      heading: "39. Contact",
      blocks: [
        {
          type: "p",
          text: "Questions about these Terms or the Privacy Policy: fyizannn@gmail.com.",
        },
      ],
    },
  ],
};

export const hourStoryLegalPreamble = PREAMBLE;
