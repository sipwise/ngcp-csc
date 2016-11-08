exports.config = {
    specs: ['./specs/wdio-*.js'],
    exclude: [],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 5,
            browserName: 'chrome',
        }
    ],
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:1841',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    reporters: [
        'spec', 'junit'
    ],
    reporterOptions: {
        outputDir: '../'
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000,
        expectationResultHandler: function(passed, assertion) {}
    }
}
