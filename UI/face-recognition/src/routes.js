import {Redirect, Route} from 'react-router';
import {App} from './containers';

export default (
    <div>
        <Redirect from="/" to="dashboard"/>
        <Route path="/" component={App}>
            <Route path="/dashboard" component={App}/>
        </Route>
    </div>
);
