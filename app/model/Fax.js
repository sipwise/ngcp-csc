Ext.define('NgcpCsc.model.Fax', {
    extend: 'Ext.data.Model',

    fields: ["destination_number", "page_header", "content", "selected_quality", "chosen_file"],

    proxy: {
        type: 'ajax',
        url: '/resources/data/fax.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
