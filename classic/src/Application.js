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
        'CallBlockingOutgoing',
        'CallBlockingIncoming',
        'Chart',
        'Groups',
        'Seats',
        'Devices',
        'DevicesList',
        'Destinations',
        'Sounds',
        'AliasNumbers',
        'PrimaryNumbers',
        'HuntPolicies',
        'CallForwardLocalStorage'
    ],

    launch: function() {
        Ext.tip.QuickTipManager.init();
        // TODO to be replaced with request
        if(localStorage.getItem('remember_me')){
            window.location.hash = '#inbox';
            Ext.create({
                xtype: 'ngcp-main'
            });
        }else{
            window.location.hash = '';
            Ext.create({
                xtype: 'ngcp-login'
            });

        }
    }
});
