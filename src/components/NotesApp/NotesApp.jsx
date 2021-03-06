var React = require('react');
var NotesEditor = require('../NotesEditor/NotesEditor.jsx');
var NotesGrid = require('../NotesGrid/NotesGrid.jsx');

require('./NotesApp.css');

var NotesApp = React.createClass({
	getInitialState() {
		return{
				notes: []	
			};
	},

	componentDidMount: function() {
		var localNotes = JSON.parse(localStorage.getItem('notes'));
		if (localNotes) {
			this.setState({ notes: localNotes });
		}
	},

	componentDidUpdate: function() {
		this._updateLocalStorage();
	},

	handleNoteDelete: function(note) {
		var noteId = note.id;
		var newNotes = this.state.notes.filter(function(note) {
			return note.id !==noteId;
		});
		this.setState({ notes: newNotes });
	},

	handleNoteAdd: function(newNote) {
		var newNotes = this.state.notes.slice();
		newNotes.unshift(newNote);
		this.setState({ notes: newNotes }, this._updateLocalStorage);
	},		

	render: function(){
		return(
			<div className="notes-app">
				<h2 className="app-header">Заметки</h2>
				<NotesEditor onNoteAdd={this.handleNoteAdd} />
				<NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
			</div>
		);
	},

	_updateLocalStorage: function() {
		var notes = JSON.stringify(this.state.notes);
		localStorage.setItem('notes', notes);
	}
});

module.exports = NotesApp;