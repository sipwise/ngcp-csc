Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfig', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxconfig',
    viewModel: 'pbxconfig',
    controller: 'pbxconfig',

    // DONE: X. Create a todo list for all subtasks
    // DONE: 0. Reorder menu to groups, seats, devices order
    // DONE: 1. Map out the data flow, see below and workfront docs:
    // DONE: 2. Set up a plan for data store merge implementation, aiming for
    // ability to either link tables in different stores, or put all in one
    // store with the ability to just change the store in the views and for
    // example prepend parent store to existing record references
    // TODO: 3. Implement store merge by:
    // TODO:   a. Make 'Groups' the store for seats.groups tagfield, and 'Seats'
    //            the store for devices.seats
    //         b. introduce in Groups data/model a unique id field
    //         c. change seat data to have the groups field as array of group ids
    //         d. where you assign the value of groups label in seat card, you have to
    //            iterate&find the records in Groups store which have the ids of
    //            groups field in seat record, and extract the names
    //         e. as for the tagfield, you have to use Groups store
    //         f. define valueField and displayField using fields which exists in
    //            group model (id & name for example)
    //         g. if the store has autoLoad: true (=dropdown populated),
    //            binding the groups field in seat model to the array of ids should
    //            automatically display the selected group names
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
