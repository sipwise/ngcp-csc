Ext.define('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
    extend: 'Ext.grid.Panel',

    viewConfig: {
        markDirty: false
    },

    plugins: {
        pluginId: 'celleditingSource',
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    hideHeaders: true,

    width: '100%',

    listeners: {
        edit: 'editingPhoneDone',
        beforeedit: 'beforePhoneEdit',
        click: {
            fn: 'saveGrid',
            element: 'el',
            delegate: 'a.edit-button'
        }
    },

    initComponent: function() {
        // DONE: A. Find out where .json is used in proxy and comment out
        // DONE: B. Populate store in controller to, iterating over sources for
        // both "List A" and "List B", and write to all six sourceset stores:
        // TODO: C. BUG.. We are able to write to the listB store, but grid not
        // shown in view.
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                text: Ngcp.csc.locales.callforward.phone[localStorage.getItem('languageSelected')],
                dataIndex: 'source',
                editor: 'textfield',
                flex: 1
            }, {
                text: Ngcp.csc.locales.common.from[localStorage.getItem('languageSelected')],
                xtype: 'widgetcolumn',
                renderer: function (value, meta, record) {
                    if(!record.get('edit')) {
                        meta.style = "display: none";
                    }
                },
                widget: {
                    xtype: 'button',
                    userCls: 'edit-button',
                    margin: '8 0 0 0',
                    text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                    tooltip: Ngcp.csc.locales.callforward.tooltips.save_phone_number[localStorage.getItem('languageSelected')]
                }
            }, {
                text: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
                xtype: 'actioncolumn',
                width: 30,
                align: 'right',
                items: [{
                    glyph: 'xf1f8@FontAwesome',
                    handler: 'removeSourcelistRecord',
                    tooltip: Ngcp.csc.locales.callforward.tooltips.delete_phone_number[localStorage.getItem('languageSelected')]
                }]
            }]
        };
        this.callParent();
    }

});
