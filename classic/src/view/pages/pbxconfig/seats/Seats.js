Ext.define('NgcpCsc.view.pages.pbxconfig.seats.Seats', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfig',

    xtype: 'seats',

    layout:'fit',

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
