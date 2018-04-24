import React from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableHighlight
} from 'react-native';
import {
    ShareDialog
} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import Modal from 'react-native-modal';
import ModalWrapper from 'react-native-modal-wrapper';
import {
    TextField
} from 'react-native-material-textfield';
import {
    RaisedTextButton
} from 'react-native-material-buttons';
import UUIDGenerator from 'react-native-uuid-generator';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
    },
    boximage : {
        flex : 1
    },
    boxcontent : {
        flex : 2,
        backgroundColor : '#f4f9f9',
    },
    boxtext : {
        height : 70,
        backgroundColor : 'white',
        justifyContent : 'center',
        alignItems : 'center',
        padding : 20
    },

})

const shareLinkContent = {
    contentType: 'link',
    contentUrl: "https://firebasestorage.googleapis.com/v0/b/calpal-4c837.appspot.com/o/test%2Fcd6652b2-b05a-4b7c-9d59-e46e388e20a0?alt=media&token=f0204706-a744-493a-b089-51c41593c281",
    contentDescription: 'Facebook sharing is easy!',
}



export default class ImageScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = ({
            nameFood : [
                {
                    name : "ผัดกระเพรา",
                    cal : 600
                },
                {
                    name : "ผัดซีอิ๊ว",
                    cal : 900
                },
                {
                    name : "หมูทอดกระเทียม",
                    cal : 600
                }
            ],
            shareLinkContent: shareLinkContent,
            isModalVisiable : false,
            namenewfood : null,
            random : null,
            sumcal : 0
        })
    }

    componentDidMount(){
        firebase.database().goOnline();
        let userId = firebase.auth().currentUser.uid
        let ref = firebase.database().ref('users/' + userId);

        let hour = new Date().getHours().toString()
        let date = new Date().getDate().toString();
        let tempmonth = new Date().getMonth()+1;
        let month = tempmonth.toString();
        let year = new Date().getFullYear().toString();
        let day = date+'-'+month+'-'+year;
        let self = this;

        let food = ref.child('food').orderByKey().child(day)
        food.on('value',function(data){
            if(data.val().sumcal >= 0){
                self.setState({
                    sumcal : data.val().sumcal
                })
            }
        });
        console.log(typeof userId)
        console.log(userId)
        let refstorage = firebase.storage().ref("tDt1tSqRpjRPfs0duS8vJRebXwh2/main.jpg");
        refstorage.getDownloadURL()
        .then((url) => {
            console.log("url",url)
        },function(error){
            console.log(error)
        });
    }



    shareLinkWithShareDialog() {
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
          function(canShow) {
            if (canShow) {
              return ShareDialog.show(tmp.state.shareLinkContent);
            }
          }
        ).then(
          function(result) {
            if (result.isCancelled) {
              alert('Share cancelled');
            } else {
              alert('Share success with postId: '
                + result.postId);
            }
          },
          function(error) {
            alert('Share fail with error: ' + error);
          }
        );
      }


    _toggleModal(){
        this.setState({
            isModalVisiable : !this.state.isModalVisiable
        })
    }



    saveToStorageFirebase(){
        console.log('Other image : ',this.props.camera.image_food)
        const imagePath = this.props.camera.image_food
        const ref = firebase.storage().ref(this.state.namenewfood).child(this.state.random)
        const uploadTask = ref.putFile(imagePath, {contentType : 'image/jpeg'});
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          
            switch (snapshot.state) {
                case firebase.storage.TaskState.SUCCESS: // or 'success'
                    console.log('Upload is complete');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log(snapshot.state);
            }
        }, (error) => {
            console.error(error);
        }, () => {
            const uploadTaskSnapshot = uploadTask.snapshot;
        });
    }





    render(){
        var boxnamefood = [];
        for(let i = 0 ; i < 3 ; i++){
            boxnamefood.push(
                <TouchableOpacity key = {i} onPress = {() => {
                    let hour = new Date().getHours().toString()
                    let date = new Date().getDate().toString();
                    let tempmonth = new Date().getMonth() + 1;
                    let month = tempmonth.toString();
                    let year = new Date().getFullYear().toString();
                    let day = date+'-'+month+'-'+year
                    let self = this

                    firebase.database().goOnline();
                    let userId = firebase.auth().currentUser.uid;
                    let user = firebase.database().ref('users/' + userId);
                    let food = user.child('food');
                    let fndate = food.child(day);


                    let qu = user.child('food').orderByKey().child(day)
                    qu.on('value',function(data){
                        if(data.val().sumcal >= 0){
                            self.setState({
                                sumcal : data.val().sumcal
                            })
                        }
                    })

                    console.log("ddddddddd",this.state.sumcal)
                    if (this.props.main.Selected_Meal_Time == 'breakfast') {
                        let breakfast = fndate.child('breakfast');
                        let valuefood = {
                            'namefood' : this.state.nameFood[i].name,
                            'cal' : this.state.nameFood[i].cal,
                        };
                        breakfast.update(valuefood)
                        
                        this.props.BreakfastAction(this.state.nameFood[i])
                    }
                    else if (this.props.main.Selected_Meal_Time == 'lunch') {
                        let lunch = fndate.child('lunch')
                        let valuefood = {
                            'namefood' : this.state.nameFood[i].name,
                            'cal' : this.state.nameFood[i].cal,
                        };
                        lunch.update(valuefood)
                        this.props.LunchAction(this.state.nameFood[i])
                    }
                    else if (this.props.main.Selected_Meal_Time == 'dinner') {
                        let dinner = fndate.child('dinner')
                        let valuefood = {
                            'namefood' : this.state.nameFood[i].name,
                            'cal' : this.state.nameFood[i].cal,
                        };
                        dinner.update(valuefood)
                        this.props.DinnerAction(this.state.nameFood[i])
                    }
                    else if (this.props.main.Selected_Meal_Time == '') {
                        if(hour >= 5 && hour <= 10){
                            let breakfast = fndate.child('breakfast');
                            let valuefood = {
                                'namefood' : this.state.nameFood[i].name,
                                'cal' : this.state.nameFood[i].cal,
                            };
                            breakfast.update(valuefood)
                            
                            this.props.BreakfastAction(this.state.nameFood[i])
                        }
                        else if(hour >= 11 && hour <= 3){
                            let lunch = fndate.child('lunch')
                            let valuefood = {
                                'namefood' : this.state.nameFood[i].name,
                                'cal' : this.state.nameFood[i].cal,
                            };
                            lunch.update(valuefood)
                            this.props.LunchAction(this.state.nameFood[i])
                        }
                        else{
                            let dinner = fndate.child('dinner')
                            let valuefood = {
                                'namefood' : this.state.nameFood[i].name,
                                'cal' : this.state.nameFood[i].cal,
                            };
                            dinner.update(valuefood)
                            this.props.DinnerAction(this.state.nameFood[i])
                        }
                    }
                    this.props.navigation.navigate("Main");
                    this.props.FoodAction(this.state.nameFood[i]);
                    let allcal = this.state.sumcal + this.state.nameFood[i].cal
                    let temp = {
                        "sumcal" : allcal
                    }
                    fndate.update(temp)
                }}>
                    <View style = {styles.boxtext}>
                        <Text style = {{fontSize : 13}}>
                            <Text>{this.state.nameFood[i].name} </Text>
                            <Text>Calrories : {this.state.nameFood[i].cal}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }


        return(
            <View style = {styles.container}>
                <View style = {styles.boximage}>
                    <Image
                        source = {{
                            isStatic: true,
                            uri : this.props.camera.image_food
                        }}
                        style = {{
                            height : '100%',
                            width : '100%'
                        }}
                    />
                </View>





                <View style = {styles.boxcontent}>
                    {boxnamefood}
                    <TouchableOpacity onPress = {() => {
                        this._toggleModal();
                        UUIDGenerator.getRandomUUID().then((uuid) => {
                            this.setState({
                                random : uuid
                            })
                        })
                        
                    }}>
                    <ModalWrapper visible = {this.state.isModalVisiable} style = {{width : 280, height : 180, paddingLeft : 24, paddingRight : 24}}>
                        <TextField
                            autoFocus = {true}
                            label = 'Input your Food Name'
                            placeholder = "Name Food..."
                            onChangeText = {(text)=>{
                                console.log(text);
                                this.setState({
                                    namenewfood : text
                                })
                            }}
                        />
                        <View style = {{flex : 1,flexDirection : 'row',justifyContent : 'flex-end',alignItems : 'center'}}>
                            <RaisedTextButton
                                rippleDuration = {400} 
                                rippleOpacity={0.54} 
                                color='#0094ff' 
                                title = "Next" 
                                titleColor = "white"
                                onPress = {()=>{
                                    this._toggleModal();
                                    this.saveToStorageFirebase();
                                }}
                            />
                            <RaisedTextButton
                                rippleDuration = {400} 
                                rippleOpacity={0.54} 
                                color='#0094ff' 
                                title = "Cancle" 
                                titleColor = "white"
                                onPress = {()=>{
                                    this._toggleModal();
                                }}
                            />
                        </View>
                    </ModalWrapper>
                        <View style = {styles.boxtext}>
                            <Text style = {{fontSize : 13}}>
                                <Text>Other...</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <TouchableHighlight onPress={this.shareLinkWithShareDialog.bind(this)}>
          <Text style={styles.shareText}>Share link with ShareDialog</Text>
        </TouchableHighlight>
            </View>
        );
    }
}