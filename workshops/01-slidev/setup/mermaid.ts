import { defineMermaidSetup } from '@slidev/types'

// 'loose' lets Mermaid `click` directives open links (e.g. the live-site node
// on the "From push to published" slide). Safe here: the deck only links to
// trusted URLs we author ourselves.
export default defineMermaidSetup(() => ({
  securityLevel: 'loose',
}))
