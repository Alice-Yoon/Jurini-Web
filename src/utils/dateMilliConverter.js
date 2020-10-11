import moment from 'moment';

export const dateToMilli = (formattedDate) => {
    const milli = moment(formattedDate).valueOf();

    return milli;
}

export const milliToDate = () => {

}