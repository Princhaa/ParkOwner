import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, ScrollView, Image } from 'react-native'
import RNGooglePlacePicker from 'react-native-google-place-picker'

import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'
import Switch from '../components/Switch'

import { writeNewLocation } from '../service/firebase/database'

export default class Form extends Component {

  static navigationOptions = {
    title: 'Mendaftarkan Lahan'
  }

  constructor(props) {
    super(props)
    this.state = {
      location: null,
      fence_available: false,
      roof_available: false,
      paving_available: false,
      max_length: 0,
      max_width: 0,
      max_height: 0
    }
  }

  showPlacePicker() {
		RNGooglePlacePicker.show((response) => {
			if (response.didCancel) {
				console.log('Cancelled')
			} else if (response.error) {
				console.log('Error', response.error)
			} else {
        this.setState({ location: response })
				console.log('Location', response)
			}
		})
	}

  switch(type) {
    switch(type) {
      case 'fence' : {
				this.setState({ fence_available: !this.state.fence_available })
				break
			}
			case 'paving' : {
				this.setState({ paving_available: !this.state.paving_available })
				break
			}
			case 'roof' : {
				this.setState({ roof_available: !this.state.roof_available })
				break
			}
    }
  }

  newLocation() {
    const { location, fence_available, roof_available, paving_available, max_height, max_width, max_length } = this.state
    writeNewLocation(location, fence_available, roof_available, paving_available, max_height, max_width, max_length, (newLocationId) => {
      this.props.navigation.navigate('formContinue', {locationId: newLocationId})
    })

  }

  render() {
    return(
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', width: metrics.DEVICE_WIDTH * 0.8, alignItems: 'center', marginBottom: 20 }}>
            <Image source={require('../../assets/icons/map_active.png')} style={{ width: 30, height: 30, flex: 1, resizeMode: 'contain' }}/>
            <View style={{ flex: 5, justifyContent: 'center' }}>
              <Text style={[styles.text, this.state.location && this.state.location !== null && this.state.location !== undefined ? null : { color: 'red' }]} onPress={() => this.showPlacePicker()}>{this.state.location && this.state.location !== null && this.state.location !== undefined ? this.state.location.address : 'Tekan disini untuk pilih lokasi..'}</Text>
            </View>
          </View>
          <Text style={[styles.text, { marginBottom: 5 }]}>Ukuran maksimal kendaraan</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>Panjang (meter)</Text>
              <TextInput
                underlineColorAndroid={'transparent'}
                keyboardType={'numeric'}
                style={styles.numericInput}
                onChangeText={(value) => this.setState({ max_length: value })}
              />
            </View>
            <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>Lebar  (meter)</Text>
              <TextInput
                underlineColorAndroid={'transparent'}
                keyboardType={'numeric'}
                style={styles.numericInput}
                onChangeText={(value) => this.setState({ max_width: value })}
              />
            </View>
            <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>Tinggi (meter)</Text>
              <TextInput
                underlineColorAndroid={'transparent'}
                keyboardType={'numeric'}
                style={styles.numericInput}
                onChangeText={(value) => this.setState({ max_height: value })}
              />
            </View>
          </View>
          <View style={{ width: metrics.DEVICE_WIDTH * 0.9, borderTopWidth: 1, borderColor: 'grey', marginBottom: 20 }}/>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require('../../assets/icons/fence.png')}/>
              <Text style={styles.text}>Pagar</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Switch
                  style={styles.switchButton}
                  active={this.state.fence_available}
                  text={'Ada'}
                  onPress={() => this.switch('fence')}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Switch
                style={styles.switchButton}
                active={!this.state.fence_available}
                text={'Tidak Ada'}
                onPress={() => this.switch('fence')}
              />
              </View>
            </View>
          </View>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../assets/icons/atap.png')}/>
                <Text style={styles.text}>Atap</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Switch
                    style={styles.switchButton}
                    active={this.state.roof_available}
                    text={'Ada'}
                    onPress={() => this.switch('roof')}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Switch
                    style={styles.switchButton}
                    active={!this.state.roof_available}
                    text={'Tidak Ada'}
                    onPress={() => this.switch('roof')}
                  />
                </View>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../assets/icons/paving.png')}/>
                <Text style={styles.text}>Paving</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Switch
                    style={styles.switchButton}
                    active={this.state.paving_available}
                    text={'Ada'}
                    onPress={() => this.switch('paving')}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Switch
                    style={styles.switchButton}
                    active={!this.state.paving_available}
                    text={'Tidak Ada'}
                    onPress={() => this.switch('paving')}
                  />
                </View>
              </View>
            </View>
        </View>
        <CustomButton
          text={'Selanjutnya'}
          style={{ width: metrics.DEVICE_WIDTH * 0.8, height: 50 }}
          onPress={() => this.newLocation()}
        />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10
  },

  text: {
    fontFamily: 'AvenirLTStd-Roman'
  },

  numericInput: {
    borderWidth: 1,
    borderColor: 'grey',
    width: metrics.DEVICE_WIDTH * 0.25,
    height: 40,
    marginTop: 5
  },

  itemContainer: {
    flexDirection: 'row',
    width: metrics.DEVICE_WIDTH * 0.75,
    marginBottom: 10
  },

  iconContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },

  buttonsContainer: {
		flex: 5,
		padding: 10,
		justifyContent: 'center',
		flexDirection: 'row'
	},

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },

  switchButton: {
		height: 30,
		width: 100
	},
})
