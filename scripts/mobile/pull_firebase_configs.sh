#!/usr/bin/env bash
set -euo pipefail

# Helper to decode base64 across Linux/macOS
_decode_b64() {
  local data="$1"
  local outfile="$2"
  if [ -z "$data" ]; then
    return 1
  fi
  # Try GNU base64
  if echo "test" | base64 --decode >/dev/null 2>&1; then
    echo "$data" | base64 --decode > "$outfile" 2>/dev/null && return 0
  fi
  # Try BSD base64 (macOS)
  if echo "test" | base64 -D >/dev/null 2>&1; then
    echo "$data" | base64 -D > "$outfile" 2>/dev/null && return 0
  fi
  # Fallback to openssl
  if command -v openssl >/dev/null 2>&1; then
    openssl base64 -d -out "$outfile" <(echo "$data") 2>/dev/null && return 0
  fi
  echo "Base64 decode failed for $outfile" >&2
  return 1
}

mkdir -p android/app || true
mkdir -p ios || true

if [ -n "${GOOGLE_SERVICES_JSON_BASE64:-}" ]; then
  echo "Writing android/app/google-services.json from GOOGLE_SERVICES_JSON_BASE64"
  _decode_b64 "${GOOGLE_SERVICES_JSON_BASE64}" "android/app/google-services.json" || echo "Failed to write google-services.json"
else
  echo "GOOGLE_SERVICES_JSON_BASE64 not set; skipping android config"
fi

if [ -n "${GOOGLE_SERVICE_INFO_PLIST_BASE64:-}" ]; then
  echo "Writing ios/GoogleService-Info.plist from GOOGLE_SERVICE_INFO_PLIST_BASE64"
  _decode_b64 "${GOOGLE_SERVICE_INFO_PLIST_BASE64}" "ios/GoogleService-Info.plist" || echo "Failed to write GoogleService-Info.plist"
else
  echo "GOOGLE_SERVICE_INFO_PLIST_BASE64 not set; skipping iOS config"
fi

echo "Firebase config injection complete (if variables were set)."
