/**
 * Allow for language change after language change after language change etc.
 * Go back to original language using initialConfig
 * Localizable grid values through column renderers!
 * When components need tooltips, I usually add them as a tip property to the same component. That tooltip can be translated as well.
 * Prevention against word wraps after translation that I have seen occuring.
 * renamed locale file to js, because IIS for example can't read .json files by default. (just to make it easy to test run this)
 * Most of my comments and changes are described in the commits and code. Code is mostly equal to what ssamayoa has posted.
 * This is work in progress and needs further optimization. Specially in the area of configurability.
 *
 * @author Sergio Samayoa (creator) http://www.sencha.com/forum/showthread.php?182631-Different-languages-Translations&p=797073&viewfull=1#post797073
 * @author Christiaan Westerbeek (contributor)
 * @see	 http://www.sencha.com/forum/showthread.php?182631-Different-languages-Translations&p=797073&viewfull=1#post797073
 */

Ext.define("Ext.ux.Localizer", {
    
    singleton : true,
    baseLocale : "en",
    currLocale : "en",

    /**
     * @private (Object) localizableProps
     * Localizable properties for each xtype.
     */
    localizableProps : {//TODO_PLS controllo componenti
	// Ext.button
    	cbaMultipleChoice : ['html'],
        button : ["text"],
		splitbutton: ["text"],
		menuitem: ["text"],
        // Ext.form.field
        checkboxfield : ["label", "boxLabel"],
        field : ["label","placeholder"],
        filefield : ["label", "buttonText"],
        radiofield : ["label", "boxLabel"],
		selectfield: ["label","placeholder"],
        // Ext.form
        checkboxgroup : ["label"],
        fieldcontainer : ["label"],		
        fieldset : ["title"],
        label : ["html"],
        searchfield : ["label", "placeholder"],
        // Ext.grid
        gridcolumn : ["text"],
        panel : ["title"],
        tooltip: ["html"],
        image: ["src"]
    },
    /**
     * @private (Array) localizableColumns
     * Localizable grid columns through renderers
     */
    localizableColumns: [ //add grid column renderers 
        "status_description", "bounced"
    ],
    /**
     * @private (Array) columnRenderer
     * Reusable column renderer function to be applied to every column listed above on translation
     */
    columnRenderer: function (value, metaData, record, row, col, store, gridView) {
        return Localizer.localeStrings.get(value)||value;
    },

    /**
     * @private (Object) excludeTypes
     * XTypes to be excluded by localize() method.
     * If whole xtype must be exclude, assign a boolean value of "false".
     * If some itemId must be excluded, assign an array of itemId names.
     */
    excludeTypes : {
        pagingtoolbar : {
            itemIds : ["first", "prev", "inputItem", "afterTextItem", "next", "last", "refresh", "displayItem"]
        }
    },

    /**
     * Returns the xtypes if comp as array.
     * @param (AbstractComponent) comp
     * @return (String []) xtypes of the component
     */
    getXTypes : function(comp) {
        if (!comp) {
            return [];
        }
        try {
            return comp.getXTypes().split("/").reverse();
        } catch(e) {
            return [];
        }
    },

    /**
     * @param (String[]) xtypes
     * @return (Boolean) 
     */
    isExcludeByXType: function(xtypes) {
        var me = this, exclude = false;
        Ext.each(xtypes, function(xtype) {
            var e = me.excludeTypes [xtype];
            if (Ext.isBoolean(e) && e === true) {
                exclude = true;
                return false;
            }
        });
        return exclude;
    },

    /**
     * @param (Container) ownertCt
     */
    getItemIdsToExclude: function(ownerCt) {
            if (!ownerCt) {
                return [];
            }
            var me = this, 
                xtypes = me.getXTypes(ownerCt),
                itemIds = [];
            Ext.each(xtypes, function(xtype) {
                var e = me.excludeTypes [xtype];
                if (Ext.isArray(e)) {
                    itemIds = e;
                    return false;
                }
            });
            return itemIds;
    },

    getLocalizableProps : function(xtypes) {
        var me = this,
            localizableProps;
        Ext.each(xtypes, function(xtype) {
            localizableProps = me.localizableProps [xtype];
            if (localizableProps) {
                return false;
            }
        });
        return localizableProps;
    },

    /**
     * @private
     */
    localize2 : function(comp, localizeChildren) {
        var me = this, xtypes = me.getXTypes(comp);
        // Do we have to exclude by xtype?
        if (me.isExcludeByXType(xtypes)) {
            return;
        }
        // If comp has an itemId, do we have to exclude by itemId?
        if (comp.itemId) {
            var itemsToExclude = me.getItemIdsToExclude(comp.ownerCt);
            if (Ext.Array.contains(itemsToExclude, comp.itemId)) {
                return;
            }
        }
        // Do we have to localizeChildren?
        if (localizeChildren) {
            if (comp.items && comp.items.each) { //actioncolumn items is a real array en doesn't have each. For now, I just skip it.
                comp.items.each(function(c) {
                    me.localize2(c, localizeChildren);
                });
            }
            if (comp.dockedItems) {
                Ext.each(comp.dockedItems.items, function(c) {
                    me.localize2(c, localizeChildren);
                });
            }		
            if (comp.tip) {
                //So, this is me. When components have tips, I add them as a tip property to the same component.
                // that tooltip may need translation as well.
                me.localize2(comp.tip, false);
            }		
			//ciclo i menu
			if (comp.menu && comp.menu.items){
				comp.menu.items.each(function(c) {
                    me.localize2(c, false);
                });
			}
        }
        // This component haves localizable propesties?
        var localizableProps = me.getLocalizableProps(xtypes);
        if (!localizableProps) {
            return;
        }
        
        // Lets localize this component
        Ext.each(localizableProps, function(localizableProp) {
            var capitalized = Ext.String.capitalize(localizableProp);
            
            //first, get the original value of the localizable property
            var value = comp.initialConfig [localizableProp]; 
            var replace;
             //if (me.currLocale!=me.baseLocale) {
                if (!value) {
                    value = comp [localizableProp];
                }
                if (!value) {
                    var getFunc = comp ["get" + capitalized];
                    if (getFunc) {
                        value = getFunc.call(comp);
                    }
                }
                if ((!value)||(!isNaN(value))||Ext.isObject(value)) {
                    return;
                }
								
			value= value.toUpperCase(); //rendo case insensitive la chiave	

            replace = me.localeStrings.get(value);
						
            if (!replace) {
                return;
            }
			
			if ((capitalized!='Placeholder')&&(capitalized!='Text')&&(capitalized!='FieldLabel')){ //il campo placeholder vuole lo spazio !!
				replace=replace.replace(/ /g, "&nbsp;"); //This replace prevents against word wraps after translation that I have seen occuring
			}			
			
            if ((capitalized=='BoxLabel')&&(comp.boxLabelEl)){
				comp.boxLabelEl.update(replace);
            }else if (capitalized=='placeholder'){
				comp.Placeholder=replace;
				comp.setPlaceholder();
			}else if(capitalized=='Title'){
				if(comp.xtype=='fieldset'){
					comp.setTitle(replace);
//					var x= comp._title._itemId;
//					Ext.getCmp(x).update(replace);
//				}else if(comp.xtype=='panel' || comp.xtype=='treepanel'){TODO_PLS VERIFICARE CHE NON DIA PROBLEMI
//					comp.title= replace; //pannelli accordion: non uso il setTitle altrimenti sovrascrive i tools					
				}else{
					comp.setTitle(replace);
				}				
			}else{					
                var setFunc = comp ["set" + capitalized];
                if (setFunc) {
                  setFunc.call(comp, replace);
                } else {
                    comp [localizableProp] = replace;
                }
            }			
			
            /*var setFunc = comp ["set" + capitalized];
            replace=replace.replace(/ /g, "&nbsp;"); //This replace prevents against word wraps after translation that I have seen occuring
            if (!setFunc) {
                comp [localizableProp] = replace;
            } else {
                setFunc.call(comp, replace);
            }*/            
        });
        
		/*BAN commentato perch� in Explorer non esiste il metodo indexOf. Questo controllo non � indispensabile.		
		// Lets localize this grids column renderers				
		if (comp instanceof Ext.grid.column.Column && this.localizableColumns && this.localizableColumns.indexOf(comp.dataIndex)>-1) {
            comp.renderer=(me.currLocale!=me.baseLocale?me.columnRenderer:false);
        }*/

    },
    localize : function(comp, locale, localizeChildren) {
		var me = this;
		
		if (!comp) {
            return;
        }		
		
		//prima volta: setto la lingua del server
		if(!me.localeStrings){
			me.loadLocaleStrings();
		}			     
		
        if (!Ext.isDefined(localizeChildren)) {
            localizeChildren = true;
        }

        me.localeStrings = me.getLocaleStrings();
        
        if (!me.localeStrings) {
            return;
        }
        //me.currLocale=locale;
        me.localize2(comp, localizeChildren);
    },

    /**
     * @private
     */
    loadLocaleStrings: function(url) {
        var me = this,
			locale= 'it';
		
		//prima volta: setto la lingua di default del server
		if(!me.localeStrings){
			me.localeStrings = new Ext.util.HashMap();
			
			Ext.Ajax.request({
				url: `${CbaRootServer}`+"/cba/gen/config/language",
				method: "GET",
				async: false,	        			
				success: function (response) {		
					var ris = Ext.decode( response.responseText ).data;
					Ext.apply(CBA.parametriGenerali,{
						lingua: ris
					});
					
					locale= ris;					
				}												
			})	 						
						
			//creao il dizionario standard 
			
			//<debug>
//			if(CBA.parametriGenerali.produzione) { 
//				//</debug>    
//				me.caricaLingua(locale,"app/generali/lingue/generali-" + locale + ".js");				
//				//<debug>        
//			}else{
				me.caricaLingua(locale,"resources/lingue/" + locale + ".js");
//			}    
			//</debug> 			
		}				
		
		//se ho specificato l'url aggiungo al dizionario i nuovi vocaboli 
		if(url){
			me.caricaLingua(CBA.parametriGenerali.lingua,url);
		}											       
				
        return me.localeStrings;
    },	
	caricaLingua: function(locale,url){ 
		var me= this;
		
		Ext.Ajax.request({
            url : url,
			method: "GET",
            async : false,
            success : function(response) {
                var entries = Ext.decode(response.responseText);
                Ext.each(entries, function(entry) {
					if((entry)&&(entry.key)){
						me.localeStrings.add(entry.key, entry.value);
					}	
                });
            },
            failure : function() {
            }
        });		
	},

    /**
     * @private
     */
    getLocaleStrings: function() {
        var me = this, localeStrings;
        /*if (!me.locales) {
            me.locales = new Ext.util.HashMap();
        }
        if (!me.locales.get(locale)) {
            localeStrings = me.loadLocaleStrings(locale);
        } else {
            localeStrings = me.locales.get(locale);
        }*/
		
		localeStrings = me.loadLocaleStrings();
		
        if (Ext.isBoolean(localeStrings) && !localeStrings) {
            // If locale key contains "false" we
            // tried to load the locale file before 
            // but failed.
            return;
        }
        return localeStrings;
    },

    getLocalizedString: function(key, arraySubStrings, locale) {	
        var me = this;
		var keyRitorno= key;

		if(me.localeStrings){
			locale= CBA.parametriGenerali.lingua;
		}	
		
        if (!key || !locale) {
            return keyRitorno;
        }
        
        var localeStrings = me.getLocaleStrings();
        if (!localeStrings) {
            return keyRitorno;
        }
        
        var localized = key ? localeStrings.get(key.toUpperCase()) : '';
        if (!localized) {
            return keyRitorno;
        }
        
        if (Array.isArray(arraySubStrings)){
        	/*sostituisco sutte le parti {0} {1} ecc con il contenuto di arraySubStrings */
        	/*es: KEY = 'PROVA' -> 'Prova {0} di {1}' array=['miao','gatti'] strfinale = 'Prova miao di gatti' */
	    	for (var i=0; i<arraySubStrings.length; i++){    		
	    		localized = localized.replace("{"+ i +"}",arraySubStrings[i]);
	    	}
        }       
        return localized;				      
    }
});

Localizer = Ext.ux.Localizer;
_ = function(key, locale) {
	return Localizer.getLocalizedString(key, null, locale);
};