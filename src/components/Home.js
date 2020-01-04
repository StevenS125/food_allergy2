import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Button, Alert, Modal, TouchableHighlight} from 'react-native';

// components
import Meals from './Meals'
import Allergy from './Allergy'
import DaysCount from './DaysCount';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      modalVisible: false,
      user: 'null',
      showAllergy: false,
      showMeals: false,
      hadReaction: false,
                };

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

   const reactionExists = await fetch('https://allergy-api.herokuapp.com/reaction-entry/')
   .then((response) => response.json())
   .then((responseJson) => {
     for (let index = 0; index < responseJson.results.length; index++) {
       const gotem = responseJson.results[index].person.username;
       console.log(gotem)
       console.log(this.props.user)
     if (gotem == this.props.user) {
       this.setState({
         hadReaction: true
       })
     }
     }
   })
   .catch((error) => {
     console.log(error)
   })
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  logOut = () => {
    this.props.setParentState({isLoggedIn: false})
  }

  changeMeals = () => {
    this.state.showAllergy ? this.setState({showAllergy: false}) : null
    this.state.showMeals ? this.setState({ showMeals: false}) : this.setState({ showMeals: true})
  }

  changeAllergy = () => {
    this.state.showMeals ? this.setState({ showMeals: false}) : null
    this.state.showAllergy ? this.setState({ showAllergy: false}) : this.setState({showAllergy: true})
  }

  render() {
    const user = this.props.user
    const isReactionTrue = this.state.hadReaction

    return (
      <View> 
        <Text style={styles.Heading} >Welcome {user} </Text> 
        <DaysCount hadReaction={isReactionTrue} userName= {user} />

      <View style={styles.actionContainer}>

        <TouchableHighlight style={styles.actionBtnLeft} onPress={this.changeAllergy}>
          <Text style={styles.innerText}>Allergy</Text>
        </TouchableHighlight>   

        <TouchableHighlight style={styles.actionBtnRight} onPress={this.changeMeals}>
            <Text style={styles.innerText}>Meal Log</Text>
        </TouchableHighlight>

      </View>
      <View style={styles.bottomContainer}>
 {
   this.state.showMeals ? <Meals userName={user} foods={this.state.newFood} /> : null
  }
{
  this.state.showAllergy ? <Allergy userName={user} /> : null 
}

    </View>

<View style={styles.logOutBtn}> 
<Button
style={styles.logOutBtn}
title="Log Out"
onPress={this.logOut}
/>
</View>
      </View>
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
  actionContainer: {

    flex: 1,
    flexDirection: 'row',
    margin: 2,
    marginTop: 20,
  },
  actionBtnLeft: {
    backgroundColor: 'red',
    height: 150,
    flex: 2,
    margin: 5,
    justifyContent: 'center',
    borderRadius: 15,
  },
  actionBtnRight: {
    backgroundColor: 'green',
    height: 150,
    flex: 2,
    margin: 5,
    justifyContent: 'center',
    borderRadius: 15,
  },
  innerText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'courier',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 10,
  },



})
