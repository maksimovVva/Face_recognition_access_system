import moment from "moment";

const Day = ({ date, showTime, locale }) => {
    require(`moment/locale/${locale}`);

    return moment(date).locale(locale).format(`LL${showTime ? "L" : ""}`);
};

export default Day;
