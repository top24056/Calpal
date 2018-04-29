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
        flex: 0.6,
        backgroundColor: 'rgba(0,0,0,.05)'
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
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
    },
    FlatList_style : {

    },
    FlatList_EmptyList : {
        flex: 1,
        flexDirection: 'column',
        height: 500,
        backgroundColor: '#d1d1d1'
    },
    FlatList_ItemSeparatorComponent : {
        backgroundColor: '#ededed',
        height: 1,
        width: '90%',
        alignSelf: 'center'
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

            breakfast: {
                namefood: "Add! Breakfast",
                cal: "Recommend Calrories : 388",
            },
            lunch: {
                namefood: "Add! Lunch",
                cal: "Recommend Calrories : 588"
            },
            dinner: {
                namefood: "Add Dinner",
                cal: "Recommend Calrories : 588"
            },
            downloadURL: '',
        }
    }

    componentWillMount() {
        this.props.setGraphData();
        let self = this
        let userId = firebase.auth().currentUser.uid
        let QueryWill = new Promise((resolve, reject) => {
            if (this.state.percentCircle == 0) {
                let self = this
                console.log(this.state.percentCircle)
                let ref = firebase.database().ref('users/' + userId);
                let food = ref.child('food').child(day)
                let pathprofile = ref.child('profile')

                food.on('value', function (data) {
                    if (data.val() === null) {
                        console.log('No food photo on this day (', day, ') yet.')
                    }
                    else {
                        if (data.val().sumcal != null) {
                            self.setState({
                                curcal: data.val().sumcal
                            })
                            console.log(data.val().sumcal)
                        }
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
                resolve()
            }, 3000)
        })
        QueryWill.then(() => {
            let p = (self.state.curcal / self.state.BMR) * 100
            self.setState({
                percentCircle: p
            })
        })

    }



    componentDidMount() {
        
        let self = this

        firebase.database().goOnline();

        let userId = firebase.auth().currentUser.uid
        let ref = firebase.database().ref('users/' + userId);
        firebase.database().ref('users/' + userId).update({
            name: this.props.fb.data_profile.name,
            email: this.props.fb.data_profile.email,
        });
        let tempimage = []

    
        //Dinner new query path gen key from firebase
        let tempdinner = []
        let querydinner = ref.child('food').child(day).child('dinner')
        querydinner.on('value',function (snapshot){
            for ( let i in snapshot._childKeys) {
                let childpath = querydinner.child(snapshot._childKeys[i])
                childpath.on('value', function (childsnapshot) {
                    let temp = {
                        namefood : childsnapshot.val().namefood,
                        cal : childsnapshot.val().cal
                    }
                    let temppathimage = {
                        namefood : childsnapshot.val().namefood,
                        path : childsnapshot.val().pathimage,
                        cal : childsnapshot.val().cal
                    }
                    tempdinner.push(temp)
                    tempimage.push(temppathimage)
                })
            }
        })


        // let food = ref.child('food').child(day)
        // food.on('value', function (data) {
        //     if (data.val() === null) {
        //         console.log('null na ja')
        //     }
        //     else {
        //         if (data.val().breakfast != null) {
        //             let tempcal = data.val().breakfast
        //             // console.log(tempcal)

        //             let temp = {
        //                 namefood: data.val().breakfast.namefood,
        //                 cal: "Calories is : " + tempcal
        //             }
        //             self.setState({
        //                 breakfast: temp
        //             })
        //         }
        //         if (data.val().lunch != null) {
        //             let tempcal = data.val().lunch.cal.toString()
        //             let temp = {
        //                 namefood: data.val().lunch.namefood,
        //                 cal: "Calories is : " + tempcal
        //             }
        //             self.setState({
        //                 lunch: temp
        //             })
        //         }
        //         if (data.val().dinner != null) {
        //             let tempcal = data.val().dinner.cal.toString()
        //             let temp = {
        //                 namefood: data.val().dinner.namefood,
        //                 cal: "Calories is : " + tempcal
        //             }
        //             self.setState({
        //                 dinner: temp
        //             })
        //         }
        //         if (data.val().sumcal != null) {
        //             self.setState({
        //                 curcal: data.val().sumcal
        //             })
        //         }
        //     }

        // })
        // let pathimage = food.child('pathimage')
        // pathimage.on('value',function(snapshot){
        //     console.log(snapshot.val())
        // })



        let pathprofile = ref.child('profile')
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
            self.setState({
                percentCircle: p
            })
            
            self.props.setImageDownloadURLAction(tempimage)
        }, 3000)


    }


    render() {

        let downloadImageURL = (<View></View>)

        if (this.props.main.downloadImageURL != null) {
            downloadImageURL = (
                <View>
                    <Image
                        style={{ width: 100, height: 100 }}
                        // source={{ uri: this.props.main.downloadImageURL }}
                    />
                </View>
            )
        }

        refreshList = () => {
            this.setState({
                page: 1,
                seed: this.state.seed + 1
            }, () => {
                    // this.props.fetchCoinAPI()
                    // setTimeout(() => {
                    // this.props.setInitialFavBool()
                    // }, 1500)
                }
            )
        }

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

        renderListItem = (item) => {
            return (
                <View>
                    
                </View>
            )
        }

        return(
            <View style = {styles.container}>

                <StatusBar backgroundColor="#0094ff" barstyle="light-content" />
                <View style={styles.circle}>
                    <View style={styles.boxname}>
                        <Image source={require('../../img/Name.png')} />
                    </View>
                    <View style={styles.boxcircle}>
                        <PercentageCircle
                            radius={80}
                            percent={this.state.percentCircle}
                            color={"#ffffff"}
                            borderWidth={4}
                            bgcolor={"#0094ff"}
                            // innerColor = {"#0094ff"}
                            // innerColor = {"#35a8ff"}
                            innerColor={'#23a0ff'}
                            duration={500}
                            animationType='Quad.easeInOut'>

                            <Text style={{ color: 'white' }}>
                                <Text style={{ fontSize: 24 }}>{this.state.curcal} / </Text><Text style={{ fontSize: 14 }}>{this.state.BMR}</Text>
                            </Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>KCal</Text>

                        </PercentageCircle>
                    </View>

                </View>


                <View style={styles.content}>

                    <View style={styles.box}>
                        <View style={styles.boximg}>
                            <Image source={require('../../img/breakfast.png')} style={{ width: 64, height: 64 }} />
                        </View>
                        <View style={styles.boxtext}>
                            <Text style={{ color: '#858787', fontSize: 18 }}>{this.state.breakfast.namefood}</Text>
                            <Text style={{ color: '#858787', fontSize: 12 }}>{this.state.breakfast.cal} KCal</Text>
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


                    <View style={styles.box}>
                        <View style={styles.boximg}>
                            <Image source={require('../../img/rice.png')} style={{ width: 64, height: 64 }} />
                        </View>
                        <View style={styles.boxtext}>
                            <Text style={{ color: '#858787', fontSize: 18 }}>{this.state.lunch.namefood}</Text>
                            <Text style={{ color: '#858787', fontSize: 12 }}>{this.state.lunch.cal} KCal</Text>
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


                    <View style={styles.box}>
                        <View style={styles.boximg}>
                            <Image source={require('../../img/fish.png')} style={{ width: 64, height: 64 }} />
                        </View>
                        <View style={styles.boxtext}>
                            <Text style={{ color: '#858787', fontSize: 18 }}>{this.state.dinner.namefood}</Text>
                            <Text style={{ color: '#858787', fontSize: 12 }}>{this.state.dinner.cal} KCal</Text>
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


                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => {
                            console.log('press test')

                        }}>
                        </TouchableOpacity>
                        <View style={styles.FlatList_container}>
                            {/* <FlatList
                                style={styles.FlatList_style}
                                data={}
                                keyExtractor={(item, index) => item.id}
                                renderItem={ ( {item} ) => (renderListItem(item))
                                }
                                ItemSeparatorComponent={renderSeparator}
                                ListEmptyComponent={renderEmptyList}
                            /> */}
                        </View>



                    </View>


                </View>
            </View>
        );
    }
}