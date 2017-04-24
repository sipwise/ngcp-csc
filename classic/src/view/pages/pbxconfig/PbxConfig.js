Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    // What's done:
    //  DONE: 1. Reorder menu to groups, seats, devices order
    //  DONE: 2. Map out the data flow, see workfront docs
    //  DONE: 3. Plan data store merge implementation
    //  DONE: 4. Plan out what needs validation, and is required
    //  DONE: 5. Implement validation in view and controller
    //  DONE: 8. Implement store merge as per Cvenusinos suggestion
    //
    // What's remaining:
    //  TODO: 8x. Filter out field arrays where fieldLabel is "User" or "Type".
    //            see this todo also in PbxController.js
    //  TODO: 6. Bottom of card gets cut off in seats when creating new, might
    //     also be happening in other modules. Investigate and fix
    //  TODO: 7. Fix bug in Groups module, where hunt 'for' label does not get
    //     extra margin-top when saved with enter, only with button

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
