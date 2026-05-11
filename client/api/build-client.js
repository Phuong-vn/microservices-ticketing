import axios from 'axios';

const buildClient = (context) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      context,
    });
  }
  return axios;
};

export default buildClient;
