import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    FlatList,
} from 'react-native';

import Item from './Item'


export default class Allergy extends Component {
    state={
        foods: [],
        searchFood: 'cookies',
    }

   doitS = () => {
      const newFood = fetch('https://allergy-api.herokuapp.com/food?search=' + this.state.searchFood   )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(this.props.userName)
        this.setState({
          foods: responseJson.results
        })

   
      })
      .catch((error) => {
        console.error(error);
      });
    }





      

  render() {
      const thefoods = this.state.foods
      const name = this.props.userName

    return (
      <View>
          <Button 
          title="Find Foods"
          color='red'
          onPress={this.doitS}
          
          />
          <TextInput 
          style={styles.Inputs}
          placeholder='Type of Food' autoCapitalize = 'none' onChangeText={text => this.setState({searchFood: text})} 
          /> 
          
        
      <FlatList
        data={thefoods}
        renderItem={({ item }) => <Item userName={name} title={item} />}
        keyExtractor={item => item.id}
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
