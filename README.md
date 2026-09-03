# Thermust

Thermust is a small, static web app for looking up U.S. government safe minimum
cooking temperatures, required rest times, and seafood doneness cues.

Visit [thermust.com](https://thermust.com) to use the app.

Build with ❤️ by [J Vivas](https://twitter.com/jvivas_official)
Check out my other projects at [yorch.co](https://www.yorch.co)

## Development

Install dependencies with `npm ci`, then run `npm run dev`.

Navigate to `http://localhost:3000` to see the result.

Before opening a change, run:

```sh
npm run typecheck
npm test
npm run lint
npm run build
```

The production build is a static export in `out/`. Analytics is disabled unless
both `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` are configured.

## Source policy

Temperature guidance is derived from the
[FoodSafety.gov Safe Minimum Internal Temperature Chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures).
Each update to the guidance table must retain the source and its review date and
must pass the invariant tests in `src/lib/temps.test.ts`.

Released under the MIT license.

Copyright © 2024 [J Vivas](https://twitter.com/jvivas_official)
