import * as React from 'react';
import { Worker } from '../store/ManagerOrder';
import { UncontrolledDropdown } from 'reactstrap';

interface WorkersState {
    mainWorker: Worker;
    sideWorkers: Worker[];
    OrderId:string;
    isLoadingWorkers: boolean;
    allWorkers: Worker[];
    addWorker(worker: Worker, OrderId: string): void;
    editMain(worker: Worker, OrderId: string): void;
    delWorker(worker: Worker, OrderId: string): void;
}

 export class Workers extends React.Component<WorkersState>{
    
    render(){
        let content = this.props.isLoadingWorkers
            ? this.renderAllWorkers()
            : <p><em>Загруска...</em></p>
            console.log(this.props.allWorkers)
            return(
            <div className='div-workers'>
                <div className='workers-content '>
                    <h4>Главный рабочий</h4>
                    {this.renderMainWorker()}
                    <hr/>
                    <h4>Дополнительные рабочие</h4>                  
                    {this.renderSideWorkers()}
                </div>
                <div className='workers-content '>
                    <h4>Все рабочие</h4>
                    {content}
                </div>
            </div>
        )
    }

    renderMainWorker(){
        return this.props.mainWorker === null
                    ? <p><em>Не задан</em></p>
                    : <dl>
                        <dt>
                            {this.props.mainWorker.fullName}
                        </dt>
                        <dd>
                            <button >Изменить</button>
                        </dd>
                    </dl>        
    }

    renderAllWorkers(){
        
        if (this.props.allWorkers === null || this.props.allWorkers.length === 0){
            return <p><em>Все распределены</em></p>
        }
        return(
            <table>
                <tbody>
                {this.props.allWorkers
                .filter(worker => 
                    worker.id !== (this.props.mainWorker !== null ? this.props.mainWorker.id : null)
                    && this.props.sideWorkers.map(sw => sw.id).indexOf(worker.id) === -1)       
                .map(worker =>
                        <tr>
                            <td>                                
                                {worker.fullName}
                            </td>
                            <td>
                                <button onClick={e => this. props.addWorker(worker, this.props.OrderId)}>Добавить</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    renderSideWorkers(){        
        return(
            this.props.sideWorkers.length === 0 || this.props.sideWorkers === null
            ? <p><em>Не заданы</em></p>
            :<table>
                <tbody>
                {this.props.sideWorkers.map(worker =>
                        <tr>
                            <td>                                
                                {worker.fullName}
                            </td>
                            <td>
                                <button  onClick={e => this.props.delWorker(worker, this.props.OrderId)}>Удалить</button>
                            </td>
                        </tr>
                    )}
                </tbody>    
            </table>
        )
    }
}

// export default connect(
//     (state: ApplicationState) => state.workers,
//     WorkersStore.actionCreators
// )(Workers as any)