/// <reference types="vite-plugin-svgr/client" />

declare module '*.module.styl' {
  const classes: { [key: string]: string }
  export default classes
}