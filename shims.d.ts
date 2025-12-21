import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter: any
  }
}

declare module '*.wgsl?raw' {
  const content: string
  export default content
}
