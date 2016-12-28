Ext.define('NgcpCsc.view.pages.subscriberadmin.seats.Seats', {
    extend: 'Ext.panel.Panel',

    xtype: 'seats',

    viewModel: 'seats',

    controller: 'seats',

    title: Ngcp.csc.locales.subscriberadmin.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-30 small-100',
        xtype: 'gridfilters',
        padding: 0,
        _linkedStoreId: 'Addressbook',
        _subscriberAdmin: true
    }, {
        userCls: 'big-70 small-100',
        xtype: 'seats-grid'
    },{
        margin:10,
        xtype:'button',
        text: Ngcp.csc.locales.subscriberadmin.add_new_seat[localStorage.getItem('languageSelected')],
        handler: 'addSeat'
    }]
});
