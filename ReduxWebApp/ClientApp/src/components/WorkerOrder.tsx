import * as React from 'react';
import { connect } from 'react-redux';
import { StateOrder } from "../store/StateOrder";
import { ApplicationState } from '../store';
import { toDate, toOrderState } from './Convert';
import * as WorkerOrderState from '../store/WorkerOrder';
import load from './load.svg'

type WorkerOrderListProps = WorkerOrderState.WorkerOrdersList & typeof WorkerOrderState.actionCreators;
type WorkerOrderProps = WorkerOrderState.Order & typeof WorkerOrderState.actionCreators;

class WorkerOrderList extends React.PureComponent<WorkerOrderListProps>{
    public componentWillMount(){
        this.props.loadOrders();
    }
    public render(){
        let content = this.props.isLoading
            ? <img src={load}/>
            : this.renderOrders()
        return(
            <div>
                <h2>Текущие заказы</h2>
                {content}
            </div>
        )
    }
    public renderOrders(){
        let keyForProps = 0;
        return(
        <div className="row">
            <div className="col-sm-6">
                <h3>Главные</h3>
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
            <div className="col-sm-6">
                <h3>Дополнительные</h3>
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
            <div className="div-order text-center" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {toDate(this.props.dateOrder)}</b></p>
                <dl >
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
                    <dt>
                        Имя заказчика:
                    </dt>
                    <dd>
                        {this.props.customerName}
                    </dd>
                    <dt>
                        Телефон заказчика:
                    </dt>
                    <dd>
                        {this.props.customerPhone}
                    </dd>
                </dl>
                {this.renderButtons()}
            </div>
        );
        
    }
    public renderButtons(){
        switch(this.props.state){
            case StateOrder.WaitingForInstallation: 
                return (
                    <button className="btn btn-success" onClick={e => this.props.setInstallating(this.props.id)}>Заявить о начале установки</button>
                )
            case StateOrder.Installating: 
                return(
                    <button  className="btn btn-success" onClick={e => this.props.setInstallatingСompleted(this.props.id)}>Заявить об окончании установки</button>
                )
            default: return null
        }

    }
}

class WorkerOrderSide extends React.PureComponent<WorkerOrderState.Order>{
    public render(){
        const conv = toOrderState(this.props);
        
        return(
            <div className="div-order text-center" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {toDate(this.props.dateOrder)}</b></p>
                <dl >
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
                    <dt>
                        Имя заказчика:
                    </dt>
                    <dd>
                        {this.props.customerName}
                    </dd>
                    <dt>
                        Телефон заказчика:
                    </dt>
                    <dd>
                        {this.props.customerPhone}
                    </dd>
                </dl>
            </div>
        );        
    }
}
{/* <dt>
    Ведущий рабочий:
</dt>
<dd>
    {this.props.mainWorker !== null ? this.props.mainWorker : "Не назначен"}
</dd>
<dt>
    Дополнительные рабочие:
</dt>
<dd>
    <ul>
        {this.props.sideWorkers.length > 0 || this.props.sideWorkers !== null ? this.props.sideWorkers.map(e => <li>{e,fu}</li>) : "Не назначены"}
    </ul>
</dd> */}

export default connect(
    (state: ApplicationState) => state.workerOrder,
    WorkerOrderState.actionCreators
)(WorkerOrderList as any)