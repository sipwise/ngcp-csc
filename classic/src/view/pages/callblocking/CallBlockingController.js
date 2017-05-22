Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callblocking',

    listen: {
        controller: {
            '*': {
                confirmCallBlockingRemoval: 'confirmCallBlockingRemoval'
            }
        },
        store:{
            '*': {
                cbStoreLoaded: 'cbStoreLoaded'
            }
        }
    },

    onEnterPressed: function(field, el) {
        if (el.getKey() == el.ENTER) {
            this.addNewNumber();
        };
    },

    afterCBRendered: function(cmp){
        cmp.on('resize', function(){
            cmp.fireEvent('cardContainerResized', cmp);
        });
    },

    renderBarrNumber: function(value, meta, record) {
        value = value.substr(1); // removes the hash, which is the first char of disabled nums
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

    addUnsuccessful: function() {
        this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
    },

    addToStore: function(newNumber, newId, store) {
        var view = this.getView();
        store.add({
            "id": newId,
            "block_list": newNumber,
            "enabled": true
        });
        view.fireEvent('cardContainerResized', view);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.add_success[localStorage.getItem('languageSelected')]);
    },

    getCallBlockingStoreName: function(currentRoute) {
        return currentRoute === '#callblocking/incoming' ? 'CallBlockingIncoming' : 'CallBlockingOutgoing';
    },

    getAcceptedCharacters: function() {
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '?'];
    },

    addNewNumber: function() {
        var me = this;
        var vm = me.getViewModel();
        var invalidCheck = 0;
        var newNumber = vm.get('new_number');
        var currentRoute = window.location.hash;
        var storeName = me.getCallBlockingStoreName(currentRoute);
        var store = Ext.getStore(storeName);
        var newId = store.getCount() + 1;
        var acceptedCharacters = me.getAcceptedCharacters();
        if (newNumber[0] === '+') {
            newNumber = newNumber.substr(1).split('');
        } else {
            newNumber = newNumber.split('');
        };
        newNumber.forEach(function(character) {
            if (acceptedCharacters.indexOf(character) === -1) invalidCheck = 1;
        });
        switch (newNumber.length) {
            case (0):
                switch (storeName) {
                    case ('CallBlockingIncoming'):
                        switch (store.findExact('block_list', 'anonymous')) {
                            case (-1):
                                me.addToStore('anonymous', newId, store);
                                break;
                            default:
                                me.addUnsuccessful();
                                break;
                        }
                        break;
                    case ('CallBlockingOutgoing'):
                        me.addUnsuccessful();
                        break;
                }
                break;
            default:
                switch (invalidCheck) {
                    case (0):
                        newNumber = '+' + newNumber.join('');
                        switch (store.findExact('block_list', newNumber)) {
                            case (-1):
                                me.addToStore(newNumber, newId, store);
                                break;
                            default:
                                me.addUnsuccessful();
                                break;
                        };
                        break;
                    case (1):
                        me.addUnsuccessful();
                        break;
                }
                break;
        }
        vm.set('new_number', '');
    },

    clickAllowModeButton: function() {
        var vm = this.getViewModel();
        var blockAllowMode = vm.get('block_mode');
        if (blockAllowMode === 'allow') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.allow_mode_success[localStorage.getItem('languageSelected')]);
        } else if (blockAllowMode === 'block') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.block_mode_success[localStorage.getItem('languageSelected')]);
        };
    },

    clickHideModeButton: function() {
        var vm = this.getViewModel();
        var hideMode = vm.get('hide_mode');
        if (hideMode === 'on') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.hide_mode_on[localStorage.getItem('languageSelected')]);
        } else if (hideMode === 'off') {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.hide_mode_off[localStorage.getItem('languageSelected')]);
        };
    },

    deleteRecord: function(event) {
        var rec = event.record;
        var currentRoute = window.location.hash;
        var storeName = currentRoute === '#callblocking/incoming' ? 'CallBlockingIncoming' : 'CallBlockingOutgoing';
        var store = Ext.getStore(storeName);
        var title = Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')];
        var question = Ngcp.csc.locales.common.remove_confirm[localStorage.getItem('languageSelected')];
        var sucessMsg = Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')];
        this.fireEvent('showconfirmbox', title, question, sucessMsg, 'confirmCallBlockingRemoval', rec);
    },

    confirmCallBlockingRemoval: function(record) {
        var view = this.getView();
        var store = record.store;
        store.remove(record);
        view.fireEvent('cardContainerResized', view);
    },

    enableNumberBlocking: function(event) {
        var rec = event.record;
        var enabledDisabledMode = rec.get('enabled');
        rec.set('enabled', !enabledDisabledMode);
        if (!enabledDisabledMode) {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.enabled_success[localStorage.getItem('languageSelected')]);
        } else {
            this.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.disabled_success[localStorage.getItem('languageSelected')]);
        };
    },

    toggleBlockCalls: function(event) {
        var vm = this.getViewModel();
        var submoduleName = event.getTarget().id.split('-')[1];
        var classList = event.target.classList;
        var prefixElementClassList = document.getElementById('toggleTextPrefix-' + submoduleName).classList;
        var suffixElementClassList = document.getElementById('toggleTextSuffix-' + submoduleName).classList;
        var vmRecordName = submoduleName + '_block_mode';
        var currentValue = vm.get(vmRecordName);
        var newValueToUse = currentValue === 'on' ? 'off' : 'on';
        vm.set(vmRecordName, newValueToUse);
        classList.remove('fa-toggle-' + currentValue);
        classList.add('fa-toggle-' + newValueToUse);
        prefixElementClassList.toggle('grey');
        suffixElementClassList.toggle('grey');
    },

    cbStoreLoaded: function(store, data){
        var vm = this.getViewModel();
        vm.set('incoming_block_mode',data.get('block_in_mode'));
        vm.set('outgoing_block_mode',data.get('block_out_mode'));
        this.setModeSwitcher();
    },

    setModeSwitcher: function(){
        var vm = this.getViewModel();
        var switcherCmp = this.lookupReference('modeSwitcher');
        var submoduleName = this.getView()._vmPrefix.slice(0, -1);
        var switcherValue = (submoduleName == 'incoming') ? vm.get('incoming_block_mode') : vm.get('outgoing_block_mode');
        var submoduleStates = switcherValue ? ['', 'on', ' grey'] : [' grey', 'off', ''];
        switcherCmp.setHtml(this.getModeSwitcher(submoduleName, submoduleStates));

    },

    getModeSwitcher: function(submoduleName, submoduleStates){
        return '<div id="toggleBlockCalls-' + submoduleName + '" class="toggle-section" data-callback="toggleBlockCalls">' +
            '<span id="toggleTextPrefix-' + submoduleName + '" class="toggle-prefix' + submoduleStates[0] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].prefix[localStorage.getItem('languageSelected')] + '</span>' +
            '<i id="iconAllowBlock-' + submoduleName + '" class="pointer toggle-icon ' + Ngcp.csc.icons.toggle[submoduleStates[1] + '2x'] + '" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"></i>' +
            '<span id="toggleTextSuffix-' + submoduleName + '" class="toggle-suffix' + submoduleStates[2] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].suffix[localStorage.getItem('languageSelected')] + '</span>' +
            '</div>'
    }

});
