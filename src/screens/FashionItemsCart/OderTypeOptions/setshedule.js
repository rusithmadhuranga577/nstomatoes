import React from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Languages, Url } from '@common';
import axios from 'axios';
import styles from './styles';
import { Button } from '@components';
import DateTimePicker from '@react-native-community/datetimepicker';

const QueryString = require('query-string');

class SetShedule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items : [],
            datepickervisibility : false,
            timepickervisibility : false,
            selecteddate : '',
            selectedtime : '',
            restaurantdata : [],
            selected_res_id : '',
            cansave : true
        };
        this.getData = this.getData.bind(this);
        this.hideView = this.hideView.bind(this);
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setInitialDateTime();
        });
        this.setInitialDateTime();
        console.log('RESTAURANT DATA',this.props.res_data);
    }

    componentDidUpdate(){
    }

    getRestaurantData=()=>{
        const id = this.props.res_id;
        axios.post(Url.getrestaurantdetailsurl, 
        QueryString.stringify({
            restaurant_id : id
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            console.log(response.data);
            this.setState({restaurantdata : response.data});
        }).catch(error => {
            console.log(error);
        })
    }

    setInitialDateTime = () => {
        var t = new Date(); 

        var date = t.getDate();
        var month = t.getMonth()+1;
        var year = t.getFullYear()
        
        var hours = t.getHours();
        var minutes = t.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        var fulldate = `${year}-${month}-${date}`;

        this.setState({selecteddate : fulldate});
        this.setState({selectedtime : strTime});
    }

    saveFunction = () => {
        this.hideTimePicker();
        this.hideDatePicker();
        this.getData();
    }

    getData=()=>{
        var array = [{'date' : this.state.selecteddate, 'time' : this.state.selectedtime}]
        this.props.getData(array);
        this.hideView();
    }

    hideView=()=>{
        this.props.hideView(false);
    }

    //////////////////////  Date Picker  ////////////////////////

    showDatePicker = () => {
        this.setState({datepickervisibility : true});
    };
    
    hideDatePicker = () => {
        this.setState({datepickervisibility : false});
    };

    handleDatePickerConfirm = (data) => {
        if(data.type != 'dismissed'){
            var d = new Date(data.nativeEvent.timestamp);
            var date = d.getUTCDate();
            var month = d.getUTCMonth();
            var year = d.getUTCFullYear()
    
            var fulldate = `${year}-${month}-${date}`;
            console.log(data);
            this.setState({selecteddate : fulldate});
            this.hideDatePicker();
        }else{
            this.hideDatePicker();
        }
    };


    //////////////////////  Time Picker  ////////////////////////

    showTimePicker = () => {
        this.setState({timepickervisibility : true});
    };
    
    hideTimePicker = () => {
        this.setState({timepickervisibility : false});
    };

    handleTimePickerConfirm = (time) => {
        if(time.type != 'dismissed'){
            var t = new Date(time.nativeEvent.timestamp);

            var hours = t.getHours();
            var minutes = t.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;

            this.setState({selectedtime : strTime});
            this.hideTimePicker();
            this.checkTimeAvailable(t.getHours());
        }else{
            this.hideTimePicker();
        }
    };

    checkTimeAvailable = (hour) => {
        const selected_hour = hour;
        const open_hour = this.props.res_data.open_time;
        const close_hour = this.props.res_data.close_time;

        if(selected_hour > close_hour || selected_hour < open_hour){
            this.setState({cansave : false});
        }else{
            this.setState({cansave : true});
        }
    }
    

    render(){
        const {navigation} = this.props;
        const datepickervisible = this.state.datepickervisibility;
        const timepickervisible = this.state.timepickervisibility;
        const date = this.state.selecteddate;
        const time = this.state.selectedtime;
        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                animationType="slide"
            >
                <TouchableOpacity activeOpacity={1} onPress={this.hideView} style={[styles.overlay]}>
                    <View style={[styles.container]}>
                    <Text style={[styles.title]}>{Languages.SetShedule}</Text>
                        <Text style={[styles.containertitle]}>Set Date</Text>
                        <TouchableOpacity onPress={()=>this.showDatePicker()} style={[styles.rowcontainer]}>
                            <Text style={[styles.text]}>{date}</Text>
                        </TouchableOpacity>

                        <Text style={[styles.containertitle, {marginTop : 20}]}>Set Time</Text>
                        <TouchableOpacity onPress={()=>this.showTimePicker()} style={[styles.rowcontainer]}>
                            <Text style={[styles.text]}>{time}</Text>
                        </TouchableOpacity>
                        {this.state.cansave ? null :
                        <Text style={[styles.thetimetext]}>The time you selected is not in our opening hours please change it into opening hour</Text>}
                        <View style={[styles.buttonholder]}>
                            <Button title={Languages.Save} action={this.state.cansave ? this.saveFunction : null}/>
                        </View>
                    </View>
                </TouchableOpacity>
                {datepickervisible ?
                <DateTimePicker
                    isVisible={datepickervisible}
                    testID="dateTimePicker"
                    value={new Date()}
                    minimumDate={new Date()}
                    mode={"date"}
                    is24Hour={false}
                    display="default"
                    onChange={this.handleDatePickerConfirm}
                    onHide={this.hideDatePicker}
                />:null}
                
                {timepickervisible ?
                <DateTimePicker
                    isVisible={timepickervisible}
                    testID="dateTimePicker"
                    value={new Date()}
                    minimumDate={new Date()}
                    mode="time"
                    locale="en-US" 
                    onChange={this.handleTimePickerConfirm}
                    onHide={this.hideTimePicker}
                />:null}
            </Modal>
        );
    };
}

SetShedule.propTypes = {
};

export default function(props){
    const navigation = useNavigation();
    return <SetShedule {...props} navigation={navigation} />;
} 