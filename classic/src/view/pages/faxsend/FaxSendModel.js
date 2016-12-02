Ext.define('NgcpCsc.view.pages.faxsend.FaxSendModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.faxsend',
    links: {
        fax: {
            type: 'NgcpCsc.model.Fax',
            id: Ext.id()

        }
    }
})
