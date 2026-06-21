# CI/CD Setup Guide for React Native (Fastlane + GitHub Actions)

This guide describes the scaffolding added in this repository to support mobile builds and releases for Android and iOS using Fastlane and GitHub Actions. It includes required secrets, how to adapt placeholders to your app, and optional notes for Expo EAS migration.

Because the app source is not yet present, paths and commands contain TODOs. Once the app exists, update them to match your Gradle module, Xcode scheme/workspace, bundle ID, and package name.

---

## Architecture overview
- GitHub Actions
  - PR workflow: `.github/workflows/mobile-ci.yml` runs lint/tests on PRs.
  - Release workflow: `.github/workflows/mobile-release.yml` builds and distributes on tags `v*` or via manual dispatch.
- Fastlane
  - Android lanes: `build` (assembleRelease), `beta` (Firebase App Distribution), `release` (Google Play via supply).
  - iOS lanes: `build` (gym), `beta` (Firebase App Distribution or TestFlight internal), `release` (deliver/TestFlight external/App Store).
- Firebase App Distribution
  - Used for QA/internal testing. Configs injected from secrets.

---

## Required secrets & variables (GitHub repository settings)
Populate these before running workflows. Create environment-scoped secrets if you use GitHub Environments.

iOS:
- APP_STORE_CONNECT_API_KEY: Base64-encoded contents of the App Store Connect API key (.p8) or path injected by Actions.
- APP_STORE_CONNECT_API_ISSUER: Issuer ID for the App Store Connect API key.
- MATCH_GIT_URL: Private repo URL for Fastlane Match (if using Match).
- MATCH_PASSWORD: Password to decrypt Match certificates (if using Match).

Android:
- ANDROID_KEYSTORE_BASE64: Base64 of the Android signing keystore file.
- ANDROID_KEYSTORE_PASSWORD: Keystore password.
- ANDROID_KEY_ALIAS: Key alias.
- ANDROID_KEY_PASSWORD: Key password.
- PLAY_JSON_BASE64: Base64 of the Google Play service account JSON.

Firebase:
- FIREBASE_TOKEN: CI auth token for Firebase CLI (or use service account).
  - Alternatively FIREBASE_SERVICE_ACCOUNT_BASE64: Base64 of service account JSON for distribution.
- FIREBASE_ANDROID_APP_ID: Firebase Android app ID.
- FIREBASE_IOS_APP_ID: Firebase iOS app ID.
- GOOGLE_SERVICES_JSON_BASE64: Base64 of android/app/google-services.json.
- GOOGLE_SERVICE_INFO_PLIST_BASE64: Base64 of ios/GoogleService-Info.plist.

Shared (optional):
- SLACK_WEBHOOK_URL: Incoming webhook to post build links.
- SENTRY_AUTH_TOKEN: If you upload sourcemaps or dSYMs.

---

## Adapting placeholders to your app
Update files once you add the app code:
- Android Gradle module path: replace `android/app` with your actual module if different.
- iOS scheme/workspace/project: set the scheme, workspace (.xcworkspace), and project path in Fastlane and Actions steps.
- Bundle identifiers and package names: set in `android/fastlane/Appfile` and `ios/fastlane/Appfile`.
- Fastlane lanes may need specific build settings (e.g., export options plist for iOS, flavors/build variants for Android).

---

## iOS signing setup
Option A: Fastlane Match (recommended)
1. Install Fastlane locally and run `fastlane match init` to create a private certificates repo.
2. Run `fastlane match development` and `fastlane match appstore` (or `adhoc`) to generate and store certs/profiles.
3. Add MATCH_GIT_URL and MATCH_PASSWORD to repository secrets.
4. Configure Fastlane to use Match in `ios/fastlane/Fastfile` lanes (commented placeholders included).

Option B: Manual signing
1. Generate an App Store distribution certificate and provisioning profile in Apple Developer portal.
2. Export and store the certificate/key securely; make available to the macOS runner.
3. Configure gym/export and xcodebuild signing settings accordingly.

App Store Connect API Key
- Create an API Key in App Store Connect (Users and Access > Keys).
- Record Issuer ID, Key ID, and download the .p8 key file.
- Store base64 of the key in APP_STORE_CONNECT_API_KEY and Issuer in APP_STORE_CONNECT_API_ISSUER.

---

## Android signing setup
1. Generate keystore: `keytool -genkey -v -keystore release.keystore -alias <alias> -keyalg RSA -keysize 2048 -validity 10000`.
2. Base64-encode the keystore and store in ANDROID_KEYSTORE_BASE64.
3. Store keystore password, key alias, and key password in secrets.
4. Create a Google Play Service Account with release management permissions; download JSON and store base64 in PLAY_JSON_BASE64.

---

## Firebase setup
1. Create Firebase projects per environment; add Android and iOS apps.
2. Download android `google-services.json` and iOS `GoogleService-Info.plist`. Base64-encode and store in secrets.
3. Create App Distribution groups for QA/internal testers.
4. Generate a Firebase CI token (`firebase login:ci`) or use a service account for API calls.

---

## Config injection helper script
`scripts/mobile/pull_firebase_configs.sh` creates platform config files from base64 secrets during CI.
- Inputs:
  - GOOGLE_SERVICES_JSON_BASE64 -> writes to `android/app/google-services.json`
  - GOOGLE_SERVICE_INFO_PLIST_BASE64 -> writes to `ios/GoogleService-Info.plist`
- The script is idempotent and no-ops when variables are unset.
- Never commit these config files for production; inject at build time.

---

## Expo EAS note (if app is Expo-managed)
If you later confirm this is an Expo-managed app, consider replacing Fastlane builds with EAS:
- PR checks remain similar (lint/tests), but builds use `eas build` with EAS credentials.
- Firebase App Distribution can still be used for Android; for iOS use TestFlight via EAS.
- Update workflows and remove Fastlane if not needed.

---

## Local developer usage (once code is present)
- Android:
  - Build: `cd android && ./gradlew assembleRelease`
  - Fastlane: `cd android && bundle exec fastlane build`
- iOS:
  - Build: open Xcode or `bundle exec fastlane build` with proper scheme/workspace.
- QA distribution:
  - `bundle exec fastlane beta` within platform directories.
- Store release:
  - `bundle exec fastlane release` with metadata prepared.

---

## Environment variables (.env.example)
See `.env.example` for non-secret runtime configuration keys. If using `react-native-config`, create `.env.<env>` files locally and inject via CI for production. Do not commit secrets.
