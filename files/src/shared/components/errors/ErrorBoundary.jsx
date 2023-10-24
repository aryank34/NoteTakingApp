import React from 'react';

//for catching errors, always make a class
//as classes have a special method called componentDidCatch()

//ErrorBoundary catches error that are found in jsx file 

export class ErrorBoundary extends React.Component{
    constructor(props){
        super(props); //props initialise
        this.state = {error:null};
    }

    static getDerivedStateFromError(error){
        return {error:error};
    }

    componentDidCatch(error, info){
        this.error = error;
        console.log('Error Comes ',error);
    }

    render(){
        if(this.state.error){
            return (<p>OOPs, Something went Wrong...</p>);
        }
        else{
            return this.props.children;
        }
    }
}