import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList, Text, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'

import metrics from '../../config/metrics'
import HistoryList from '../../components/HistoryList'
import { retreiveHistory, retreiveLocationDetails, getClientDetails } from '../../service/firebase/database'
import { getUserId } from '../../service/storage'

export default class History extends Component {

	static navigationOptions = {
		tabBarLabel: 'Riwayat',
		tabBarIcon: ({ focused }) => {
			switch(focused) {
			case true: return (
				<Image
					source={require('../../../assets/icons/history_active.png')} style={styles.icon}/>
			)
			case false: return (
				<Image source={require('../../../assets/icons/history_inactive.png')} style={styles.icon}/>
			)}
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			isModalVisible: false,
			item: {
				client: {
					ava: '',
					fullname: ''
				},
				fare: ''
			},
			items: [],
			isHistoryReady: false,
			isEmpty: true
		}
	}

	componentDidMount() {
		retreiveHistory((items) => {
			let history = []
			for (let key in items) {
				getUserId((uid) => {
					if (items[key].owner == uid) {
						retreiveLocationDetails(items[key]['location'], (location) => {
							items[key].location = location.address
							getClientDetails(items[key].client, (client) => {
									items[key]['client'] = client
									history.push(items[key])
							})
							this.setState({ isEmpty: false })
						})
					}
				})
			}
			this.setState({ items: history, isHistoryReady: true })
		})
	}

	renderHistory() {
		if (this.state.isHistoryReady) {
			if (!this.state.isEmpty) {
				return (
					<FlatList
						data={this.state.items}
						renderItem={({ item }) =>
							<HistoryList
								price={item.fare}
								address={item.location}
								onLongPress={() => this.setState({ isModalVisible: true, item: item })}
								onPressOut={() => this.setState({ isModalVisible: false })}
							/>
						}
						keyExtractor={(item, index) => index}
					/>
				)
			} else {
				return (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={styles.text}>Anda belum pernah melakukan transaksi apapun</Text>
					</View>
				)
			}
		} else {
			return (
				<ActivityIndicator color={metrics.SECONDARY_COLOR}/>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderHistory()}
				<Modal isVisible={this.state.isModalVisible} animationIn={'fadeIn'} animationOut={'fadeOut'}>
					<View style={styles.modal}>
						<Text style={[styles.text, { fontSize: 15, marginBottom: 10 }]}>PARKIR ANDA</Text>
						<Text style={[styles.text, { marginBottom: 10 }]}>Pengguna Lahan Anda</Text>
						<Image source={{ uri: this.state.item.client.ava }} style={{ borderRadius: 100, marginBottom: 10, width: 130, height: 130 }}/>
						<Text style={[styles.text, { fontSize: 20, color: metrics.SECONDARY_COLOR, marginBottom: 10 }]}>{this.state.item.client.fullname}</Text>
						<View style={{ backgroundColor: metrics.GREY_WHITE, height: 3, width: metrics.DEVICE_WIDTH*0.7, marginBottom: 10 }}/>
						<View style={{ flexDirection: 'row', padding: 10 }}>
							<View style={{ flex: 1, alignItems: 'flex-start' }}>
								<Text style={[styles.text, {marginBottom: 5}]}>HARGA</Text>
								<Text style={[styles.text, {marginBottom: 5}]}>TANGGAL</Text>
							</View>
							<View style={{ flex: 2, alignItems: 'flex-end' }}>
								<Text style={[styles.text, {marginBottom: 5}]}>Rp. {this.state.item.fare}</Text>
								<Text style={[styles.text, {marginBottom: 5}]}>{this.state.item.date}</Text>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	},

	icon: {
		width: 25,
		height: 25
	},

	modal: {
		alignSelf: 'center',
		width: metrics.DEVICE_WIDTH*0.8,
		backgroundColor: 'white',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	}
})
