module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};