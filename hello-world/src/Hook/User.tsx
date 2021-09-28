import axios from 'axios';

const url = "https://run.mocky.io/v3/6b7111c4-cd47-40d8-ab19-8c7c9dd277bd"; 
// const url = 'https://jsonplaceholder.typicode.com/users';

const getData = (url: string) => {
    return axios.get(url, {
        headers: {
          "Content-Type": "application/json"
        },
      });
};

export const getDetail = async () => {
  const response = await getData(url);
  const data: any[] = response.data;
  return {
    ...data,
    statusCode: response.status,
  };
};