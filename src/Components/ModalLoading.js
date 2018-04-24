import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import UUIDGenerator from 'react-native-uuid-generator';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#0094ff',
    }
})

export default class ModalLoading extends React.Component{

    constructor(props){
        super(props);
        this.state = ({
            visible : true,
            random : null
        })
    }


    saveToFirebase(uuid){
        const imagePath = this.props.camera.image_food
        let userId = firebase.auth().currentUser.uid;
        let ref = firebase.storage().ref(userId).child('1');
        // let ref = firebase.storage().ref();
        const uploadTask = ref.putFile(imagePath, {contentType : 'image/jpeg'});
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          
            switch (snapshot.state) {
                case firebase.storage.TaskState.SUCCESS: // or 'success'
                    console.log('Upload is complete');
                    this.setState({
                        visible : false
                    })
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

    componentDidMount() {
        let rn = new Promise((resolve,reject) => {
            UUIDGenerator.getRandomUUID().then((uuid) => {
                console.log("uuid modal",uuid)
                this.setState({
                    random : uuid
                })
                resolve(uuid);
            })
        })

        rn.then((uuid)=>{
            this.saveToFirebase(uuid)
        })
        




        this.props.navigation.navigate("Image");
    }

    render(){
        return(
            <View style = {styles.container}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View>
        );
    }
}
