import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as RegistrationForm from '../../store/RegistrationForm'

type RegistrationProps = RegistrationForm.RegisterFormState & typeof RegistrationForm.actionCreators

class Registration extends React.PureComponent<RegistrationProps> {

}

export default connect(
    (state: ApplicationState) => state.registrationForm,
    RegistrationForm.actionCreators
  )(Registration as any);