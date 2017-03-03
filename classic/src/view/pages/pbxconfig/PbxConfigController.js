Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pbxconfig',

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
        };
    },

    getRowBasedOnRoute: function (route) {
        switch (route) {
            case ('#pbxconfig/groups'):
                return 'groupsCard-';
                break;
            case ('#pbxconfig/seats'):
                return 'seatsCard-';
                break;
            case ('#pbxconfig/devices'):
                return 'devicesCard-';
                break;
        };
    },

    expandPbxCard: function(view, td, cellindex, record, tr) {
        if (cellindex.target && cellindex.target.classList.contains('green-icon')) {
            return;
        };
        var me = this
        var record = record.isModel ? record : view.getRecord(Ext.get(td).up(view.itemSelector));
        var id = record.get('id');
        var route = window.location.hash;
        var row = document.getElementById(this.getRowBasedOnRoute(route) + id);
        if (row.classList.contains('hidden')) {
            record.set('expanded', true);
            row.classList.remove('hidden');
        } else {
            record.set('expanded', false);
            row.classList.add('hidden');
        };
        view.grid.updateLayout();
    },

    addPbx: function() {
        // TODO
    },

    editSeat: function(id) {
        // TODO
    },

    editGroup: function(id) {
        // TODO
    },

    editDevice: function(id, destination) {
        // TODO
    },

    getIdPrefixCharCount: function (idPrefix) {
        return idPrefix.length;
    },

    toggleNewSeatBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    toggleNewGroupBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    toggleNewDeviceBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    removeSeat: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeSeat-'));
        var store = Ext.getStore('Seats');
        var selectedRow = store.findRecord('id', recordId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    removeGroup: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeGroup-'));
        var store = Ext.getStore('Groups');
        var selectedRow = store.findRecord('id', recordId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    removeDevice: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeDevice-'));
        var store = Ext.getStore('Devices');
        var selectedRow = store.findRecord('id', recordId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    resetChanges: function() {
        var form = this.lookupReference('add-new-seat');
        var grid = this.getView().down('seats-grid');
        var store = Ext.getStore('Seats');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        if (selectedRec.get('newRec')) {
            store.remove(selectedRec)
        } else {
            selectedRec.reject();
        }
        grid.getSelectionModel().deselectAll();
        this.toggleNewSeatBtn(true);
        form.hide();
    }

});
