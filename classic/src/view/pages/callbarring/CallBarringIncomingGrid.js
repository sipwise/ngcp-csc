Ext.define('NgcpCsc.view.pages.callbarring.CallBarringIncomingGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'callbarring-incoming-grid',

    layout: 'fit',

    bind: {
        store: '{incomingCalls}'
    },

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
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            items: [
                {
                    tooltip: Ngcp.csc.locales.callbarring.enable[localStorage.getItem('languageSelected')],
                    iconCls: 'x-fa fa-home',
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
