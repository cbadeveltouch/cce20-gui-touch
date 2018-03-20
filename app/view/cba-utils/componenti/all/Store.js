//  -*- coding: utf-8 -*-
// :Progetto:  CBA Generali -- Store customization
// :Creato:    sab 08 set 2012 13:00:20 CEST
// :Autore:    Lele Gaifax <lele@metapensiero.it>
// :Licenza:   GNU General Public License version 3 or later
//

// Adapted from
// https://bitbucket.org/lele/metapensiero.extjs.desktop/src/a41c9abc5b222ae874840708ef7fead9b884b595/src/metapensiero/extjs/desktop/assets/js/data/Store.js

/*jsl:declare Ext*/
/*jsl:declare _*/

/**
 * Maintain three lists, respectively for added, updated and deleted
 * records, so that the store can give an time ordered list of changes.
 */

Ext.define("CbaUtils.componenti.all.GeneraleStore", {
	extend: "Ext.data.Store",
	alias: 'widget.generaleStore',
	alternateClassName: 'generaleStore',
	/**
	 * @cfg {String} newRecordCls
	 * Class to apply to new record
	 */
	newRecordCls: 'cba-new-record',

	/**
	 * @cfg {String} dirtyRecordCls
	 * Class to apply to dirty (edited) record
	 */
	dirtyRecordCls: 'cba-dirty-record',

	/**
	 * @cfg {String} deletedRecordCls
	 * Class to apply to deleted record
	 */
	deletedRecordCls: 'cba-deleted-record',

	constructor: function(config) {
		var me = this;

		config = Ext.merge({
			listeners: {
				add: function(store, recs /*, index*/) {
					if(!store._add_recs) {
						store._add_recs = [];
					}
					store._add_recs = store._add_recs.concat(recs);
				},

				remove: function(store, recs /*, index*/) {
					if(!store._del_recs) {
						store._del_recs = [];
					}
					Ext.each(recs, function(rec) {
						if(!rec.phantom && store._del_recs.indexOf(rec) == -1)
							store._del_recs.push(rec);

						if(store._add_recs)
							Ext.Array.remove(store._add_recs, rec);

						if(store._upd_recs)
							Ext.Array.remove(store._upd_recs, rec);
					});
				},

				update: function(store, rec, op) {
					if(op === Ext.data.Model.REJECT || op === Ext.data.Model.COMMIT)
						return;

					if(store._add_recs && store._add_recs.indexOf(rec) != -1)
						return;

					if(store._del_recs && store._del_recs.indexOf(rec) != -1)
						return;

					if(!store._upd_recs) {
						store._upd_recs = [];
					}

					if(store._upd_recs.indexOf(rec) == -1) {
						store._upd_recs.push(rec);
					}
				},

				load: function(store /*, recs, options*/) {
					store._add_recs = [];
					store._del_recs = [];
					store._upd_recs = [];
				},

				clear: function(store /*, recs, options*/) {
					store._add_recs = [];
					store._del_recs = [];
					store._upd_recs = [];
				}
			}
		}, config);

		me.callParent([config]);
	},

	/* Reset the internal state before reloading the store from a array of data */
	loadData: function(data, append) {
		if(!append) {
			this._add_recs = [];
			this._del_recs = [];
			this._upd_recs = [];
		}
		this.callParent([data, append]);
	},

	/* Remove the given record from the added, updated or removed lists
	 * of records, if present.
	 */
	removeRecordFromLists: function(record) {
		var me = this;

		// update added/deleted lists
		if(me.isRecordNew(record)) {
			// if the record was just added, simply remove it from the
			// added list
			Ext.Array.remove(me._add_recs, record);
		} else if(me.isRecordDeleted(record)) {
			// if the record was deleted, remove it from the deleted
			// list
			Ext.Array.remove(me._del_recs, record);
		} else if(me.isRecordUpdated(record)) {
			// if the record was changed, remove it from the _upd_recs
			// list
			Ext.Array.remove(me._upd_recs, record);
		}
	},

	afterCommit: function(record) {
		var me = this;

		me.removeRecordFromLists(record);
		me.callParent([record]);
	},

	afterReject: function(record) {
		var me = this, justadded = me.isRecordNew(record);

		me.removeRecordFromLists(record);
		if(!justadded) {
			// Don't call afterReject if the record was added (and thus
			// removed from the store), otherwise the GridView update
			// code goes into an error
			me.callParent([record]);
		} else {
			// Remove the stale (just inserted and not confirmed) record
			me.remove(record);
			if(me._del_recs) {
				Ext.Array.remove(me._del_recs, record);
				me.fireEvent('datachanged', me);
			}
		}
	},

	/**
	 * Inform each changed record that it has been successfully sent to the
	 * server, thus it can consider itself up-to-date.
	 * Finally, wipe the deleted records array.
	 */
	commitChanges: function() {
		var me = this, recs, i;

		// NB: must go backward, because the "commit()" method may alter the
		//     array of records we are looping over

		for (recs=me.getNewRecords(), i=recs.length-1; i>=0; i--) {
			recs[i].commit();
		}
		for (recs=me.getUpdatedRecords(), i=recs.length-1; i>=0; i--) {
			recs[i].commit();
		}
		if(me._del_recs) {
			me._del_recs.length = 0;
		}
	},

	/**
	 * Tell each modified record to reset its changes, remove added records
	 * and restore deleted ones.
	 */
	rejectChanges: function(suppressEvent) {
		this.callParent();

		var a = this._add_recs.slice(0);
		for(var i = 0, len = a.length; i < len; i++) {
			a[i].reject();
		}

		if(this._del_recs && this._del_recs.length) {
			this._del_recs = [];
			if(!suppressEvent) {
				this.fireEvent("datachanged", this);
			}
		}

		if(this._upd_recs && this._upd_recs.length) {
			this._upd_recs = [];
			if(!suppressEvent) {
				this.fireEvent("datachanged", this);
			}
		}

		if(!suppressEvent) {
			this.fireEvent("reject", this);
		}
	},

	getRejectRecords: function() {
		var recs = [], push=Ext.Array.push;

		if(this._add_recs && this._add_recs.length) {
			push(recs, this._add_recs);
		}
		if(this._upd_recs && this._upd_recs.length) {
			push(recs, this._upd_recs);
		}
		if(this._del_recs && this._del_recs.length) {
			push(recs, this._del_recs);
		}
		return recs;
	},

	getNewRecords: function() {
		return this._add_recs || [];
	},

	getUpdatedRecords: function() {
		return this._upd_recs || [];
	},

	getDeletedRecords: function() {
		return this._del_recs || [];
	},

	isModified: function() {
		var modified = false;
		if(this.data.length>0) {
			modified = ((this._upd_recs && this._upd_recs.length>0) ||
						  (this._add_recs && this._add_recs.length>0) ||
						  (this._del_recs && this._del_recs.length>0)) ? true : false;
		}
		return modified;
	},

	/**
	 * Determine the CSS class to apply to the given record, accordingly to its current state
	 * within this store. To use this on a grid, add something like the following code to its
	 * viewConfig setting:
	 *
	 *  viewConfig: {
	 *      getRowClass: function(rec, rowIndex, rowParams, store) {
	 *          return store.classifyRecord(rec);
	 *      }
	 *  }
	 */
	classifyRecord: function(rec) {
		if(this.isRecordDeleted(rec)) {
			return this.deletedRecordCls;
		} else if (this.isRecordNew(rec)) {
			return this.newRecordCls;
		} else if (this.isRecordUpdated(rec)) {
			return this.dirtyRecordCls;
		}
		return '';
	},

	isRecordDeleted: function(rec) {
		return (this._del_recs && this._del_recs.indexOf(rec) != -1) ? true : false;
	},

	isRecordUpdated: function(rec) {
		return (this._upd_recs && this._upd_recs.indexOf(rec) != -1) ? true : false;
	},

	isRecordNew: function(rec) {
		return (this._add_recs && this._add_recs.indexOf(rec) != -1) ? true : false;
	},

	/**
	 * Delete the given record.
	 */
	deleteRecord: function(rec) {
		if(!this._del_recs) {
			this._del_recs = [];
		}
		if(this._add_recs && this._add_recs.indexOf(rec) != -1) {
			// It's a new record, remove it immediately
			this.remove(rec);
			Ext.Array.remove(this._del_recs, rec);
			this.fireEvent("datachanged", this);
		} else if(this._del_recs.indexOf(rec) == -1) {
			this._del_recs.push(rec);
			if (this._upd_recs) {
				Ext.Array.remove(this._upd_recs, rec);
			}
			this.fireEvent("update", this, rec, Ext.data.Record.EDIT, []);
			this.fireEvent("datachanged", this);
		}
	},

	createNewRecord: function(initialdata) {
		var me = this;

		if(me.model) {
			var data = {};
			var fnames = me.model.prototype.fields.keys;

			if(initialdata) {
				Ext.apply(data, initialdata);
			}

			// Set missing fields to null
			for(var fi=0,fl=fnames.length; fi<fl; fi++) {
				var name = fnames[fi];
				if(typeof data[name] == 'undefined') {
					data[name] = null;
				}
			}

			var record = new me.model(data);

			// Do consider initial data as changes
			if(initialdata) {
				var modified = record.modified;

				for(var fname in initialdata) {
					modified[fname] = undefined;
				}
			}

			return record;
		} else {
			return false;
		}
	},

	/**
	 * Gets the total number of records in the dataset as returned
	 * by the server, plus eventual additions.
	 */
	getTotalCount : function() {
		return (this.totalCount || 0) + (this._add_recs ? this._add_recs.length : 0);
	},

	/**
	 * Compute the set of changes applied to the records in the store,
	 * including added, updated and deleted records.
	 */
	getChanges: function() {
		var me = this;

		if(!me.isModified())
			return null;

		var	urecs = me.getUpdatedRecords(),
			nrecs = me.getNewRecords(),
			drecs = me.getDeletedRecords(),
			changes = [],
			i, l, rec, data;

		// Deleted records, just push the record ID with a flag
		for(i=0, l=drecs.length; i<l; i++) {
			rec = drecs[i];
			if (rec) {
				data = {eliminare: 'T'};
				data[rec.idProperty] = rec.get(rec.idProperty);
				changes.push(data);
			}
		}

		for(i=0, l=nrecs.length; i<l; i++) {
			rec = nrecs[i];
			data = Ext.apply({eliminare: 'F'}, rec.getData());
			changes.push(data);
		}

		for(i=0, l=urecs.length; i<l; i++) {
			rec = urecs[i];
			data = Ext.apply({eliminare: 'F'}, rec.getData());
			changes.push(data);
		}

		return changes;
	}
});
