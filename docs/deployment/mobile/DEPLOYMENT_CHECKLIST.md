# React Native Mobile App Deployment Checklist (Firebase-backed)

This checklist defines a repeatable release process for Android and iOS using GitHub Actions + Fastlane. It covers pre‑release prep, review/merge, CI triggers, manual steps (where needed), distribution, and post‑deploy verification.

Use this for dev/staging/prod environments. Adjust placeholders once the app source is present (Gradle module path, Xcode scheme/workspace, bundle IDs, package name).

Links to CI workflows:
- PR checks: .github/workflows/mobile-ci.yml
- Tagged release pipeline: .github/workflows/mobile-release.yml

---

## Roles & responsibilities
- Release Owner (RO): Coordinates release, owns versioning/changelog, triggers distribution, monitors post‑deploy.
- Reviewer(s): Code review, approve PR, verify checklist is complete.
- Mobile Dev(s): Implement features/fixes, ensure tests/lint pass, prepare store metadata.
- QA: Validates Firebase App Distribution builds, runs smoke/regression tests.
- Ops/Build Engineer (optional): Maintains CI/CD, signing assets, secrets, and Fastlane configuration.

Time estimates (typical):
- Prep & PR: 30–60 min
- CI PR checks: 5–20 min (Android on Linux, iOS on macOS)
- Build & distribute (tagged release): 15–40 min (Android), 20–60 min (iOS)
- QA verification: 30–120 min depending on scope
- Store review: varies (minutes for internal tracks, hours/days for external/TestFlight/App Store)

---

## Preconditions (do once per environment)
See docs/deployment/mobile/CI_CD_SETUP.md for detailed steps. Summary:
- Apple Developer account. App Store Connect API key configured in repository secrets.
- iOS signing via Fastlane Match or manual certs/profiles available to CI.
- Google Play Console service account JSON configured in repository secrets.
- Android signing keystore generated, stored securely as base64 in repository secrets.
- Firebase projects created with Android & iOS apps. Firebase App Distribution groups created. CI token/service account added.
- Populate required GitHub secrets/variables (see CI_CD_SETUP.md for full list).

---

## Pre‑release preparation (RO + Dev)
1. Branching
   - Ensure trunk‑based or release branch strategy. If using release branches, create `release/X.Y.Z`.
2. Version bump
   - Android: update `versionCode` (increment) and `versionName` in `android/app/build.gradle`.
   - iOS: update `CFBundleShortVersionString` and `CFBundleVersion` (increment) in `ios/<Target>/Info.plist`.
   - Ensure versions align across platforms and CHANGELOG.
3. Changelog & release notes
   - Update `CHANGELOG.md` with notable changes, migrations, and known issues.
   - Draft store release notes (Play/TestFlight) and QA notes.
4. Feature flags & remote config
   - Verify defaults and Firebase Remote Config values for the target environment.
5. Dependencies & configs
   - Confirm Firebase config injection is set (google‑services.json, GoogleService‑Info.plist via CI).
   - Validate environment files (.env.<env>) if using react‑native‑config. DO NOT commit secrets.
6. Tests & quality gates
   - Unit tests green (JS/TS, Android JVM, iOS if applicable).
   - Instrumentation/UI tests (Android), Detox E2E if applicable.
   - Lint (eslint), type checks (TypeScript), static analysis as configured.

---

## Pull request and review
1. Open PR titled "Release X.Y.Z" (or feature PR if not a release) and include:
   - Version bump commits.
   - Updated changelog.
   - Any config changes documented.
2. Ensure PR template checklist is completed:
   - Version bumped (if releasing), tests/lint pass, changelog updated, Firebase configs validated, feature flags correct, rollback plan linked.
3. CI checks
   - .github/workflows/mobile-ci.yml runs on the PR and must pass for both platforms.
   - Review any failing steps; adjust paths/commands once app code is present.
4. Review & approval
   - At least one reviewer approves. RO confirms readiness.

---

## Merge and tag
1. Merge PR to `main` (or the release branch back to main).
2. Tag a release on `main` with semantic version: `vX.Y.Z`.
   - Optionally create a GitHub Release with notes from CHANGELOG.
3. CI release pipeline triggers:
   - .github/workflows/mobile-release.yml runs on the tag (or via manual workflow_dispatch with inputs).

---

## Distribution paths
Choose one or both based on environment:

A) QA/Internal testing (default)
- Android: Firebase App Distribution
- iOS: Firebase App Distribution or TestFlight (internal testers)

B) Store tracks
- Android: Google Play Console (internal/alpha/beta/production tracks)
- iOS: TestFlight external or App Store release

Use workflow inputs to select target where applicable. Fastlane lanes:
- Android: `build`, `beta` (Firebase), `release` (Play)
- iOS: `build`, `beta` (Firebase/TestFlight), `release` (App Store/TestFlight external)

---

## Manual steps during pipeline (only if required)
- Apple code signing: If not using Match, ensure certificates/profiles are available to the macOS runner.
- Android keystore: Confirm keystore decryption via CI secrets succeeds.
- Store metadata: If using Fastlane metadata folders, update content before the tag.

---

## Post‑deploy verification (RO + QA)
1. Distribution verification
   - Confirm build uploaded:
     - Firebase: testers notified, build appears in App Distribution, release notes correct.
     - Play Console/TestFlight: artifacts present in the selected track; review status.
2. Basic smoke tests on real devices
   - Launch, login, key navigation flows.
   - Feature flags/Remote Config values active as expected.
3. Telemetry & stability
   - Crash reporting (Firebase Crashlytics/Sentry): crash‑free sessions acceptable.
   - Performance: startup time and core screen render within baseline.
4. Backend checks
   - API errors within normal bounds, no error spikes.
   - Rollouts (remote config/feature flags) controlled and monitored.
5. Rollback/mitigation plan (if needed)
   - For QA: rebuild with fix and redistribute.
   - For stores: roll back release on Play (promote previous artifact) or halt App Store submission; use feature flag kill switches.
6. Close out
   - Document outcome in release notes and CHANGELOG.
   - Notify stakeholders with links to builds/tracks.

---

## Known risks and mitigations
- macOS runner availability and cost: schedule builds or use concurrency limits.
- Apple code signing fragility: prefer Fastlane Match; rotate API keys as needed.
- Android keystore irreversibility: back up keystore + passwords securely; never commit.
- Versioning monotonicity: enforce pre‑commit checks or CI guardrails.
- Secrets management: rely on GitHub Secrets; inject configs at runtime.
- Expo‑managed apps: if confirmed, migrate to EAS (see CI_CD_SETUP.md).
