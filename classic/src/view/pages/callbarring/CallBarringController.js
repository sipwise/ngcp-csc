Ext.define('NgcpCsc.view.pages.callbarring.CallBarringController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callbarring',

    onEnterNewIn: function(field, el) {
        if (el.getKey() == el.ENTER) {
            this.saveIncomingNumber();
        }
    },

    onEnterNewOut: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.saveOutgoingNumber();
        }
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

    toggleEnabled: function(grid, rowIndex, colIndex, item, event, record, row) {
        // TODO: Debug console error: "Uncaught TypeError: Cannot read property 'get' of undefined(...)"
        record.set('enabled', !record.get('enabled'));
        this.fireEvent('showmessage', true, Ngcp.csc.locales.callbarring.enabled_success[localStorage.getItem('languageSelected')]);
        this.renderBarrNumber();
    },

    saveIncomingNumber: function() {
        var store = Ext.getStore('CallBarringIncoming');
        var newNumber = this.getViewModel().get('new_in_number');
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
            if (newNumber.length === 0) {
                store.add({ "block_in_list": 'anonymous', "enabled": true });
            } else {
            newNumber = '+' + newNumber.join('');
            store.add({ "block_in_list": newNumber, "enabled": true });
            };
        } else {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
        };
        this.getViewModel().set('new_in_number', '');
    },

    saveOutgoingNumber: function() {
        var store = Ext.getStore('CallBarringOutgoing');
        var newNumber = this.getViewModel().get('new_out_number');
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
            if (newNumber.length === 0) {
                this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
            } else {
            newNumber = '+' + newNumber.join('');
            store.add({ "block_out_list": newNumber, "enabled": true });
            };
        } else {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
        };
        this.getViewModel().set('new_out_number', '');
    },

    saveBarrSettings: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }

});
