# Gully Cricket Score

Offline cricket scoring app. Web app in `www/`, wrapped as an Android APK with Capacitor and built by GitHub Actions.

## Daily update flow
1. Edit `www/index.html`
2. `git add . && git commit -m "describe change" && git push`
3. Actions tab > latest run > download artifact `gully-cricket-apk`

## Publish a download link for friends
git tag v1.0.1
git push origin v1.0.1

The APK appears under the repo's Releases page. Share that link on WhatsApp.
