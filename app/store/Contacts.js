Ext.define('NgcpCsc.store.Contacts', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.contacts',

    storeId: 'Contacts',

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/contacts.json'
    },

    sorters: [{
        property: 'online',
        direction: 'DESC'
    }]
});
