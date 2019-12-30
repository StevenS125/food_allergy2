import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Button, Alert, Modal} from 'react-native';

// components
import Allergy from './Allergy'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date(),
                  modalVisible: false,
                  user: 'null'};

    this.setDate = this.setDate.bind(this);
  }


  async componentDidMount() {
   const newFood = await fetch('https://allergy-api.herokuapp.com/food/')
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       newFood: responseJson
     })

   })
   .catch((error) => {
     console.error(error);
   });
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  logOut = () => {
    this.props.setParentState({isLoggedIn: false})
  }

  render() {
    const user = this.props.user

    return (
      <ScrollView> 
        <Text style={styles.Heading} >Welcome {user} </Text> 

<Allergy userName={user} foods={this.state.newFood} />

<View style={styles.logOutBtn}> 
<Button
style={styles.logOutBtn}
title="Log Out"
onPress={this.logOut}
/>
</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Heading: {
    textAlign: 'center',
    paddingTop: 100,
    color: '#14C619',
    fontSize: 40,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30
  },
  btnType: {
    paddingTop: 100,
    backgroundColor: 'green',
  },
  logOutBtn: {
    position: "absolute",
    right: 30,
    top: 50,
  },

})