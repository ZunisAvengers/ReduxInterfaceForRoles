import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import  Order  from './Order';
import  CreateOrder  from './CreateOrder';
import * as Orders from '../store/Orders';


type OrdersProps = Orders.OrderState & typeof Orders.actionCreators;

class ListOrder extends React.PureComponent<OrdersProps> {
    public componentWillMount(){
        this.props.loadOrders()
    }
    public render(){
        let content = this.props.isLoading 
        ? <em><p>Загрука...</p></em>
        : this.renderOrders(),

        create = this.props.showCreate 
        ? this.renderCreateOrder()
        : <div/>
        return(
            <div>
                <h3>Ваши заказы</h3>
                <div>
                    <button onClick={e => this.props.changeCreate()}>
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
export default connect(
    (state: ApplicationState) => state.orders,
    Orders.actionCreators
  )(ListOrder as any);