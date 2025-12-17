import { format } from 'date-fns';

export default function dateConverter(rowDate){
    if (!rowDate) return null;

    const ts = rowDate < 10_000_000_000 ? rowDate * 1000 : rowDate;
    const date = new Date(ts);

    return format(date, 'HH:mm dd.MM.yyyy');
}