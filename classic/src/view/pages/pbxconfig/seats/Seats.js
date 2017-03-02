Ext.define('NgcpCsc.view.pages.pbxconfig.seats.Seats', {
    extend: 'Ext.panel.Panel',

    xtype: 'seats',

    viewModel: 'seats',

    controller: 'seats',

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'seats-tbar',
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
                    // ,handler: 'addSeat'
                }]
            }]
        }];

        this.items = [{
            xtype: 'seats-grid'
        }];

        this.callParent();
    }
});
