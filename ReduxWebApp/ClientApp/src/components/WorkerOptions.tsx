import * as React from 'react';
import { Worker } from '../store/ManagerOrderActionCreators';
import load from './load.svg'

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
    state = {
        editMain: false
    }
    render(){
        let content = this.props.isLoadingWorkers
            ? <img src={load}/>
            : this.renderAllWorkers()
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
            : <table>
                    <tbody>
                        <tr>
                            <td>  
                                {this.props.mainWorker.fullName}
                            </td>
                            <td>
                                <button onClick={e => this.setState({editMain: !this.state.editMain})}>Изменить</button>
                            </td>
                        </tr>     
                    </tbody>
            </table> 
    }

    renderAllWorkers(){        
        return this.props.allWorkers === null || this.props.allWorkers.length === 0
            ? <p><em>Все распределены</em></p>
            : <table>
                <tbody>
                    {this.props.allWorkers.map(worker =>
                            <tr>
                                <td>                                
                                    {worker.fullName}
                                </td>
                                <td>
                                    {
                                        this.state.editMain
                                        ?<button onClick={e => {
                                            this.setState({editMain: false})
                                            this.props.editMain(worker, this.props.OrderId)
                                        }}>Изменить на</button>
                                        :<button onClick={e => this. props.addWorker(worker, this.props.OrderId)}>Добавить</button>
                                    }
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
    }

    renderSideWorkers(){        
        return this.props.sideWorkers.length === 0 || this.props.sideWorkers === null
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
    }
    
}

// export default connect(
//     (state: ApplicationState) => state.workers,
//     WorkersStore.actionCreators
// )(Workers as any)