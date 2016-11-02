Ext.define('NgcpCsc.view.pages.callbarring.CallBarringModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callbarring',

    data: {
        block_in_mode: true,
        block_out_mode: true,
        clir: true,
        new_in_number: '',
        new_out_number: ''
    },

    stores: {
        incomingCalls: 'CallBarringIncoming',
        outgoingCalls: 'CallBarringOutgoing'
    }
});
