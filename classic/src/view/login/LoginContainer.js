Ext.define('NgcpCsc.view.login.LoginContiner', {
    extend: 'Ext.container.Viewport',
    id: 'loginCont',
    xtype: 'ngcp-login',
    cls: 'login-container',
    listeners: {
        afterrender: function() {
            var winLogin = Ext.ComponentQuery.query('[name=loginWin]')[0];
            if (!winLogin) {
                Ext.create('NgcpCsc.view.login.Login');
            }
        }
    }
});
