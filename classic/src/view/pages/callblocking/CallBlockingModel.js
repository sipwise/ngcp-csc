Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.callblocking',

    data: {
        block_mode: 'allow',
        incoming_block_mode: 'on',
        outgoing_block_mode: 'off',
        clir: true, // Privacy value
        new_number: '',
        hide_mode: 'off'
    }
});
