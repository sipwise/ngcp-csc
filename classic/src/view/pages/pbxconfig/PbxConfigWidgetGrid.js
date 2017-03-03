Ext.define('NgcpCsc.view.pages.PbxConfigWidgetGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }],
    width: 750,
    height: 450,
    leadingBufferZone: 8,
    trailingBufferZone: 8,

    // NOTE: Attempting to implement rowwidget based on example:
    // http://examples.sencha.com/extjs/6.2.0/examples/kitchensink/#row-widget-grid

    // TODO: Cvenusino: Seems to be a little bit more involved, also needs extra
    // definitions in model and proxy? Could you please look into this and advice?
    // Console error message as follows:
    // 'Cannot override method statics on NgcpCsc.model.Seat instance.'
    // Screenshot in WF docs:
    // https://sipwise.attask-ondemand.com/task/view?ID=58b3fde1000f2633681f407cecaa025c

    plugins: [{
        ptype: 'rowwidget',
        widget: {
            xtype: 'form',
            defaultBindProperty: 'hidden', // https://www.sencha.com/forum/showthread.php?328334-6-2-0-RowWidget-grid-plugin-error
            bind: '{!record}', // workaround (can bind any property) which allows the record
            // to be accessible from nested items
            defaults: {
                layout: 'hbox',
                width: '100%'
            },
            items: [{
                    name: 'extension',
                    defaults: {
                        flex: 1
                    },
                    items: [{
                        xtype: 'label',
                        text: 'Extensions' // to locales :)
                    }, {
                        xtype: 'label',
                        bind: {
                            text: '{record.extension}'
                        },
                        listeners: {
                            click: {
                                fn: 'toggleEdit', // change visibility of associated textfield / numberfield
                                el: 'element'
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        hidden: true,
                        bind: {
                            value: '{record.extension}'
                        }
                    }]
                },
                //   ... groups ...
                //   ... numbers ...
                {
                    // you can either define html here, or place a bottom toolbar outside items
                    xtype: 'container',
                    bind: {
                        html: 'text' // copy the XTemplate from grid definition, and replace record.get(<fieldname>) with {record.<fieldname>}
                    }
                }
            ]
        }
    }]
});
