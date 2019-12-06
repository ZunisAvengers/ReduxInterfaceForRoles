import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { toDate, toOrderState } from './Convert';
import * as ManagerOrderState from '../store/ManagerOrderActionCreators';
import { Workers } from './WorkerOptions'
import { StateOrder } from '../store/StateOrder';
import load from './load.svg'

type OrderManagerListProps = ManagerOrderState.OrderManagerState & typeof ManagerOrderState.actionCreators;
type OrderManagerProps = ManagerOrderState.Order & typeof ManagerOrderState.actionCreators;

class ManagerOrderList extends React.PureComponent<OrderManagerListProps>{
    
    public componentWillMount(){
        this.props.loadOrders()
    }

    public render(){
        let content = this.props.isLoadingOrders 
        ? <img src={load}/>
        : this.renderOrders()
        
        return(
            <div className="col-sm-8">
                <h3>Заказы</h3>
                {content}
            </div>
        
        )
    }

    public renderOrders(){
        var keyForProps = 0
        return(
            <div>
                {this.props.orders.map(order =>
                    <ManagerOrder 
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
                        
                        allWorkers={this.props.allWorkers}
                        isLoadingWorkers={this.props.isLoadingWorkers}
                        endOrder={this.props.endOrder}
                        delWorker={this.props.delWorker}
                        editMain={this.props.editMain}
                        addWorker={this.props.addWorker}
                        loadWorkers={this.props.loadWorkers}                        
                        cancelOrder={this.props.cancelOrder}
                        loadOrders={this.props.loadOrders}
                        allowOrder={this.props.allowOrder}
                    />
                )}
            </div>
        )
    }
}

class ManagerOrder extends React.PureComponent<OrderManagerProps>{
    public state = {
        hiding: true,
        workers: true
    }

    render(){
        const conv = toOrderState(this.props);
        let details = this.state.hiding 
                ? <div/>
                : this.renderDetails(),

            isCanceled = this.props.state === 5 || this.props.state === 4
                ? <div></div>
                : this.renderButtons(),

            workers = this.state.workers 
                ?<div/>
                :<Workers
                    key={this.props.id}
                    
                    OrderId={this.props.id}
                    addWorker={this.props.addWorker}
                    allWorkers={
                        this.props.allWorkers
                        .filter(worker => 
                            worker.id !== (this.props.mainWorker !== null ? this.props.mainWorker.id : null)
                            && this.props.sideWorkers.map(sw => sw.id).indexOf(worker.id) === -1)  
                        }
                    isLoadingWorkers={this.props.isLoadingWorkers}
                    mainWorker={this.props.mainWorker}
                    sideWorkers={this.props.sideWorkers}
                    delWorker={this.props.delWorker}
                    editMain={this.props.editMain}
                ></Workers>

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
                    {isCanceled}
                    {details}
                    {workers}
            </div>
        );
    }

    renderButtons(){
        let btn
        switch (this.props.state) {
            case StateOrder.WaitingForInstallation:
            case StateOrder.Installating:
                btn =  <button onClick={e => {
                    if (this.props.allWorkers === null || this.props.allWorkers.length < 1) this.props.loadWorkers();
                    this.setState({workers: !this.state.workers, hiding: true})
                    }} className="btn btn-success">Назначить рабочих</button>
                break;
            case StateOrder.InstallatingСompleted:
                btn = <button onClick={e => this.props.endOrder(this.props.id.toString())} className="btn btn-primary">Закрыть</button>
                break;
            default:
                break;
        }
        return(
            <div className="btn-group">
                <button onClick={e => this.props.cancelOrder(this.props.id.toString())} className="btn btn-danger">Отменить</button>
                <button onClick={e => this.setState({hiding: !this.state.hiding, workers: true})}  className="btn btn-success">Дата установки</button>
                {btn}
            </div>
        )
    }
    renderDetails(){
        var dateInstalling: Date | null, dateCompliteInstalling: Date | null;
        return(
            <div className="center-block col-sm-8 text-left ">
                <form onSubmit={e => {
                        e.preventDefault();
                        this.allowOrder(dateInstalling, dateCompliteInstalling);
                        if (dateInstalling !== null) this.setState({hiding: true})
                    }
                }>
                    <span className="text-danger">{this.props.massage}</span>
                    <div className="form-group">                    
                        <label> Выберете Дату начала установки </label>                
                        <input type="date" className="form-control" onChange={e => dateInstalling = e.target.valueAsDate}/>
                    </div>
                    <div className="form-group">
                        <label> Выберете Дату оканчания установки  </label>
                        <input type="date" className="form-control" onChange={e => dateCompliteInstalling = e.target.valueAsDate}/>                    
                    </div>
                    <input type="submit" className="btn btn-primary" value={this.props.state === StateOrder.InProgressing ? 'Добавить': 'Изменить'}/>
                </form>
            </div>
        )
    }
    allowOrder(dateInstalling: Date | null, dateCompliteInstalling: Date | null){
        this.props.allowOrder(
            this.props.id,
            dateInstalling as Date,
            dateCompliteInstalling as Date
        )
    }
}

export default connect(
    (state: ApplicationState) => state.managerOrder,
    ManagerOrderState.actionCreators
)(ManagerOrderList as any)