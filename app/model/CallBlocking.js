Ext.define('NgcpCsc.model.CallBlocking', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'block_list',
        type: 'string'
    }, {
        name: 'block_in_mode',
        type: 'boolean'
    }, {
        name: 'block_out_mode',
        type: 'boolean'
    }, {
        name: 'enabled',
        type: 'boolean'
    }]

    // DONE: 1. remove any unneeded stores/modes/data (for example conversationTypes.json and addressbook.json)
    // TODO: 2. there are unusued models/stores/json data files which needs to be cleaned up and renamed consistently
    // TODO: 3. move the hardcoded/inline Stores to stores/ folder
    // TODO: 4. remove hardcoded data from VM creating links to model with proxy config
    // a. links in vm, and remember to change prefix/parent node in module as well (for example defaultThumbnail becomes rtc.defaultThumbnail)
    // TODO: 5. remove hardcoded data from stores adding proxy (and Model, if missing)
    // a. see languages.js for example
    // TODO: 6. update https://docs.google.com/spreadsheets/d/1v6478lLXG-1d5XirzncCxjoNtRYFcTNjbnA0UiyuyRM/edit?ts=591091d0#gid=0 accordingly

});
