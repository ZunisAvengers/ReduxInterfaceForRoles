import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CreateOrderStore from '../store/CreateOrder';

type CreateOrderProps = CreateOrderStore.CreateOrderState & typeof CreateOrderStore.actionCreators

class CreateOrder extends React.PureComponent<CreateOrderProps>{
    public render(){
        return(
            <form onSubmit={e => this.props.createOrder(this.props.address, this.props.plan)}>
                <dl className="row">
                    <dt className = "col-sm-2">
                        Адресс:
                    </dt>                    
                    <dd className = "col-sm-10">

                    </dd>
                    <span className="text-danger">
                        {this.props.addressMessage}
                    </span>
                    <dt className = "col-sm-2">
                        Краткая информация:
                    </dt>
                    <dd className = "col-sm-10">
                        
                    </dd>                    
                    <span className="text-danger">
                        {this.props.addressMessage}
                    </span>
                </dl>
                <input type='submit' value='Создать'></input>
            </form>
        )
    }
}