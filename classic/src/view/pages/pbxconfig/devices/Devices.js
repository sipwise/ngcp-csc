Ext.define('NgcpCsc.view.pages.pbxconfig.devices.Devices', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfig',

    xtype: 'devices',

    initComponent: function() {
        var devicesGrid = Ext.create('NgcpCsc.view.pages.PbxConfigGrid', {
            reference: 'devicesGrid',
            store: 'Devices'
        });
        
        this.items = [
            devicesGrid
        ];

        this.callParent();
    }
});
