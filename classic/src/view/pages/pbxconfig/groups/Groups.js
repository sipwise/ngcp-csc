Ext.define('NgcpCsc.view.pages.pbxconfig.seats.Groups', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfig',

    xtype: 'groups',

    initComponent: function() {
        var groupsGrid = Ext.create('NgcpCsc.view.pages.pbxconfig.seats.GroupsGrid');

        this.items = [
            groupsGrid
        ];

        this.callParent();
    }
});
