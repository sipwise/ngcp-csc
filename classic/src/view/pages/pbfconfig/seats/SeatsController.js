Ext.define('NgcpCsc.view.pages.pbxconfig.seats.SeatsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.seats',

    onIconClicked: function(event, el) {
        // eval is never the best option
        Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
    },

    addSeat: function() {
        var grid = this.getView().down('seats-grid');
        var form = this.lookupReference('add-new-seat');
        var store = Ext.getStore('Seats');
        var newRec = store.insert(0, {
            id: Ext.id(),
            expanded: true
        })[0];
        grid.getPlugin('rowexpander').toggleRow(0, newRec);
        grid.getSelectionModel().select(newRec);
        this.toggleNewSeatBtn(false);
        form.show();
        form.down('[name=seatName]').focus();
    },

    editSeat: function(id) {
        var form = this.lookupReference('add-new-seat');
        var grid = this.getView().down('seats-grid');
        var store = Ext.getStore('Seats');
        var selectedRow = store.findRecord('id', id);
        grid.getSelectionModel().select(selectedRow);
        this.toggleNewSeatBtn(false);
        form.down('[name=seatName]').focus();
        form.show();
    },

    toggleNewSeatBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    removeSeat: function(id) {
        var form = this.lookupReference('add-new-seat');
        var store = Ext.getStore('Seats');
        var selectedRow = store.findRecord('id', id);
        store.remove(selectedRow);
        this.toggleNewSeatBtn(true);
        form.hide();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    resetChanges: function() {
        var form = this.lookupReference('add-new-seat');
        var grid = this.getView().down('seats-grid');
        var store = Ext.getStore('Seats');
        store.rejectChanges();
        grid.getSelectionModel().deselectAll();
        this.toggleNewSeatBtn(true);
        form.hide();
    },

    saveChanges: function() {
        var form = this.lookupReference('add-new-seat');
        if (!form.isValid()) {
            return;
        }
        var store = Ext.getStore('Seats');
        var grid = this.getView().down('seats-grid');
        store.commitChanges();
        grid.getSelectionModel().deselectAll();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
        this.toggleNewSeatBtn(true);
        form.hide();
    },

    renderSeatsText: function(value, metaData) {
        return Ngcp.csc.locales.common.groups[localStorage.getItem('languageSelected')].toLowerCase();
    }

});
