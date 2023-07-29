import { Component } from "react";

export class Gallery extends Component {
    render() {
        const {images} = this.props;
return (<ul>
            {images.length === 0 ?
                    <h3>No images found!</h3>
                    : images.map(image => {
                    
                })
            }
        </ul>)
    }
}

