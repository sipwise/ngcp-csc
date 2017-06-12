Ext.define('NgcpCsc.view.pages.callforward.dev.Dev', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'dev',

    ui: 'cf-mainform',

    viewModel: 'callforward',

    initComponent: function() {

        // This is used to fetch the api data from endpoints initially, and
        // build the other individual grid stores in controller together with
        // needed corresponding data fetched with ajax calls
        var cfInitialStore = Ext.create('NgcpCsc.store.CallForward',{
            storeId: 'CallForwardDev',
            _type: ['cfu', 'cft'],
            autoLoad: true,
            listeners: {
                load: function(store, recs) {
                    this.fireEvent('cfStoreLoaded', this, recs[0]);
                }
            }
        });

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                xtype: 'devtestgrid'
            }]
        }];
        this.callParent();
    }

});
