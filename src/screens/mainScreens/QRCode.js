import React, { Component } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

import { getUserId } from '../../service/storage'
import { retreiveLastTransaction, getUserData } from '../../service/firebase/database'

class QRCode extends Component {

  static navigationOptions = {
		tabBarLabel: 'QR Code',
		tabBarIcon: ({ focused }) => {
			switch(focused) {
			case true: return (
				<Image
					source={require('../../../assets/icons/qrcode-active.png')} style={styles.icon}/>
			)
			case false: return (
				<Image source={require('../../../assets/icons/qrcode-inactive.png')} style={styles.icon}/>
			)}
		}
	}

  constructor(props) {
    super(props)
    this.state = {
      uid: '',
      isReadyToReceiveTransaction: false,
      lastTransaction: ''
    }
  }

  componentDidMount() {
    getUserId((uid) => {
      this.setState({ uid: uid })
      getUserData(uid, (data) => {
        this.setState({ lastTransaction: data.last_transaction })
      })
    })
    retreiveLastTransaction(this.state.uid, this.state.lastTransaction, () => {
      console.log(this.state.lastTransaction, this.state.isReadyToReceiveTransaction)
      if (this.state.isReadyToReceiveTransaction) {
        this.props.rootNav.navigate('transaction', { transactionId: this.state.lastTransaction })
      } else {
        this.setState({ isReadyToReceiveTransaction: true })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + this.state.uid }} style={{ width: 300, height: 300, marginBottom: 10 }}/>
        <Text style={styles.text}>Gunakan QR Code diatas untuk melakukan transaksi</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  icon: {
		width: 25,
		height: 25
	},

  text: {
    fontFamily: 'AvenirLTStd-Roman'
  }
})

const mapStateToProps = (state) => {
  return {
    rootNav: state.rootNavigator
  }
}

export default connect(mapStateToProps)(QRCode)
