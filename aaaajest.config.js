module.exports = {
  preset: "jest-preset-angular",
  setupTestFrameworkScriptFile: "<rootDir>/src/setupJest.ts",
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|@ionic-native|@ionic)'],
};
