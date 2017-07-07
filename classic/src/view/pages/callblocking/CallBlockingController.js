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
                cbStoreLoaded: 'cbStoreLoaded',
                cbStoreBeforeSync: 'cbStoreBeforeSync'
            }
        }
    },

    cbStoreLoaded: function(store, data) {
        var models = [];
        var blockInNums = data.get(store._type);
        store.removeAll();
        Ext.each(blockInNums, function(num) {
            var cbModel = Ext.create('NgcpCsc.model.CallBlocking', {
                block_list: num,
                enabled: (num.charAt(0) !== '#')
            });
            store.add(cbModel);
        });
        store.commitChanges();
        this.setVm(store, data);
    },

    cbStoreBeforeSync: function(store, options) {
        if (this.getView().getXType() == 'privacy' & store._type !== 'privacy' ||
            this.getView().getXType() == 'incoming' & store._type !== 'block_in_list' ||
            this.getView().getXType() == 'outgoing' & store._type !== 'block_out_list'
        ) {
            return;
        }
        var vm = this.getViewModel();
        var block_in_list = [],
            block_out_list = [],
            storeType = store._type;
        delete options['destroy'];
        delete options['create'];
        switch (storeType) {
            case 'block_in_list':
                Ext.each(store.getRange(), function(record) {
                    if (record.get('block_list').length > 0) {
                        block_in_list.push(record.get('block_list'));
                    }
                });
                options["update"] = [Ext.create('NgcpCsc.model.Patch', {
                    "op": "add",
                    "path": "/block_in_list",
                    "value": block_in_list
                }), Ext.create('NgcpCsc.model.Patch', {
                    "op": "add",
                    "path": "/block_in_mode",
                    "value": vm.get('incoming_block_mode') === 'on' ? false : true
                })];
                break;
            case 'block_out_list':
                Ext.each(store.getRange(), function(record) {
                    if (record.get('block_list').length > 0) {
                        block_out_list.push(record.get('block_list'));
                    }
                });
                options["update"] = [Ext.create('NgcpCsc.model.Patch', {
                    "op": "add",
                    "path": "/block_out_list",
                    "value": block_out_list
                }), Ext.create('NgcpCsc.model.Patch', {
                    "op": "add",
                    "path": "/block_out_mode",
                    "value": vm.get('outgoing_block_mode') === 'on' ? false : true
                })];
                break;
            default: // privacy
                options["update"] = [Ext.create('NgcpCsc.model.Patch', {
                    "op": "add",
                    "path": "/clir",
                    "value": vm.get('privacy_block_mode') === 'on' ? true : false
                })];
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

    addSuccessful: function () {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.add_success[localStorage.getItem('languageSelected')]);
    },

    addToStore: function(newNumber, newId, store) {
        var me = this;
        var view = this.getView();
        var cbModel = Ext.create('NgcpCsc.model.CallBlocking', {
            "block_list": newNumber,
            "enabled": true
        });
        var successState = false;
        store.add(cbModel);
        view.fireEvent('cardContainerResized', view);
        store.sync({
            callback: function() {
                store.commitChanges();
            }
        });
        // Workaround, as calling addSuccessful() here solved the issue with
        // notification box "moving towards the left for every new showmessages
        // event", which happened only insidestore.sync() callbacks.
        me.addSuccessful();
    },

    getCallBlockingStoreName: function(currentRoute) {
        var storeName;
        switch (currentRoute) {
            case '#callblocking/incoming':
                storeName = 'CallBlockingIncoming';
                break;
            case '#callblocking/outgoing':
                storeName = 'CallBlockingOutgoing';
                break;
            case '#callblocking/privacy':
                storeName = 'CallBlockingPrivacy';
                break;
        }
        return storeName;
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
            callback: function() {
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
            callback: function() {
                store.commitChanges();
            }
        });

    },

    toggleBlockCalls: function(event) {
        var me = this;
        var vm = this.getViewModel();
        var submoduleName = event.getTarget().id.split('-')[1];
        var classList = event.target.classList;
        var dataset = event.target.dataset;
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
        dataset.qtip = Ngcp.csc.locales.callblocking.set_allow_mode[submoduleName][newValueToUse][localStorage.getItem('languageSelected')];
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
        this.triggerStoreSync();
    },

    triggerStoreSync: function() {
        var currentRoute = window.location.hash;
        var storeName = this.getCallBlockingStoreName(currentRoute);
        var store = Ext.getStore(storeName);
        var recs = store.getRange();
        Ext.suspendLayouts();
        store.add({});
        store.sync({
            callback: function() {
                store.removeAll();
                store.add(recs);
                store.commitChanges();
                Ext.resumeLayouts();
            }
        });
    },

    setVm: function(store, data) {
        var vm = this.getViewModel();
        vm.set('incoming_block_mode', data.get('block_in_mode') === true ? 'off' : 'on');
        vm.set('outgoing_block_mode', data.get('block_out_mode') === true ? 'off' : 'on');
        vm.set('privacy_block_mode', data.get('clir') === true ? 'on' : 'off'); // clir true => Hide own number
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
                switcherValue = vm.get('privacy_block_mode')
                break;
        }
        var submoduleStates = (switcherValue === 'on') ? [' grey', 'on', ''] : ['', 'off', ' grey'];
        switcherCmp.setHtml(this.getModeSwitcher(submoduleName, submoduleStates));
    },

    getModeSwitcher: function(submoduleName, submoduleStates) {
        return '<div id="toggleBlockCalls-' + submoduleName + '" class="toggle-section" >' +
            '<span id="toggleTextPrefix-' + submoduleName + '" class="toggle-prefix' + submoduleStates[0] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].prefix[localStorage.getItem('languageSelected')] + '</span>' +
            '<i id="iconAllowBlock-' + submoduleName + '" data-callback="toggleBlockCalls" class="pointer toggle-icon ' + Ngcp.csc.icons.toggle[submoduleStates[1] + '2x'] + '" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.set_allow_mode[submoduleName][submoduleStates[1]][localStorage.getItem('languageSelected')] + '"></i>' + // TODO: Cvenusino: Locales is set dynamically without errors, but does not render. Can you please have a look?
            '<span id="toggleTextSuffix-' + submoduleName + '" class="toggle-suffix' + submoduleStates[2] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].suffix[localStorage.getItem('languageSelected')] + '</span>' +
            '</div>'
    }

});
