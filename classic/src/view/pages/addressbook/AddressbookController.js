Ext.define('NgcpCsc.view.pages.addressbook.AddressbookController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addressbook',

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
        } else if (element.currentTarget.id === 'group-lastname') {
            store.setConfig('groupField', 'lastname_initial');
        } else if (element.currentTarget.id === 'group-company') {
            store.setConfig('groupField', 'company_initial');
        };
    }

});
