/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('NgcpCsc.Application', {
    extend: 'Ext.app.Application',

    name: 'NgcpCsc',

    defaultToken : 'login',

    views: [
        'NgcpCsc.view.main.Main',
        'NgcpCsc.view.login.Login'
    ],

    stores: [
        'NavigationTree',
        'Languages'
    ],

    launch: function () {
        Ext.create({
            xtype: 'ngcp-login'
        });
        window.location.hash = '';
    }
});
