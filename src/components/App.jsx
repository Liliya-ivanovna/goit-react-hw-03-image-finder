import {Component} from  "react";
import {Loader} from "./Loader/Loader";
import {Searchbar} from "./Searchbar/Searchbar";
//import { GalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
//import { Gallery } from "./ImageGallery/ImageGallery";
//import {Modal} from "./Modal/Modal";
import axios from "axios";


import api from "../services/api";

export class App extends Component {

  state={
        isLoading: false,
        isError: false,
        error: null,
        searchQuery: "",
        hits: [],
        page:1,
    }
  
    cancelTokenSource = axios.CancelToken.source();

    async fetchData() {
      this.setState({ isLoading: true });

      try {
          const images = await api.fetchImagesWithQuery(this.state.searchQuery,this.state.page);

          this.setState(({hits})=>({
            hits:[...hits, ...images.hits]
          }));
      } catch (error) {
          this.setState({ isError: true, error });
      } finally {
          this.setState({ isLoading: false });
      }
  }

  componentWillUnmount() {
    this.cancelTokenSource.cancel('Component is being unmounted');
}

debouncedTimeout = null;

async componentDidUpdate(_, prevState) {

  if (this.state.searchQuery !== prevState.searchQuery || this.state.page !== prevState.page) {
      clearTimeout(this.debouncedTimeout);
     this.debouncedTimeout = setTimeout(async () => {
          await this.fetchData();
      }, 500);
  }
//   if (this.state.data.length !== prevState.page) {
//     this.setState({page: this.state.data.length})
// }
}

  handleSetSearchQuery = event => {
    this.setState({ searchQuery: event.target.value });
};

onHandleSubmit= event =>{
  event.preventDefault();
  this.setState({ searchQuery: event.target.value });
  
  
}
  
  render(){
    return (
    <>
    <Searchbar handleSetSearchQuery={this.handleSetSearchQuery}
                    searchQuery={this.searchQuery}
                    onHandleSubmit={this.onHandleSubmit}/>
   
   <Loader/>
 
    </>
  );
}};
