### PR Checklist (Mobile)

- [ ] Version bumped for release changes
  - Android: android/app/build.gradle versionCode incremented and versionName updated
  - iOS: ios/<Target>/Info.plist CFBundleVersion incremented and CFBundleShortVersionString updated
- [ ] Tests and lint pass (see CI)
- [ ] CHANGELOG.md updated with user-facing notes
- [ ] Firebase configs validated for target env (no secrets committed)
- [ ] Feature flags / Remote Config defaults correct
- [ ] Rollback plan linked (how to revert or disable via flags)

Notes:
- PR CI workflow: .github/workflows/mobile-ci.yml
- Release workflow (tagged): .github/workflows/mobile-release.yml
