import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'
import { payment, getClientDetails, getTransacationDetails } from '../service/firebase/database'
import store from '../service/store'
import { setUserData } from '../service/action'

class Transaction extends Component {

	static navigationOptions = {
		title: 'Parkir Anda'
	}

	constructor(props) {
		super(props)
		this.state = {
			vehicleNumber: 1,
			vehicleType: 'bike',
			client: null,
			fare: 1500,
			transaction: null
		}
	}

	componentDidMount() {
		getTransacationDetails(this.props.navigation.state.params.transactionId, (transaction) => {
			this.setState({ transaction: transaction })
			getClientDetails(transaction.client, (client) => {
				this.setState({ client: client })
			})
		})
	}

	getContent() {
		if (this.state.client != null) {
			const { client, transaction } = this.state
			return (
				<View style={styles.container}>
					<View style={styles.contentContainer}>
						<Text style={[styles.text, { marginBottom: 5 }]}>Penjaga Kendaraan</Text>
						<Image source={{ uri: client.ava }} style={{ borderRadius: 100, width: 80, height: 80, marginBottom: 5 }}/>
						<Text style={[styles.text, { color: metrics.SECONDARY_COLOR, fontSize: 15, marginBottom: 15 }]}>{ client.fullname }</Text>
						<View style={styles.detailContainer}>
							<View style={{ flex: 1 }}>
								<Text style={[styles.text, { marginBottom: 15 }]}>Harga</Text>
								<Text style={[styles.text, { marginBottom: 15 }]}>Tanggal</Text>
								<Text style={[styles.text, { marginBottom: 15 }]}>Jam</Text>
							</View>
							<View style={{ flex: 1, alignItems: 'flex-end' }}>
								<Text style={[styles.text, { marginBottom: 15 }]}>Rp. {transaction.fare}</Text>
								<Text style={[styles.text, { marginBottom: 15 }]}>{ transaction.date }</Text>
								<Text style={[styles.text, { marginBottom: 15 }]}>{ transaction.time }</Text>
							</View>
						</View>
					</View>
					<CustomButton
						text={'SELESAI'}
						style={{ height: 50, width: metrics.DEVICE_WIDTH*0.9 }}
						onPress = {() => this.props.navigation.goBack(null)}
					/>
				</View>
			)
		} else {
			return (
				<ActivityIndicator
					color={metrics.SECONDARY_COLOR}
				/>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.getContent()}
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		alignItems: 'center'
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	},

	contentContainer: {
		padding: 20,
		width: metrics.DEVICE_WIDTH * 0.9,
		elevation: 2,
		borderRadius: 5,
		alignItems: 'center',
		marginBottom: 20
	},

	detailContainer: {
		flexDirection: 'row',
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderColor: metrics.GREY_WHITE,
	}
})

const mapStateToProps = (state) => {
	return {
		userData: state.userData
	}
}

export default connect(mapStateToProps)(Transaction)
