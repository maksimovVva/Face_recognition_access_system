import { mergeReducers } from "core"; 

const SELECT_PAGE = "SELECT_PAGE"; 

const initialState = { 
    selectedPage: "employees" 
}; 

const selectPage = pageName => { 
    return { 
        type: SELECT_PAGE, 
        pageName 
    }; 
}; 

const reducer = mergeReducers( 
{ 
    [SELECT_PAGE]: (state, { pageName }) => { 
        return { 
                ...state, 
                selectedPage: pageName 
            }; 
        } 
}, 
    initialState 
); 

export { reducer }; 
export default selectPage;