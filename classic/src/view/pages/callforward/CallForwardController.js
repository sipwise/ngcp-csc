Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    selectFirstRing: function(component, record) {
        var vm = this.getViewModel();
        function showHideTimeoutField(timeoutField) {
            record === 'Own phone' ? vm.set(timeoutField, false) : vm.set(timeoutField, true);
        };
        if (component.getId() === 'onlineFirstDest') {
            showHideTimeoutField('online_timeout_hidden');
        } else if (component.getId() === 'busyFirstDest') {
            showHideTimeoutField('busy_timeout_hidden');
        } else if (component.getId() === 'offlineFirstDest') {
            showHideTimeoutField('offline_timeout_hidden');
        };
    },

    toggleIconClass: function (val, meta, rec) {
        return rec.get('active') === true ? "x-fa fa-toggle-on" : "x-fa fa-toggle-off";
    },

    toggleActive: function(grid, rowIndex, colIndex, item, event, rec, row) {
        rec.set('active', !rec.get('active'));
    },

    addEmptyRow: function (el) {
        var targetId = el.getTarget().id;
        function addRowToStore(store) {
            var targetStore = Ext.getStore(store);
            var record = targetStore.getAt(targetStore.getCount() - 1);
            if (record.data.phone !== '') {
                targetStore.add({ "phone": "", "active": false, "ring_for": "0 secs" });
            }
        };
        if (targetId.indexOf('onlineButton') > -1) {
            addRowToStore('CallForwardOnline');
        } else if (targetId.indexOf('busyButton') > -1) {
            addRowToStore('CallForwardBusy');
        } else if (targetId.indexOf('offlineButton') > -1) {
            addRowToStore('CallForwardOffline');
        };
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
    },

    clickSegmentedButton: function (el) {
        var targetId = el.getTarget().id;
        var vm = this.getViewModel();
        vm.set('after_hours_form', true);
        vm.set('company_hours_form', true);
        vm.set('list_a_form', true);
        vm.set('list_b_form', true);
        if (targetId.indexOf('afterHoursButton-btnIconEl') > -1) {
            vm.set('active_widget_form', Ngcp.csc.locales.callforward.after_hours[localStorage.getItem('languageSelected')]);
            vm.set('after_hours_form', false);
        } else if (targetId.indexOf('companyHoursButton-btnIconEl') > -1) {
            vm.set('active_widget_form', Ngcp.csc.locales.callforward.company_hours[localStorage.getItem('languageSelected')]);
            vm.set('company_hours_form', false);
        } else if (targetId.indexOf('listAButton-btnIconEl') > -1) {
            // TODO
        } else if (targetId.indexOf('listAButton-btnIconEl') > -1) {
            // TODO
        };
    },

    renderDay: function(value, meta, record) {
        if (record.get('closed') === true) {
            return Ext.String.format('<div style="text-decoration: line-through;">{0}</div>', value);
        } else {
            return value;
        }
    },

    toggleClosedState: function(grid, rowIndex, colIndex, item, event, record, row) {
        record.set('closed', !record.get('closed'));
        this.renderDay(record.get('closed'), null, record);
    },

    toggleClosedClass: function (val, meta, rec) {
        return rec.get('closed') === true ? "x-fa fa-check-square-o" : "x-fa fa-square-o";
    },

    resetTimesetWidget: function (el) {
        var buttonId = el.id;
        if (buttonId == 'resetAfter') {
            var store = Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardTimesetAfter.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            });
            var grid = Ext.getCmp('cf-timeset-after-grid');
            grid.reconfigure(store);
        } else if (buttonId == 'resetCompany') {
            var store = Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardTimesetCompany.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            });
            var grid = Ext.getCmp('cf-timeset-company-grid');
            grid.reconfigure(store);
        };
    }

});
