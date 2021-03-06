// // --- Imports ----
//
// // >>> React
// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//
// // >>> Redux
// import {Field, reduxForm} from 'redux-form';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as actions from '../../actions';
//
// // >>> Models
// import {Hub} as HubModel from '../../models'
//
// // >>> Components
// import CreateDialog from '../../components/CreateDialog';
//
// // >>> Containers
// import Footer from '../Footer';
// import HubContent from './HubContent.js';
//
// // >>> Material-UI
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import Checkbox from 'material-ui/Checkbox';
// import Toggle from 'material-ui/Toggle';
// import Snackbar from 'material-ui/Snackbar';
//
// // >>> Styles/CSS
// import '../../styles/app.css'
// import '../../styles/create-hub.css';
//
// // >>> Status Constants
// const STATUS_ENTER_DETAILS = 1;
// const STATUS_CREATED_HUB = 2;
// const STATUS_CREATED_ERROR = 3;
//
//
//
//
// const validate = (values) => {
//     const errors = {};
//
//     if (!values.name)
//         errors.name = "Please enter a name.";
//
//     if (!values.description || !(/\S/.test(values.description)))
//         errors.description = "Please enter a description.";
//
//     // if(!values.customurl || !(/\S/.test(values.customurl)) ) {
//     //   errors.customurl = "Please enter a custom url.";
//     // }
//     return errors;
// }
//
//
//
// class HubCreate extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     	this.state = {
// 			hub: null,
//         	submitDisabled: true,
//         	status: this.state.hubcreated ? STATUS_CREATED_HUB : STATUS_ENTER_DETAILS
//     	}
//
// 	}
//
//     handleFormSubmit = (values) => {
//         this.props.createHub(this.state.hub);
//     };
//
//     renderAuthenticationError() {
//         if (this.props.authenticationError) {
//             return <div className="alert alert-danger">{this.props.authenticationError}</div>
//         }
//         return <div></div>
//     }
//
//     getHint() {
//         if (this.state.isswitch) {
//             return "your-custom-url";
//         } else {
//             return this.state.hubCustomId;
//         }
//     }
//
//     enterName(e) {
// 		this.setState({...this.state, name: e.target.value});
//     }
//     enterDescription(e) {
//         this.setState({
//             ...this.state,
//             description: e.target.value
//         });
//     }
//
//     disableSubmit() {
//         if (this.state.name && this.state.name.length > 0 && this.state.description && this.state.description.length > 0) {
//             return false;
//         }
//         return true;
//
//     }
//
//     renderDialogSpecificToStatus(status) {
//
//         switch (status) {
//             case STATUS_ENTER_DETAILS:
//                 var style = {
//                     fontFamily: "Roboto"
//                 };
//                 return (
//                     <div className="dialog-special created shadow">
//                         <div className="foyer-header">
//                             <h3>Create Hub Now</h3>
//                         </div>
//                         <div className="clearfix foyer-wrapper">
//                             {this.renderAuthenticationError()}
//
//                             <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
//                                 <TextField hintText="AwesomeHub" disabled={false} value={this.state.name} floatingLabelText="Name" onChange={this.enterName} key={1} name="name" type="text"/>
//                                 <TextField onChange={this.enterDescription} value={this.state.description} key={2} floatingLabelText="Description" hintText="A cool hub that is cool" name="description"  type="text"/>
//                                 <div id="optional" className="clearfix">
//                                     <Toggle onToggle={(toggled) => {
//                                         this.setState({
//                                             ...this.state,
//                                             isswitch: !this.state.isswitch
//                                         });
//                                         console.log(!this.state.isswitch);
//                                     }} style={{
//                                         width: "auto",
//                                         display: "inline-block"
//                                     }}/>
//                                     <span style={style}>{`venos.co/`}</span><TextField key={3} hintText={(() => {
//                         return this.getHint()
//                     })()} disabled={!this.state.isswitch} name="customurl" type="text" style={style}/>
//                                 </div>
//
//                                 <RaisedButton disabled={(() => {return this.disableSubmit();})()} type="submit" label="Submit" primary={true}/>
//                             </form>
//                         </div>
//                     </div>
//                 );
//
//             case STATUS_CREATED_HUB:
//
//                 return (
//                      <Snackbar
//                        open={this.state.open}
//                        message="Hub successfully created!"
//                        action="OKAY"
//                        autoHideDuration={this.state.autoHideDuration}
//                        onActionTouchTap={this.handleActionTouchTap}
//                        onRequestClose={this.handleRequestClose}
//                      />
//                 )
//             case STATUS_CREATED_ERROR:
//                 return (
//                     <div className="dialog-special created shadow">
//                         <div className="foyer-header"></div>
//                         <div className="foyer-wrapper">
//                             <h4>Something unexpected happend</h4>
//
//                             <div className="foyer-interior">
//                                 <p>{`An error occured, maybe you did not fill in everything correctly?`}</p>
//                                 <input className="panel-finish mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Okay"/>
//                             </div>
//                         </div>
//                     </div>
//                 )
//
//             default:
//                 return <div>what</div>;
//
//         }
//     }
//
//     render() {
//         const dialog = this.renderDialogSpecificToStatus(this.state.status);
//         return (
//             <div id="create-wrapper" className="wrapper">
//                 <ReactCSSTransitionGroup transitionName="dialog" transitionEnterTimeout={1000} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={1000}>
//                     {dialog}
//                     <div className="overlay"></div>
//                 </ReactCSSTransitionGroup>
//
//
//             </div>
//
//         );
//     }
// }
//
// function mapStateToProps(state) {
//     return {authenticationError: state.auth.error, hubCreated: state.hub.created}
// }
//
// export default connect(mapStateToProps, actions)(reduxForm({form: 'createhub', validate})(Create));
