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
    //         3. Implement store merge by:
    // DONE:   a. introduce in Groups data/model a unique id field (was already there)
    // TODO:   b. change seat data to have the groups field as array of group ids
    // TODO:   c. where you assign the value of groups label in seat card, you have to
    //            iterate&find the records in Groups store which have the ids of
    //            groups field in seat record, and extract the names
    // DONE:   d. as for the tagfield, you have to use Groups storeDONE
    // TODO:   e. define valueField and displayField using fields which exists in
    //            group model (id & name for example)
    // TODO:   f. if the store has autoLoad: true (=dropdown populated),
    //            binding the groups field in seat model to the array of ids should
    //            automatically display the selected group names
    //         Q. Question NOTE: regarding f, I don't think I can do that with
    //            this module having binding issues with rowwidget, and even if I could
    //            how would I reference that when main store for tagfield is set to a
    //            different store than seats?
    //         X. NOTE: the moment I change "Development" to "2" in seats.json, I get
    //            invalid json error. Other values I can change name of without problem
    // DONE: 4. Plan out what needs validation, and is required.
    //       a. Groups: Name is alphanumeric, Extension is numeric max 3 numbers,
    //          hunt_timeout is numeric and max length 3 numbers
    //       b. Seats: Name is alphanumeric, Extension is numeric, Primary number is
    //          numeric (dont know max) (combos and tags not validating)
    //       c. Name is alphanumeric, Mac address is alphanum and ?, rest is selection based
    //
    ////////    Implement validation. Use ExtJS specific validation to minimize\
    //          code and complexity of implementation
    // TODO: 5a. Tried with vtype, but get error. Investigate
    // TODO: 5b. If vtype not working, try regex: config or validator:
    // TODO: 5c. Once solution found, implement with field.isValid() checks in controller
    // TODO: 6. Bottom of card gets cut off in seats when creating new, might
    // also be happening in other modules. Investigate and fix
    // TODO: 7. Fix bug in Groups module, where hunt 'for' label does not get
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
