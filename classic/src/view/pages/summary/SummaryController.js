Ext.define('NgcpCsc.view.pages.summary.SummaryController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.summary',

    onConfigure:function(){
        this.fireEvent('showmessage', true, 'ToDo');
    },

    reloadChart: function(btn){
        var chart = btn.up('summary-pie');
        chart.getStore().reload();
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var store = record.store;
        var freeSlots = store.findRecord("name", 'Free');
        var assignedSlots = store.findRecord("name", 'Assigned');
        tooltip.setHtml(record.get('name') + ': ' + record.get('data') + ' on ' + (freeSlots.get('data') + assignedSlots.get('data')));
    }
});
