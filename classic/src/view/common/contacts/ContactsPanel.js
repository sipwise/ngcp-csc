Ext.define('NgcpCsc.view.common.contacts.ContactsPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'contacts',

    controller: 'contacts',

    viewModel: 'contacts',

    width: '15%',

    closable: true,

    title: Ngcp.csc.locales.contacts.title[localStorage.getItem('languageSelected')],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        margin: '10',
        html: '{department}'
    }, {
        margin: '5 0 0 10',
        html: 'Person A'
    }, {
        margin: '5 0 0 10',
        html: 'Person B'
    }, {
        margin: '5 0 0 10',
        html: 'Person C'
    }]

});
