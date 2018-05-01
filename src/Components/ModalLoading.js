import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import UUIDGenerator from 'react-native-uuid-generator';
// import sortObjectList from 'sort-object-list';

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
        let imagePath = this.props.camera.image_food
        let userId = firebase.auth().currentUser.uid;
        let ref = firebase.storage().ref(userId).child('temp.jpg');
        const uploadTask = ref.putFile(imagePath, {contentType : 'image/jpeg'});
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload is ${progress}% done`);
          
            switch (snapshot.state) {
                case firebase.storage.TaskState.SUCCESS: // or 'success'
                    // console.log('Upload is complete');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    // console.log('Upload is running');
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

    compareProb(a,b) {
        if (a[2] < b[2])
          return -1;
        if (a[2] > b[2])
          return 1;
        return 0;
    }
      

    sortByValue(data){
        
        let round = 0;
        let f = []
        for(let i in data){
            let temp_name = data[i].label
            let temp = (data[i].probability).toFixed(20)
            f.push([parseInt(i)+1, temp_name, temp])
        }
        f.sort(this.compareProb)
        foodOptions = []
        for(let i = f.length-1 ; i >= f.length-4 ; i--){
            foodOptions.push(f[i])
        }

        let temp_name = []
        for(let i in foodOptions){
            let temp = foodOptions[i][1]
            temp_name.push(temp)
        }

        this.props.ResponeServerAction(temp_name)

        console.log('foodOptions: ', foodOptions)
        console.log('temp_name',temp_name)

        this.setState({
            visible : false
        })
        this.props.navigation.navigate("Image");
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

        let self = this
        let formdata = new FormData();  
        formdata.append('image', {  
            uri: this.props.camera.image_food,
            name: '1.jpg',
            type: 'image/jpeg'
        });
        fetch('http:/158.108.175.158:5000/predict',{
            method : 'post',
            body : formdata
        }).then(res =>{
            res.json().then(function(data){
                console.log(data)
                self.sortByValue(data.predictions)
            })

        }).catch(error=>{
            console.error(error)
        })

    }

    render(){
        return(
            <View style = {styles.container}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            </View>
        );
    }
}
