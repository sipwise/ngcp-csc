Ext.define('NgcpCsc.view.pages.callblocking.incoming.IncomingGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    xtype: 'incoming-grid',

    cls: 'card-grid',

    listeners: {
        click: {
            fn: 'onEnabledClicked',
            element: 'el'
        }
    },

    rowLines: false,

    viewConfig: {
        stripeRows: false,
        columnLines: false,
        enableTextSelection: true
    },

    store: 'CallBlockingIncoming',

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'block_in_list',
            renderer: 'renderBarrNumber'
        }]
    },

    initComponent: function() {
        var me = this;

        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record, orig) {
                var enabledIcon = data.enabled === true ? '<i class="fa fa-toggle-on fa-2x" aria-hidden="true" style="color: #919191;"></i>' : '<i class="fa fa-toggle-off fa-2x" aria-hidden="true" style="color: #919191;"></i>';
                var deleteIcon = '<i class="fa fa-trash fa-2x" aria-hidden="true" style="float: right;color: #919191;"></i>';
                return {
                    rowBody: Ext.String.format('<div style="padding: 10px 20px;background: #EFEFEF;"><span class="enabled-icon">{0}</span><span class="delete-icon">{1}</span></div>', enabledIcon, deleteIcon)
                };
            }
        }];

        this.callParent();
    }

})
