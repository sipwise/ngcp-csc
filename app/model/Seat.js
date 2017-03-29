Ext.define('NgcpCsc.model.Seat', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'extension',
        type: 'string'
    }, {
        name: 'primary_number',
        type: 'string'
    }, {
        name: 'alias_numbers',
        type: 'string'
    }, {
        name: 'groups',
        type: 'string'
    }, {
        name: 'alias_numbers_split',
        type: 'string',
        convert: function (v, record) {
            var dataToSplit = record.data.alias_numbers.toString();
            return dataToSplit.replace(/,/g, ", ");
        }
    }, {
        name: 'groups_split',
        type: 'string',
        convert: function (v, record) {
            var dataToSplit = record.data.groups.toString();
            return dataToSplit.replace(/,/g, ", ");
        }
    }]

});
