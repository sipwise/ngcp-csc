Ext.define('NgcpCsc.view.pages.pbxconfig.seats.Seats', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfig',

    xtype: 'seats',

    // TODO: Create a rowwidget here, test that it works with single record first
    // TODO: Try to style it with existing rowbody classes

    initComponent: function() {
        var seatsGrid = Ext.create('NgcpCsc.view.pages.PbxConfigWidgetGrid', {
            reference: 'seatsGrid',
            store: 'Seats',
            xtype: 'seats-widget-grid'
        });

        this.items = [
            seatsGrid
        ];

        this.callParent();
    }
});
