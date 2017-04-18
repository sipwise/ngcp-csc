Ext.define('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
    extend: 'Ext.grid.Panel',

    viewConfig: {
        markDirty: false
    },

    plugins: {
        pluginId: 'celleditingTime',
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    hideHeaders: true,

    width: 500,

    listeners: {
        edit: 'editingPhoneDone'
    },

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
                text: Ngcp.csc.locales.common.from[localStorage.getItem('languageSelected')],
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'button',
                    text: 'SAVE' // TODO: Locales
                },
                onWidgetAttach: 'showEditButton'
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
