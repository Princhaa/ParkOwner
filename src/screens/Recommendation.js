import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, TouchableWithoutFeedback, Linking } from 'react-native'
import Modal from 'react-native-modal'

import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'
import { retreiveMarkerData, getOwnerDetails } from '../service/firebase/database'

export default class Recommendation extends Component {

	static navigationOptions = {
		title: 'Rekomendasi Tempat'
	}

	constructor(props) {
		super(props)
		this.state = {
			isDataLoaded: false,
			data: [],
			activeMarker: {
				owner: 'Loading..',
				address: 'Loading..',
				max_width: 'Loading..',
				max_height: 'Loading..',
				max_length: 'Loading..',
				available_bike: false,
				available_car: false,
				available_bus: false,
				fence: false,
				roof: false,
				paving: false
			},
			isModalVisible: false
		}
	}

	componentDidMount() {
		retreiveMarkerData((snapshot) => {
			let markers = []
			for(let key in snapshot) {
				getOwnerDetails(snapshot[key].owner, (value) => {
					snapshot[key].owner = value.nama			
					markers.push(snapshot[key])
				})
			}
			this.setState({ data: markers })
		})
		this.setState({ isDataLoaded: true })
	}

	renderContent() {
		if (this.state.isDataLoaded) {
			return (
				<FlatList 
					data={this.state.data}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.item} onPress={() => {
							this.setState({ activeMarker: item, isModalVisible: true })
						}}>
							<View style={styles.iconContainer}>
								<Image source={require('../../assets/icons/coin.png')} style={{ width: 60, height: 60 }}/>
							</View>
							<View style={styles.detailContainer}>
								<View style={styles.detail}>
									<Text style={styles.text}>Pemilik: {item.owner}</Text>
								</View>
								<View style={styles.detail}>
									<Text style={styles.text}>Alamat: {item.address}</Text>
								</View>
							</View>
						</TouchableOpacity>
					)}
				/>
			)
		} else {
			return (
				<ActivityIndicator color={metrics.SECONDARY_COLOR}/>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderContent()}
				<Modal animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={this.state.isModalVisible}>
					<TouchableWithoutFeedback style={{ padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ isModalVisible: false })}>
						<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 5, paddingBottom: 5 }}>
							<View style={styles.textWithIcon}>
								<View style={styles.iconText}>
									<Image source={require('../../assets/icons/profile_active.png')} style={styles.icon}/>
								</View>
								<View style={styles.textIcon}>
									<Text>{this.state.activeMarker.owner || 'Loading..'}</Text>
								</View>
							</View>
							<View style={styles.textWithIcon}>
								<View style={styles.iconText}>
									<Image source={require('../../assets/icons/profile_active.png')} style={styles.icon}/>
								</View>
								<View style={styles.textIcon}>
									<Text>{this.state.activeMarker.address || 'Loading..'}</Text>
								</View>
							</View>
							<View style={styles.textWithIcon}>
								<View style={{ flex: 1, borderRightWidth: 1, borderColor: metrics.GREY_WHITE }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.max_length} m</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>PANJANG</Text>									
									</View>
								</View>
								<View style={{ flex: 1 }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.max_width} m</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>LEBAR</Text>									
									</View>
								</View>
								<View style={{ flex: 1, borderLeftWidth: 1, borderColor: metrics.GREY_WHITE }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.max_height} m</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>TINGGI</Text>									
									</View>
								</View>
							</View>
							<View style={styles.textWithIcon}>
								<View style={{ flex: 1, borderRightWidth: 1, borderColor: metrics.GREY_WHITE }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.fence ? 'Ada' : 'Tidak Ada'}</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>PAGAR</Text>									
									</View>
								</View>
								<View style={{ flex: 1 }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.paving ? 'Ada' : 'Tidak Ada'}</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>PAVING</Text>									
									</View>
								</View>
								<View style={{ flex: 1, borderLeftWidth: 1, borderColor: metrics.GREY_WHITE }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.roof ? 'Ada' : 'Tidak Ada'}</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>ATAP</Text>									
									</View>
								</View>
							</View>
							<View style={styles.textWithIcon}>
								<View style={{ flex: 1, borderRightWidth: 1, borderColor: metrics.GREY_WHITE }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.available_bike ? 'Ada' : 'Tidak Ada'}</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>MOTOR</Text>									
									</View>
								</View>
								<View style={{ flex: 1 }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.available_car ? 'Ada' : 'Tidak Ada'}</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>MOBIL</Text>									
									</View>
								</View>
								<View style={{ flex: 1, borderLeftWidth: 1, borderColor: metrics.GREY_WHITE }}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={styles.text}>{this.state.activeMarker.available_bus ? 'Ada' : 'Tidak Ada'}</Text>										
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Text style={[styles.text, { color: metrics.SECONDARY_COLOR }]}>BUS</Text>									
									</View>
								</View>
							</View>
							<View style={{ padding: 10, marginBottom: 10 }}>
								<Image source={require('../../assets/lapangan.jpg')} style={{ width: metrics.DEVICE_WIDTH * 0.8, height: 100 }}/>
							</View>
							<CustomButton 
								text={'Menuju Lokasi'}
								style={{ width: metrics.DEVICE_WIDTH*0.8, height: 50, marginBottom: 10 }}
								onPress={() => Linking.openURL(`http://maps.google.com/maps?daddr=${this.state.activeMarker.latitude},${this.state.activeMarker.longitude}`)}
							/>
							<Text style={[styles.text, { marginBottom: 10 }]}>Tutup</Text>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},

	item: {
		padding: 10,
		flexDirection: 'row',
		backgroundColor: 'white',
		elevation: 5,
		width: metrics.DEVICE_WIDTH*0.95,
		marginTop: 5,
		marginBottom: 5
	},

	iconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	detailContainer: {
		flex: 4
	},

	detail: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 20
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	},

	textIcon: {
		flex: 10,
		paddingLeft: 10
	},

	iconText: {
		flex: 1
	},

	textWithIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		borderBottomWidth: 1,
		borderColor: metrics.GREY_WHITE,
		padding: 10
	},

	icon: {
		width: 25,
		height: 25
	},
})