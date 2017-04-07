var NotesEditor = React.createClass({
	getInitialState: function() {
		return{
			text: ''
		};
	},

	handleTextChange: function(event) {
		this.setState({ text: event.target.value });
	},

	handleNoteAdd: function() {
		var newNote = {
			text: this.state.text,
			color: 'yellow',
			id: Date.now()
		};
			
		this.props.onNoteAdd(newNote);
		this.setState({ text: '' });
	},

	render: function(){
		return(
			<div className="note-editor">
				<textarea className="textarea" placeholder="Введите текст..." 
					rows={5} 
					value={this.state.text}
					onChange={this.handleTextChange} 
				/>
				<button className="add-button" onClick={this.handleNoteAdd}>Добавить</button>
			</div>
		);
	}
});