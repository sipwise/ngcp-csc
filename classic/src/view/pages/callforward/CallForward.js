Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward'

    // CHANGES TO BE DONE:
    // DONE: 1. - Change timeset grid column title from "Closed" to "Full Day"
    // DONE: 2. - Implement "save" and "close" buttons for timeset grid, and controller (controllers fire msg for now)
    // DONE: 3. - Copy "For calls during after hours..." to panel title (keep it in both places)
    // DONE: 4. - Implement changes to tabs and timeset appearance, see wireframe in balsamiq
    // DONE: 5. - Change "Sourceset title" to "Title"
    // DONE: 6a. - Implement Sourceset grid save button in row, and editor field slightly less wide to make room for button
    // TODO: 6b. - Solve problem with record not being bound to grid, or refreshing when record changes made
    // DONE: 7. - Make sourceset title input field full width
    // DONE: 8. - Change color for "move icon" to same color as "trash icon"
    // DONE: 9. - Implement tooltips in grids
    // DONE: 10. - Fix titles to "Call Forward - Always", and remove "For calls during always..." in always submodule
    // TODO: 11. Move the loadingBar
    // DONE: 12. Local storage for persistent state of collapsable panel
    // TODO: 13. Full width timeset grid, and place inside panel so it can be properly collapsed

});
