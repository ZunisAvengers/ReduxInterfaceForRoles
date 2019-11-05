import * as React from 'react';
import convert from './Convert'
import * as Orders from '../store/Orders';



export default class Order extends React.PureComponent<Orders.Order>{

    render(){
        var conv = convert.toOrderState(this.props);
        return(
            <div className="div-order" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {convert.toDate(this.props.dateOrder)}</b></p>
                <p>Адрес: {this.props.address}</p>
                <p>План: {this.props.plan.toString()}</p>
                <p>Состояние заказа: {conv.orderState}</p>
            </div>
        );
    }
}
