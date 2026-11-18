# LingoLume

LingoLume is a premium language-learning product mockup built around one promise: **learn the language, step into its world**.

The experience is designed to teach reading, writing, speaking, and supporting listening practice for Korean, Japanese, and Mandarin Chinese. The current build is intentionally a local-state mockup: it demonstrates the complete product flow without pretending that AI, voice assessment, accounts, subscriptions, or curriculum publishing are live.

## Included

- Locked midnight, cyan, and coral-gold LingoLume visual system.
- Welcome and onboarding journey.
- Home dashboard with a balanced Read / Write / Speak plan.
- Learn course map.
- Lesson player with reading, writing, and speaking states.
- Practice studio and tutor placeholder.
- Immersion scenario library.
- Skill-specific progress evidence.
- Profile, privacy, downloads, and Plus plan surfaces.
- Responsive web experience.
- Capacitor Android shell and GitHub Actions APK workflow.

## Run the mockup

```bash
npm install
npm run dev
```

The dev server binds to `0.0.0.0` so it can be reviewed through a live preview.

## Build the web experience

```bash
npm run build
npm run preview
```

## Android review APK

A push to the active branch runs `.github/workflows/android.yml`. The workflow builds the Vite experience, synchronises it into the Capacitor Android shell, assembles a debug APK, and uploads the APK as a GitHub Actions artifact named `lingolume-debug-apk`.

The APK is a review build, not a store release. It contains the same local-state mockup and does not include provider credentials.

## Planning references

- `docs/PRODUCT_PLAN.md` — product audit, locked design, curriculum, mockup scope, quality gates, and next research.
- `design/` — approved concept image and one-phone-per-screen mockups that establish the visual direction.

## Provider status

No AI provider is wired into this mockup. Provider selection remains a planned research step. Any future AI, speech, pronunciation, Supabase, or subscription integration must be server-side, privacy-reviewed, language-specific, and grounded in the approved curriculum.
