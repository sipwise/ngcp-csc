Ext.define('NgcpCsc.view.pages.pbxconfig.groups.Groups', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfig',

    xtype: 'groups',

    initComponent: function() {
        var groupsGrid = Ext.create('NgcpCsc.view.pages.PbxConfigGrid', {
            reference: 'groupsGrid',
            store: 'Groups'
        });

        this.items = [
            groupsGrid
        ];

        this.callParent();
    }
});
