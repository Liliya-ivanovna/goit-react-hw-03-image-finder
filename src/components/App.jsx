import {Component} from  "react";
import {Loader} from "./Loader/Loader";
import {Searchbar} from "./Searchbar/Searchbar";
import { GalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery/ImageGallery";
//import {Modal} from "./Modal/Modal";
import axios from "axios";


import fetchImagesWithQuery from "../services/api";

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
          const images = await fetchImagesWithQuery(this.state.searchQuery,this.state.page);

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
}

onHandleSubmit= event =>{
  event.preventDefault();
  const { queryInput } = event.target.elements;

    const searchQuery = queryInput.value;
    queryInput.value = '';
    const page = 1;
  if (searchQuery === ''){
    alert ("There are no images for your search query, please, try again.")
  }
    this.setState({ searchQuery, page, hits: [] });
  }
  
  render(){
    return (
    <>
    <Searchbar onHandleSubmit={this.onHandleSubmit}/>
   <Gallery  hits={this.hits}/>
   <GalleryItem hits={this.hits}/>
   <Loader/>
 
    </>
  );
}};
