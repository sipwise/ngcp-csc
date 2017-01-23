Ext.define('NgcpCsc.view.pages.devices.DestinationsGrid', {

    extend: 'Ext.grid.Panel',

    xtype: 'destinations-grid',

    reference: 'destinationsGrid',

    store: 'Destinations',

    rowLines: false,

    viewConfig: {
        stripeRows: false,
        columnLines: false
    },

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'position',
            text:'#'
        },{
            flex: 2,
            dataIndex: 'destination',
            editor: 'textfield',
            text: Ngcp.csc.locales.pbxconfig.destination[localStorage.getItem('languageSelected')]
        },{
            flex: 3,
            dataIndex: 'sound',
            text: 'sound',
            editor: {
                xtype: 'combo',
                store: 'Sounds',
                editable:false,
                displayField: 'url',
                valueField: 'url'
            }
        },{
            flex: 1,
            xtype:'actioncolumn',
            html:'<audio id="destination" preload="auto"></audio>',
            items: [{
                iconCls: 'x-fa fa-play',
                tooltip: Ngcp.csc.locales.common.play[localStorage.getItem('languageSelected')],
                handler: 'playDestination'
            }]
        }]
    }
})
