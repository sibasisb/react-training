import axios from 'axios';
import React from 'react'
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { getHeader } from '../helpers/AuthHeader';
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
        this.handleModalStateChange=this.handleModalStateChange.bind(this)
    }

    componentDidMount() {
        const { userId } = this.props.match.params
        const x = JSON.parse(localStorage.getItem("user"))
        if (x.userId !== userId) {
            this.props.history.push('/unauthorized')
            return
        }
        let fetchedTodos=[]
        this.props.dispatch({type:"FETCH_USER_TODOS_SAGA",payload:{userId:userId}})
        this.setState({
            todos:x.todos
        })
    }

    static getDerivedStateFromProps(props){
        return {
            todos:props.todos || []
        }
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
        this.props.dispatch({type:"UPDATE_USER_TODOS_SAGA",payload:{currentUserTodos:updatedTodos}})
        const newTodo=updatedTodos.find(todo=>todo.id===todoDeleted)
        axios.put(`http://localhost:3001/tasks/updateTask/${this.props.match.params.userId}`,newTodo,getHeader())
        .then(res=>{
            if(res.status===200){
                //response arrived
            }
        })  
        .catch(err=>{
            console.log(err)
        })
    }

    handleSearch(e){
        e.preventDefault()
    }

    handleSearchChange(e){
        this.setState({search:e.target.value})
    }

    handleModalStateChange(){
        let fetchedTodos=[]
        const { userId } = this.props.match.params
        this.props.dispatch({type:"FETCH_USER_TODOS_SAGA",payload:{userId:userId}})
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
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
                        <AddTask userId={this.props.match.params.userId} handleModalStateChange={this.handleModalStateChange} />
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

function mapStateToProps(state){
    return {
        todos:state.currentUserTodos
    }
}

export default connect(mapStateToProps)(ToDoListComponent)