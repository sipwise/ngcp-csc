Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    // TODO: 0. Adjust width and height of add new destination fields, and
    // slightly reduce margin-left for 'then ring' fields
    // TODO: 1. Change first ring timeout to 'and ring for' [COMBO] 'secs'
    // TODO: 2. Implement onEnterPressed for '[offline|online|busy]SaveButton'
    // TODO: 3. Split into submodules that with segmented buttons for now
    // TODO: 4. Implement timeset text and icon ("For calls during always ...")
    // TODO: 5. Place timeset grid to right of timeset text and icon, and toggle
    // visibility when icon clicked
    // TODO: 6. In preparation for tabs, plan out how to map the data (more
    // stores?)
    // TODO: 7. Implement tabs
    // TODO: 8. Implement ability to change List A/List B name
    // TODO: 9. Implement clickable icons in tabs
    // TODO: 10. Place sourceset grid topmost in tab panel, and toggle with icon
    // TODO: X. Remember to implement icons with the new formatter

    initComponent: function () {

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'callforwardmainform'
            }]
        }];
        this.callParent();
    }

});
