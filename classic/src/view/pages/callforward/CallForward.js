Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

    // DONE 1: Investigate issue with "change title" field briefly visible
    // before showing again. Create new task to handle this app wide.
    // DONE 2: Change "ADD NEW DESTINATION" button text to "CANCEL" when active,
    // and indent the button to be in line with grids
    // DONE 3: Implement collapsable panel bar view for sourceset grids
    // DONE 4: Remove loading icon
    // TODO 5: When I am busy... field cut off at bottom for Numbers
    // DONE X: Talked about the highlighting of grids when moved, but just keep
    // in mind for now
    // TODO: XX: Create a new task to handle delayed hidden binds, see here:
    // https://www.sencha.com/forum/showthread.php?294356-Fixing-the-lag-when-components-hidden-visible-property-is-a-bind

});
