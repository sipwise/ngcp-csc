var karmaLoadedFunction;

if (window.__karma__) {
    // store karma function to start it later
    // override it with dummy
    karmaLoadedFunction = window.__karma__.loaded;
    window.__karma__.loaded = function() {};
}

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'NgcpCsc.view': 'classic/src/view'
    },
    disableCaching: true
});

console.log('Starting the test application...');

Ext.application({
    name: 'NgcpCsc',
    launch: function() {

        if (window.__karma__) {
            console.log('Starting the tests in specs');

            window.__karma__.loaded = karmaLoadedFunction;
            window.__karma__.loaded();
        }
    }
});
