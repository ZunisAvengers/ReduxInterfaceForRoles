import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import convert from './Convert'
import CreateOrder  from './CreateOrder';
import * as Orders from '../store/Orders';


type OrdersProps = Orders.OrderState & typeof Orders.actionCreators;

class ListOrder extends React.PureComponent<OrdersProps> {
    public state = {
        showCreate: false
    }

    public componentWillMount(){
        this.props.loadOrders()
    }
    public render(){
        let content = this.props.isLoading 
        ? <em><p>Загрука...</p></em>
        : this.renderOrders(),

        create = this.state.showCreate 
        ? this.renderCreateOrder()
        : <div/>
        return(
            <div>
                <h3>Ваши заказы</h3>
                <div>
                    <button onClick={e => this.setState({showCreate: !this.state.showCreate})}>
                        Создать новый заказ
                    </button>
                    {create}
                </div>
                {content}
            </div>
        );
    }
    private renderOrders(){
        var keyForProps = 0
        return(
            <div>
                {this.props.orders.map(order =>
                    <Order key={keyForProps++}
                        id={order.id}
                        address={order.address}
                        plan={order.plan}
                        state={order.state}
                        dateOrder={order.dateOrder}
                        dateInstalling={order.dateInstalling}
                        dateCompliteInstalling={order.dateCompliteInstalling}
                    />
                )}
            </div>
        )
    }
    private renderCreateOrder(){
        return <CreateOrder ></CreateOrder>
    }
}

class Order extends React.PureComponent<Orders.Order>{

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


export default connect(
    (state: ApplicationState) => state.orders,
    Orders.actionCreators
  )(ListOrder as any);