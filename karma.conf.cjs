// karma.conf.cjs
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-esbuild'),
    ],

    files: [
      // 1) setup
      { pattern: 'src/test-setup.js', included: true, watched: false },

      // 2) specs (se ejecutan). Tenemos tu spec en __specs__:
      { pattern: 'src/**/*.spec.{js,jsx}', included: true, watched: false },

      // 3) assets opcionales
      { pattern: 'public/images/**/*', included: false, served: true, watched: false, nocache: true },
    ],

    proxies: { '/images/': '/base/public/images/' },

    // ⬇️ Compilamos con esbuild. OJO: bundle: false
    preprocessors: {
      // specs + setup → solo esbuild
      'src/test-setup.js': ['esbuild'],
      'src/**/*.spec.{js,jsx}': ['esbuild'],

      // FUENTES a cubrir → esbuild + coverage
      'src/**/*.js': ['esbuild', 'coverage'],
      'src/**/*.jsx': ['esbuild', 'coverage'],
      'src/**/*.ts': ['esbuild', 'coverage'],
      'src/**/*.tsx': ['esbuild', 'coverage'],
    },

    esbuild: {
      sourcemap: true,
      target: 'es2020',
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.ts': 'tsx' },

      // 👇 clave para cobertura: NO hacer un bundle único
      bundle: false,
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      includeAllSources: true, // cuenta aunque no se “toquen” todos
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcov', subdir: '.', file: 'lcov.info' },
      ],
      instrumenterOptions: {
        istanbul: {
          noCompact: true,
          esModules: true,
        },
      },
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false,
    client: { clearContext: true },
    browserNoActivityTimeout: 60000,
  });
};
