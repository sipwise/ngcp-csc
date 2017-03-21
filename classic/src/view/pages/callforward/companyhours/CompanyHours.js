Ext.define('NgcpCsc.view.pages.callforward.companyhours.Companyhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'companyhours',

    controller: 'callforward',

    viewModel: 'callforward',

    initComponent: function () {

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'companyhoursmainform'
            }]
        }];
        this.callParent();
    }

});
