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

export default class Item extends Component {
  render() {
    return (
        <View style={styles.container} >
        <Text style={styles.Brand} >{this.props.title.brand}</Text>
        <Text >{this.props.title.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderBottomColor: '#000',
    },
    Brand: {
        fontSize: 20,
        fontWeight: 'bold',
    }

  })
