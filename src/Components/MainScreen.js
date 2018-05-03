import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Button,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import FBSDK, {
    LoginManager,
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import {
    TextField
} from 'react-native-material-textfield';
import UUIDGenerator from 'react-native-uuid-generator';
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from 'react-native-fcm';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAF6'
    },
    circle: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0094ff"
    },
    content: {
        flex: 0.8,
        backgroundColor: 'rgba(0,0,0,.05)'
    },
    content2: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    box: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        // marginBottom: 10,
        backgroundColor: 'white',
        shadowOpacity: 0.54,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    boximg: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxtext: {
        flex: 3,
        justifyContent: 'center',
    },
    boxadd: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : 'blue'
    },
    boxdel: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    delIcon : {
        width: 16,
        height: 16,
        marginBottom: 5
    },
    boxcircle: {
        flex: 2.5,
        // justifyContent : 'center',
        alignItems: 'center',
    },
    boxname: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FlatList_container : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'yellow'
    },
    FlatList_style : {
        flex: 1,
        flexDirection: 'column',
    },
    FlatList_Each_Container : {
        flex: 1,
        flexDirection: 'row'
    },
    FlatList_EmptyList : {
        flex: 1,
        flexDirection: 'column',
        // height: 500,
        backgroundColor: '#d1d1d1'
    },
    FlatList_ItemSeparatorComponent : {
        backgroundColor: '#ededed',
        height: 1,
        width: '90%',
        alignSelf: 'center'
    },   
    addMealEach : {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    FlatListStyle : {
        flex: 0.7
    },
    actIndic : {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    ListEmptyViewText1 : {
        flex: 1,
        paddingTop : 20,
        paddingLeft : 20,
        paddingLeft : 20,
        paddingBottom : 10
    },
    ListEmptyViewText2 : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : 10,
        paddingLeft : 20,
        paddingLeft : 20,
        paddingBottom : 20
    }


})


const hour = new Date().getHours().toString()
const date = new Date().getDate().toString();
const tempmonth = new Date().getMonth() + 1;
const month = tempmonth.toString();
const year = new Date().getFullYear().toString();
const day = date + '-' + month + '-' + year



