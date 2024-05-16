import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import { Languages, Constants, Colors } from '@common';
import { CustomAlert, CustomAlertButton } from '@components';
import styles from '../styles';

class OrderCharges extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            promoavailable : false,
            additionalchargeavailable : false,
            cannotapplypromoalert : false,
            subtotal : 0,
            additionalcharge : 0,
            additionalchargename : '',
            promotion : [],
            deliverycharge : 0,
            total : 0,
            ordertype : 0,
            promovalue : 0,
            m_lat : 0,
            m_lan : 0
        };
        this.getordercharges = this.getordercharges.bind(this);
    }

    componentDidMount(){
        console.log(this.props.total)
        const subtotal_1 = this.state.subtotal;
        const total_1 = this.state.total;
        const deliveryfee_1 = this.state.deliverycharge;
        const discount_1 = this.state.promovalue;
        const additionalcharge_1 = this.state.additionalcharge;

        const subtotal = this.props.subtotal;
        const total = this.props.total;
        const deliveryfee = this.props.deliveryfee;
        const discount = this.props.discount;
        const additionalcharge = this.props.additionalcharge;

        if(subtotal_1 == subtotal || total_1 == total || deliveryfee_1 == deliveryfee || discount_1 == discount || additionalcharge_1 == additionalcharge){
            null
        }else{
            this.setState({subtotal : this.props.subtotal});
            this.setState({total : this.props.total});
            this.setState({dliveryfee : this.props.dliveryfee});
            this.setState({discount : this.props.discount});
            this.setState({additionalcharge : this.props.additionalcharge});
        }
    }

    componentDidUpdate(){
        const subtotal_1 = this.state.subtotal;
        const total_1 = this.state.total;
        const deliveryfee_1 = this.state.deliverycharge;
        const discount_1 = this.state.promovalue;
        const additionalcharge_1 = this.state.additionalcharge;

        const subtotal = this.props.subtotal;
        const total = this.props.total;
        const deliveryfee = this.props.deliveryfee;
        const discount = this.props.discount;
        const additionalcharge = this.props.additionalcharge;

        if(subtotal_1 == subtotal || total_1 == total || deliveryfee_1 == deliveryfee || discount_1 == discount || additionalcharge_1 == additionalcharge){
            null
        }else{
            this.setState({subtotal : this.props.subtotal});
            this.setState({total : this.props.total});
            this.setState({dliveryfee : this.props.dliveryfee});
            this.setState({discount : this.props.discount});
            this.setState({additionalcharge : this.props.additionalcharge});
        }
    }

    getordercharges = () => {
        this.props.getordercharges(this.state)
    }

    render(){
        let {ordertype} = this.props;
        const subtotal = this.props.subtotal;
        const total = this.props.total;
        const dliveryfee = this.props.deliveryfee;
        const discount = this.props.discount;
        const additionalcharge = this.props.additionalcharge;
        return(
            <View style={[styles.orderchargescontainer]}>
                <Text style={[styles.paymentsummerytext]}>{Languages.PaymentSummery}</Text>

                {this.props.orderdiscount != '' || 0 ?
                <>
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargestext, {color : 'green'}]}>{Languages.YouAreSaving}</Text>
                    <Text style={[styles.orderchargestext, {color : 'green'}]}>{Languages.Rs} {Number(this.props.orderdiscount).toFixed(2)}</Text>
                </View>
                <View style={{width : '100%', height : 2, backgroundColor : Colors.gray, marginTop : 5, marginBottom : 5}}></View>
                </> : null}
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargestext]}>{Languages.CartTotal}</Text>
                    <Text style={[styles.orderchargestext]}>{Languages.Rs} {Number(subtotal).toFixed(2)}</Text>
                </View>
                {this.props.discount != '' || 0 ?
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargespromotiontext]}>{Languages.Discount}</Text>
                    <Text style={[styles.orderchargespromotiontext]}>{Languages.Rs} -{Number(discount).toFixed(2)}</Text>
                </View> : null}
                {this.state.additionalchargeavailable ? 
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargestext]}>{Languages.ServiceCharge}</Text>
                    <Text style={[styles.orderchargestext]}>{Languages.Rs} {Number(additionalcharge).toFixed(2)}</Text>
                </View> : null}
                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style={[styles.orderchargestext]}>{Languages.DeliveryFee}</Text>
                    <Text style={[styles.orderchargestext]}>{Languages.Rs} {Number(dliveryfee).toFixed(2)}</Text>
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 10}}>
                    <Text style={[styles.orderchargestext, {fontFamily : Constants.fontFamilybold}]}>{Languages.TotalAmount}</Text>
                    <Text style={[styles.orderchargestext, {fontFamily : Constants.fontFamilybold}]}>{Languages.Rs} {Number(total).toFixed(2)}</Text>
                </View>
                
                {/* Cannot apply promo code alert */}
                <CustomAlert
                    displayMode={'error'}
                    displayMsg={Languages.CannotApplySelectedPromoCode}
                    displaymsgtitle={'Error'}
                    visibility={this.state.cannotapplypromoalert}
                    cancellable={false}
                    buttons={(
                    <>
                        <CustomAlertButton buttontitle={'Ok'} theme={'error'} buttonaction={()=>this.setState({cannotapplypromoalert : false})}/>
                    </>
                    )}
                >
                </CustomAlert>
            </View>
        );
    }
}

OrderCharges.propTypes = {
    getordercharges: PropTypes.func,
    getloadingstate : PropTypes.func
};

export default OrderCharges;