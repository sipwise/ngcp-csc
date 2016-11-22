Ext.define('NgcpCsc.view.pages.faxsend.FaxSendModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.faxsend',

    data: {
        destination_number: '',
        page_header: '',
        content: '',
        selected_quality: 'Standard',
        chosen_file: ''
    }

})
