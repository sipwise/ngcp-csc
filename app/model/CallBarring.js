Ext.define('NgcpCsc.model.CallBarring', {
    extend: 'Ext.data.Model',

    fields: ["block_in_mode", "block_out_mode", "clir", "new_in_number", "new_out_number"],

    proxy: {
        type: 'ajax',
        url: '/resources/data/callBarring.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
