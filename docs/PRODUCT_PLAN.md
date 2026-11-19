# LingoLume product plan

**Status:** Approved planning baseline for the interactive mockup
**Date:** November 2026
**Working name:** LingoLume
**Promise:** Learn the language. Step into its world.

## 1. Product decision

LingoLume is a premium, mobile-first language-learning experience for adult and self-directed learners. The first learning experience is designed for Korean, Japanese, and Mandarin Chinese.

The product teaches three primary abilities together:

1. Read the target language.
2. Write the target language.
3. Speak the target language.

Listening supports all three abilities and is assessed separately. LingoLume must not become a speaking-only AI chatbot.

## 2. Repository audit before build

The starting repository contained only the AI Studio starter README. There was no app source, design system, backend, AI provider, language curriculum, authentication, or mobile packaging. The approved phone-frame mockups and the visual concept image are the initial product reference assets.

The first build is intentionally a **front-end product mockup**. It uses realistic local state and interactions but does not pretend that authentication, progress sync, AI inference, voice assessment, subscriptions, or curriculum publishing are live.

## 3. Design lock

The phone mockups are the visual source of truth. The interactive review experience is rebuilt as a real component layer inside the same phone proportions and visual language; the approved images remain reference assets, not content rendered inside the app. The interactive experience must remain one coherent product:

- Midnight navy foundation.
- Luminous cyan and ice-blue light.
- Restrained coral-gold action accent.
- Premium graphite phone frame for presentation assets.
- Soft glass surfaces with restrained borders and shadows.
- Editorial typography, generous spacing, and accessible contrast.
- LingoLume portal mark and wordmark.
- Calm, intelligent, adult-focused, never childish.
- Motion communicates state and progress; it never blocks learning.
- Reduced-motion and low-performance fallbacks are required in the real product.
- No unrelated illustrations, random colors, alternate themes, or generic purple AI dashboards.

## 4. Information architecture

### Primary areas

- **Home:** what to do next, current lesson, review queue, and evidence of progress.
- **Learn:** course map, units, lessons, script foundations, grammar, and vocabulary.
- **Practise:** speaking, listening, writing, reading, review, and AI tutor entry points.
- **Immerse:** curriculum-connected real-world scenarios.
- **Progress:** separate reading, writing, speaking, listening, vocabulary, grammar, and task evidence.
- **Profile:** learner settings, tutor mode, downloads, privacy, subscription, and support.

### Onboarding

1. Welcome and brand promise.
2. Target language.
3. Goal and daily routine.
4. Beginner or short placement check.
5. Tutor mode and accessibility preferences.
6. First learning plan.

## 5. Curriculum model

The course hierarchy is:

**Language → level → unit → lesson → skill activity → evidence → review**

The first beginner pathway is planned around:

- Unit 0: Enter the language / script and sound foundations.
- Unit 1: Meet someone.
- Unit 2: Everyday rhythm.
- Unit 3: Food and ordering.
- Unit 4: Places and directions.
- Unit 5: Shopping and comparing.
- Unit 6: Plans and preferences.
- Unit 7: When something goes wrong.
- Unit 8: Study, work, and real connection.

Every complete lesson follows:

1. Preview.
2. Hear and notice.
3. Read.
4. Write.
5. Retrieve.
6. Speak.
7. Apply.
8. Feedback and review.

A unit is not complete until the learner demonstrates reading, writing, speaking, listening support, and an applied task.

## 6. Mockup scope

The interactive mockup includes:

- Welcome.
- Onboarding language selection.
- Onboarding goal and routine.
- Home dashboard.
- Learn course map.
- Lesson player with read, write, and speak states.
- Practice studio and AI tutor placeholder.
- Immersion scenario library.
- Progress evidence.
- Profile, settings, and plan placeholder.
- Responsive desktop sidebar and mobile bottom navigation.
- Local interaction state for lesson answers, navigation, onboarding, and upgrade modal.

## 7. What is not live yet

The mockup does not claim to have:

- Real AI tutor responses.
- Speech-to-text.
- Text-to-speech.
- Pronunciation assessment.
- Real accounts or authentication.
- Supabase data or storage.
- Subscription billing.
- Production course publishing.
- Real offline synchronisation.

These will be researched and integrated only after the learning model, provider capability matrix, privacy requirements, and operating costs are approved.

## 8. Quality gates before production

### Curriculum

- Native-speaker review for each language.
- Educator review of learning progression.
- Multiple valid answers and regional variation tested.
- Cultural notes reviewed and labelled.

### AI and voice

- Provider capability checked per language, region, device, and feature.
- Tutor grounded in approved curriculum context.
- Pronunciation feedback only where the technology supports honest, useful feedback.
- Cost, latency, safety, retention, deletion, and consent rules defined before integration.

### Product

- Reading, writing, and speaking progress shown separately.
- No mastery label after a single correct attempt.
- Low-memory Android and unstable-connection testing.
- Reduced-motion and static fallbacks.
- Clear recording state and microphone permission handling.

## 9. Packaging decision

The mockup is delivered as a Vite web experience and a Capacitor Android shell. The repository includes a GitHub Actions workflow that builds a debug APK and uploads it as an artifact on pushes and manual workflow runs. This is a review build, not a store release.

## 10. Next research after the mockup

1. Test the onboarding and lesson loop with learners.
2. Validate Unit 0 and Unit 1 examples with Korean, Japanese, and Mandarin educators.
3. Compare speech, AI, and pronunciation providers by capability rather than marketing claims.
4. Select the first language variant and base-language scope.
5. Define the Supabase data model and server-side authorisation.
6. Replace local mock state with reviewed curriculum data and real learner accounts.
