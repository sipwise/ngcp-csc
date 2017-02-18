Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callblocking',

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.addNewNumber(field, el);
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

    addNewNumber: function (field, el) {
        var vm = this.getViewModel();
        var invalidCheck = 0;
        var newNumber = vm.get('new_number');
        // var newNumber = !!vm.get('new_number') ? vm.get('new_number') : 'anonymous';
        var currentRoute = window.location.hash;
        var storeName = currentRoute === '#callblocking/incoming' ? 'CallBlockingIncoming' : 'CallBlockingOutgoing';
        var store = Ext.getStore(storeName);
        var newId = store.getCount() + 1;
        var acceptedCharacters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '?'];
        if (newNumber[0] === '+') {
            newNumber = newNumber.substr(1).split('');
        } else {
            newNumber = newNumber.split('');
        };
        newNumber.forEach(function (character) {
            if (acceptedCharacters.indexOf(character) === -1) invalidCheck = 1;
        });
        // TODO: Check if store has a record with same block_list value as
        // newNumber, or if newNumber is empty if block_list value anonymous
        if (store.findExact('block_list', newNumber) === -1 && store.findExact('block_list', 'anonymous') === -1 ) {

            switch (invalidCheck) {
                case (0):
                    switch (newNumber.length) {
                        case (0):
                            store.add({ "id": newId, "block_list": "anonymous", "enabled": true });
                            this.fireEvent('showmessage', true, Ngcp.csc.locales.common.add_success[localStorage.getItem('languageSelected')]);
                            break;
                        default:
                            newNumber = '+' + newNumber.join('');
                            store.add({ "id": newId, "block_list": newNumber, "enabled": true });
                            this.fireEvent('showmessage', true, Ngcp.csc.locales.common.add_success[localStorage.getItem('languageSelected')]);
                            break;
                    };
                    break;
                case (1):
                    this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
                    break;
            };

        } else {
            console.log('else');
        };
        vm.set('new_number', '');
    },

    clickModeButton: function () {
        var vm = this.getViewModel();
        var blockAllowMode = vm.get('block_mode');
        if (blockAllowMode === 'allow') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.allow_mode_success[localStorage.getItem('languageSelected')]);
        } else if (blockAllowMode === 'block') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.block_mode_success[localStorage.getItem('languageSelected')]);
        } else {
            this.fireEvent('showmessage'
            , false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
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
        var currentRoute = window.location.hash;
        var storeName = currentRoute === '#callblocking/incoming' ? 'CallBlockingIncoming' : 'CallBlockingOutgoing';
        var store = Ext.getStore(storeName);
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
