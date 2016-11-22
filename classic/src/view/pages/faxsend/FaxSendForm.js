Ext.define('NgcpCsc.view.pages.faxsend.FaxSendForm', {
    extend: 'Ext.form.Panel',

    xtype: 'faxsendform',
    viewModel: 'faxsend',
    defaultType: 'textfield',
    layout: 'form',
    width: 750,

    // TODO: 1. Implement locale for all fieldLabels
    // TODO: 2. Implement reset form controller
    // TODO: 3. Implement dummy submit form controller that just invokes reset
    // form controller
    // TODO: 4. Implement onEnterPressed controllers that invoke reset/submit

    items: [{
        fieldLabel: 'Destination number',
        name: 'faxsend-destination-number',
        bind: '{destination_number}',
        listeners: {
            //specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Quality',
        emptyText: Ngcp.csc.locales.fax_send.send_fax[localStorage.getItem('languageSelected') || 'en'],
        padding: '0 0 0 15',
        store: {
            data: [
                {quality: 'Normal'},
                {quality: 'High'},
                {quality: 'Ultra'}
            ]
        },
        queryMode: 'local',
        id: 'faxsend-quality',
        valueField: 'quality',
        displayField: 'quality',
        editable: false,
        value: 'Standard',
        listeners: {
            //'select': 'languageSelection'
        }
    }, {
        fieldLabel: 'Page header',
        name: 'faxsend-page-header',
        bind: '{page_header}',
        listeners: {
            //specialKey: 'onEnterPressed'
        }
    }, {
        fieldLabel: 'Content',
        name: 'faxsend-content',
        bind: '{content}',
        cls: 'faxsend-content',
        height: 200,
        listeners: {
            //specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'filefield',
        name: 'faxsend-file',
        fieldLabel: 'File',
        anchor: '100%',
        buttonText: 'Choose File'
    }]

})
