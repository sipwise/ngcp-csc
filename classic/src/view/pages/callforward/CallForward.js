Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    // TODO: 1. Split into submodules that with segmented buttons for now
    // TODO: 2. Adapt clickSegmentedButton() controller to base selectedTimeset
    // on window.location.hash instead of vm value
    // TODO: 3. Implement timeset text and icon ("For calls during always ...")
    // TODO: 4. Place timeset grid to right of timeset text and icon, and toggle
    // visibility when icon clicked
    // TODO: 5. In preparation for tabs, plan out how to map the data (more
    // stores?)
    // TODO: 6. Implement tabs
    // TODO: 7. Implement ability to change List A/List B name
    // TODO: 8. Implement clickable icons in tabs
    // TODO: 9. Place sourceset grid topmost in tab panel, and toggle with icon
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
