Ext.define('NgcpCsc.view.pages.pbxconfig.seats.SeatsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.seats',

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
        };
    },

    expandPbxCard: function(view, td, cellindex, record, tr) {
        var me = this;
        if (cellindex.target && cellindex.target.classList.contains('green-icon')) {
            return;
        };
        if (cellindex == 4) {
            switch (record.get('conversation_type')) {
                case 'call':
                case 'fax':
                case 'sms':
                case 'chat':
                    this.openCallPanel();
                break;
            };
        } else {
            var record = record.isModel ? record : view.getRecord(Ext.get(td).up(view.itemSelector));
            var id = record.get('id');
            var row = document.getElementById('seatsCard-' + id);
            if (row.classList.contains('hidden')) {
                record.set('expanded', true);
                row.classList.remove('hidden');
            } else {
                record.set('expanded', false);
                row.classList.add('hidden');
            };
        };
        view.grid.updateLayout();
    },

    addSeat: function() {
        // var grid = this.getView().down('seats-grid');
        // var form = this.lookupReference('add-new-seat');
        // var store = Ext.getStore('Seats');
        // var newRec = store.insert(0, {
        //     id: Ext.id(),
        //     expanded: true,
        //     newRec: true
        // })[0];
        // grid.getPlugin('rowexpander').toggleRow(0, newRec);
        // grid.getSelectionModel().select(newRec);
        // this.toggleNewSeatBtn(false);
        // form.show();
        // form.down('[name=seatName]').focus();
    },

    editSeat: function(id) {
        // var form = this.lookupReference('add-new-seat');
        // var grid = this.getView().down('seats-grid');
        // var store = Ext.getStore('Seats');
        // var selectedRow = store.findRecord('id', id);
        // grid.getSelectionModel().select(selectedRow);
        // this.toggleNewSeatBtn(false);
        // form.show();
        // form.down('[name=seatName]').focus();
    },

    toggleNewSeatBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    getIdPrefixCharCount: function (idPrefix) {
        return idPrefix.length;
    },

    removeSeat: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeSeat-'));
        var store = Ext.getStore('Seats');
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
    },

    saveChanges: function() {
        var form = this.lookupReference('add-new-seat');
        if (!form.isValid()) {
            return;
        }
        var store = Ext.getStore('Seats');
        var grid = this.getView().down('seats-grid');
        Ext.each(store.getModifiedRecords(), function(rec) {
            if (rec.get('newRec')) {
                rec.set('newRec', null);
            }
        });
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
