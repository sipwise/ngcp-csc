Ext.define('NgcpCsc.model.CallForward', {
    extend: 'Ext.data.Model',

    fields: ["from", "when", "to"],

    proxy: {
        type: 'ajax',
        url: '/resources/data/callForward.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
