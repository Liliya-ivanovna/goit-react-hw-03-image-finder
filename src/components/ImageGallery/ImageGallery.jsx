import { Component } from "react";

export class Gallery extends Component {
    render() {
        const {hits} = this.props;
return (<ul>
            {hits.length === 0 ?
                    <h3>No images found!</h3>
                    : hits.map(hit => {
                    
                })
            }
        </ul>)
    }
}

