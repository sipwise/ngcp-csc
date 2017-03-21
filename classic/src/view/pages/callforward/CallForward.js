Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

    // DONE: 1. Fix saveDestinationToStore to also save combos to store
    // DONE: 2. Fix styling to also work after the split to tabs
    // DONE: Xa. Remember to implement icons with the new formatter
    // TODO: Xb. Locales all the things
    // TODO: Xc. Clean up sass
    // TODO: Xc. Clean up controller
    // TODO: Xe. Remove any unneeded files (like this one)

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
