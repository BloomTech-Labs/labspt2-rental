import React, { Component } from 'react';


class Tracker extends Component {
    componentDidMount(){
        const { 
            match: { 
                params: { 
                    id 
                }
            }, fetchReservationInfo } = this.props;
        fetchReservationInfo(id)
    }

    render() {
        const { 
            match: { 
                params: { 
                    id 
                }
            }
        } = this.props;
        return <div>ID: {id}</div>
    }
}

export default Tracker;