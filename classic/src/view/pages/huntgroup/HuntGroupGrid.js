Ext.define('NgcpCsc.view.pages.huntgroup.HuntGroupGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'huntgroup-grid',

    store: 'HuntGroup',

    reference: 'huntGroupGrid',

    padding: 10,

    listeners: {
        afterrender: 'onGridRendered',
        cellclick: 'onCellClicked'
    },

    tbar: [{
        xtype:'label',
        text: Ngcp.csc.locales.common.order_by[localStorage.getItem('languageSelected')]
    },{
            xtype: 'container',
            id: 'group-name',
            padding: '0 10 0 0',
            html: 'Name',
            cls: 'link',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'changeGroupField'
                }
            }
        }, {
            xtype: 'container',
            id: 'group-extension',
            padding: '0 10 0 0',
            html: 'Extension',
            cls: 'link no-underline',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'changeGroupField'
                }
            }
        },
        '->', {
            text: Ngcp.csc.locales.huntgroup.new_group[localStorage.getItem('languageSelected')],
            handler: 'createNewGroup'
        }
    ],
    columns: {
        defaults: {
            menuDisabled: false,
            sortable: false,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'name'
        }, {
            flex: 1,
            dataIndex: 'extension'
        }, {
            flex: 1,
            dataIndex: 'hunting_policy'
        }, {
            flex: 1,
            dataIndex: 'serial_hunting_timeout'
        }]
    },

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],

    plugins: [{
        ptype: 'rowexpander',
        id: 'rowexpander',
        selectRowOnExpand: true,
        rowBodyTpl: new Ext.XTemplate(
            '<div class="contact-wrapper">',
            '<div class="content"><b>' + Ngcp.csc.locales.huntgroup.group_and_extension[localStorage.getItem('languageSelected')] + '</b>',
            '<p><div class="short-label">' + Ngcp.csc.locales.huntgroup.name[localStorage.getItem('languageSelected')] + ':</div><div>{name} </div></p>',
            '<p><div class="short-label">' + Ngcp.csc.locales.huntgroup.extension[localStorage.getItem('languageSelected')] + ':</div><div>{extension} </div></p>',
            '<p><div class="short-label">' +
            '</div>',
            '<div class="content"><b>' + Ngcp.csc.locales.huntgroup.policy_and_timeout[localStorage.getItem('languageSelected')] + '</b>',
            '<p><div class="label">' + Ngcp.csc.locales.huntgroup.hunting_policy[localStorage.getItem('languageSelected')] + ':</div><div> <a class="link" href="mailto:{e_mail}">{hunting_policy}</a></div></p>',
            '<p><div class="label">' + Ngcp.csc.locales.huntgroup.serial_hunting_timeout[localStorage.getItem('languageSelected')] + ':</div><div> {serial_hunting_timeout}</div></p>',
            '</div>',
            '</div>')
    }]
});
