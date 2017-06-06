// TODO: 1. identify in API the endpoints required to perform crud operations for each of the submodules
// TODO: 2. create proxy configurations for each store/models, extending NgcpApi proxy - pls wait for callblocking API task to be completed.
Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

});
