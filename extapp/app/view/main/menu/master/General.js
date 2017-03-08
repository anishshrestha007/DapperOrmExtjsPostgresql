Ext.define('app.view.main.menu.master.General', {
	requires_lazy: [
		'app.master.home.HomeListPanel'
	],
	general: {
		text: 'Home',
		display_text: 'Home',
		leaf: true,
		route: 'home',
		itemId: 'homeListPanel',
		dependent_class: 'app.view.main.menu.master.General'
	}
});