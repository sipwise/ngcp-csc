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
            _linkedStoreId: 'Calls',
            _callFilters: true,
            flex: 1,
            id: 'gridFilterPanel',
            bind: {
                hidden: '{!filtersVisible}'
            }
        })]
    }],

    initComponent: function() {
        this.tools = [{
            xtype: 'textfield',
            width: 500
        }, {
            type: 'search'
        }, {
            type: 'caret', // TODO: Replace with right type/glyph
            callback: function (panel) {
                panel.down('#gridFilterPanel').setHidden(false);
                console.log('This will toggle visibility of gridfilters.')
            }
        }];

        this.items = [{
            xtype: 'calls-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }

});
