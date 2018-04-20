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
    contentUrl: "https://www.facebook.com/images/fb_icon_325x325.png",
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
            shareLinkContent: shareLinkContent
        })
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








    render(){
        var boxnamefood = [];
        for(let i = 0 ; i < 3 ; i++){
            boxnamefood.push(
                <TouchableOpacity key = {i} onPress = {() => {
                    let hour = new Date().getHours().toString()
                    let date = new Date().getDate().toString();
                    let month = new Date().getMonth().toString();
                    let year = new Date().getFullYear().toString();
                    let day = date+'-'+month+'-'+year
                    console.log(typeof day)
                    console.log(day)

                    this.props.FoodAction(this.state.nameFood[i]);
                    this.props.navigation.navigate("Main");
                    firebase.database().goOnline();
                    let userId = firebase.auth().currentUser.uid;
                    let user = firebase.database().ref('users/' + userId);
                    let food = user.child('food');
                    let fndate = food.child(day);
                    if(hour >= 5 && hour <= 10){
                        let breakfast = fndate.child('breakfast');
                        let valuefood = {
                            'namefood' : this.state.nameFood[i].name,
                            'cal' : this.state.nameFood[i].cal,
                        };
                        breakfast.update(valuefood)
                    }
                    else if(hour >= 11 && hour <= 3){
                        let lunch = fndate.child('lunch')
                        let valuefood = {
                            'namefood' : this.state.nameFood[i].name,
                            'cal' : this.state.nameFood[i].cal,
                        };
                        lunch.update(valuefood)
                    }
                    else{
                        let dinner = fndate.child('dinner')
                        let valuefood = {
                            'namefood' : this.state.nameFood[i].name,
                            'cal' : this.state.nameFood[i].cal,
                        };
                        dinner.update(valuefood)
                    }
                    
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
                        let storageRef = firebase.storage().ref();
                        let image = storageRef.child('path')
                        image.putFile(this.props.camera.image_food).then(function(){
                            console.log('upload done')
                        })
                    }}>
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