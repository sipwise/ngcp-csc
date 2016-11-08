module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            '../ext/build/ext-all-debug.js', 'app_test.js', 'karma/*.js'
        ],
        browsers: ['Chromium'],
        plugins: [
            'karma-jasmine', 'karma-chrome-launcher', 'karma-junit-reporter'
        ],
        exclude: [],
        preprocessors: {},
        reporters: [
            'progress', 'junit'
        ],
        junitReporter: {
            outputDir: '',
            outputFile: undefined,
            suite: '',
            useBrowserName: true,
            nameFormatter: undefined,
            classNameFormatter: undefined,
            properties: {}
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        concurrency: Infinity
    })
}
