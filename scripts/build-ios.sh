#!/usr/bin/env bash
set -euo pipefail

if [ ! -d ios ]; then
  echo "ios/ directory not found. Add a React Native iOS project before building." >&2
  exit 0
fi

if [ -f package.json ] && [ ! -d node_modules ]; then
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
fi

pushd ios >/dev/null
if ! command -v pod >/dev/null 2>&1; then
  echo "CocoaPods is not installed. Install with: sudo gem install cocoapods" >&2
  exit 1
fi
pod install --repo-update
popd >/dev/null

# Require Fastlane
if ! command -v fastlane >/dev/null 2>&1; then
  echo "Fastlane is not installed. Install with: sudo gem install fastlane" >&2
  exit 1
fi

# Setup Apple API key if provided
if [ -n "${APP_STORE_CONNECT_API_KEY:-}" ]; then
  mkdir -p "$HOME/.fastlane"
  echo "$APP_STORE_CONNECT_API_KEY" > "$HOME/.fastlane/api_key.json"
  export APP_STORE_CONNECT_API_KEY_PATH="$HOME/.fastlane/api_key.json"
fi

# Fetch signing via match
if [ -z "${MATCH_GIT_URL:-}" ] || [ -z "${MATCH_PASSWORD:-}" ]; then
  echo "MATCH_GIT_URL and/or MATCH_PASSWORD not set. Cannot fetch signing." >&2
  exit 1
fi
fastlane match appstore --readonly --git_url "$MATCH_GIT_URL"

# Determine workspace and scheme
if [ -z "${IOS_WORKSPACE:-}" ]; then
  IOS_WORKSPACE=$(ls ios/*.xcworkspace | head -n1 || true)
fi
if [ -z "${IOS_WORKSPACE:-}" ]; then
  echo "Could not auto-detect .xcworkspace. Set IOS_WORKSPACE environment variable." >&2
  exit 1
fi
if [ -z "${IOS_SCHEME:-}" ]; then
  echo "IOS_SCHEME is not set. Export IOS_SCHEME to match your Xcode scheme." >&2
  exit 1
fi

mkdir -p ios/build
fastlane gym \
  --scheme "$IOS_SCHEME" \
  --workspace "$IOS_WORKSPACE" \
  --configuration Release \
  --export_method app-store \
  --output_directory ios/build

echo "Output: ios/build/*.ipa"
