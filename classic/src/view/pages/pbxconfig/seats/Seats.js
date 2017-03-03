Ext.define('NgcpCsc.view.pages.pbxconfig.seats.Seats', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfig',

    xtype: 'seats',

    initComponent: function() {
        var seatsGrid = Ext.create('NgcpCsc.view.pages.pbxconfig.seats.SeatsGrid');

        this.items = [
            seatsGrid
        ];

        this.callParent();
    }
});
