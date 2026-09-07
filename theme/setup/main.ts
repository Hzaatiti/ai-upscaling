/**
 * Slidev setup hook, runs once when the deck boots.
 *
 * Use this to register Vue plugins, custom directives, or global components
 * that every workshop / deck should have. Components dropped into
 * ../components/ are auto-imported by Slidev and don't need to be registered
 * here.
 *
 * Slidev calls this function with an object: { app, router, configs }. See
 * https://sli.dev/custom/config-setups for the full API.
 *
 * Why we don't import `defineAppSetup` from `@slidev/types`: the helper is
 * only useful for type inference in this file. Importing it forces
 * `@slidev/types` to be a runtime dependency of every consumer that builds
 * a deck using this theme (rollup needs to resolve the import at build
 * time). A plain function with light typing is enough.
 */
export default function ({ app, router }: { app: unknown; router: unknown }) {
  // Reserved for future global registrations.
  void app
  void router
}
