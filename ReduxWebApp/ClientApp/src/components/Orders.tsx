import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { toDate, toOrderState } from './Convert'
import CreateOrder  from './CreateOrder';
import * as Orders from '../store/Orders';
import load from './load.svg'

type OrdersProps = Orders.OrderState & typeof Orders.actionCreators;

class ListOrder extends React.PureComponent<OrdersProps> {
    
    public componentWillMount(){
        this.props.loadOrders()        
    }
    public render(){

        let content = this.props.isLoadingUser && this.props.orders !== undefined
        ? <div className="col-sm-8"><img src={load}/></div>
        : this.renderOrders(),

        create = this.props.showCreate 
        ? this.renderCreateOrder()
        : <div/>
        return(
            
            <div className="row">
                
                {content}
                <div  className="col-sm-4">
                    <button className="btn btn-secondary"  onClick={this.props.changeCreate}>
                        {this.props.showCreate ? 'Скрыть' : 'Создать новый заказ'} 
                    </button>
                    {create}
                </div>
            </div>
        );
    }
    private renderOrders(){
        var keyForProps = 0
        if(this.props.orders !== undefined) return(
            <div className="col-sm-8">
                {
                    this.props.orders.map(order =>
                        <Order key={keyForProps++}
                        id={order.id}
                        address={order.address}
                        plan={order.plan}
                        state={order.state}
                        dateOrder={order.dateOrder}
                        dateInstalling={order.dateInstalling}
                        dateCompliteInstalling={order.dateCompliteInstalling}
                        
                        />                            
                        )
                }
            </div>
        )
    }
    private renderCreateOrder(){
        return <CreateOrder ></CreateOrder>
    }
}

class Order extends React.PureComponent<Orders.Order>{

    render(){
        const conv = toOrderState(this.props);
        return(
            <div className="div-order text-center" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {toDate(this.props.dateOrder)}</b></p>
                <dl className="">
                    <dt>
                        Адрес:
                    </dt>
                    <dd>
                        {this.props.address}
                    </dd>
                    <dt>
                        План: 
                    </dt>
                    <dd>
                        {this.props.plan}
                    </dd>
                    <dt>
                        Состояние заказа:
                    </dt>
                    <dd>
                        {conv.orderState}
                    </dd>
                </dl>
            </div>
        );
    }
}


export default connect(
    (state: ApplicationState) => state.orders,
    Orders.actionCreators
  )(ListOrder as any);