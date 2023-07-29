import {Header,Form,Button, Label, Input} from './Searchbar.styled';
import {Component} from 'react';
import {ImSearch} from 'react-icons/im'


export class Searchbar extends Component{
 

  render(){
    const {onHandleSubmit,handleSetSearchQuery, searchQuery}= this.props;
    return(
        <Header>
  <Form onSubmit={onHandleSubmit}>
    <Button type="submit"><ImSearch style= {{marginRight: 2,
                                              marginTop:4,
                                              width:25,
                                              height:25}}/>
      <Label>Search</Label>
    </Button>

    <Input
      type="text"
      onChange={handleSetSearchQuery}
      autocomplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </Form>
  </Header>
    )
}}
