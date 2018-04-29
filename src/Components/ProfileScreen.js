import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Picker,
    Button
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RaisedTextButton } from 'react-native-material-buttons';
import FBSDK, {
    LoginManager
} from 'react-native-fbsdk';
import { LineChart, Grid, YAxis, XAxis, Path } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
// import logoutImg from '../../img/logout.png;'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.05)',
    },
    boxprofile: {
        flex: 1,
        backgroundColor: '#0094ff',
        flexDirection: 'row',
        marginBottom: 10,
    },
    boxprofileimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxprofilecontent: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    boxcontent: {
        flex: 1,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        shadowOpacity: 0.54,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,

    },
    boxlogout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    boxicon: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 10
    },
    boxtext: {
        flex: 2,
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        margin: 10,
    },
    box: {
        flex: 1,
        flexDirection: 'row'
    }

})


let data = []
let dataday = []




export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileimage: null,
            information: {
                weight: null,
                height: null,
                age: null,
                gender: null,
                BMR: 0
            },
        }
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        console.log(this.props.profile.graphDataXAxis)
        console.log(this.props.profile.graphDataYAxis)
        let self = this;
        firebase.database().goOnline();
        let userId = firebase.auth().currentUser.uid
        var ref = firebase.database().ref('users/' + userId);
        let order = ref.child("profile")
        order.on("value", function (data) {
            let informationcopy = {
                weight: null,
                height: null,
                age: null,
                gender: null,
                BMR: 0
            }
            if (data.val() === null) {

            }
            else {
                informationcopy.weight = data.val().weight
                informationcopy.height = data.val().height
                informationcopy.gender = data.val().gender
                informationcopy.age = data.val().age
                informationcopy.BMR = data.val().BMR
                self.setState({
                    information: informationcopy
                })
            }

        })

        // let date = new Date().getDate();
        // let month = new Date().getMonth()+1;
        // let year = new Date().getFullYear();
        // roundloop = 7
        // while(roundloop > 0){
        //     let strdate = date.toString();
        //     let strmonth = month.toString();
        //     let stryear = year.toString();
        //     let day = strdate+"-"+strmonth+"-"+stryear
        //     dataday.push(day)
        //     let queryday = ref.child("food").child(day).child("sumcal")
        //     queryday.on('value',function(snapshot){
        //         if(snapshot.val() == null){
        //             data.push(0)
        //         }
        //         else{
        //             data.push(snapshot.val())
        //         }
        //     })



        //     date = date - 1
        //     if(date === 0){
        //         month = month - 1
        //         if(month === 0){
        //             month = 12
        //             date = 31
        //         }
        //         else if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10){
        //             date = 31
        //         }
        //         else if(month === 2){
        //             if(year % 4 === 0){
        //                 date = 29
        //             }
        //             else{
        //                 date = 28
        //             }
        //         }
        //         else{
        //             date = 31
        //         }
        //     }

        //     roundloop = roundloop - 1
        // }
    }



    render() {


        const weightinput = (
            <TextInput
                style={{ color: '#0094ff', fontSize: 17 }}
                placeholder={'Weight'}
                placeholderTextColor={'#0094ff'}
                underlineColorAndroid={'#0094ff'}
                selectionColor={'#0094ff'}
                keyboardType='numeric'
                onChangeText={(text) => {
                    let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                    let x = Math.round(text)
                    informationcopy.weight = x
                    this.setState({
                        information: informationcopy
                    })
                }}
            />
        )

        const heightinput = (
            <TextInput
                style={{ color: '#0094ff', fontSize: 17 }}
                placeholder={'Height'}
                placeholderTextColor={'#0094ff'}
                underlineColorAndroid={'#0094ff'}
                selectionColor={'#0094ff'}
                keyboardType="numeric"
                onChangeText={(text) => {
                    let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                    let x = Math.round(text)
                    informationcopy.height = x
                    this.setState({
                        information: informationcopy
                    })
                }}

            />
        )

        const ageinput = (
            <TextInput
                style={{ color: '#0094ff', fontSize: 17 }}
                placeholder={'Age'}
                placeholderTextColor={'#0094ff'}
                underlineColorAndroid={'#0094ff'}
                selectionColor={'#0094ff'}
                keyboardType="numeric"
                onChangeText={(text) => {
                    let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                    let x = Math.round(text)
                    informationcopy.age = x
                    this.setState({
                        information: informationcopy
                    })
                }}
            />
        )


        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(134, 65, 244, 0.2)'}
            />
        )


        return (
            <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.boxprofile}>
                    <View style={styles.boxprofileimage}>
                        <Avatar
                            xlarge
                            rounded
                            style={{ width: 48, height: 32 }}
                            source={{ uri: this.props.fb.data_profile.picture.data.url }}
                        />
                    </View>
                    <View style={styles.boxprofilecontent}>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, marginBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                {this.props.fb.data_profile.name}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10, paddingBottom: 5 }}>
                                Weight : {this.state.information.weight}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10, paddingBottom: 5 }}>
                                Height : {this.state.information.height}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10, paddingBottom: 5 }}>
                                Age : {this.state.information.age}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingLeft: 10, paddingBottom: 5 }}>
                                Gender : {this.state.information.gender}
                            </Text>
                        </View>
                    </View>

                </View>


                <View style={styles.boxcontent}>
                    <View style={styles.card}>
                        <View>
                            <Text style={{ color: '#0094ff', fontWeight: 'bold', paddingTop: 5, paddingBottom: 5 }}>
                                Edit personal info
                            </Text>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.boxicon}>
                                <Image
                                    source={require('../../img/weight-scale.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </View>
                            <View style={styles.boxtext}>
                                {weightinput}
                            </View>
                        </View>

                        <View style={styles.box}>
                            <View style={styles.boxicon}>
                                <Image
                                    source={require('../../img/height.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </View>
                            <View style={styles.boxtext}>
                                {heightinput}
                            </View>
                        </View>

                        <View style={styles.box}>
                            <View style={styles.boxicon}>

                                <Image
                                    source={require('../../img/age.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </View>
                            <View style={styles.boxtext}>
                                {ageinput}
                            </View>
                        </View>

                        <View style={styles.box}>
                            <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 10 }}>
                                <FontAwesomeIcon name={'male'} color={'#0094ff'} size={25} />
                                <FontAwesomeIcon name={'female'} color={'#ff6beb'} size={25} />
                            </View>
                            <View style={styles.boxtext}>

                                <Picker
                                    selectedValue={this.state.information.gender}
                                    itemStyle={{ color: '#0094ff' }}
                                    mode={'dropdown'}
                                    style={{ color: '#0094ff' }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let informationcopy = JSON.parse(JSON.stringify(this.state.information))
                                        informationcopy.gender = itemValue
                                        this.setState({
                                            information: informationcopy
                                        })
                                        console.log('informationcopy state: ', this.state.information)
                                    }}>

                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', margin: 5 }}>
                            <View style={{ margin: 5 }}>
                                <RaisedTextButton
                                    rippleDuration={400}
                                    rippleOpacity={0.54}
                                    color='#0094ff'
                                    title="Save Changes"
                                    titleColor="white"
                                    onPress={() => {

                                        console.log(data)
                                        console.log(dataday)
                                        if (this.state.information.gender === 'male') {
                                            let x = 66 + (this.state.information.weight * 13.7) + (5 * this.state.information.height) - (6.8 * this.state.information.age)
                                            let y = x * 1.375
                                            let z = Math.ceil(y)
                                            this.state.information.BMR = z
                                        }
                                        else if (this.state.information.gender === 'female') {
                                            let x = 665 + (this.state.information.weight * 9.6) + (1.8 * this.state.information.height) - (4.7 * this.state.information.age)
                                            let y = x * 1.375
                                            let z = Math.ceil(y)
                                            this.state.information.BMR = z
                                        }
                                        this.props.GetInformationAction(this.state.information)
                                        firebase.database().goOnline();
                                        let userId = firebase.auth().currentUser.uid
                                        let user = firebase.database().ref('users/' + userId);
                                        let valueprofile = {
                                            'weight': this.state.information.weight,
                                            'height': this.state.information.height,
                                            'gender': this.state.information.gender,
                                            'age': this.state.information.age,
                                            'BMR': this.state.information.BMR
                                        };
                                        user.child('profile').update(valueprofile)

                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.boxcontent}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: '#0094ff', fontWeight: 'bold', paddingTop: 5 }}>
                            Weekly Calorie Comsumption
                        </Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', height: 300 }}> */}
                        <View style={{ flexDirection: 'row', height: 300, padding: 10 }}>
                            <YAxis
                                data={this.props.profile.graphDataYAxis}
                                style={{ marginBottom: 30 }}
                                contentInset={{ top: 10, bottom: 10 }}
                                svg={{ fontSize: 10, fill: 'grey' }}
                                formatLabel={(value) => value + " KCal"}
                                numberofticks = {7}
                            />
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <LineChart
                                    style={{ flex: 1 }}
                                    data={this.props.profile.graphDataYAxis}
                                    contentInset={{ top: 10, bottom: 10 }}
                                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                                >
                                    <Grid />
                                    <Shadow/>
                                </LineChart>
                                <View>
                                    <XAxis
                                        style={{ marginHorizontal: -10, height: 30 ,padding :10}}
                                        data={this.props.profile.graphDataXAxis}
                                        formatLabel={(value) => "day"+value}
                                        contentInset={{ left: 10, right: 10 }}
                                        svg={{ fontSize: 10, fill: 'grey' }}
                                        xAccessor={({ item }) => item}
                                        numberofticks = {7}
                                    />
                                </View>
                            </View>
                        </View>
                    {/* </View> */}
                </View>




                <View style={styles.boxlogout}>
                    <TouchableOpacity
                        style={{ borderRadius: 20 }}
                        onPress={() => {
                            data = []
                            dataday = []
                            this.props.navigation.navigate("Login");
                            LoginManager.logOut((error, data) => {

                                console.log(data)
                                console.log("asd")
                                if (error) {
                                    console.log("err", error)
                                }

                                LoginManager.getIntance().logOut()
                            })
                        }}
                    >
                        <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#4267b2', padding: 10 }}>
                            <Image source={require('../../img/logout.png')} />
                            <Text style={{ color: 'white', paddingLeft: 10 }}>Log out</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </KeyboardAwareScrollView>
        );
    }
}