Ext.define('NgcpCsc.view.pages.subscriberadmin.devices.DevicesController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.devices',

    onIconClicked: function(event, el) {
        // eval is never the best option
        Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id, el.dataset.destination || null]);
    },

    addDevice: function() {
        var grid = this.getView().down('devices-grid');
        var form = this.lookupReference('add-new-device');
        var store = Ext.getStore('Devices');
        store.clearFilter();
        var newRec = store.insert(0, {
            id: Ext.id(),
            expanded: true,
            status:'disabled'
        })[0];
        grid.getPlugin('rowexpander').toggleRow(0, newRec);
        grid.getSelectionModel().select(newRec);
        form.show();
    },

    editDevice: function(id, destination) {
        var form = this.lookupReference('add-new-device');
        var grid = this.getView().down('devices-grid');
        var store = Ext.getStore('Devices');
        var selectedRow = store.findRecord('id', id);
        var selectedDestination = destination;
        grid.getSelectionModel().select(selectedRow);
        form.show();
    },

    removeDevice: function(id) {
        var form = this.lookupReference('add-new-device');
        var store = Ext.getStore('Devices');
        var selectedRow = store.findRecord('id', id);
        store.remove(selectedRow);
        form.hide();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    resetChanges: function() {
        var form = this.lookupReference('add-new-device');
        var grid = this.getView().down('devices-grid');
        var store = Ext.getStore('Devices');
        store.rejectChanges();
        grid.getSelectionModel().deselectAll();
        form.hide();
    },

    saveChanges: function() {
        var form = this.lookupReference('add-new-device');
        if (!form.isValid()) {
            return;
        }
        var store = Ext.getStore('Devices');
        var grid = this.getView().down('devices-grid');
        store.commitChanges();
        grid.getSelectionModel().deselectAll();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
        form.hide();
    }
});
