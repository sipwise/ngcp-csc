Ext.define('NgcpCsc.view.pages.callblocking.CallBlocking', {
    extend: 'Ext.panel.Panel',

    xtype: 'callblocking',

    viewModel: 'callblocking',

    controller: 'callblocking',

    // TODO: 1. Change controller to base store on route or view
    // TODO: 2. Change controller to not accept duplicate numbers/anonymous
    // TODO: 3. Remove orig argument in rowbody function
    // TODO: 4. Nested if's to switch case, and see if you can use .call instead
    // of eval
    // TODO: 5. Check to see if any models/stores/data can be removed or changed
    // TODO: 6. Create renderer for new entry instructions html

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
                        bind: {
                            value: '{block_mode}'
                        },
                        defaults: {
                            handler: 'clickModeButton'
                        },
                        items: [{
                            text: 'Allow',
                            value: 'allow'
                        }, {
                            text: 'Block',
                            value: 'block'
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
                    // TODO: Move html to renderer, and base output on route
                    html: Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callblocking.new_entry_anonymous[localStorage.getItem('languageSelected')]
                }]
            }]
        }];

        this.callParent();
    }
});
