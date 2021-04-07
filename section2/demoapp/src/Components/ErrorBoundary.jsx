import React,{Component} from 'react'

class ErrorBoundary extends Component {

    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }

    static getDerivedStateFromError(error){
        return {
            hasError:true
        }
    }

    render(){
        if(this.state.hasError)
            return (
                <section>
                    <h1>Something has gone wrong</h1>
                </section>
            )
        return this.props.children
    }
}

export default ErrorBoundary