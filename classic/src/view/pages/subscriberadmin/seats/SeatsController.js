Ext.define('NgcpCsc.view.pages.subscriberadmin.seats.SeatsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.seats',

    onIconClicked: function(event, el) {
        // eval is never the best option
        Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
    },

    addSeat: function() {
        // TODO
    },

    editSeat: function() {
        // TODO
    },

    removeSeat: function() {
        // TODO
    }


});
