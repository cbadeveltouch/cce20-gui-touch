/**
 * Componente che estende un Ext.form.Panel
 * In aggiunta si implementano tutti i comportamenti di dirty non previsti
 * da Sencha Ext Modern toolkit.
 * 
 * FASE DI INSERIMENTO / CARICAMENTO RECORD NELLA FORM STD CBA
 * ------------------------------------------------------------------------
 * - Metodo "setRecord_cba" da usare OBBLIGATORIAMENTE sia in caso di
 * 		"nuovo record" che in caso di "aggiornaStore".
 * 		se c'è il bisogno di settare altri campi dopo il setRecord bisogna
 * 		SOSPENDERE il dirtyChange..seguire esempio sotto:
 * 
		EX DI UTILIZZO suspend dirtyChange..
 		form.dirty_suspendDirtyChange = true
		form.setValues({
			campo: 'valore'							
		});
		form.dirty_suspendDirtyChange = false
		form.dirty_resetOriginal()
 *
 * ------------------------------------------------------------------------
 *
 * 
 * 
 */
Ext.define('CbaUtils.componenti.all.CbaForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.CbaForm',
	alternateClassName: 'CbaForm',
	requires: [
		'app.overrides.Field'
	],
	listeners:{
		initialize: function(){
			this.dirty_oldIsDirty = false
			
			this.dirty_initFields = () => {
				if(this.permesso === 'S'){
					this.query('[dirtyChangeInit=false][isFormField!=false]').forEach( field => {
						field.on('change', (th, newValue, oldValue) => {
							if(this.dirty_suspendDirtyChange)
								return false;
							
							if (this.dirty_original) {
								//si verifica se chiamare dirtyChange della form
								let nowIsDirty = this.dirty_isDirty();
								if (this.dirty_oldIsDirty !== nowIsDirty) {
									this.dirty_oldIsDirty = nowIsDirty;
									this.fireEvent('dirtychange', this, nowIsDirty);
									
								}
							}
						})
					})
				}
			}
			
			this.dirty_initFields()
				
			/**
			 * per riuscire ad intercettare la fine del "setRecord" modern toolkit
			 * ci creiamo un metodo che lo richiama.
			 */
			this.setRecord_cba = (record) => {
				this.setRecord(record);
				this.dirty_resetOriginal();
				this.dirty_initFields();
			}
			
			/**
			 * questo restituisce un boolean che identifica se la form è DIRTY
			 */
			this.dirty_isDirty = () => {
				return StdCba.objNotEquals(this.dirty_original, this.getValues(false, true));
			}
			
			this.dirty_resetOriginal = (record) => { 
				/**
				 * si andrà a settare l'attributo dirty_original
				 * 
				 * this.getValues true è  per avere anche fields che non hanno un name (caso schede modulari)
				 */
				this.dirty_original = this.getValues(false, true);
				this.dirty_initFields();
			}
			
			this.on('destroy', ()=>{
				StdCba.destroyFloatingButton(this);
			});
			
		}
	}
});