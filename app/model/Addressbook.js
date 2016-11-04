Ext.define('NgcpCsc.model.Addressbook', {
    extend: 'Ext.data.Model',

    fields: [{
            name: 'name',
            type: 'string'
        }, {
            name: 'firstname',
            type: 'string'
        }, {
            name: 'lastname',
            type: 'string'
        }, {
            name: 'company',
            type: 'string'
        }, {
            name: 'firstname_initial',
            type: 'string'
        }, {
            name: 'lastname_initial',
            type: 'string'
        }, {
            name: 'company_initial',
            type: 'string'
        }, {
            name: 'home',
            type: 'string'
        }, {
            name: 'office',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        },
        {
            name: 'fax',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'homepage',
            type: 'string'
        }
    ]
});
