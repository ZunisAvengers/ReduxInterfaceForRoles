import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CreateOrderStore from '../store/CreateOrder';

type CreateOrderProps = CreateOrderStore.CreateOrderState & typeof CreateOrderStore.actionCreators

class CreateOrder extends React.PureComponent<CreateOrderProps>{
    public state = {
        address: '',
        plan: ''
    }
    
    public render(){
        return(
            <form onSubmit={e => {
                e.preventDefault()
                this.props.createOrder(this.state.address, this.state.plan)
                if(this.props.isComplite){
                    this.setState({address: '', plan: ''})
                }
                }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Адрес:
                            </td>                    
                            <td>
                                <input type='text' style={{width: "475px"}} onChange={e => this.setState({address: e.target.value})}></input>
                            </td>
                            <td>
                                <span className="text-danger" >{this.props.addressMessage}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Краткое описание:
                            </td>                    
                            <td>
                                <textarea
                                style={{height: "125px", width: "475px", minHeight: "125px", maxHeight: "125px", maxWidth: "475px"}}
                                onChange={e => this.setState({plan: e.target.value})}/>
                            </td>
                            <td>
                                <span className="text-danger">
                                    {this.props.planMessage}
                                </span>
                            </td>    
                        </tr>
                    </tbody>
                </table>
                <input type='submit' value='Создать'></input>
            </form>
        )
    }

}

export default connect(
    (state: ApplicationState) => state.craeteOrder,
    CreateOrderStore.actionCreators
  )(CreateOrder as any);