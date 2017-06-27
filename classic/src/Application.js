/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('NgcpCsc.Application', {
    extend: 'Ext.app.Application',

    name: 'NgcpCsc',

    views: [
        'NgcpCsc.view.main.Main',
        'NgcpCsc.view.login.Login'
    ],

    stores: [
        'NavigationTree',
        'Conversations',
        'VoiceMails',
        'Notifications',
        'Contacts',
        'Languages',
        'Chart',
        'FaxTypes',
        'FirstRingActions',
        'Forwards',
        'Extensions',
        'Groups',
        'Seats',
        'Devices',
        'DeviceModels',
        'DevicesList',
        'Destinations',
        'Sounds',
        'AliasNumbers',
        'PrimaryNumbers',
        'HuntPolicies',
        'SeatTypes',
        'CallForwardLocalStorage'
    ],

    launch: function() {
        Ext.tip.QuickTipManager.init();
        if (localStorage.getItem('username') && localStorage.getItem('password') && localStorage.getItem('jwt')) {
            // checks that the jwt token is valid
            Ext.Ajax.request({
                url: '/login_jwt/',
                method: 'POST',
                jsonData: {
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password')
                },
                success: this.showMain,
                failure: this.showLogin,
                scope: this
            });
        } else {
            this.showLogin();
        }
    }
});
