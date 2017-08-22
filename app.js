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

// in case of 401 or 403, user is redirected to login screen
Ext.Ajax.on("requestexception", function(con, response) {
    var httpStatus = response.status;
    switch (httpStatus) {
        case 401:
        case 403:
            if (response.request.url !== '/login_jwt/') {
                NgcpCsc.getApplication().showLogin();
            }
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
        window.location.hash = '';
        Ext.create({
            xtype: 'ngcp-login'
        });
        localStorage.removeItem('jwt');
    },

    showMain: function() {
        var me = this;
        var winLogin = Ext.ComponentQuery.query('[name=loginWin]')[0];
        var loginCont = Ext.ComponentQuery.query('[id=loginCont]')[0];
        if (winLogin) {
            winLogin.destroy();
        }
        if (loginCont) {
            loginCont.destroy();
        }
        window.location.hash = '';
        Ext.create({
            xtype: 'ngcp-main'
        });
        Ext.Function.defer(function() {
            me.redirectTo('inbox');
        }, 100)
        Ext.fireEvent('mainAppLoaded');
    }

});