export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: "You don't have photo",
            curcal: 0,
            BMR: 0,
            percentCircle: 0,
            profile: null,
            isFetching: false,
            refreshing: false,
            food: [
                {
                    meal: 'breakfast',
                    namefood: "Add Breakfast",
                    cal: "Recommend Calrories : 388",
                },
                {
                    meal: 'lunch,',
                    namefood: "Add Lunch",
                    cal: "Recommend Calrories : 588"
                },
                {
                    meal: 'dinner,',
                    namefood: "Add Dinner",
                    cal: "Recommend Calrories : 588"
                },
            ],
            dailyMealData : [],
            refreshing : false,
            flatListIsEmpty : true,
        }
    }

    componentWillMount() {
        let self = this
        this.setState({
            foodup: this.props.main.downloadImageURL
        })
        this.props.setGraphData();
        let userId = firebase.auth().currentUser.uid

        if (this.state.percentCircle == 0) {
            let self = this
            let ref = firebase.database().ref('users/' + userId);
            let food = ref.child('food').child(day)
            let pathprofile = ref.child('profile')

            food.on('value', function (data) {
                if (data.val() === null) {
                    console.log('No food photo on this day (', day, ') yet.')
                    self.setState({
                        flatListIsEmpty : true
                    })
                }
                else {
                    if (data.val().sumcal != null) {
                        self.setState({
                            curcal: data.val().sumcal
                        })
                    }
                    self.setState({
                        flatListIsEmpty : false
                    })
                }
            })
            pathprofile.on('value', function (data) {
                if (data.val() === null) {

                }
                else {
                    if (data.val().BMR) {
                        self.setState({
                            BMR: data.val().BMR
                        })
                    }
                }

            })
        }

        setTimeout(function () {

        }, 1500)


    }



    componentDidMount() {

        let self = this
        firebase.database().goOnline();

        let userId = firebase.auth().currentUser.uid
        let ref = firebase.database().ref('users/' + userId);
        let food = ref.child('food').child(day)
        let pathprofile = ref.child('profile')

        firebase.database().ref('users/' + userId).update({
            name: this.props.fb.data_profile.name,
            email: this.props.fb.data_profile.email,
        });
        food.on('value', function (data) {
            if (data.val() != null) {
                self.setState({
                    curcal: data.val().sumcal,
                    flatListIsEmpty : true
                })
            }
        })

        pathprofile.on('value', function (data) {
            if (data.val() === null) {

            }
            else {
                if (data.val().BMR) {
                    self.setState({
                        BMR: data.val().BMR
                    })
                }
            }

        })









        setTimeout(function () {

            let p = (self.state.curcal / self.state.BMR) * 100
            if (p >= 100) {
                p = 100
            }
            self.setState({
                percentCircle: p
            })
        }, 3000)
    }

    FlatlistItem = () => {
        return (
            <View style={{ flex: 1, width: "100%", backgroundColor: "#607D8B", }}>
            </View>
        )
    }



    renderItemFlatlist = (item, index) => {
        console.log(item)
        let breakfastPhoto = item.meal == 'breakfast' ? require('../../img/breakfast.png') :
            item.meal == 'lunch' ? require('../../img/rice.png') : require('../../img/fish.png')

        let mealselect = item.meal == 'breakfast' ? 'Breakfast' :
            item.meal == 'lunch' ? 'Lunch' : 'Dinner'


        return (
            <View style={styles.box}>
                {/* <View style={{ flex: 0.5, paddingLeft: 10, paddingTop: 5, }}>
                    <Text style={{ color: 'black', fontSize: 18 }}>{mealselect}</Text>
                </View> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.boximg}>
                        <Image source={{ uri: item.path }} style={{ width: 64, height: 64, borderRadius: 30}} resize />
                    </View>
                    <View style={styles.boxtext}>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <Text style={{ color: 'black', fontSize: 18 }}>{mealselect}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <Text style={{ color: '#858787', fontSize: 18 }}>{item.namefood}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <Text style={{ color: '#858787', fontSize: 12 }}>{item.cal} KCal</Text>
                        </View>
                    </View>
                    <View style={styles.boxdel}>
                        <TouchableOpacity onPress={() => {
                            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXx ', index)
                            this.props.delMealItem(index, item)
                            this.onRefresh()
                        }}>
                            <Image source={require('../../img/icon-delete.png')} style={styles.delIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


    ListEmptyView = () => {

        let ListEmptyView = (
            <View>
                <Text>

                </Text>
            </View>
        )

        if (this.state.flatListIsEmpty) {
            ListEmptyView = (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.ListEmptyViewText1}>No photo for today yet.</Text>
                    <Text style={styles.ListEmptyViewText2}>Press one of three icons above to add some food photo.</Text>
                </View>
            )
        } else {
            ListEmptyView = (
                <ActivityIndicator animating hidesWhenStopped size='large' color='#1c73ff' style={styles.actIndic}/>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.content2}>
                    {ListEmptyView}

                    {/* <View style={styles.box}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.boximg}>
                                <Image source={require('../../img/breakfast.png')} style={{ width: 64, height: 64 }} />
                            </View>
                            <View style={styles.boxtext}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={{ color: '#858787', fontSize: 18 }}>{this.state.food[0].namefood}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ color: '#858787', fontSize: 12 }}>{this.state.food[1].cal} KCal</Text>
                                </View>

                            </View>

                            <View style={styles.boxadd}>
                                <TouchableOpacity onPress={() => {
                                    this.props.setMealTimeToAdd('breakfast')
                                    this.props.navigation.navigate('Photo')
                                }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                        <Image source={require('../../img/add.png')} style={{ width: 16, height: 16 }} />
                                    </View>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                    <View style={styles.box}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.boximg}>
                                <Image source={require('../../img/rice.png')} style={{ width: 64, height: 64 }} />
                            </View>
                            <View style={styles.boxtext}>
                                <Text style={{ color: '#858787', fontSize: 18 }}>{this.state.food[1].namefood}</Text>
                                <Text style={{ color: '#858787', fontSize: 12 }}>{this.state.food[1].cal} KCal</Text>
                            </View>
                            <View style={styles.boxadd}>
                                <TouchableOpacity onPress={() => {
                                    this.props.setMealTimeToAdd('lunch')
                                    this.props.navigation.navigate('Photo')
                                }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                        <Image source={require('../../img/add.png')} style={{ width: 16, height: 16 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={styles.box}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.boximg}>
                                <Image source={require('../../img/fish.png')} style={{ width: 64, height: 64 }} />
                            </View>
                            <View style={styles.boxtext}>
                                <Text style={{ color: '#858787', fontSize: 18 }}>{this.state.food[2].namefood}</Text>
                                <Text style={{ color: '#858787', fontSize: 12 }}>{this.state.food[2].cal} KCal</Text>
                            </View>
                            <View style={styles.boxadd}>
                                <TouchableOpacity onPress={() => {
                                    this.props.setMealTimeToAdd('dinner')
                                    this.props.navigation.navigate('Photo')
                                }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                        <Image source={require('../../img/add.png')} style={{ width: 16, height: 16 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}
                </View>
            </View>

        );
    }


    onRefresh = () => {
        this.setState({
            refreshing: true
        }, function () {
            if (this.props.main.downloadImageURL) {
                this.setState({
                    refreshing: false
                })
            }
        })
    }



    render() {

        renderSeparator = () => {
            return (
                <View style={styles.FlatList_ItemSeparatorComponent}/>
            )
        }

        renderEmptyList = () => {
            return (
                <View style={styles.FlatList_EmptyList}>
                    <ActivityIndicator style={{flex:1}} size='large' color='#198ce5'/>
                </View>
            )
        }

        let circleColor = this.state.curcal >= this.state.BMR ? '#f44141' : '#80f442'

        return (

            <View style={styles.container}>

                <StatusBar backgroundColor="#0094ff" barstyle="light-content" />



                <View style={styles.circle}>
                    <View style={styles.boxname}>
                        <Image source={require('../../img/Name.png')} />
                    </View>
                    <View style={styles.boxcircle}>
                        <PercentageCircle
                            radius={65}
                            percent={this.state.percentCircle}
                            color={circleColor}
                            borderWidth={4}
                            bgcolor={"#0094ff"}
                            innerColor={'#23a0ff'}
                            duration={500}
                        >

                            <Text style={{ color: 'white' }}>
                                <Text style={{ fontSize: 24 }}>{this.state.curcal} / </Text><Text style={{ fontSize: 14 }}>{this.state.BMR}</Text>
                            </Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>KCal</Text>

                        </PercentageCircle>
                    </View>

                </View>
                <View style={styles.content}>
                    <View style={{flex: 0.20}}>
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffffff'}}>
                            <TouchableOpacity style={styles.addMealEach} onPress={() => {
                                this.props.setMealTimeToAdd('breakfast')
                                this.props.navigation.navigate('Photo')
                            }}>
                                <View style={{padding: 5}}>
                                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={require('../../img/breakfast.png')} style={{ width: 48, height: 48 }} />
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={require('../../img/add.png')} style={{ width: 16, height: 16, marginLeft: 5, marginRight: 5 }} />
                                        <Text>Breakfast</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.addMealEach} onPress={() => {
                                this.props.setMealTimeToAdd('lunch')
                                this.props.navigation.navigate('Photo')
                            }}>
                                <View style={{padding: 5}}>
                                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={require('../../img/rice.png')} style={{ width:48, height: 48 }} />
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row',  justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={require('../../img/add.png')} style={{ width: 16, height: 16, marginLeft: 5, marginRight: 5 }} />
                                        <Text>Lunch</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.addMealEach} onPress={() => {
                                this.props.setMealTimeToAdd('dinner')
                                this.props.navigation.navigate('Photo')
                            }}>
                                <View style={{padding: 5}}>
                                     <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={require('../../img/fish.png')} style={{ width: 48, height: 48 }} />
                                    </View>
                                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={require('../../img/add.png')} style={{ width: 16, height: 16, marginLeft: 5, marginRight: 5 }} />
                                        <Text>Dinner</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{flex: 0.80}}>
                        <FlatList
                            data={this.props.main.downloadImageURL}
                            ItemSeparatorComponent={this.FlatlistItem}
                            style={styles.FlatListStyle}
                            renderItem={({ item, index }) =>
                                (this.renderItemFlatlist(item, index))
                            }
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={this.ListEmptyView}
                            extraData={this.props}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.refreshing}
                        />
                    </View>
                </View>

            </View>
        );
    }
}