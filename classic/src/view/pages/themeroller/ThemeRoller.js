Ext.define('NgcpCsc.view.pages.themeroller.ThemeRoller', {
    extend: 'Ext.panel.Panel',

    xtype: 'themeroller',

    viewModel: 'themeroller',

    controller: 'themeroller',

    title: Ngcp.csc.locales.themeroller.title[localStorage.getItem('languageSelected')],

    items: [{
        layout: 'accordion',
        margin: 20,
        defaults: {
            bodyPadding: 10,
            userCls: 'white-box',
            minHeight: 200
        },
        items: [{
            title: Ngcp.csc.locales.themeroller.first_section_title[localStorage.getItem('languageSelected')],
            layout: 'responsivecolumn',
            defaults:{
                responsiveCls: 'big-20 small-100'
            },
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'colorfield',
                    fieldLabel: 'Base color',
                    labelWidth:75,
                    minWidth:200,
                    bind:'{basecolor}'
                }, {
                    xtype: 'colorselector',
                    hidden: true
                }]
            }, {
                xtype: 'container',
                items: [{
                    xtype: 'colorfield',
                    fieldLabel: 'Font color',
                    labelWidth:75,
                    minWidth:200,
                    bind:'{fontcolor}'
                }, {
                    xtype: 'colorselector',
                    hidden: true
                }]
            }, {
                xtype: 'container',
                items: [{
                    xtype: 'colorfield',
                    fieldLabel: 'Body bgcolor',
                    labelWidth:75,
                    minWidth:200,
                    bind:'{bodybgcolor}'
                }, {
                    xtype: 'colorselector',
                    hidden: true
                }]
            }, {
                xtype: 'container',
                items: [{
                    xtype: 'colorfield',
                    fieldLabel: 'Neutral color',
                    bind:'{neautralcolor}',
                    labelWidth:75,
                    minWidth:200
                }, {
                    xtype: 'colorselector',
                    hidden: true
                }]
            }, {
                text: 'test',
                xtype: 'button',
                handler: 'applyColors'
            }]
        }, {
            title: Ngcp.csc.locales.themeroller.second_section_title[localStorage.getItem('languageSelected')],
            html: 'Empty'
        }, {
            title: Ngcp.csc.locales.themeroller.third_section_title[localStorage.getItem('languageSelected')],
            html: 'Empty'
        }]
    }]
});
