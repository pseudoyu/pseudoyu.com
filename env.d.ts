// Ambient module declarations. This file must stay free of top-level imports:
// in a module file (like shims.d.ts) these would become augmentations and be ignored.

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare module '*.wgsl?raw' {
  const content: string
  export default content
}
