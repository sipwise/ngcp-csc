Ext.define('NgcpCsc.view.core.GridCards', {
    extend: 'Ext.grid.Panel',
    xtype: 'core-grid-cards',
    ui: 'core-grid-cards',
    listeners: {
        cellclick: function(view, td, cellIndex, record, tr, rowIndex) {
            view.grid.getPlugin('rowexpander').toggleRow(rowIndex, record);
        }
    },
    plugins: [{
        ptype: 'rowwidget'
            // the widget should be defined in initComponent function
            // of the views extending this view, via
            // [view].getPlugin('rowwidget').setWidget({ xtype definition }).
            // For more info on widget configuration
            // pls visit http://examples.sencha.com/extjs/6.2.0/examples/kitchensink/#row-widget-grid
    }]
});
