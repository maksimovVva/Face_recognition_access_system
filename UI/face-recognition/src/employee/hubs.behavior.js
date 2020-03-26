
import $ from "jquery";
import * as signalR from '@aspnet/signalr';

const UPDATE_EMPLOYEES = "UPDATE_EMPLOYEES";
const NEW_PUSH = "NEW_PUSH";
const HUB_CONNECTED = "HUB_CONNECTED";
const HUB_DISCONNECTED = "HUB_DISCONNECTED";

const listenToEmployee = () => { 
    // const hubConnection = new HubConnection('http://localhost:56711/user');
    
    // hubConnection.start()
    //     .then(() => console.log('Connection started!'))
    //     .catch(err => console.log('Error while establishing connection :('));
    // hubConnection.on('updateEmployees', (receivedMessage) => {
    //     console.log("что то получил");
    //     // const text = `${nick}: ${receivedMessage}`;
    //     // const messages = this.state.messages.concat([text]);
    //     // this.setState({ messages });
    // });
    return {
        type: HUB_CONNECTED,
        // hubConnection
    }; 
}; 
    
// const stopListen = () => { 
//     const hub = $.connection.employee; 
//     if (!hub || !hub.client) { 
//         return; 
//     } 
//     $.connection.hub.stop(); 
//     return {
//         type: HUB_DISCONNECTED 
//     }; 
// };

const reducers = {
    [HUB_CONNECTED]: (state, hubConnection) => {
        return {
            ...state,
            hubConnection: hubConnection
        }
    },
    [UPDATE_EMPLOYEES]: (state, employees) => {
        return {
            ...state,
            updatedEmployees: employees
        }
    },
    [NEW_PUSH]: (state, pushes) => {
        return {
            ...state,
            newPushes: pushes
        }
    }

}

export {reducers}
export default listenToEmployee;