import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    DatePickerIOS, 
    StyleSheet,
    FlatList,
} from 'react-native';

export default class DaysCount extends Component {
    constructor(props) {
        super(props);
    this.state = {
        lastReaction: 'You are Reaction Free',
    }

}


    async reactionTrue() {
        
            const newFood = await fetch('https://allergy-api.herokuapp.com/reaction-entry/by/' + this.props.userName)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
              this.setState({
                lastReaction: responseJson.results[0].days_from_now
              })
         
            })
            .catch((error) => {
              console.error(error);
            });
    } 

  render() {

    const results = this.state.lastReaction
    const myName = this.props.userName

    if (this.props.hadReaction == true) {
        this.reactionTrue()
    }

    return (
        
        <View>
            {
                this.props.hadReaction ?
            <Text>Days since Last Reaction {results}</Text>
            :
            <Text>Congrats {results}</Text>
            }
        </View>

    );
  }
}
