import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './App';

const createApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

// @ts-ignore
if (!window.cordova) {
  createApp();
} else {
  document.addEventListener('deviceready', createApp, false);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
