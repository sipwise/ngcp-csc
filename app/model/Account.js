Ext.define('NgcpCsc.model.Account', {
    extend: 'Ext.data.Model',
    fields: ['initial_balance', 'clients_total_count', 'voicemails_total_count', 'call_forward_active'],
    proxy: {
        type: 'ajax',
        url: '/resources/data/account.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
