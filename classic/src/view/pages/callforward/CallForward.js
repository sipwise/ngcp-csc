// TODO: 1. identify in API the endpoints required to perform crud
//          operations for each of the submodules
// DONE: 1a. draw out all submodule endpoints, not taking into
//           account query combinations (List A, Everyone, etc)
// +--------------+---------------+------+-------------------------+
// |  Submodule   |     Grid      | CRUD |        Endpoint         |
// +--------------+---------------+------+-------------------------+
// | Alw/Aft/Comp | Timeset       | RU   | /api/cftimesets/        |
// | Alw/Aft/Comp | Sourceset     | RU   | /api/cfsourcesets/      |
// | Alw/Aft/Comp | Onl/Offl/Busy | CRUD | /api/cfmappings/        |
// | Alw/Aft/Comp | Onl/Offl/Busy | R    | /api/cftimesets/        |
// | Alw/Aft/Comp | Onl/Offl/Busy | R    | /api/cfsourcesets/      |
// | Alw/Aft/Comp | Onl/Offl/Busy | CRUD | /api/cfdestinationsets/ |
// +--------------+---------------+------+-------------------------+
// DONE: 1b. verify endpoints with use of curl
// DONE: 1c. create model scaffolding with comments to keep track
// TODO: 2. create proxy configurations for each store/models, extending NgcpApi proxy - pls wait for callblocking API task to be completed.
// DONE: 3. Fix bug with "List B" panel appearing by on "Always" when "Everybody" selected
Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

});
