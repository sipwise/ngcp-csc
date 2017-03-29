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
        // XXX: Cvenusino: Have an issue with using convert in model here. It
        // does not refresh/fire when changes are committed to store. I have:
        // - verified that new values are in fact saved to store
        // - tried with grid.updateLayout() and store.reload() (and refresh the
        //    plugin unsuccessfully), but didn't work, and realized that reload\
        //    loads the original store again, so that's not an option. Is there
        //    a way to re-run/reload model, so we run the convert method in
        //    model again?
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
