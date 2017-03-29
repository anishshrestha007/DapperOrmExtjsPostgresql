Ext.define('app.view.main.MainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'MainView',
    plugins: 'viewport',
    requires: [
        'app.view.main.MainViewController',
        'app.view.main.MainViewModel'

    ],
    title: 'Gera Gaun',
    controller: 'mainViewController',
    iconCls: 'fa fa-gears',
    layout: 'border',
    viewModel: {
        type: 'MainViewModel'
    },
    header: {
        items: [{
            xtype: 'button',
            text: 'Options',
            menu: [{
                text: 'Expander Only',
                checked: true,
                //handler: 'onToggleConfig',
                config: 'expanderOnly'
            }, {
                text: 'Single Expand',
                checked: false,
                //handler: 'onToggleConfig',
                config: 'singleExpand'
            }]
        }, {
            xtype: 'button',
            text: 'Nav',
            //enableToggle: true,
            reference: 'navBtn'
            //toggleHandler: 'onToggleNav'
        }, {
            xtype: 'button',
            text: 'Micro'
            //enableToggle: true,
            //toggleHandler: 'onToggleMicro'
        }]
    },
    items: [{
        region: 'west', // this is for menu model
        maxHeigth: 5,
        width: 120,
        split: true,
        reference: 'treelistContainer',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        scrollable: 'y',
        items: [{
            xtype: 'treelist',
            reference: 'treelist',
            bind: '{navItems}',
            itemId: 'menuList'
        }]
    }, {
        region: 'center',
        bodyPadding: 5,
        itemId: 'mainContent',
        layout: 'fit',
        bind: {
            html: '{selectionText}'
        }
    }]
});