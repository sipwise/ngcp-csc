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
            flex: 5,
            dataIndex: 'destination',
            editor: 'textfield',
            text: Ngcp.csc.locales.pbxconfig.destination[localStorage.getItem('languageSelected')]
        }]
    }
})
