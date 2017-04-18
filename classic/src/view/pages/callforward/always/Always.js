Ext.define('NgcpCsc.view.pages.callforward.always.Always', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'always',

    ui: 'cf-mainform',

    initComponent: function () {

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                    xtype: 'container',
                    userCls: 'cf-text',
                    html: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')],
                    margin: '10 0 10 0'
                }, {
                    xtype: 'statusbar',
                    reference: 'loadingBar'
                }, {
                xtype: 'alwaystabs'
            }]
        }];
        this.callParent();
    }

});
