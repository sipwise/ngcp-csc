module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            '../../ext/build/ext-all-debug.js', '../specs/app_test.js', '../specs/karma-*.js'
        ],
        browsers: ['Chrome'],
        plugins: [
            'karma-mocha', 'karma-chai-plugins', 'karma-chrome-launcher', 'karma-junit-reporter', 'karma-spec-reporter'
        ],
        exclude: [],
        preprocessors: {},
        reporters: [
            'spec', 'junit'
        ],
        junitReporter: {
            outputDir: '../',
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
