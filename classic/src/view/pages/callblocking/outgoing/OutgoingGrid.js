Ext.define('NgcpCsc.view.pages.callblocking.outgoing.OutgoingGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'outgoing-grid',

    layout: 'fit',

    bind: {
        store: '{outgoingCalls}'
    },

    padding: 10,

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'block_out_list',
            renderer: 'renderBarrNumber'
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            items: [
                {
                    tooltip: Ngcp.csc.locales.callblocking.enable[localStorage.getItem('languageSelected')],
                    getClass: 'getActionClass',
                    handler: 'toggleEnabled'
                }
            ]
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            items: [{
                glyph: 'xf00d@FontAwesome',
                tooltip: {
                    renderer: 'renderDeleteIconTooltip'
                },
                handler: 'removeBarrNumber'
            }]
        }]
    }
})
