import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: '',
        key: ''
        }

    _userLogin = () => { 

        this.setState({isLoggingIn: true, message:''});

        var params = {
            username: this.state.username,
            password: this.state.password,
            email: ''
        };

        fetch('https://allergy-api.herokuapp.com/rest-auth/login/', {
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
                console.log(this.state)
                
            }

            
          })
          .catch((error) => {
            console.error(error);
            this.setState({isLoggingIn: false, message: error})
            

          });
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Username' autoCapitalize = 'none' onChangeText={text => this.setState({username: text})} />
                <TextInput placeholder='Password' autoCapitalize = 'none' onChangeText={text => this.setState({password: text})}/>
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
                    onPress={this._userLogin}
                    title="Submit"
                      />
                  </ScrollView>
            )
    }
}