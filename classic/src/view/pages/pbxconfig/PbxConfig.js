Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    // DONE: 0. Create a todo list for all subtasks
    // DONE: 1. Reorder menu to groups, seats, devices order
    // DONE: 2. Map out the data flow, see below and workfront docs:
    // TODO: 3. Set up a plan for data store merge implementation, aiming for
    // ability to either link tables in different stores, or put all in one
    // store with the ability to just change the store in the views and for
    // example prepend parent store to existing record references
    // TODO: 4. Plan out what needs validation, and is required.
    // TODO: 5. Implement validation. Use ExtJS specific validation to minimize\
    // code and complexity of implementation
    // TODO: 5. Bottom of card gets cut off in seats when creating new, might
    // also be happening in other modules. Investigate and fix
    // TODO: 6. Fix bug in Groups module, where hunt 'for' label does not get
    // extra margin-top when saved with enter, only with button. Removing blur
    // listener fixes it, as saveCard() seems to fire twice when both blur and
    // onEnterPressed in use

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
