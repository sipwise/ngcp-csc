Ext.define('NgcpCsc.view.pages.callforward.afterhours.Afterhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'afterhours', // XXX: do we need this?

    controller: 'callforward',

    viewModel: 'callforward',

    initComponent: function () {

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'afterhoursmainform'
            }]
        }];
        this.callParent();
    }

});
