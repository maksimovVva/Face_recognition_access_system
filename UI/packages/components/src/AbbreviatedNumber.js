import PropTypes from "prop-types";
import abbreviate from "number-abbreviate";

const AbbreviatedNumber = ({ value }) => {
    return ("" + abbreviate(value)).toUpperCase();
};

AbbreviatedNumber.propTypes = {
    value: PropTypes.number.isRequired
};

export default AbbreviatedNumber;
