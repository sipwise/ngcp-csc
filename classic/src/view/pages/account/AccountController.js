Ext.define('NgcpCsc.view.pages.account.AccountController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.account',

    onConfigure:function(btn){
        var page = btn.up('account-pie').name;
        this.redirectTo('#pbxconfig/' + page);
    },

    reloadChart: function(btn){
        var chart = btn.up('account-pie');
        chart.getStore().reload();
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var store = record.store;
        var freeSlots = store.findRecord("name", 'Free');
        var assignedSlots = store.findRecord("name", 'Assigned');
        tooltip.setHtml(record.get('name') + ': ' + record.get('data') + ' of ' + (freeSlots.get('data') + assignedSlots.get('data')));
    }

});
