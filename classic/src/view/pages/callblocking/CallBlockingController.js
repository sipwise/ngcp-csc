Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callblocking',

    listen: {
        controller: {
            '*': {
                confirmCallBlockingRemoval: 'confirmCallBlockingRemoval'
            }
        },
        store: {
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

    afterCBRendered: function(cmp) {
        cmp.on('resize', function() {
            cmp.fireEvent('cardContainerResized', cmp);
        });
    },

    renderBarrNumber: function(value, meta, record) {
        value = (value[0] == '#') ? value.substr(1) : value; // hides the hash, which is the first char of disabled nums
        if (record.get('enabled') === false) {
            return Ext.String.format('<div style="color: #666;text-decoration: line-through;font-size: 16px;padding-left: 10px;">{0}</div>', value);
        } else {
            return Ext.String.format('<div style="font-size: 16px;padding-left: 10px;">{0}</div>', value);
        }
    },

    onIconClicked: function(event, el) {
        debugger
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [event]);
        }
    },

    addUnsuccessful: function(unsuccessType) {
        switch (unsuccessType) {
            case 'duplicateAnonymous':
                this.fireEvent('showmessage', false, Ngcp.csc.locales.callblocking.save_unsuccess_duplicate_anonymous[localStorage.getItem('languageSelected')]);
                break;
            case 'numberEmpty':
                this.fireEvent('showmessage', false, Ngcp.csc.locales.callblocking.save_unsuccess_number_empty[localStorage.getItem('languageSelected')]);
                break;
            case 'duplicateNumber':
                this.fireEvent('showmessage', false, Ngcp.csc.locales.callblocking.save_unsuccess_duplicate_number[localStorage.getItem('languageSelected')]);
                break;
            case 'invalidNumber':
                this.fireEvent('showmessage', false, Ngcp.csc.locales.callblocking.save_unsuccess_invalid_number[localStorage.getItem('languageSelected')]);
                break;
        };
    },

    addToStore: function(newNumber, newId, store) {
        var me = this;
        var view = this.getView();
        var cbModel = Ext.create('NgcpCsc.model.CallBlocking', {
            "block_list": newNumber,
            "enabled": true
        });
        store.add(cbModel);
        view.fireEvent('cardContainerResized', view);
        store.sync({
            success: function() {
                me.fireEvent('showmessage', true, Ngcp.csc.locales.common.add_success[localStorage.getItem('languageSelected')]);
            },
            failure: function() {
                me.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
            },
            callback: function(){
                store.commitChanges();
            }
        });
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
                                me.addUnsuccessful('duplicateAnonymous');
                                break;
                        }
                        break;
                    case ('CallBlockingOutgoing'):
                        me.addUnsuccessful('numberEmpty');
                        break;
                }
                break;
            default:
                switch (invalidCheck) {
                    case (0):
                        newNumber = '+' + newNumber.join('');
                        debugger
                        switch (store.findExact('block_list', newNumber)) {
                            case (-1):
                                me.addToStore(newNumber, newId, store);
                                break;
                            default:
                                me.addUnsuccessful('duplicateNumber');
                                break;
                        };
                        break;
                    case (1):
                        me.addUnsuccessful('invalidNumber');
                        break;
                }
                break;
        }
        vm.set('new_number', '');
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
        var me = this;
        var view = this.getView();
        var store = record.store;
        store.remove(record);
        store.sync({
            callback: function(){
                store.commitChanges();
            }
        });
        view.fireEvent('cardContainerResized', view);
    },

    enableNumberBlocking: function(event) {
        var me = this;
        var rec = event.record;
        var isEnabled = rec.get('enabled');
        var currentRoute = window.location.hash;
        var storeName = this.getCallBlockingStoreName(currentRoute);
        var store = Ext.getStore(storeName);

        rec.set('enabled', !isEnabled);
        rec.set('block_list', !isEnabled ? rec.get('block_list').slice(1) : '#' + rec.get('block_list'));

        store.sync({
            success: function() {
                if (!isEnabled) {
                    me.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.enabled_success[localStorage.getItem('languageSelected')]);
                } else {
                    me.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.disabled_success[localStorage.getItem('languageSelected')]);
                };
            },
            failure: function() {
                this.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
            },
            callback: function(){
                store.commitChanges();
            }
        });

    },

    toggleBlockCalls: function(event) {
        var me = this;
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
        switch (newValueToUse) {
            case ('on'):
                switch (submoduleName) {
                    case 'incoming':
                    case 'outgoing':
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.mode_block_success[localStorage.getItem('languageSelected')]);
                        break;
                    case 'privacy':
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.number_hide_success[localStorage.getItem('languageSelected')]);
                        break;
                };
                break;
            case ('off'):
                switch (submoduleName) {
                    case 'incoming':
                    case 'outgoing':
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.mode_allow_success[localStorage.getItem('languageSelected')]);
                        break;
                    case 'privacy':
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.callblocking.number_show_success[localStorage.getItem('languageSelected')]);
                        break;
                };
                break;
        };
    },

    cbStoreLoaded: function(store, data) {
        var vm = this.getViewModel();
        vm.set('incoming_block_mode', data.get('block_in_mode') ? 'on' : 'off');
        vm.set('outgoing_block_mode', data.get('block_out_mode') ? 'on' : 'off');
        vm.set('clir', data.get('clir') ?  'on' : 'off');
        this.setModeSwitcher();
    },

    setModeSwitcher: function() {
        var vm = this.getViewModel();
        var switcherCmp = this.lookupReference('modeSwitcher');
        var submoduleName = this.getView()._vmPrefix.slice(0, -1);
        var switcherValue;
        switch (submoduleName) {
            case 'incoming':
                switcherValue = vm.get('incoming_block_mode')
                break;
            case 'outgoing':
                switcherValue = vm.get('outgoing_block_mode')
                break;
            case 'privacy':
                switcherValue = vm.get('clir')
                break;
        }
        var submoduleStates = switcherValue ? ['', 'on', ' grey'] : [' grey', 'off', ''];
        switcherCmp.setHtml(this.getModeSwitcher(submoduleName, submoduleStates));

    },

    getModeSwitcher: function(submoduleName, submoduleStates) {
        return '<div id="toggleBlockCalls-' + submoduleName + '" class="toggle-section" >' +
            '<span id="toggleTextPrefix-' + submoduleName + '" class="toggle-prefix' + submoduleStates[0] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].prefix[localStorage.getItem('languageSelected')] + '</span>' +
            '<i id="iconAllowBlock-' + submoduleName + '" data-callback="toggleBlockCalls" class="pointer toggle-icon ' + Ngcp.csc.icons.toggle[submoduleStates[1] + '2x'] + '" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"></i>' +
            '<span id="toggleTextSuffix-' + submoduleName + '" class="toggle-suffix' + submoduleStates[2] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].suffix[localStorage.getItem('languageSelected')] + '</span>' +
            '</div>'
    }

});
