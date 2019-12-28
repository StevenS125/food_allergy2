import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

export default class Registration extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        isLoggingIn: false,
        message: '',
        key: ''
        }

    _userRegister = () => { 

        this.setState({isLoggingIn: true, message:''});

        var params = {
            username: this.state.username,
            password1: this.state.password,
            password2: this.state.password,
            email: this.state.email
        };

        fetch('https://allergy-api.herokuapp.com/rest-auth/registration/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (Object.keys(responseJson).indexOf('key') < 0) {
                this.setState({isLoggingIn: false, message: responseJson[Object.keys(responseJson)[0]]})
            }
            else {
                this.setState({isLoggingIn: false, key: responseJson['key']}),
                this.props.setParentState({isLoggedIn: true, key: responseJson['key'], username: this.state.username})
                
            }

            
          })
          .catch((error) => {
            console.error(error);
            this.setState({isLoggingIn: false, message: error})
            

          });
    }

    registerTrue = () => {
        this.props.setParentState({isRegistered: true})
    }

    render() {
        return (
            <ScrollView>
                <Text 
                    style={styles.heading}>
                    Register
                </Text>
                <TextInput style={styles.Inputs} placeholder='Username' autoCapitalize = 'none' onChangeText={text => this.setState({username: text})} />
                <TextInput style={styles.Inputs}  placeholder='email' autoCapitalize = 'none' onChangeText={text => this.setState({email: text})}/>
                <TextInput style={styles.Inputs}  secureTextEntry={true} placeholder='Password' autoCapitalize = 'none' onChangeText={text => this.setState({password: text})}/>
                <View style={{margin:7}} />
                {this.state.isLoggingIn && <ActivityIndicator />}
                {!!this.state.message && (
                    <Text
                            style={{fontSize: 14, color: 'red', padding: 5}}>
                            {this.state.message}
                        </Text>
                    )}
                <Button 
                    disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
                    onPress={this._userRegister}
                    title="Submit"
                      />
                <Button 
                          color="#f194ff"
                title="Already Registered?"
                onPress={this.registerTrue}
                />
                  </ScrollView>
            )
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 40,
        marginTop: 100,
        color: '#14C619',
        textAlign: 'center',
    },

    Inputs: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        width: '80%',
        marginLeft: '10%',
        marginTop: 10,
    }
})