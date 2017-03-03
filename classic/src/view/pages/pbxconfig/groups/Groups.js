Ext.define('NgcpCsc.view.pages.pbxconfig.groups.Groups', {
    extend: 'Ext.panel.Panel',

    xtype: 'groups',

    viewModel: 'groups',

    controller: 'groups',

    initComponent: function() {
        var groupsGrid = Ext.create('NgcpCsc.view.pages.PbxConfigGrid', {
            reference: 'groupsGrid',
            store: 'Groups'
        });

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'groups-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    margin: 10,
                    xtype: 'button',
                    reference:'addNewBtn',
                    disabled: true,
                    text: Ngcp.csc.locales.pbxconfig.add_new_group[localStorage.getItem('languageSelected')]
                    // ,handler: 'addGroup'
                }]
            }]
        }];

        this.items = [
            groupsGrid
        ];

        this.callParent();
    }
});

// Ext.define('NgcpCsc.view.pages.callblocking.outgoing.Outgoing', {
//     extend: 'NgcpCsc.view.pages.callblocking.CallBlocking',
//
//     xtype: 'outgoing',
//
//     _displayIncomingOutgoingSection: true,
//
//     initComponent: function () {
//         var outgoingGrid = Ext.create('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
//             store: 'CallBlockingOutgoing'
//         });
//         this.items = [outgoingGrid];
//         this.callParent();
//     }
//
// });
