import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    DatePickerIOS, 
    FlatList,
} from 'react-native';

import Item from './Item'


export default class Allergy extends Component {
    state={
        foods: [],
        searchFood: 'cookies',
        name: this.props.userName,
        chosenDate: new Date(),
    }

    addAllergy = () => {
        fetch('https://allergy-api.herokuapp.com/reaction-entry/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'person': {
          'username': this.state.name
        },
        'description': this.state.searchFood,
        'log_date': this.state.chosenDate,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      }
    )
    .catch((error) => {
      console.error(error);
    });
    
    }

    setDate = (newDate) => {
        this.setState({chosenDate: newDate});
        console.log(this.state.name)
      }





      

  render() {
      const thefoods = this.state.foods
      const name = this.props.userName

    return (
      <View>
          <TextInput 
          style={styles.Inputs}
          placeholder='Type of Allergic Reaction' autoCapitalize = 'none' onChangeText={text => this.setState({searchFood: text})} 
          />     
                  <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        /> 
            <Button 
          title="Submit Reaction"
          color='red'
          onPress={this.addAllergy}
          
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  Inputs: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: '80%',
    marginLeft: '10%',
    marginTop: 10,
}
})
