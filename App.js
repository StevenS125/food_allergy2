import React, { Component } from 'react';
import { Text, View, TextInput, SafeAreaView, StyleSheet, Button, Alert, DatePickerIOS, Modal, TouchableHighlight} from 'react-native';

import Login from './src/components/Login';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date(),
                  modalVisible: false};

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async fetchInitialDeals() {
    
      fetch('https://allergy-api.herokuapp.com/rest-auth/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'dog',
          email: 'd@d.com',
          password: 'hotdogs123'
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
    }

  render() {
    return (

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text>
            Enter Allergy:
          </Text>
        <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, }}
      placeholder="Enter Your Allergy"
    />
    </View>
    <View>
         <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          style={{width: 300}}
        />
            <Button
          title="Press me"
          onPress={() => this.fetchInitialDeals()}
        />
    </View>
    <View>
    <Text>
            Food Consumed:
          </Text>
        <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, }}
      placeholder="What did you eat?"
    />
        <Text>
            Enter Time/Date:
          </Text>
        <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, }}
      placeholder="Time?"
    />
            <Button
          title="Get Yo Results!"
          onPress={() => {
            this.setModalVisible(true);
          }}
        />
    <Login />
    </View>
    <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 100}}>
            <View>
              <TouchableHighlight>
                              <Button
                              onPress={() => {
                              this.setModalVisible(false);
                            }}title="Close Results!"/>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30
  },
  btnType: {
    paddingTop: 100,
    backgroundColor: 'green',
  }

})