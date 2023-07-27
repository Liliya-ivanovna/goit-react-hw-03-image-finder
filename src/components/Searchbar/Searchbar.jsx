import {Header,Form,Button} from './Searchbar.styled';

export const Searchbar=()=>{
    return(
        <Header>
  <Form>
    <Button type="submit">
      <span class="button-label">Search</span>
    </Button>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </Form>
  </Header>
    )
}