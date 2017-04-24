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
        depends: ['alias_numbers'],
        convert: function (v, record) {
            var dataToSplit = record.data.alias_numbers;
            return dataToSplit.replace(/,/g, ", ");
        }
    }, {
        name: 'groups_split',
        type: 'string',
        depends: ['groups'],
        convert: function (v, record) {
            var dataToSplit = record.data.groups;
            var dataInArray = dataToSplit.split(',');
            var resultArray = [];
            var store = Ext.getStore('Groups');
            for (var data in dataInArray) {
                var rec = store.findRecord('id', dataInArray[data]);
                var nameToPush = rec ? rec.get('name') : '';
                resultArray.push(nameToPush);
            }
            var result = resultArray.join(', ');
            return result;
        }
    }]

});
