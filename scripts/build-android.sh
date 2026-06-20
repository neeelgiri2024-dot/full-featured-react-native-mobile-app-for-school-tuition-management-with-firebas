#!/usr/bin/env bash
set -euo pipefail

if [ ! -d android ]; then
  echo "android/ directory not found. Add a React Native android project before building." >&2
  exit 0
fi

if [ -f package.json ] && [ ! -d node_modules ]; then
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
fi

# Prepare signing if secrets are present in environment
if [ "${ANDROID_KEYSTORE_BASE64:-}" != "" ] && [ "${ANDROID_KEYSTORE_PASSWORD:-}" != "" ] && [ "${ANDROID_KEY_ALIAS:-}" != "" ] && [ "${ANDROID_KEY_PASSWORD:-}" != "" ]; then
  mkdir -p android/app
  echo "$ANDROID_KEYSTORE_BASE64" | base64 -d > android/app/release.keystore
  {
    echo "MYAPP_UPLOAD_STORE_FILE=release.keystore"
    echo "MYAPP_UPLOAD_KEY_ALIAS=${ANDROID_KEY_ALIAS}"
    echo "MYAPP_UPLOAD_STORE_PASSWORD=${ANDROID_KEYSTORE_PASSWORD}"
    echo "MYAPP_UPLOAD_KEY_PASSWORD=${ANDROID_KEY_PASSWORD}"
  } >> android/gradle.properties
else
  echo "Android signing secrets not fully provided; attempting unsigned/DEBUG or build may fail if release signing is required." >&2
fi

pushd android >/dev/null
./gradlew :app:bundleRelease --no-daemon
./gradlew :app:assembleRelease --no-daemon
popd >/dev/null

echo "Outputs:"
echo " - android/app/build/outputs/bundle/release/app-release.aab"
echo " - android/app/build/outputs/apk/release/app-release.apk"
