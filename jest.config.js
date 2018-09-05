module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
	verbose: true,
  testURL: "http://localhost/",
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  }
}
