import axios from 'axios';
const QueryString = require('query-string');
import { Url } from '@common';

const GetRestaurantData = () => {
    axios.post(Url.getrestaurantdetailsurl, 
    QueryString.stringify({
        restaurant_id : 1,
    }), 
    {
        headers: {"Content-Type": "application/x-www-form-urlencoded",}
    }).then(response => {
        const res_data = response.data;
        return(res_data);
    })
}
export default GetRestaurantData;