Ext.define('NgcpCsc.view.pages.callblocking.incoming.IncomingGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'incoming-grid',

    // layout: 'fit',

    // bind: {
    //     store: '{incomingCalls}'
    // },

    cls: 'card-grid',

    // header: false,
    //
    // _groupCallsByMonth: false,
    //
    // listeners: {
    //     click: {
    //         fn: 'onIconClicked',
    //         element: 'el',
    //         delegate: 'div.card-icon'
    //     },
    //     mouseover: {
    //         fn: 'onIconHovered',
    //         element: 'el',
    //         delegate: 'div.card-icon'
    //     },
    //     cellclick: 'expandIncoming',
    //     rowbodyclick: 'expandIncoming'
    // },

    rowLines: false,

    viewConfig: {
        stripeRows: false,
        columnLines: false,
        enableTextSelection: true
    },

    store: 'CallBlockingIncoming',

    padding: 10,

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
                var enabledIcon = data.enabled === true ? '<i class="fa fa-toggle-on fa-2x" aria-hidden="true"></i>' : '<i class="fa fa-toggle-off fa-2x" aria-hidden="true"></i>';
                var deleteIcon = '<i class="fa fa-trash fa-2x" aria-hidden="true" style="float: right;"></i>';
                return {
                    rowBody: Ext.String.format('<div style="padding: 0 10px;background: #EFEFEF;">{0}{1}</div>', enabledIcon, deleteIcon)
                };
            }
        }];

        this.callParent();
    }

})
