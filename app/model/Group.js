Ext.define('NgcpCsc.model.Group', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'extension',
        type: 'string'
    }, {
        name: 'hunt_policy',
        type: 'string'
    }, {
        name: 'hunt_timeout',
        type: 'string'
    }, {
        name: 'primary_number',
        type: 'string'
    }, {
        name: 'alias_numbers',
        type: 'string'
    }, {
        name: 'seats',
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
        name: 'seats_split',
        type: 'string',
        depends: ['seats'],
        convert: function (v, record) {
            var dataToSplit = record.data.seats;
            var dataInArray = dataToSplit.split(',');
            var resultArray = [];
            var store = Ext.getStore('Seats');
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
