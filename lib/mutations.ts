import fetcher from './fetcher';

export const auth = (
  mode: 'signup | signin',
  data: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, data);
};
