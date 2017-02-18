Ext.define('NgcpCsc.view.pages.callblocking.outgoing.OutgoingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.outgoing',

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.saveNumber(field.id);
        };
    },

    getActionClass: function (val, meta, rec) {
        return rec.get('enabled') === true ? "x-fa fa-toggle-on" : "x-fa fa-toggle-off";
    },

    renderBarrNumber: function(value, meta, record) {
        if (record.get('enabled') === false) {
            return Ext.String.format('<div style="text-decoration: line-through;">{0}</div>', value);
        } else {
            return value;
        }
    },

    removeBarrNumber: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    renderDeleteIconTooltip: function(value, metaData) {
        return Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')].toUpperCase();
    },

    toggleEnabled: function(grid, rowIndex, colIndex, item, event, record, row) {
        record.set('enabled', !record.get('enabled'));
        this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.enabled_success[localStorage.getItem('languageSelected')]);
        this.renderBarrNumber(record.get('enabled'), null, record);
    },

    saveNumber: function (field) {
        var store, newNumber, vm = this.getViewModel();
        var fieldArrayIncoming = ['incoming-new-enter', 'incoming-new-btn'];
        var fieldArrayOutgoing = ['outgoing-new-enter', 'outgoing-new-btn'];
        if (typeof field === 'object') {
            field = field.currentTarget.id;
        };
        if (fieldArrayIncoming.indexOf(field) > -1) {
            store = Ext.getStore('CallBlockingIncoming');
            newNumber = vm.get('callblocking.new_in_number');
        } else if (fieldArrayOutgoing.indexOf(field) > -1){
            store = Ext.getStore('CallBlockingOutgoing');
            newNumber = vm.get('callblocking.new_out_number');
        };
        var acceptedCharacters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '?'];
        var invalidCheck;
        if (newNumber[0] === '+') {
            newNumber = newNumber.substr(1).split('');
        } else {
            newNumber = newNumber.split('');
        };
        newNumber.forEach(function (character) {
            if (acceptedCharacters.indexOf(character) === -1) {
                invalidCheck = 1;
            };
        });
        if (invalidCheck !== 1) {
            if (fieldArrayIncoming.indexOf(field) > -1) {
                if (newNumber.length === 0) {
                    store.add({ "block_in_list": "anonymous", "enabled": true });
                } else {
                newNumber = '+' + newNumber.join('');
                store.add({ "block_in_list": newNumber, "enabled": true });
                };
            } else if (fieldArrayOutgoing.indexOf(field) > -1){
                if (newNumber.length === 0) {
                    this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
                } else {
                newNumber = '+' + newNumber.join('');
                store.add({ "block_out_list": newNumber, "enabled": true });
                };
            };
        } else {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
        };
        if (fieldArrayIncoming.indexOf(field) > -1) {
            vm.set('callblocking.new_in_number', '');
        } else if (fieldArrayOutgoing.indexOf(field) > -1){
            vm.set('callblocking.new_out_number', '');
        };
    },

    saveBarrSettings: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }

});
