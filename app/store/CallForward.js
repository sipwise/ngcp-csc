Ext.create('NgcpCsc.store.CallForward', {
    extend: 'Ext.data.Store',

    storeId: 'CallForward',

    model: 'NgcpCsc.model.CallForward',

    autoLoad: true,

    data: [
        { src: 'http://www.sencha.com/img/20110215-feat-html5.png', caption: 'Caption 1' },
        { src: 'http://www.sencha.com/img/20110215-feat-html5.png', caption: 'Caption 2' },
        { src: 'http://www.sencha.com/img/20110215-feat-html5.png', caption: 'Caption 3' }
    ]

});
