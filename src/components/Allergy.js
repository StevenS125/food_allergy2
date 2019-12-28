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
        foods: [{'brand': 'null'}],
    }

    doitS = () => {
        this.setState({
            foods: this.props.foods
        })
        console.log(this.state)
    }






      

  render() {
      const thefoods = this.state.foods.results

    return (
      <View>
          <Button 
          title="Find Foods"
          color='red'
          onPress={this.doitS}
          />
      <FlatList
        data={thefoods}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={item => item.id}
      />

      </View>
    );
  }
}
