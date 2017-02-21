Ext.define('NgcpCsc.view.common.contacts.ContactsPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'contacts',

    controller: 'contacts',

    viewModel: 'contacts',

    width: '15%',

    // TODO: Minimize horisontally to the right edge
    closable: true,

    title: Ngcp.csc.locales.contacts.title[localStorage.getItem('languageSelected')],

    // layout: {
    //     type: 'vbox',
    //     align: 'stretch'
    // },
    //
    // items: [{
    //     margin: '10',
    //     bind: {
    //         html: '{department}'
    //     }
    // }, {
    //     margin: '5 0 0 10',
    //     html: 'Person A'
    // }, {
    //     margin: '5 0 0 10',
    //     html: 'Person B'
    // }, {
    //     margin: '5 0 0 10',
    //     html: 'Person C'
    // }]

    layout: 'responsivecolumn',

    defaults: {
        margin: 10
    },

    initComponent: function() {
        this.items = [{
            xtype: 'chatlist',
            width: '95%'
        }];
        this.callParent();
    }

});
