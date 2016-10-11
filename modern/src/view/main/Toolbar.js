Ext.define('NgcpCsc.view.main.Toolbar', {
    extend: 'Ext.Toolbar',

    xtype:'maintoolbar',

    items: [
        {
            xtype: 'component',
            reference: 'logo',
            userCls:'main-logo',
            html: ''
        },
        {
            xtype: 'button',
            ui: 'header',
            iconCls: 'x-fa fa-bars',
            margin: '0 0 0 10',
            listeners: {
                tap: 'onToggleNavigationSize'
            }
        },
        '->',
        {
            xtype:'button',
            ui: 'header',
            iconCls:'x-fa fa-th-large',
            href: '#account',
            margin: '0 7 0 0',
            handler: 'toolbarButtonClick'
        },
        {
            xtype: 'component',
            html: 'TestUser',
            margin: '0 12 0 4',
            userCls: 'main-user-name'
        },
        {
            xtype: 'image',
            userCls: 'main-user-image small-image circular',
            alt: 'Current user image',
            src: 'resources/images/user-profile/2.png'
        }
    ]
});
