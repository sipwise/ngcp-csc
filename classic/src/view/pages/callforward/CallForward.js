// TODO: 1. identify in API the endpoints required to perform crud
//          operations for each of the submodules
// DONE: 1a. draw out all submodule endpoints, not taking into
//           account query combinations (List A, Everyone, etc)
// |   Submodule   |   Grid    |     CRUD     |      Endpoint      |
// |---------------|-----------|--------------|--------------------|
// | Always        | Timeset   | Read, Update | /api/cf*/          |
// | Always        | Sourceset | Read, Update | /api/cf*/          |
// | Always        | Online    | Read, Update | /api/callforwards/ |
// | Always        | Busy      | Read, Update | /api/callforwards/ |
// | Always        | Offline   | Read, Update | /api/callforwards/ |
// | After Hours   | Timeset   | Read, Update | /api/cf*/          |
// | After Hours   | Sourceset | Read, Update | /api/cf*/          |
// | After Hours   | Online    | Read, Update | /api/callforwards/ |
// | After Hours   | Busy      | Read, Update | /api/callforwards/ |
// | After Hours   | Offline   | Read, Update | /api/callforwards/ |
// | Company Hours | Timeset   | Read, Update | /api/cf*/          |
// | Company Hours | Sourceset | Read, Update | /api/cf*/          |
// | Company Hours | Online    | Read, Update | /api/callforwards/ |
// | Company Hours | Busy      | Read, Update | /api/callforwards/ |
// | Company Hours | Offline   | Read, Update | /api/callforwards/ |
// TODO: 1b. verify endpoints with use of curl
// TODO: 2. create proxy configurations for each store/models, extending NgcpApi proxy - pls wait for callblocking API task to be completed.
Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

});
