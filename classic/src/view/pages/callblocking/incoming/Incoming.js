Ext.define('NgcpCsc.view.pages.callblocking.incoming.Incoming', {
    extend: 'Ext.panel.Panel',

    xtype: 'incoming',

    viewModel: 'incoming',

    controller: 'incoming',

    // TODO: 1. Switch to rowbody
    // TODO: 2. Implement listener that toggles enabled/disabled
    // TODO: 3. Implement logic for adding new numbers
    // TODO: 4. Structure stores/model differently, in line with others
    // TODO: 5. Remove redundant and controller functions
    // TODO: 6. Fix styling to be in line with conversations (mainly border,
    // alignment and padding/margin)

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'callblocking-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 35' : '-5 0 0 15',
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
                    bind: '{new_number}'
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
