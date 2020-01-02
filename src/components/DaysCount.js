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
    state = {
        lastReaction: 'You are Reaction Free'
    }

    async componentDidMount() {
        const userName = this.props.userName
        const newFood = await fetch('https://allergy-api.herokuapp.com/reaction-entry/by/Steven' )
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

    return (
        
        <View>
            <Text>Days since Last Reaction {results}</Text>
        </View>

    );
  }
}
