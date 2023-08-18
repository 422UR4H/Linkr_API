import axios from "axios";

export default async function urlMetadata(link)
{
    return axios.get(`https://jsonlink.io/api/extract?url=${link}`);
}