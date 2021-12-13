import Axios from 'axios';
import VueCookies from 'vue-cookies';
import { createToast } from 'mosha-vue-toastify';
import router from '../router';

const APIBaseURL = process.env.VUE_APP_BACKEND_URL;

const adapter = Axios.create({
  baseURL: APIBaseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

adapter.interceptors.request.use(
  config => {
    config.headers['Authorization'] = VueCookies.get('token')
      ? 'Bearer ' + VueCookies.get('token')
      : '';
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

function eachRecursive(obj) {
  for (var k in obj) {
    if (typeof obj[k] == 'object' && obj[k] !== null) eachRecursive(obj[k]);
    else if (obj[k] == null) obj[k] = '';
  }
}

export default {
  install(app) {
    adapter.interceptors.response.use(
      response => {
        eachRecursive(response.data);
        return response;
      },
      error => {
        if (error.response) {
          if (
            error.response.status === 404 ||
            error.response.status === 401 ||
            error.response.status === 500 ||
            error.response.status === 503
          ) {
            VueCookies.remove('token');
            router.push('/');
          }
        }

        if (error.message === 'Network Error') {
          console.log("Can't reach server");
          createToast("Can't reach server, please try again later", {
            position: 'bottom-center',
            hideProgressBar: true,
            toastBackgroundColor: 'blue'
          });
          router.push('/');
        }

        return Promise.reject(error);
      }
    );

    var evtSource = null;

    var api = {
      getUser() {
        return adapter.get('/users/me');
      },
      isAdmin() {
        return adapter.get('/users/isAdmin');
      },
      getAllUsers() {
        return adapter.get('/users');
      },
      createChallengeSignup() {
        return adapter.post('/auth/challenge?signup=1');
      },
      createChallengeSignin() {
        return adapter.post('/auth/challenge?signin=1');
      },
      waitChallengeValidation(challenge, next) {
        evtSource = new EventSource(APIBaseURL + '/auth/sse/' + challenge, {
          xhrHeaders: {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive'
          }
        });

        evtSource.addEventListener(
          'message',
          event => {
            const response = JSON.parse(event.data).data;
            console.log('Receive elements from stream : ', response);
            if (
              response.status == 'validated' &&
              response.challenge == challenge
            ) {
              console.log('Great, you did sign in');
              evtSource.close();
              return next(response);
            } else if (response.status == 'expired') {
              console.log('Challenge expired, you did not sign in');
              evtSource.close();
              return next(response);
            } else {
              next(response);
            }
          },
          false
        );

        evtSource.addEventListener(
          'error',
          event => {
            if (event.readyState === EventSource.CLOSED) {
              console.log('Event was closed');
              console.log(EventSource);
            }
          },
          false
        );
        return evtSource;
      },
      closeChallengeValidation() {
        if (evtSource) evtSource.close();
      }
    };
    app.provide('$api', api);
  }
};
