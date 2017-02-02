Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    viewModel: 'calls',

    title: Ngcp.csc.locales.calls.section_title[localStorage.getItem('languageSelected')],

    dockedItems: [{
           xtype: 'toolbar',
           dock: 'top',
           items: [Ext.create('NgcpCsc.view.common.gridfilters.GridFilters', {
            // Links filters with store. Calls is referring to conversations(/former unified inbox)
            _linkedStoreId: 'Calls',
            // Define what textfields to show, grouped by module. Available groupings are:
            // _callFilters, _pbxconfigSeats, _pbxconfigGroups, _pbxconfigDevices
            _callFilters: true
        })]
    }],

    initComponent: function() {
        this.items = [{
            xtype: 'calls-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }

});
