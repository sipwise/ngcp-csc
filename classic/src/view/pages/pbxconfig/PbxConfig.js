Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    listeners: {
        afterrender: 'afterPbxContRendered'
    },

// 1. Rename button in groups module to "ADD NEW GROUP"
// 2. Investigate Alignment issue on Andreas' laptop. Not able to reproduce
// 3. Change extension number to have no upper limit
// 4. When clicking "ADD NEW GROUP" and new card is outside view, it doesn't show it/scroll to it. Works for Robert. Try and solve with scrollTo - window.scrollTo(0,document.body.scrollHeight);
// 5. Cancel button shows delete box. Remove
// TODO 6. When editing a card, and switching module, shows "All fields required". Use a VM model to set last edited card id, and a onRouteChange event and controller to hide fields on that card
// TODO 7. Shouldn't be able to create a new card if another one has been created but not saved

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'pbxconfig-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    margin: 10,
                    xtype: 'button',
                    reference: 'addNewBtn',
                    bind: {
                        text: '{add_new_button}'
                    },
                    handler: 'addPbx'
                }]
            }]
        }];
        this.callParent();
    }
});
