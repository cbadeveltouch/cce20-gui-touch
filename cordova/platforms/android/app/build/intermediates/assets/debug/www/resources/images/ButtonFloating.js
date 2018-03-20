Ext.define('CssTouch.generali.standard.ButtonFloating', {
	mixins: ['Ext.mixin.Observable'],

	xtype: 'pathmenu',

	requires: [
		'Ext.Button',
		'Ext.util.DelayedTask'
	],

	config: {
		cls: 'x-ux-pathmenu',
		top: null,
		bottom: null,
		right: null,
		left: null,
		height: 40,
		width: 40,
		itemId: null,
		reference: null,
		items: [],
		hidden: false,

		menuItemGap:50,


		/**
		 * config for the menu button
		 *
		 * @type object
		 */
		menuButtonDefault: {
			//iconCls: 'add',
			ui : 'pathmenu',
			iconMask: true,
			isOpen: false,
			pathButtonType: 'menu',
			cls: 'menubutton'
		},

		/**
		 * config for menu item button
		 * @type
		 */
		menuItemDefault: {
			iconMask: true,
			ui : 'pathmenu',
			isActive: false,
			pathButtonType: 'menuitem'
		},

		menuItems: null,
		menuTrigger: null
	},

	/**
	 */
	constructor: function (config) {
		this.initConfig(config);
		var me = this,
			addItems = [],
			defaultButton = {
				xtype: 'button',
				top: this.getTop(),
				bottom: this.getBottom(),
				right: this.getRight(),
				left: this.getLeft(),
				height: this.getHeight(),
				width: this.getWidth(),
				itemId: this.getItemId(),
				reference: this.getReference(),
				hidden: this.getHidden()
			},
			menuButtonDefault = this.getMenuButtonDefault(),
			menuItemDefault = this.getMenuItemDefault();
		
		if(!Ext.isEmpty(config.items)){
			Ext.each(
					config.items,
					function(item, index){
						var itemId = item.itemId;
						var newButtonConf = Ext.apply(item, menuItemDefault, defaultButton);
						newButtonConf.itemId = itemId;
						newButtonConf.reference = itemId;
						Ext.apply(newButtonConf, {
							handler: me.onMenuItemButtonTap,
							scope: me
						});

						addItems.push(item);
						delete(item);
					},
					this
				);
			addItems.push(
					Ext.apply(
						{
							handler: me.onMenuButtonTap,
							scope: me
						},
						menuButtonDefault,
						defaultButton
					)
			);
		}else{
			addItems.push(
					Ext.apply(
						menuButtonDefault,
						defaultButton
					)
			);
		}
		
		Ext.Viewport.add(addItems);
	},

	/**
	 * [onMenuItemButtonTap description]
	 * @param  {[type]} button [description]
	 * @return {[type]}        [description]
	 */
	onMenuItemButtonTap: function(menuitem) {
		var	menu = this,
			menuButton = Ext.ComponentQuery.query('button[pathButtonType=menu]')[0];
		menu.close(menuButton);

		menuitem.fireEvent('itemtap', menu, menuitem);
	},
	
	isClosed: function(){
		var menuButton = Ext.ComponentQuery.query('button[pathButtonType=menu]')[0];
		return (!menuButton.isOpen);
	},
	
//	onButtonTap: function(){
//		let controllerButton = this.controller;
//		
//		controllerButton.fireEvent('tapBtnNuovo');
//	},
	
	/**
	 * [onMenuButtonTap description]
	 *
	 * @param  {[type]} menuButton [description]
	 * @return {[type]}            [description]
	 */
	onMenuButtonTap: function(menuButton) {
		if (!menuButton.isOpen) {
			// open menu
			this.open(menuButton);
		} else {
			// close Menu
			this.close(menuButton);
		}
	},

	/**
	 * [openMenu description]
	 *
	 * @param  {[type]} menuButton [description]
	 * @return {[type]}            [description]
	 */
	open: function(menuButton) {
		var	items = Ext.ComponentQuery.query('button[pathButtonType=menuitem]');
		var	bottom = menuButton.getBottom();
		var	left = menuButton.getLeft();
		var	itemGap = this.getMenuItemGap()
		menuButton.replaceCls('close', 'open');

		Ext.each(items, function(item, index) {
			item.addCls('menuitembutton');
			item.replaceCls('close', 'open');
			item.setBottom(bottom + index*(this.getHeight()+itemGap));
		});

		menuButton.isOpen = true;
	},

	/**
	 * [closeMenu description]
	 *
	 * @param  {[type]} menuButton [description]
	 * @return {[type]}            [description]
	 */
	close: function(menuButton) {
		var	items = Ext.ComponentQuery.query('button[pathButtonType=menuitem]');

		menuButton.replaceCls('open', 'close');
		Ext.each(items, function(item, index) {
			if (item.getCls().indexOf('tapped') === -1) {
										//console.log(item.config.bottom);
				item.replaceCls('open', 'close');
				item.setBottom(item.config.bottom);
			} else {

				var task = Ext.create(
					'Ext.util.DelayedTask',
					function() {
						item.removeCls('menuitembutton');
						item.setBottom(item.config.bottom);
						item.removeCls('tapped');
					}
				);
				task.delay(900);

			}
		});
		menuButton.isOpen = false;
	}
});