import {Header,Form,Button, Label, Input} from './Searchbar.styled';
import {Component} from 'react';
import {ImSearch} from 'react-icons/im';
import propTypes from "prop-types";

export class Searchbar extends Component{

render(){
    const {onHandleSubmit}= this.props;
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
      autocomplete="off"
      autoFocus
      placeholder="Search images and photos"
      name='queryInput'
    />
  </Form>
  </Header>
    )
}}

Searchbar.propTypes = {
  onHandleSubmit: propTypes.func.isRequired,
}