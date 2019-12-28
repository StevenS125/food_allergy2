import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    StyleSheet,
    FlatList,
} from 'react-native';

export default class Item extends Component {
  render() {
    return (
        <View style={styles.container} >
            <TouchableOpacity>
        <Text style={styles.Brand} >{this.props.title.brand}</Text>
        <Text >{this.props.title.name}</Text>
        <Button
        style={styles.btnSelect}
        title="Add Food"
        color='red'
        />
        </TouchableOpacity>
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
