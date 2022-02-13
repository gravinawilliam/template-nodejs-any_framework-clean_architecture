module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@application': './src/application',
          '@dtos': './src/domain/dtos',
          '@models': './src/domain/models',
          '@domain': './src/domain',
          '@shared': './src/shared',
          '@fakes': './src/fakes',
          '@infra': './src/infra',
          '@external': './src/external',
          '@main': './src/main',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation'
        }
      }
    ],
    'babel-plugin-transform-typescript-metadata',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: false
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
};
