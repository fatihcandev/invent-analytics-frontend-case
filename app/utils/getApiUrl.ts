import { RequestParams } from '../types';

export const getApiUrl = (requestParams: RequestParams) => {
  const params = new URLSearchParams(requestParams);
  return `https://www.omdbapi.com?apikey=${process.env.NEXT_PUBLIC_API_KEY}&${params.toString()}`;
};

export default getApiUrl;
