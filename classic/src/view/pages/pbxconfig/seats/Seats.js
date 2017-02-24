Ext.define('NgcpCsc.view.pages.pbxconfig.seats.Seats', {
    extend: 'Ext.panel.Panel',

    xtype: 'seats',

    viewModel: 'seats',

    controller: 'seats',

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-70 small-100',
        items: [{
            xtype: 'seats-grid'
        }, {
            margin: 10,
            xtype: 'button',
            reference:'addNewBtn',
            text: Ngcp.csc.locales.pbxconfig.add_new_seat[localStorage.getItem('languageSelected')]
            // ,handler: 'addSeat'
        }]
    }]
});
