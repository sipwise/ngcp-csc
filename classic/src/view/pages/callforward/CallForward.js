Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    // TODO: 0. Navigation store icons
    // TODO: 1. Implement placement and hidden vm value for timeset grid
    // TODO: 2. Implement controller for toggling timeset grid visibility
    // TODO: 3. Adapt clickSegmentedButton() controller to base selectedTimeset
    // on window.location.hash instead of vm value
    // TODO: 4. Place timeset grid to right of timeset text and icon, and toggle
    // visibility when icon clicked
    // TODO: 5. In preparation for tabs, plan out how to map the data (more
    // stores?)
    // TODO: 6. Implement tabs
    // TODO: 7. Implement ability to change List A/List B name
    // TODO: 8. Implement clickable icons in tabs
    // TODO: 9. Place sourceset grid topmost in tab panel, and toggle with icon
    // TODO: 10. Fix saveDestinationToStore controller to allow all combo opts
    // TODO: X. Remember to implement icons with the new formatter

    // initComponent: function () {
    //
    //     this.items = [{
    //         userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
    //         xtype: 'core-container',
    //         items: [{
    //             xtype: 'callforwardmainform'
    //         }]
    //     }];
    //     this.callParent();
    // }

});
