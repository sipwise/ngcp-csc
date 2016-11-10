Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    renderSaveRuleText: function(value, metaData) {
        return Ngcp.csc.locales.callforward.save_rule[localStorage.getItem('languageSelected')].toLowerCase();
    },

    submitForm: function(field) {
        var vm = this.getViewModel();
    },

    onEnterPressed: function(field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    },

    selectFirstRing: function(component, record) {
        // TODO: Create a function to add combo field dynamically add/remove
        // timeout combobox, displayed to the right as another child item.
        // Should be set with flex 1 so it goes from first ring combobox 100%
        // width, to sharing space with new timeout combobox.
    },

    toggleIconClass: function (val, meta, rec) {
        return rec.get('active') === true ? "x-fa fa-toggle-on" : "x-fa fa-toggle-off";
    },

    toggleActive: function(grid, rowIndex, colIndex, item, event, rec, row) {
        rec.set('active', !rec.get('active'));
    },

    addEmptyRow: function () {
        store = Ext.getStore('CallForward');
        storeCount = store.getCount();
        record = store.getAt(storeCount - 1);
        if (record.data.phone !== '') {
            store.add({ "phone": "", "active": false, "ring_for": "0 secs" });
        }
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
    },

    toggleHoursForm: function () {
        var vm = this.getViewModel();
        currentHoursFormValue = vm.get('hours_form');
        vm.set('hours_form', !currentHoursFormValue);
    }

});
