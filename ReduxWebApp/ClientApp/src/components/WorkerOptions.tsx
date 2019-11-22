import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as WorkersStore from '../store/Workers';

type WorkersProps = WorkersStore.WorkersState & typeof WorkersStore.actionCreators

export class Workers extends React.PureComponent<WorkersProps>{
    
    componentWillMount(){
        this.props.loadWorkers();
    }

    render(){
        let content = !this.props.isLoading
            ? this.renderAllWorkers()
            : <p><em>Загруска...</em></p>
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
        return this.props.mainWorker.id === ''
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
        return(
            <table>
                <tbody>
                {this.props.allWorkers.map(worker =>
                        <tr>
                            <td>                                
                                {worker.fullName}
                            </td>
                            <td>
                                <button onClick={e => this.props.addWorker(worker, this.props.OrderId)}>Добавить</button>
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
                {this.props.sideWorkers.map(worker =>
                        <tr>
                            <td>                                
                                {worker.fullName}
                            </td>
                            <td>
                                <button >Удалить</button>
                            </td>
                        </tr>
                    )}
            </table>
        )
    }
}

// export default connect(
//     (state: ApplicationState) => state.workers,
//     WorkersStore.actionCreators
// )(Workers as any)