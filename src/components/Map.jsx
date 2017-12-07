import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends React.Component {
    render() {
        return (
            <GoogleMap 
                defaultZoom={ 12 }
                defaultCenter={{
                    lat: this.props.lat,
                    lng: this.props.lon
                }}
            />
        );
    }
}

export default withScriptjs(withGoogleMap(Map));
