Ext.define('NgcpCsc.view.pages.callforward.CallForwardSourcesetListAGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'callforwardsourcesetlistagrid',

    viewConfig: {
        markDirty: false
    },

    plugins: {
        pluginId: 'celleditingTime',
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    hideHeaders: true,

    bind: {
        hidden: '{list_a}'
    },

    width: 500,

    initComponent: function() {
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                text: Ngcp.csc.locales.callforward.phone[localStorage.getItem('languageSelected')],
                dataIndex: 'phone',
                editor: 'textfield',
                flex: 1
            }, {
                text: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
                xtype: 'actioncolumn',
                width: 30,
                align: 'right',
                items: [{
                    glyph: 'xf1f8@FontAwesome',
                    handler: 'removeSourcelistRecord'
                }]
            }]
        };
        this.callParent();
    }

});
