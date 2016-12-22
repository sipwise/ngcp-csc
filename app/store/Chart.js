Ext.define('NgcpCsc.store.Chart', {
    extend: 'Ext.data.Store',
    alias: 'store.Chart',
    storeId: 'Chart',
    fields: ['name', 'data'],
    autoLoad: true
});
