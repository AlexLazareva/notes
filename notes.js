var Note = React.createClass({
	render: function(){
		var style = {backgroundColor: this.props.color};
		return(
			<div className="note" style={style}> {this.props.children} </div>
		);
	}
});

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
				<textarea 
					className="textarea" 
					placeholder="Введите текст..." 
					rows={5} 
					value={this.state.text}
					onChange={this.handleTextChange} 
				/>
				<button className="add-button" onClick={this.handleNoteAdd}>Добавить</button>
			</div>
		);
	}
});

var NotesGrid = React.createClass({
	componentDidMount: function() {
		var grid = this.refs.grid;
		var msnry = new Masonry( grid, {
		  itemSelector: '.note',
		  columnWidth: 200,
		  gutter: 10
		});
	},

	render: function(){
		return(
			<div className="notes-grid" ref="grid">
				{
					this.props.notes.map(function(note){
						return <Note key={note.id} color={note.color}> {note.text} </Note>;
					})
				}
			</div>
		);
	}
});

var NotesApp = React.createClass({
	getInitialState() {
		return{
				notes: [
				{
					id: 0,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia est similique velit provident illo pariatur quia dolores, molestias deleniti aperiam rerum ducimus, odio, dolorem eos. Quo quos id dolores aperiam! Vitae, aliquid sed impedit necessitatibus velit dignissimos quos recusandae, aliquam sit atque qui alias, optio vel nesciunt, quaerat ipsa nihil quis eveniet!",
					color: "#fffa14"
				}, {
					id: 1,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia est similique velit provident illo pariatur quia dolores. Quo quos id dolores aperiam! Vitae, aliquid sed impedit necessitatibus velit dignissimos quos recusandae, aliquam sit atque qui alias, optio vel nesciunte",
					color: "green"
				}, {
					id: 2,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo quos id dolores aperiam! Vitae, aliquid sed impedit necessitatibus velit dignissimos quos recusandae, aliquam sit atque qui alias, optio vel nesciunt, quaerat ipsa nihil quis eveniet! Nisi suscipit, eaque iste possimus molestias modi ex? Vitae quod nobis, quasi cum? ",
					color: "red"
				}, {
					id: 3,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi cupiditate, officiis? Neque voluptatum rerum sapiente odio beatae accusantium harum, adipisci placeat fugit? Sit eveniet enim in ea, voluptates, aspernatur temporibus officia nam optio perferendis molestias.",
					color: " #6ED3FC"
				}, {
					id: 4,
					text: "Ratione, nostrum, aperiam ipsum nobis ea sunt distinctio labore praesentium voluptatem veniam harum itaque, aliquid provident rem expedita molestias quaerat sed ipsam assumenda earum.",
					color: "#FC6ED9"
				}, {
					id: 5,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis saepe sequi aspernatur totam eaque, nobis excepturi eveniet id repellat, quasi culpa in voluptate vel tempora libero itaque. Eius placeat porro rem dolorum fugiat? Accusantium illum, blanditiis!",
					color: "#2AE109"
				}, {
					id: 6,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa provident tempore quam, earum eos quia, fugiat enim natus asperiores magni quod non a. Cupiditate ad odit ipsa quos doloribus in? Eum porro eveniet quam omnis soluta labore, alias non!",
					color: "#FCCC6E"
				}, {
					id: 7,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt corrupti quas quaerat, consectetur placeat ratione sed dolores expedita! At aspernatur debitis eveniet id, quidem itaque obcaecati velit sequi vero maiores!",
					color: "#6E84FC"
				}, {
					id: 8,
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta id officiis aliquam, facere dolorem, fugiat ipsum, iure officia possimus molestiae quas illo impedit, voluptates magnam illum architecto quam odit consequuntur!",
					color: "#A6FC6E"
					}
				]	
			};
	},

	handleNoteAdd: function(newNote) {
		var newNotes = this.state.notes.splice();
		newNotes.unshift(newNote);
		this.setState({ notes: newNotes });
	},		

	render: function(){
		return(
			<div className="notes-app">
				<h2 className="app-header">NotesApp</h2>
				<NotesEditor onNoteAdd={this.handleNoteAdd} />
				<NotesGrid notes={this.state.notes} />
			</div>
		);
	}
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);