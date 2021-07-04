import React from 'react'
import Map from './Components/Map'
import { Navigation } from './Components/Navigate';
var x = false
class App extends React.Component {
    
    render(){
        if (x){
            return (

                <Map></Map>
        
            )
        } else {
            return (

                <Navigation></Navigation>

            )
        }
    }

}

export default App;