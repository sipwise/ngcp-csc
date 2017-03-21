Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

    // DONE: 1. Fix ids in controller so that thenring works again
    // TODO: 2. Place sourceset grid topmost in tab panel, and toggle with icon
    // TODO: 3. Implement ability to change List A/List B name (you can add a
    // field on top of grid, and bind it with the title)
    // TODO: 4. Fix saveDestinationToStore to also save combos to store
    // TODO: 5. Complete validateDestinationForm controller
    // TODO: 6. Fix styling to also work after the split to tabs
    // TODO: Xa. Remember to implement icons with the new formatter
    // TODO: Xb. Locales all the things
    // TODO: Xc. Remove any unneeded files (like this one)

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
