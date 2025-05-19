import axios from 'axios';
import { useParams } from 'next/navigation';

const useApi = (locale) => {
  const params = useParams();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    params: {
      locale: params.locale === 'kn' ? 'kn-IN' : params.locale || 'en',
      populate: '*'
    },
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_TOKEN_SECRET}`
    }
  });
  return axiosInstance;
};

export default useApi;


