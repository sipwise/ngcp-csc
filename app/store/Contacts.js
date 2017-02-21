Ext.define('NgcpCsc.store.Contacts', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.contacts',

    storeId: 'Contacts',

    proxy: {
        type: 'ajax',
        url: 'resources/data/contacts.json'
    },

    sorters: [{
        property: 'online',
        direction: 'DESC'
    }]
});
