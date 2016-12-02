Ext.define('NgcpCsc.model.GridFilters', {
    extend: 'Ext.data.Model',

    fields: ['from_date', 'to_date'],

    proxy: {
        type: 'ajax',
        url: '/resources/data/gridfilters.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
