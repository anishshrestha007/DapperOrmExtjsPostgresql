Ext.define('app.master.home.HomeListPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.homeListPanel',
    xtype: 'homeListPanel',
    itemId: 'homeListPanel',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    title: 'Reckons',
    columnLines: true,
    frame: true,
    iconCls: 'framing-buttons-grid',
    //store: 'Companies',
    viewModel: true,
    multiColumnSort: true,
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    layout: 'border',
    split: true,
    buttonAlign: 'center',
    bind: {
        selection: '{theRow}'
    },

    selModel: {
        type: 'checkboxmodel'
    },

    columns: [{
            text: 'Id',
            sortable: true,
            dataIndex: 'employeeNo',
            groupable: false,
            width: 80,
            locked: true,
            editRenderer: 'bold'
        }, {
            text: "Company(Filter)",
            dataIndex: 'name',
            width: 140,
            sortable: true,
            layout: 'hbox',
            locked: true,
            editor: {
                xtype: 'textfield'
            },
            items: {
                xtype: 'textfield',
                reference: 'nameFilterField',
                margin: 2,
            }
        }, {
            text: "Address",
            dataIndex: 'price',

            width: 120,
            sortable: true,
            formatter: 'usMoney'
        }, {
            text: 'Contact Info',
            shrinkWrap: true,
            columns: [{
                text: 'Moble No',
                dataIndex: 'mobile_no',
                width: 100,
                groupable: false,
                summaryType: 'sum',
                filter: {

                },
                editor: {
                    xtype: 'numberfield',
                    decimalPrecision: 0
                }
            }, {
                text: 'Name',
                dataIndex: 'name',
                width: null, // Size column to title text
                groupable: false,
                summaryType: 'sum',
                summaryFormatter: 'number("0")',
                filter: {

                },
                editor: {
                    xtype: 'textfield',
                }
            }, {
                text: 'Date Of Sub',
                dataIndex: 'dobsubm',
                width: null, // Size column to title text
                groupable: false,
                filter: {

                },
                editor: {
                    xtype: 'numberfield',
                }
            }]
        },

        {
            text: "Fax No",
            dataIndex: 'change',

            width: 120,
            sortable: true
        }, {
            text: "Pan No",
            dataIndex: 'pctChange',

            width: 120,
            sortable: true
        }, {
            text: "Last Updated",
            dataIndex: 'lastChange',

            width: 120,
            sortable: true,
            formatter: 'date("m/d/Y")'
        },

    ],
    plugins: [{
        ptype: 'gridfilters'
    }, {
        ptype: 'rowexpander',

        // dblclick invokes the row editor
        expandOnDblClick: false,
        rowBodyTpl: '<img src="{avatar}" height="100px" style="float:left;margin:0 10px 5px 0"><b>{name}<br></b>{dob:date}'
    }],
    tbar: [{
        text: 'Add Something',
        tooltip: 'Add a new row',
        iconCls: 'framing-buttons-add'
    }, '-', {
        text: 'Options',
        tooltip: 'Set options',
        iconCls: 'framing-buttons-option'
    }, '-', {
        text: 'Remove Something',
        tooltip: 'Remove the selected item',
        iconCls: 'framing-buttons-remove',
        disabled: true,

        bind: {
            disabled: '{!theRow}'
        }
    }],

    fbar: [{
        minWidth: 80,
        text: 'Save'
    }, {
        minWidth: 80,
        text: 'Cancel'
    }]
});