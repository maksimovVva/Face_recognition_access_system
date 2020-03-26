import {Component} from 'react';
import {connect} from 'react-redux';
import {app, app__dashboard} from './app.styles.css';
import classnames from 'classnames';

const _content = class extends Component {

    render() {
        const {children} = this.props;

        return (
            <div className={classnames(app, app__dashboard)} >
                <div>
                    {children}
                </div>
            </div>
        );
    }
};
const contentMapStateToProps = (state) => ({
});
const Content = connect(contentMapStateToProps)(_content);

const App = class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content>
                {this.props.children}
            </Content>
            );
    }
};
const appMapStateToProps = (state) => ({

});
export default connect(appMapStateToProps)(App);