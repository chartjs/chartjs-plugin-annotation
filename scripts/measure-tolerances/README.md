# Measuring fixture tolerances

Fixture tests compare a rendered chart against a reference PNG and allow a
`tolerance` — the fraction of pixels that may differ. Browsers do not rasterise
text and shadows identically, so some difference is expected, and the tolerance
has to absorb it without hiding real regressions.

Picking those numbers by hand does not work for long. Every browser update
shifts the deltas, a fixture starts failing, and the tolerance gets nudged up
based on the one number in the failure report — which is a guess about the
margin, not a measurement of it. Do that a few times and the suite is loose
everywhere and still failing somewhere.

This tool measures instead.

## Usage

```sh
npm run measure-tolerances             # report what would change
npm run measure-tolerances -- --apply  # write the derived values
```

Requires Docker. `test/fixtures` must be clean — the fixtures are temporarily
rewritten and then restored with `git checkout`.

Host browsers default to `chrome,firefox`; override with
`-- --host-browsers=firefox` if you only have one installed.

## How it works

Every fixture is forced to `tolerance: 0`, which makes each one report its real
pixel delta instead of just passing or failing. That runs in four environments:
your own Chrome and Firefox, and Linux Chrome and Firefox in a container built
to match the CI image.

Tolerances are then derived:

| condition | tolerance |
|---|---|
| delta is 0 in every environment | `0` |
| otherwise | `max(1.5 × linux, 1.05 × host)` |

Linux gets a real margin because CI is what gates the build. The host gets only
enough to keep local runs green — macOS in particular renders text 3-4x further
from the reference than Linux does, and sizing every tolerance for it is what
makes them loose.

The trade-off is deliberate: a host browser update will redden local runs
without affecting CI, and re-measuring is cheap.

## Why the container is emulated

It runs `linux/amd64` under emulation even on Apple Silicon. Chrome is not
published for `linux/arm64` at all, and native arm64 rendering genuinely
differs — `point/starShadow` measures 1474px there against 1476px on x86_64 and
in CI, and `line/labelShadowColors` differs by 74%. Faster, but wrong.

Emulation was verified against three pixel counts observed in CI, all
reproduced exactly:

| fixture | browser | CI | container |
|---|---|---|---|
| `point/crossShadow` | Firefox | 1565px | 1565px |
| `point/starShadow` | Firefox | 1476px | 1476px |
| `doughnutLabel/contentMultiline` | Chrome | 919px | 919px |

If you change the image, re-check it against numbers from a real CI run before
trusting what it produces.

Emulated Chrome needs two accommodations, both in `prepare.js`: karma's
timeouts are raised well past their defaults, and `--no-sandbox` is added
because the container does not grant the user namespaces Chrome's sandbox
wants. The flag was confirmed not to affect rendering — `contentMultiline`
still measures the same 919px with it. Without `--shm-size=2g` Chrome hangs
outright rather than running slowly.
