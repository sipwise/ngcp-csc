Ext.define('NgcpCsc.view.pages.pbxconfig.devices.Devices', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfig',

    xtype: 'devices',
    controller: 'devices',
    initComponent: function() {
        var devicesGrid = Ext.create('NgcpCsc.view.pages.pbxconfig.devices.DevicesGrid');

        this.items = [
            devicesGrid
        ];

        this.callParent();
    }
});
