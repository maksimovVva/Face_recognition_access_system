import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Loader, Overlay } from "components";
import AlertContainer from "notifications";

import EmployeesPage from "../employee/EmployeesPage";
import selectPageAction from "./select-page.behavior";

import "./App.css";
import { bindActionCreators } from "boilerplate/node_modules/redux";
import { connect } from "react-redux";
import * as signalR from "@aspnet/signalr";
import { actions as popupActions } from "../employee/employee-details";

import listenHubsAction from "../employee/hubs.behavior";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
        this.close = this._close.bind(this);
        props.hubsAction.listenHubs();
    }

    _close(){
        this.setState({isOpen: false})
    }
    componentDidMount() {
        console.log(signalR);
    }

    componentWillUnmount() {
        //this.connection.stop();
    }
    onEmployeeUpdate(res) {
        console.info("Yayyyyy, I just received a notification!!!", res);
    }
    render() {
        const isEmployeesPage = this.props.selectedPage === "employees";
        const {popupActions} = this.props;
        const {isOpen} = this.state;

        let employeesButtonColor, camerasButtonColor;

        if (isEmployeesPage) {
            employeesButtonColor = "primary";
            camerasButtonColor = "secondary";
        } else {
            employeesButtonColor = "secondary";
            camerasButtonColor = "primary";
        }

        const pages = {
            employees: EmployeesPage
        };
        return (
            <div className="app container">
                <div className="btn-group row controls btn-header">
                    <button
                        type="button"
                        className={`butn butn-${employeesButtonColor} btn-lg`}
                        onClick={() => this.props.selectPage("employees")}
                    >
                        СПИСОК СОТРУДНИКОВ
                    </button>
                    <button
                        type="button"
                        className={`butn butn-${camerasButtonColor} btn-lg`}
                        onClick={() => this.props.selectPage("cameras")}
                    >
                        КАМЕРЫ
                    </button>
                    <a
                    onClick={popupActions.open}
                        className="butn-plus"
                    >
                        +
                    </a>
                </div>
                {this.props.loading && (
                    <Overlay>
                        <Loader
                            type="Puff"
                            color="#343a40"
                            height="130"
                            width="130"
                        />
                    </Overlay>
                )}
                <div className="row workflow">
                    {isEmployeesPage ? <EmployeesPage /> : ""}
                </div>
                <AlertContainer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedPage: state.pages.selectedPage
    };
};

const mapDispatchToProps = dispatch => {
    const hubsActionCreators = {
        listenHubs: listenHubsAction
    };

    const popupActionCreators = {
        open: popupActions.open,
        close: popupActions.close,
        createEmployee: popupActions.createEmployee,
        updateEmployee: popupActions.updateEmployee
    };

    return {
        hubsAction: bindActionCreators(hubsActionCreators, dispatch),
        popupActions: bindActionCreators(popupActionCreators, dispatch),
        ...bindActionCreators({ selectPage: selectPageAction }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
