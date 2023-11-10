export default {
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["./src/test/setup.ts"],
  testMatch: ["**/*.test.ts"],
}
