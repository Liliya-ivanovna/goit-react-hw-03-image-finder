import {Component} from  "react";
import {Loader} from "./Loader/Loader";
import {Searchbar} from "./Searchbar/Searchbar";
import { Gallery } from "./ImageGallery/ImageGallery";
import { AppStyled } from "./App.styled";
import { Button } from "./Button/Button";

import fetchImagesWithQuery from "../services/api";

export class App extends Component {

  state={
        isLoading: false,
        isError: false,
        searchQuery: "",
        hits: [],
        page:1,
        loadMoreBtn: false,
    }

   fetchData=async()=> {
      const {searchQuery, page} = this.state;
      this.setState({ isLoading: true });
     try {
          const data =await fetchImagesWithQuery(searchQuery,page);
          const totalPages = Math.floor(data.totalHits / 12);
          if(data.hits.length ===0){
            alert("Sorry, there are no images matching your search query. Please try again.")
          return;
          }
           this.setState(({hits})=>({
            hits:[...hits, ...data.hits],
            page,
            totalPages,
          }));

          if(page ===1){
            alert(`We found ${data.totalHits} images!`)
          }else{
            setTimeout(()=> this.scroll(),100);
          }

          if (page >= totalPages){
            alert("End of search results!")
          }
      } catch (error) {
          this.setState({ isError: true, Error });
      } finally {
          this.setState({ isLoading: false });
      }
  }


componentDidUpdate(_, prevState) {
const {searchQuery, page}= this.state;
  if (searchQuery !== prevState.searchQuery ||
     page !== prevState.page) {
      this.fetchData();
  }
};

onHandleSubmit= event =>{
  event.preventDefault();
  const { queryInput } = event.target.elements;
    const searchQuery = queryInput.value;
    queryInput.value = '';
    const page = 1;
  if (searchQuery.trim() === ''){
    alert ("Enter your search query!");
    return;
  }
    this.setState({ searchQuery, page, hits: [] });
  };
  
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  }
  
  render(){
    const {isLoading,hits}= this.state;
    return (
    <>
    <Searchbar onHandleSubmit={this.onHandleSubmit}/>
    <AppStyled>
   {isLoading ? <Loader/> :  <Gallery  hits={hits}/>}
   <Button onLoadMore={this.handleLoadMore}/>
   </AppStyled>
    </>
  );
}};
