import React, { Component } from 'react';
import { Text, View, TextInput, SafeAreaView, StyleSheet, Button, Alert, DatePickerIOS, Modal, TouchableHighlight} from 'react-native';

import Login from './src/components/Login';
import Registration from './src/components/Registration';
import Home from './src/components/Home';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date(),
                  modalVisible: false,
                  isLoggedIn: false,
                  isRegistered: true,
                };

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

      <View>

        {/* If User is Logged in and registered render Home View */}

{this.state.isRegistered === true && this.state.isLoggedIn ===true ?

<Home setParentState={newState=>this.setState(newState)} user={this.state.username} /> 

// If user Unregistered or Logged in Render Registration or Login View
    :
    <View>

        {this.state.isLoggedIn === false && this.state.isRegistered === true ? (
          <View>
          <Login setParentState={newState=>this.setState(newState)} />
          </View>
          ) : 
          <View>
            <Registration setParentState={newState=>this.setState(newState)} />
          </View>
          
          }
   
    </View>

        }
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
  btnType: {
    paddingTop: 100,
    backgroundColor: 'green',
  }

})