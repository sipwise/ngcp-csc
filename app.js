// Attach JWT token to every request, and cleanup framework default params
Ext.Ajax.on("beforerequest", function(con, options) {
    con.setUseDefaultXhrHeader(false);
    con.setWithCredentials(true);
    if (options.params && localStorage.getItem('jwt')) {
        delete options.params.page;
        delete options.params.start;
        delete options.params.limit;
        this.setDefaultHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        });
    }
});

// in case of 401, user is redirected to login screen
Ext.Ajax.on("requestexception", function(con, response) {
    var httpStatus = response.status;
    switch (httpStatus) {
        case 401:
            NgcpCsc.getApplication().showLogin();
            break;
    }
});

Ext.application({
    name: 'NgcpCsc',

    extend: 'NgcpCsc.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all NgcpCsc classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    //
    requires: [
        'NgcpCsc.*',
        'Ext.window.Toast'
    ],

    showLogin: function() {
        var mainCmp = Ext.ComponentQuery.query('ngcp-main')[0];
        if (mainCmp) {
            mainCmp.destroy();
        }
        Ext.create({
            xtype: 'ngcp-login'
        });
        localStorage.removeItem('jwt');
        localStorage.removeItem('subscriber_id');
        localStorage.removeItem('type');
        localStorage.removeItem('username');
        window.location.hash = '';
    },

    showMain: function() {
        Ext.create({
            xtype: 'ngcp-main'
        });
        window.location.hash = '#inbox';
    }

});
