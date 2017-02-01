Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    viewModel: 'calls',

    title: Ngcp.csc.locales.calls.section_title[localStorage.getItem('languageSelected')],

    initComponent: function() {
        this.items = [{
            xtype: 'calls-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
