import * as React from 'react';
import { connect } from 'react-redux';
import { StateOrder } from "../store/StateOrder";
import { ApplicationState } from '../store';
import { toDate, toOrderState } from './Convert';
import * as WorkerOrderState from '../store/WorkerOrder';

type WorkerOrderListProps = WorkerOrderState.WorkerOrdersList & typeof WorkerOrderState.actionCreators;
type WorkerOrderProps = WorkerOrderState.Order & typeof WorkerOrderState.actionCreators;

class WorkerOrderList extends React.PureComponent<WorkerOrderListProps>{
    public componentWillMount(){
        this.props.loadOrders();
    }
    public render(){
        let content = this.props.isLoading
            ? <p><em>Загруска...</em></p>
            : this.renderOrders()
        return(
            <div>
                <h3>rr заказы</h3>
                {content}
            </div>
        )
    }
    public renderOrders(){
        let keyForProps = 0;
        return(
        <div>
            <div>
                <h2>Главные</h2>
                {this.props.ordersMain.map(order => (
                        <WorkerOrderMain
                            key={keyForProps++}
                            loadOrders={this.props.loadOrders}
                            id={order.id}
                            address={order.address}
                            plan={order.plan}
                            state={order.state}
                            dateOrder={order.dateOrder}
                            dateInstalling={order.dateInstalling}
                            dateCompliteInstalling={order.dateCompliteInstalling}
                            customerName={order.customerName}
                            customerPhone={order.customerPhone}
                            massage={order.massage}
                            mainWorker={order.mainWorker}
                            sideWorkers={order.sideWorkers}
                            setInstallating={this.props.setInstallating}
                            setInstallatingСompleted={this.props.setInstallatingСompleted}
                        ></WorkerOrderMain>    
                    ))
                }
            </div>
            <div>
                <h2>Дополнительные</h2>
                {this.props.ordersSide.map(order => 
                        <WorkerOrderSide 
                            key={keyForProps++}
                            id={order.id}
                            address={order.address}
                            plan={order.plan}
                            state={order.state}
                            dateOrder={order.dateOrder}
                            dateInstalling={order.dateInstalling}
                            dateCompliteInstalling={order.dateCompliteInstalling}
                            customerName={order.customerName}
                            customerPhone={order.customerPhone}
                            massage={order.massage}
                            mainWorker={order.mainWorker}
                            sideWorkers={order.sideWorkers}
                        ></WorkerOrderSide>    
                    )
                }
            </div>
        </div>
        )
    }
}
class WorkerOrderMain extends React.PureComponent<WorkerOrderProps>{
    public render(){
        const conv = toOrderState(this.props);
        return(
            <div className="div-order" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {toDate(this.props.dateOrder)}</b></p>
                <p>Адрес: {this.props.address}</p>
                <p>План: {this.props.plan}</p>
                <p>Состояние заказа: {conv.orderState}</p>
                <p>Имя заказчика: {this.props.customerName}</p>
                <p>Телефон заказчика: {this.props.customerPhone}</p>
                {this.renderButtons()}
            </div>
        );
        
    }
    public renderButtons(){
        switch(this.props.state){
            case StateOrder.WaitingForInstallation: 
                return (
                    <button onClick={e => this.props.setInstallating(this.props.id)}>Заявить о начале установки</button>
                )
            case StateOrder.Installating: 
                return(
                    <button onClick={e => this.props.setInstallatingСompleted(this.props.id)}>Заявить об окончании установки</button>
                )
            default: return null
        }

    }
}

class WorkerOrderSide extends React.PureComponent<WorkerOrderState.Order>{
    public render(){
        const conv = toOrderState(this.props);
        return(
            <div className="div-order" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {toDate(this.props.dateOrder)}</b></p>
                <p>Адрес: {this.props.address}</p>
                <p>План: {this.props.plan}</p>
                <p>Состояние заказа: {conv.orderState}</p>
                <p>Имя заказчика: {this.props.customerName}</p>
                <p>Телефон заказчика: {this.props.customerPhone}</p>
            </div>
        );        
    }
}

export default connect(
    (state: ApplicationState) => state.workerOrder,
    WorkerOrderState.actionCreators
)(WorkerOrderList as any)