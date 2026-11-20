# Reproduces the browsers CI runs (ubuntu-latest, x86_64) so fixture deltas can
# be measured against the environment that actually gates the build.
#
# linux/amd64 is deliberate: Chrome is not published for linux/arm64, and native
# arm64 rendering differs from x86_64 (point/starShadow measures 1474px there vs
# 1476px on x86_64 and in CI), so arm64 numbers would not be CI-faithful.
FROM --platform=linux/amd64 ubuntu:24.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
      curl ca-certificates gnupg xvfb xz-utils \
      fonts-liberation fonts-dejavu-core fontconfig \
 && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && curl -fsSL -o /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
 && apt-get install -y --no-install-recommends /tmp/chrome.deb \
 && curl -fsSL -o /tmp/ff.tar.xz "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US" \
 && mkdir -p /opt && tar -xJf /tmp/ff.tar.xz -C /opt \
 && rm -rf /tmp/*.deb /tmp/*.tar.xz /var/lib/apt/lists/*
ENV CHROME_BIN=/usr/bin/google-chrome
ENV FIREFOX_BIN=/opt/firefox/firefox
WORKDIR /app
