Ext.define('NgcpCsc.view.pages.callblocking.incoming.Incoming', {
    extend: 'Ext.panel.Panel',

    xtype: 'incoming',

    viewModel: 'incoming',

    controller: 'incoming',

    // TODO: 1. Structure stores/model differently, in line with others
    // TODO: 2. Create vm value for segmentedbutton, and bind it
    // DONE: 3a. Use instruction text from old iteration
    // TODO: 3b. Take screenshots of current master iteration, to doublecheck
    // what instruction text is used for each module (incoming/outgoing)
    // TODO: 4. Use validation from saveNumber, also outgoing specific
    // TODO: 5. Remove redundant and controller functions
    // TODO: 6. Duplicate new model for outgoing, and alter to work
    // alignment and padding/margin)

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'callblocking-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    userCls: 'callblocking-header',
                    html: 'Mode',
                    margin: '0 0 10 0'
                }, {
                    items: [{
                        xtype: 'segmentedbutton',
                        allowMultiple: false,
                        items: [{
                            text: 'Allow'
                        }, {
                            text: 'Block'
                        }]
                    }]
                }, {
                    userCls: 'callblocking-header',
                    html: 'Add number',
                    margin: '20 0 10 0'
                }, {
                    xtype: 'textfield',
                    width: 300,
                    bind: '{new_number}',
                    listeners: {
                        specialkey: 'onEnterPressed'
                    }
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')]
                }]
            }]
        }];

        this.items = [{
            xtype: 'incoming-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
