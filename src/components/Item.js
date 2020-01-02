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

export default class Item extends Component {
  state = {
    name: this.props.userName,
    time: null,
    currentFood: null,
    chosenDate: new Date(),
    selected: false,

  }

  setDate = (newDate) => {
    this.setState({chosenDate: newDate});
    console.log(this.state.name)
  }

  togglePicker = () => {
    console.log(this.state.chosenDate)
    this.state.selected ? 
    
    this.setState({
      selected: false
    })
    :
    this.setState({
      selected: true
    })
  }

  addMeal = () => {
    fetch('https://allergy-api.herokuapp.com/log-entry/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'person': {
      'username': this.state.name
    },
    'category': 'Food',
    'item': {
      'name': this.props.title.name,
      'brand': this.props.title.brand,
      'categories': this.props.title.categories
    },
    'log_date': this.state.chosenDate
  }),
}).then((response) => response.json())
.then((responseJson) => {
  console.log(responseJson);
  this.togglePicker()
  }
)
.catch((error) => {
  console.error(error);
});

}



  render() {
    return (
        <View style={styles.container} >
        <Text style={styles.Brand} >{this.props.title.brand}</Text>
        <Text >{this.props.title.name}</Text>
        {
        this.state.selected ? 
          <View>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />

        <Button 
        onPress={this.addMeal}
        title='Add Meal'
        />
        </View>
    
        : null

  }
        <Button
        style={styles.btnSelect}
        title="Add Food"
        color='red'
        onPress={this.togglePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
        padding: 10,
        textAlign: 'center',
    },
    Brand: {
        fontSize: 20,
        fontWeight: 'bold',
    },

  })
