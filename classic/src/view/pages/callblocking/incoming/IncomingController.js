Ext.define('NgcpCsc.view.pages.callblocking.incoming.IncomingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.incoming',

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.addNewNumber();
        };
    },

    renderBarrNumber: function(value, meta, record) {
        if (record.get('enabled') === false) {
            return Ext.String.format('<div style="color: #666;text-decoration: line-through;font-size: 16px;padding-left: 10px;">{0}</div>', value);
        } else {
            return Ext.String.format('<div style="font-size: 16px;padding-left: 10px;">{0}</div>', value);
        }
    },

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [event]);
        }
    },

    addNewNumber: function () {
        var vm = this.getViewModel();
        var store = Ext.getStore('CallBlockingIncoming');
        var newId = store.getCount() + 1;
        var newNumber = vm.get('incoming.new_in_number');
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
                store.add({ "id": newId, "block_in_list": "anonymous", "enabled": true });
                this.fireEvent('showmessage', true, Ngcp.csc.locales.common.add_success[localStorage.getItem('languageSelected')]);
            } else {
            newNumber = '+' + newNumber.join('');
            store.add({ "id": newId, "block_in_list": newNumber, "enabled": true });
            this.fireEvent('showmessage', true, Ngcp.csc.locales.common.add_success[localStorage.getItem('languageSelected')]);
            };
        } else {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
        };
        vm.set('incoming.new_in_number', '');
    },

    clickModeButton: function () {
        var vm = this.getViewModel();
        var blockAllowMode = vm.get('incoming.block_in_mode');
        if (blockAllowMode === 'allow') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.allow_mode_success[localStorage.getItem('languageSelected')]);
        } else if (blockAllowMode === 'block') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.block_mode_success[localStorage.getItem('languageSelected')]);
        } else {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
        };
    },

    onIconHovered: function (event, el) {
        if (!event.target.classList.contains('fa-toggle-on') &&
            !event.target.classList.contains('fa-toggle-off') &&
            !event.target.classList.contains('fa-trash')){
            // Register the new tip with an element's ID
            Ext.tip.QuickTipManager.register({
                target: el.id, // Target button's ID
                text: el.dataset.tooltip // Tip content
            });
        }
    },

    deleteRecord: function(event) {
        var rec = event.record;
        var store = Ext.getStore('CallBlockingIncoming');
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    enableNumberBlocking: function (event) {
        var rec = event.record;
        var enabledDisabledMode = rec.get('enabled');
        rec.set('enabled', !enabledDisabledMode);
        if (!enabledDisabledMode) {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.enabled_success[localStorage.getItem('languageSelected')]);
        } else {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.disabled_success[localStorage.getItem('languageSelected')]);
        };
    }

});
