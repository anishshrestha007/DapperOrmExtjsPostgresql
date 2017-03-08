Ext.define('app.master.home.HomeListPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.homeListPanel',
	xtype: 'homeListPanel',
	itemId: 'homeListPanel',
	requires: [
		'app.master.home.HomeController',
		'app.master.home.HomeFormWindow',
		'app.master.home.HomeStore',
		'app.viewmodel.MainViewModel'
	],
	controller: 'HomeController',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	viewModel: 'mainviewmodel',
	items: [{
		xtype: 'form',
		itemId: 'search-form',
		submitEmptyText: false,
		frame: true,
		collapsible: true,
		titleCollapse: true,
		title: 'Home',
		items: [{
			xtype: 'fieldset',
			bodyPadding: 10,
			border: false,
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'textfield',
				bind: {
					fieldLabel: '{lang.master.code}'
				},
				margin: '0 20 0 0',
				name: 'code',
				cls: 'erp-label-color',
				labelWidth: 40,
				labelStyle: 'padding-top:5px;',
				maxLength: 10,
				enforceMaxLength: true,
				itemId: 'org_staff_code',
				flex: 2
			}, {
				xtype: 'combo',
				bind: {
					fieldLabel: '{lang.global.nameen}'
				},
				cls: 'erp-label-color',
				margin: '0 20 0 0',
				name: 'user_id',
				displayField: 'text',
				valueField: 'id',
				editable: true,
				itemId: 'user_id',
				//labelWidth: 50,
				labelStyle: 'padding-top:5px;'
			}, {
				xtype: 'textfield',
				bind: {
					fieldLabel: '{lang.global.namenp}'
				},
				cls: 'erp-label-color',
				labelStyle: 'padding-top:5px;',
				margin: '0 20 0 0',
				name: 'name___multi',
				itemId: 'org_staff_name',
				matchFieldWidth: false
			}, {
				xtype: 'combo',
				padding: '0 20 2 0',
				labelWidth: 40,
				cls: 'erp-label-color',
				labelStyle: 'padding-top:5px;',
				//width: 225,
				name: 'status',
				labelAlign: 'left',
				itemId: 'status',
				// emptyText: 'Select Status',
				displayField: 'name',
				valueField: 'value',
				queryMode: 'local',
				bind: {
					fieldLabel: '{lang.global.status}'
				}
			}, {
				xtype: 'button',
				bind: {
					text: 'search'
				},
				itemId: 'search-button',
				iconCls: 'fa fa-search fa-1x',
				margin: '0px 0px 0px 10px',
				cls: 'btn-search',
				width: 95
			}, {
				xtype: 'button',
				width: 95,
				bind: {
					text: 'reset'
				},
				itemId: 'reset_button',
				iconCls: 'fa fa-ban fa-1x',
				margin: '0px 0px 0px 10px',
				cls: 'btn-reset'
			}, {
				xtype: 'hiddenfield',
				name: 'reportTitle',
				value: 'TIA Staff List'
			}]
		}]
	}, {
		xtype: 'grid',
		layout: 'fit',
		itemId: 'homeGrid',
		flex: 1,
		frame: true,
		store: {
			type: 'homeStore'
		},
		columns: [{
		    dataIndex: 'CustomerID',
		    flex: 0.5,
			bind: {
				text: 'Customer ID'
			}
		}, {
		    dataIndex: 'CustomerFirstName',
			flex: 1,
			bind: {
				text: 'First Name'
			}
		}, {
		    dataIndex: 'CustomerLastName',
			flex: 1,
			bind: {
			    text: 'Last Name'
			}
		}, {
		    dataIndex: 'IsActive',
			flex: 0.3,
			bind: {
				text: 'Status'
			}
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
				xtype: 'button',
				itemId: 'newbutton',
				cls: 'btn-create',
				margin: '0 2 0 0',
				iconCls: 'fa fa-plus-circle fa-1x',
				right_key_code: 'new',
				bind: {
					text: 'new'
				}
			}, {
				xtype: "button",
				itemId: 'reload-button',
				cls: 'btn-reload',
				margin: '0 2 0 0',
				iconCls: 'fa fa-refresh fa-1x',
				bind: {
					text: 'relaod'
				}
			}]
		}]
	}]
})