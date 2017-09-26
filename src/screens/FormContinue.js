import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'

import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'
import ImagePicker from 'react-native-image-crop-picker'

import { uploadLocationImage } from '../service/firebase/storage'
import { updateParkPicture } from '../service/firebase/database'

const resetAction =
	NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'mainScreen' })
        ]
    })


export default class FormContinue extends Component {

  static navigationOptions = {
    title: 'Foto Lokasi'
  }

  constructor(props) {
    super(props)
    this.state = {
      isPictureTaken: false,
      pictureUri: '',
      isSavingPicture: false
    }
  }

  takePicture() {
    ImagePicker.openCamera({
      width: 400,
      height: 200,
      cropping: true
    }).then(image => {
      this.setState({ isPictureTaken: true, pictureUri: image.path })
    })
  }

  getImage() {
    if(this.state.isPictureTaken) {
      return (
        <Image source={{ uri: this.state.pictureUri }} style={{ width: metrics.DEVICE_WIDTH * 0.6, height: metrics.DEVICE_WIDTH*0.3, resizeMode: 'contain', marginBottom: 10 }}/>
      )
    }
  }

  getButton() {
    if (this.state.isSavingPicture) {
      return (
        <ActivityIndicator color={metrics.SECONDARY_COLOR}/>
      )
    } else {
      return (
        <CustomButton
          text={'Simpan'}
          style={{ width: metrics.DEVICE_WIDTH*0.8, height: 50 }}
          onPress={() => this.savePicture()}
        />
      )
    }
  }

  savePicture() {
    uploadLocationImage(this.state.pictureUri, this.props.navigation.state.params.locationId, () => {
      this.setState({ isSavingPicture: false })
			this.props.navigation.dispatch(resetAction)
    }, () => {
      this.setState({ isSavingPicture: true })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.text, { marginBottom: 10 }]}>Foto Lokasi Lahan</Text>
          {this.getImage()}
          <CustomButton
            text={'Ambil gambar'}
            style={{ width: metrics.DEVICE_WIDTH * 0.7 }}
            onPress={() => this.takePicture()}
          />
        </View>
        {this.getButton()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: metrics.DEVICE_WIDTH * 0.8
  },

  text: {
    fontFamily: 'AvenirLTStd-Roman'
  }
})
