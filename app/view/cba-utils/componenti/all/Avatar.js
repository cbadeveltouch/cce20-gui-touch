Ext.define('CbaUtils.componenti.all.Avatar', {
	extend: 'Ext.Container',
	
	alias: 'widget.avatar',
	alternateClassName: 'avatar',
	
	height: 48,	
	color: '#000000',
	label: 'X',	
	tap: Ext.emptyFn,
	float: '',
	style: '', //style aggiuntivo
	fontPercent: 100,
	fontColor: "#FFF",
	shape: 'circle', //or 'rect'		
		
	initComponent: function(){					
		let me= this,
		canvasAvatarId= 'div-' + me.id;
		me.width= me.height;
		
		if(!Ext.isEmpty(me.float))
			me.style = 'float:' + me.float + '; ' + me.style;
		
		let borderRadius= me.shape == 'circle' ? 50 : 15;		
		me.setHtml(`<div id="${canvasAvatarId}" width="${this.height}" height="${this.height}" style="border-radius: ${borderRadius}%;"></div>`);
		
		me.callParent(arguments);
		
		me.on('painted', (me) => {
			let  av= Ext.get(canvasAvatarId);		
			me.createAvatar(av, me.color, me.label, me.fontPercent, me.fontColor);
			
			if (!Ext.isEmpty(me.extraCls)) {
				me.addCls(me.extraCls);
			}			
			
			me.getEl().on('tap', () => {
        		me.tap();
		    });			
		});
	},
			
	createAvatar: (canvas, color, label, fontPercent, fontColor) => {
		let context = canvas.dom.getContext("2d"),
			canvasWidth = canvas.getWidth(),
		    canvasHeight = canvas.getHeight();
									
		context.fillStyle = color;
		context.fillRect (0, 0, canvasWidth, canvasHeight);
				
		context.font = `${fontPercent}% helvetica`;
		context.textAlign = "center";	
		context.fillStyle = fontColor;
		context.fillText(label, canvasWidth / 2, canvasHeight / 1.5, canvasWidth - 5);
		canvas.label= label;				
	}	
});