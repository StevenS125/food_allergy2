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


<ScrollView >
<View style={styles.container}>
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
 </ScrollView>