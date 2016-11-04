Ext.define('NgcpCsc.view.pages.addressbook.AddressbookController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addressbook',

    listen: {
         store: {
             '#Addressbook': {
                 load: 'onAdressesLoaded'
             }
         }
     },

    resetChanges: function() {
        var grid = this.lookupReference('addressBookGrid');
        grid.getSelectionModel().deselectAll();
        Ext.getStore('Addressbook').rejectChanges();
    },

    saveChanges: function() {
        var store = Ext.getStore('Addressbook');
        var grid = this.lookupReference('addressBookGrid');
        this.onAdressesLoaded(store, store.getRange());
        store.commitChanges();
        grid.getSelectionModel().deselectAll();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },

    createNewContact: function() {
        var store = Ext.getStore('Addressbook');
        var recs = store.insert(0, Ext.create('NgcpCsc.model.Addressbook'));
        var grid = this.lookupReference('addressBookGrid');
        grid.getSelectionModel().select(recs);
        grid.getPlugin('rowexpander').toggleRow(0,recs[0]);
        this.getView().down('#contactFirstName').focus(false, 100);
    },

    renderPhoneIcon: function(value, metaData) {
        return '<div class="fa fa-phone-square"></div>';
    },

    renderToggleDetailsIcon: function(value, metaData) {
        return '<div class="fa fa-arrow-circle-down"></div>';
    },

    removeContact: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    changeGroupField: function(element) {
        var store = Ext.getStore('Addressbook');
        if (element.currentTarget.id === 'group-firstname') {
            store.setConfig('groupField', 'firstname_initial');
            this.getView().down('#group-firstname').removeCls('no-underline');
            this.getView().down('#group-lastname').addCls('no-underline');
            this.getView().down('#group-company').addCls('no-underline');
        } else if (element.currentTarget.id === 'group-lastname') {
            store.setConfig('groupField', 'lastname_initial');
            this.getView().down('#group-lastname').removeCls('no-underline');
            this.getView().down('#group-firstname').addCls('no-underline');
            this.getView().down('#group-company').addCls('no-underline');
        } else if (element.currentTarget.id === 'group-company') {
            store.setConfig('groupField', 'company_initial');
            this.getView().down('#group-company').removeCls('no-underline');
            this.getView().down('#group-firstname').addCls('no-underline');
            this.getView().down('#group-lastname').addCls('no-underline');
        };
    },

    onAdressesLoaded: function(store, recs){
        Ext.each(recs, function(rec){
            rec.set("firstname_initial", rec.get('firstname').substring(0,1));
            rec.set("lastname_initial", rec.get('lastname').substring(0,1));
            rec.set("company_initial",  rec.get('company').substring(0,1));
        });
    },

    composeName:function(val, meta, rec){
        return Ext.String.format('{0} {1}', rec.get('firstname'), rec.get('lastname'));
    },

    capitalize:function(field, newVal, oldVal){
        field.setValue(Ext.String.capitalize(newVal));
    }

});
