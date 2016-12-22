Ext.define('NgcpCsc.view.pages.summary.SummaryController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.summary',
    
    onDataRender: function (v) {
        return v + '%';
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
    }
});
