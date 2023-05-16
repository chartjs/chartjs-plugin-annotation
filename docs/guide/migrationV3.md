# 3.x Migration Guide

**`chartjs-plugin-annotation`** plugin version 3 becomes an [ESM-only package](https://nodejs.org/api/esm.html).
The [UMD bundle](integration.md#script-tag) is still available.

## Chart.js version

The annotation plugin requires at least version 4.0.0 to work because of Chart.js becomes an ESM-only package.

### Type changes

* The `init` options callback return value types have been changed from `void | boolean | AnnotationBoxModel` to `void | boolean | AnnotationElement`.
