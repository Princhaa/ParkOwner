import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'

import metrics from '../../config/metrics'
import Switch from '../../components/Switch'
import { retreiveMarkerData, updateParkCondition } from '../../service/firebase/database'
import { getUserId } from '../../service/storage'

export default class MyPark extends Component {

	static navigationOptions = {
		tabBarLabel: 'Parkirku',
		tabBarIcon: ({ focused }) => {
			switch(focused) {
			case true: return (
				<Image
					source={require('../../../assets/icons/park-icon-active.png')} style={styles.icon}/>
			)
			case false: return (
				<Image source={require('../../../assets/icons/park-icon-inactive.png')} style={styles.icon}/>
			)}
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			bike_available: true,
			car_available: true,
			bus_available: false,
			fence_available: false,
			roof_available: false,
			paving_available: false,
			max_height: 0,
			max_width: 0,
			max_length: 0,
			key: ''
		}
	}

	componentWillMount() {
		getUserId((uid) => {
			let location = {}
			retreiveMarkerData((value) => {
				for(let key in value) {
					if(value[key].owner == uid) {
						location = value[key]
						location['key'] = key
						break
					}
				}
				this.setState({
					bike_available: location.available_bike,
					car_available: location.available_car,
					bus_available: location.available_bus,
					fence_available: location.fence,
					roof_available: location.roof,
					paving_available: location.paving,
					max_height: location.max_height,
					max_length: location.max_length,
					max_width: location.max_width,
					key: location.key
				})
			})
		})
	}

	switch(type) {
		switch(type) {
			case 'bike' : {
				this.setState({ bike_available: !this.state.bike_available })
				break
			}
			case 'car' : {
				this.setState({ car_available: !this.state.car_available })
				break
			}
			case 'bus' : {
				this.setState({ bus_available: !this.state.bus_available })
				break
			}
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

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={styles.container}>
					<View style={styles.card}>
						<Text style={[styles.text, { marginBottom: 10, marginTop: 10 }]}>LAHAN PARKIR ANDA</Text>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Image source={require('../../../assets/icons/bike_orange.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>
								<Text style={styles.text}>Motor</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<Switch
										style={styles.switchButton}
										active={this.state.bike_available}
										text={'Tersedia'}
										onPress={() => updateParkCondition(this.state.key, 'bike', !this.state.bike_available)}
									/>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<Switch
										style={styles.switchButton}
										active={!this.state.bike_available}
										text={'Penuh'}
										onPress={() => updateParkCondition(this.state.key, 'bike', !this.state.bike_available)}
									/>
								</View>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Image source={require('../../../assets/icons/mobilHidup.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>
								<Text style={styles.text}>Mobil</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<Switch
										style={styles.switchButton}
										active={this.state.car_available}
										text={'Tersedia'}
										onPress={() => updateParkCondition(this.state.key, 'car', !this.state.car_available)}
									/>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
								<Switch
									style={styles.switchButton}
									active={!this.state.car_available}
									text={'Penuh'}
									onPress={() => updateParkCondition(this.state.key, 'car', !this.state.car_available)}
								/>
								</View>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Image source={require('../../../assets/icons/bisHidup.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>
								<Text style={styles.text}>Bus</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<Switch
										style={styles.switchButton}
										active={this.state.bus_available}
										text={'Tersedia'}
										onPress={() => updateParkCondition(this.state.key, 'bus', !this.state.bus_available)}
									/>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<Switch
										style={styles.switchButton}
										active={!this.state.bus_available}
										text={'Penuh'}
										onPress={() => updateParkCondition(this.state.key, 'bus', !this.state.bus_available)}
									/>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.card}>
						<Text style={[styles.text, { marginBottom: 10, marginTop: 10 }]}>KONDISI LAHAN</Text>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Text style={styles.text}>Panjang (meter)</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
											updateParkCondition(this.state.key, 'length', --this.state.max_length)
									}}>
										<Image source={require('../../../assets/icons/minus.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}/>
									</TouchableOpacity>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={styles.text}>{this.state.max_length}</Text>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
											updateParkCondition(this.state.key, 'length', ++this.state.max_length)
									}}>
										<Image source={require('../../../assets/icons/plus.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}/>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Text style={styles.text}>Lebar (meter)</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
											updateParkCondition(this.state.key, 'width', --this.state.max_width)
									}}>
										<Image source={require('../../../assets/icons/minus.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}/>
									</TouchableOpacity>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={styles.text}>{this.state.max_width}</Text>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
											updateParkCondition(this.state.key, 'width', ++this.state.max_width)
									}}>
										<Image source={require('../../../assets/icons/plus.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}/>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Text style={styles.text}>Tinggi (meter)</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
											updateParkCondition(this.state.key, 'height', --this.state.max_height)
									}}>
										<Image source={require('../../../assets/icons/minus.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}/>
									</TouchableOpacity>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={styles.text}>{this.state.max_height}</Text>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
											updateParkCondition(this.state.key, 'height', ++this.state.max_height)
									}}>
										<Image source={require('../../../assets/icons/plus.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }}/>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Image source={require('../../../assets/icons/fence.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>
								<Text style={styles.text}>Pagar</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<Switch
										style={styles.switchButton}
										active={this.state.fence_available}
										text={'Ada'}
										onPress={() => updateParkCondition(this.state.key, 'fence', !this.state.fence_available)}
									/>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<Switch
										style={styles.switchButton}
										active={!this.state.fence_available}
										text={'Tidak Ada'}
										onPress={() => updateParkCondition(this.state.key, 'fence', !this.state.fence_available)}
									/>
								</View>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Image source={require('../../../assets/icons/atap.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>
								<Text style={styles.text}>Atap</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<Switch
										style={styles.switchButton}
										active={this.state.roof_available}
										text={'Ada'}
										onPress={() => updateParkCondition(this.state.key, 'roof', !this.state.roof_available)}
									/>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<Switch
										style={styles.switchButton}
										active={!this.state.roof_available}
										text={'Tidak Ada'}
										onPress={() => updateParkCondition(this.state.key, 'roof', !this.state.roof_available)}
									/>
								</View>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.iconContainer}>
								<Image source={require('../../../assets/icons/paving.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }}/>
								<Text style={styles.text}>Paving</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
									<Switch
										style={styles.switchButton}
										active={this.state.paving_available}
										text={'Ada'}
										onPress={() => updateParkCondition(this.state.key, 'paving', !this.state.paving_available)}
									/>
								</View>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
									<Switch
										style={styles.switchButton}
										active={!this.state.paving_available}
										text={'Tidak Ada'}
										onPress={() => updateParkCondition(this.state.key, 'paving', !this.state.paving_available)}
									/>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},

	card: {
		backgroundColor: 'white',
		elevation: 5,
		borderRadius: 5,
		padding: 10,
		width: metrics.DEVICE_WIDTH * 0.95,
		alignItems: 'center',
		marginBottom: 20
	},

	text: {
		fontFamily: 'AvenirLTStd-Roman'
	},

	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10
	},

	iconContainer: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonsContainer: {
		flex: 5,
		padding: 10,
		justifyContent: 'center',
		flexDirection: 'row'
	},

	switchButton: {
		height: 30,
		width: 100
	},

	icon: {
		width: 25,
		height: 25
	}
})
