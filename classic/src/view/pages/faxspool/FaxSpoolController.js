Ext.define('NgcpCsc.view.pages.faxspool.FaxSpoolController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.faxspool',

    reproduceFax: function (val, rec) {
        this.fireEvent('showmessage', false, 'Todo');
    },

    removeFax: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    }

});
