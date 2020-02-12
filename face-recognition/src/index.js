import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Provider} from 'react-redux';
import {hashHistory, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import './polyfills';
import routes from './routes';
import {configureStore} from './store';

import './css/index.global.css';

// Modal.setAppElement( document.getElementById('app-root'));

configureStore({}, (store) => {
    const EVENTS_TO_MODIFY = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel'];
    const originalAddEventListener = document.addEventListener.bind();
        document.addEventListener = (type, listener, options, wantsUntrusted) => {
        let modOptions = options;
        if (EVENTS_TO_MODIFY.includes(type)) {
            if (typeof options === 'boolean') {
            modOptions = {
                capture: options,
                passive: false,
            };
            } else if (typeof options === 'object') {
            modOptions = {
                passive: false,
                ...options,
            };
            }
        }
        
        return originalAddEventListener(type, listener, modOptions, wantsUntrusted);
    };
    
    const originalRemoveEventListener = document.removeEventListener.bind();
        document.removeEventListener = (type, listener, options) => {
        let modOptions = options;
        if (EVENTS_TO_MODIFY.includes(type)) {
            if (typeof options === 'boolean') {
            modOptions = {
                capture: options,
                passive: false,
            };
            } else if (typeof options === 'object') {
            modOptions = {
                passive: false,
                ...options,
            };
            }
        }
        return originalRemoveEventListener(type, listener, modOptions);
    };
    // temporary fix for Chrome 73

    const history = syncHistoryWithStore(hashHistory, store);

    const Root = () => (
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
    );

    ReactDOM.render(<Root/>, document.getElementById('app-root'));
});
