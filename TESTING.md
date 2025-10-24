# Testing (Jasmine + Karma) — Apple Store Online

## 1. Entorno e instalación
- Proyecto base: React + Vite
- Dependencias (dev):
  - karma, karma-jasmine, jasmine-core
  - karma-chrome-launcher
  - karma-esbuild, esbuild
  - esbuild-plugin-istanbul (instrumentación cobertura)
  - karma-coverage
  - @testing-library/react, @testing-library/dom

Instalación:
```bash
npm i -D karma karma-jasmine jasmine-core karma-chrome-launcher \
       karma-esbuild esbuild esbuild-plugin-istanbul karma-coverage \
       @testing-library/react @testing-library/dom
