import PropTypes from "prop-types";

const employeeType = {
    id: PropTypes.number,
    fullName: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    department: PropTypes.object,
    status: PropTypes.object,
    passDate: PropTypes.string,
    lastStatusChangedDate: PropTypes.string,
    birthdayDate: PropTypes.string,
    securityLevels: PropTypes.array,
};

export default employeeType;
