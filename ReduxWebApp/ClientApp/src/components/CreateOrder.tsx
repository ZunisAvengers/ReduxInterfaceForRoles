import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CreateOrderStore from '../store/CreateOrder';

type CreateOrderProps = CreateOrderStore.CreateOrderState & typeof CreateOrderStore.actionCreators

class CreateOrder extends React.PureComponent<CreateOrderProps>{
    public render(){
        var address = '', plan =''
        return(
            <form onSubmit={e => {
                e.preventDefault()
                this.props.createOrder(address, plan)
                if(this.props.isComplite){
                    address = ''
                    plan =''
                }
                }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Адрес:
                            </td>                    
                            <td>
                                <input type='text' onChange={e => address = e.target.value}></input>
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
                                <input type='text' onChange={e => plan = e.target.value}></input>
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
    (state: ApplicationState) => state.craeteOrder ,
    CreateOrderStore.actionCreators
  )(CreateOrder as any);