Ext.define('app.master.home.HomeFormWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.HomeFormWindow',
    itemId: 'HomeFormWindow',
    //NOTE: don't use controller here
    // viewModel: {
    //     type: 'myroViewModel' //for nepali language of entryTitle 
    // },
    resizable: false,
    autoShow: true,
    bind: {
        title: 'Home Window'
    },
    defaultListenerScope: true,
    items: [{
        xtype: 'form',
        trackResetOnLoad: true, 
        fieldDefaults: {
            combineErrors: true,
            msgTarget: 'side'
        },
        itemId: 'data-form',
        items: [{
            xtype: 'fieldset',
            height: 270,
            border: false,
            width: 460,
            margin :'5 5 5 5',
            layout: {
                type: 'table',
                columns: 1

            },
            items: [{
                xtype: 'hiddenfield',
                colspan: 2,
                name: 'id',
                margin: '0 0 0 10',
                bind: {
                    fieldLabel: 'id'
                }
            }, {
                xtype: 'textfield',
                name: 'code',
                margin: '5 0 5 0',
                width: 400,
                /*Validation*/
                maxLength: 10,
                maxLengthText: 'The maximum length of code is 5',
                //maskRe: /[0-9 ,]/,
                allowBlank: false,
                cls: 'required-field-label',
                enforceMaxLength: true,
                /*Validation*/
                bind: {
                    fieldLabel: 'code'
                }
            }, {
                xtype: 'textfield',
                name: 'name_np',
                enableKeyEvents: true,
                inputmethod: 'nepali',
               margin: '5 0 5 0',
                width: 400,
                /*Validation*/
                allowBlank: false,
                cls: 'required-field-label',
                maxLength: 100,
                enforceMaxLength: true,
                /*Validation*/
                bind: {
                    fieldLabel: 'Name np'
                }
            }, {
                xtype: 'textfield',
                name: 'name_en',
               margin: '5 0 5 0',
                width: 400,
                /*Validation*/
                allowBlank: false,
                cls: 'required-field-label',
                componentCls:'english-email-display',
                maxLength: 100,
                enforceMaxLength: true,
                /*Validation*/
                bind: {
                    fieldLabel: 'Name En'
                }
            }, {
                xtype: 'textarea',
                colspan: 2,
                // minLength: 5,
                name: 'description',
                enableKeyEvents: true,
                inputmethod: 'nepali',
                width: 400,
               margin: '5 0 5 0',
                /*Validation*/
                maxLength: 500,
                enforceMaxLength: true,
                labelStyle: 'padding-top:30px;',
                /*Validation*/
                bind: {
                    fieldLabel: 'description'
                }
            },{
                xtype: 'numberfield',
               margin: '5 0 5 0',
                bind: {
                    fieldLabel: 'display order'
                },
                name: 'display_order',
                itemId: 'display_order',
                minValue:0
            }, {
                xtype: 'checkbox',
                name: 'status',
                checked: true,
               margin: '5 0 5 0',
                bind: {
                    fieldLabel: 'Status'
                }
            }]
        }]
    }],
    dockedItems: [{
        xtype: 'container',
        dock: 'bottom',
        margin: 5,
        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [{
            xtype: 'button',
            itemId: 'save-button',
            cls: 'btn-save',
            iconCls: 'fa fa-floppy-o fa-1x',
            bind: {
                text: 'Save'
            }
        }, {
            xtype: 'button',
            itemId: 'cancel-button',
            cls: 'btn-cancel',
            iconCls: 'fa fa-times-circle fa-1x',
            // margin: '0 0 0 8',
            bind: {
                text: 'Cancel'
            }
        }]
    }]
});