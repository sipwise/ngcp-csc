Ext.define('NgcpCsc.view.pages.callforward.always.Always', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'always',

    controller: 'callforward',

    viewModel: 'callforward',

    initComponent: function () {

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'alwaysmainform'
            }]
        }];
        this.callParent();
    }

});
