import {Component} from  "react";
import {Loader} from "./Loader/Loader";
import {Searchbar} from "./Searchbar/Searchbar";
import {Modal} from "./Modal/Modal"

export class App extends Component {

  state={
    isLoading: false,
    
  }
  
  
  
  
  render(){
    return (
    <>
    <Searchbar/>
   <Loader/>
   <Modal/>
    </>
  );
}};
