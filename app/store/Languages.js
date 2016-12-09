Ext.define('NgcpCsc.store.Languages', {
    extend: 'Ext.data.Store',

    storeId: 'Languages',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'language', type: 'string'}
    ],

    data: [
        {
            id: 'en',
            language: 'English'
        },{
            id: 'it',
            language: 'Italian'
        },{
            id: 'de',
            language: 'German'
        },{
            id: 'fr',
            language: 'French'
        },{
            id: 'sp',
            language: 'Spanish'
        }
    ]

});
