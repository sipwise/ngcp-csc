Ext.define('NgcpCsc.view.login.LoginContiner', {
    extend: 'Ext.container.Viewport',
    xtype: 'ngcp-login',
    cls: 'login-container',
    listeners:{
        render:function(){
            Ext.create('NgcpCsc.view.login.Login');
        }
    }
});
