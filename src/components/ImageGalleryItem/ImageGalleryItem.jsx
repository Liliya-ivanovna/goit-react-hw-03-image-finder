
export const GalleryItem=({hits})=>{
  return (<li key={hits.id}>
                <img src={hits.webformatURL} alt=""/>
                    </li>)
}