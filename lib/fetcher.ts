import axios from "axios";


console.log("fetcher geldim res-- ");
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default fetcher;
