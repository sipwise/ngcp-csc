Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

    initComponent: function () {

        this.items = [{
            userCls: 'big-70 small-100',
            xtype: 'core-container',
            items: [{
                padding: '0 0 20 0',
                html: Ext.String.format('<div class="fa fa-mail-forward cf-title"> {0}</div>', Ngcp.csc.locales.callforward.subtitle[localStorage.getItem('languageSelected')])
            }, {
                xtype: 'callforwardmainform'
            }]
        }];
        this.callParent();
    }

});
