import React from 'react'
import ReactModal from 'react-modal';
import AddTask from './AddTask';

//set Modal on root app element
ReactModal.setAppElement('#root')

class ToDoListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos:undefined,
            search:"",
            isModalOpen:false
        }
        this.displayTodos = this.displayTodos.bind(this)
        this.handleStrike=this.handleStrike.bind(this)
        this.handleSearch=this.handleSearch.bind(this)
        this.handleSearchChange=this.handleSearchChange.bind(this)
    }

    componentDidMount() {
        const { userId } = this.props.match.params
        const x = JSON.parse(localStorage.getItem("user"))
        if (x.userId !== userId) {
            this.props.history.push('/unauthorized')
            return
        }
        let fetchedTodos=[
            {
                id: 1,
                title: "Lunch",
                description: "Eat well"
            },
            {
                id: 2,
                title: "Exercise",
                description: "Run for 10 miles"
            },
            {
                id: 3,
                title: "Check blood sugar",
                description: "Gotta check my blood sugar level"
            }
        ]
        this.setState({todos:fetchedTodos})
    }

    displayTodos() {
        if(this.state.todos){
            let todosToShow=this.state.todos.filter(todo=>todo.title.toLowerCase().startsWith(this.state.search.toLowerCase()))
            return todosToShow.map((todo, index) => {
                return (
                    <li key={index}>
                        {
                            todo.unchecked?
                            (<strike className="strike-through">
                                <input type="checkbox" checked={true} disabled/>{todo.title}
                            </strike>):
                            (<><input type="checkbox" value={todo.id} onChange={(e)=>{this.handleStrike(e)}} />{todo.title}</>)                       
                        }
                    </li>
                )
            })
        }
    }

    handleStrike(e){
        const todoDeleted=Number(e.target.value,10)
        const updatedTodos=this.state.todos.map(todo=>{
            return todo.id!==todoDeleted?
            todo:
            {...todo,
            unchecked:true}
        })
        this.setState({
            todos:updatedTodos
        })
    }

    handleSearch(e){
        e.preventDefault()

    }

    handleSearchChange(e){
        this.setState({search:e.target.value})
    }

    render() {
        return (
            <section>
                <form onSubmit={this.handleSearch} className="search-container">
                    <input type="text" value={this.state.search} onChange={this.handleSearchChange} placeholder="Search" className="search-bar" />
                </form>
                <div className="card">
                    <div className="card-header">
                        Your Todo List
                    </div>
                    {
                        this.state.todos?.length===0?
                        (
                            <div className="alert-box">
                                <div className="alert-message">
                                    <span style={{color:"#0e141e"}}><h3>No Task to show</h3></span>
                                </div>
                            </div>
                        ):
                        (
                            <ul>
                                {
                                    this.displayTodos()
                                }
                            </ul>
                        )    
                    }
                    <ReactModal isOpen={this.state.isModalOpen} shouldCloseOnOverlayClick={true} onRequestClose={()=>{
                        this.setState({isModalOpen:false})
                    }} className="user-modal-content" overlayClassName="modal-overlay">
                        <AddTask/>
                    </ReactModal>
                    <div className="card-footer">
                        <button className="task-plus" onClick={()=>{
                            this.setState({isModalOpen:true})
                        }}>
                            <span>+</span>
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}

export default ToDoListComponent