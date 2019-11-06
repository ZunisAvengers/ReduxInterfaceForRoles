import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import  Order  from './Order';
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
                <div>{content}</div>
            </div>
        );
    }
    private renderOrders(){
        return(
            <div>
                {this.props.orders.map(order =>
                <Order key={order.id}
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
        let plan = '',
            address= ''
        
        return (
          <div>
            <form onSubmit={e => {
              e.preventDefault()
              if (!plan.trim() && !address.trim()) {
                return
              } else {
                this.props.addOrders(address, plan)
                plan = ''
                address = ''
                }
            }}>
                
            <label>Адресс</label>
            <input type='text' onChange={e => {
                  plan = e.target.value
              }} /><hr/>
              <label>Описание плана действий</label>
              <input type='text' onChange={e => {
                  address = e.target.value
              }} />
              <button type="submit">
                Добавить заказ
              </button>
            </form>
          </div>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.orders,
    Orders.actionCreators
  )(ListOrder as any);