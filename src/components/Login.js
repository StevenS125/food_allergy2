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
                this.setState({isLoggingIn: false, key: responseJson['key']})
                this.props.setParentState({isLoggedIn: true, key: responseJson['key'], username: this.state.username})
                
                
            }

            
          })
          .catch((error) => {
            console.error(error);
            this.setState({isLoggingIn: false, message: error})
            

          });
    }

    openReg = () => {
        this.props.setParentState({isRegistered: false})
    }

    render() {
        return (
            <View>
                <Text 
                    style={styles.heading}>
                    Login
                </Text>
                <TextInput style={styles.Inputs}  placeholder=' Username' autoCapitalize = 'none' onChangeText={text => this.setState({username: text})} />
                <TextInput style={styles.Inputs}  secureTextEntry={true} placeholder=' Password' autoCapitalize = 'none' onChangeText={text => this.setState({password: text})}/>
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
                    
                    <Button 
                    color="#f194ff"
                    onPress={this.openReg}
                    title="Create User"
                      />
                  </View>
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
    },

})