// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
    roots: ["<rootDir>/src", "<rootDir>/__tests__"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["**/__tests__/**/*+(spec|test).[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    // The test environment that will be used for testing
    testEnvironment: "node",
  };