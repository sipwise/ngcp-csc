Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.callblocking',

    data: {
        privacy_block_mode: 'on',
        incoming_block_mode: 'on',
        outgoing_block_mode: 'off',
        clir: true, // Privacy value
        new_number: '',
        hide_mode: 'off'
    }
});
