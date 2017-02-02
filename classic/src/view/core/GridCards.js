Ext.define('NgcpCsc.view.core.GridCards', {
    extend: 'Ext.grid.Panel',
    xtype: 'core-grid-cards',
    ui: 'core-grid-cards',
    listeners: {
        cellclick: function(view, td, cellIndex, record, tr, rowIndex) {
    //        view.grid.getPlugin('rowexpander').toggleRow(rowIndex, record);
        }
    }
});
