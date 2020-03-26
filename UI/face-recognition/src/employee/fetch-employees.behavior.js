import { ASYNC_FETCH, begin, success, failure } from "core";
import { pick } from "lodash";
import moment from "moment";

const FETCH_EMPLOYEE = "FETCH_EMPLOYEE";

const fetchEmployeesRequest = (
    take,
    skip
) => ({
    url: `/api/employees/load`,
    options: {
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            take,
            skip
        }),
        method: "POST"
    }
});

const fetchEmployees = ({
    reset = false,
    take = 20,
    lastTaken
}) => {
    let sort = {}
    if (!reset && lastTaken) {
        sort = {
            ...sort,
            ...lastTaken
        };
    }

    return {
        args: { reset, take },
        request: fetchEmployeesRequest(
            take,
            lastTaken
        ),
        type: ASYNC_FETCH,
        id: FETCH_EMPLOYEE
    };
};

const reducers = {
    [begin(FETCH_EMPLOYEE)]: (state, action) => {
        return {
            ...state,
            loading: true,
            items: action.reset ? [] : state.items,
            itemsCount: action.reset ? 0 : state.itemsCount,
        };
    },
    [success(FETCH_EMPLOYEE)]: (state, action) => {
        const response = action.response;
        const totalCount = action.reset
            ? response.length
            : state.items.length + response.length;
            debugger
        const recievedItems = response.map(item => ({
            id: item.Id,
            fullName: item.FullName,
            firstName: item.FirstName,
            middleName: item.MiddleName,
            lastName: item.LastName,
            department: { id: item.Department.Id, name: item.Department.Name },
            securityLevels: item.SecurityLevel.map(s => ({id: s.Id, name: s.Name})),
            status: { id: item.Status.Id, name: item.Status.Name},
            birthdayDate: item.BirthdayDate,
            passDate: moment(item.PassDate).format("DD/MM/YYYY"),
            lastStatusChangedDate: moment(item.LastStatusChangedDate).format("DD/MM/YYYY"),
            changedBy: moment(item.ChangedBy).format("DD/MM/YYYY"),
            pngPath: item.PngPath
        }));
        
        let [last] = response.slice(-1);
        last = _getEmployeeSortProperties(last);
debugger
        return {
            ...state,
            loading: false,
            lastTaken: last ? last.Id : state.lastTaken,
            items: action.reset
                ? recievedItems
                : state.items.concat(recievedItems),
            itemsCount:
                response.length >= action.take ? totalCount + 1 : totalCount
        };
    }
};

const labels = {
    [failure(FETCH_EMPLOYEE)]: res => {
        return res.error;
    }
};

function _getEmployeeSortProperties(employee) {
    return employee
        ? pick(employee, ["Id"])
        : undefined;
}

export { reducers, labels };
export default fetchEmployees;
