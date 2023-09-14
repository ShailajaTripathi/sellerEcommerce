import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './Redux-Toolkit/store'
import { Provider } from 'react-redux'
import 'rc-time-picker/assets/index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/src/sweetalert2.scss'
import './assets/css/style.scss'
import './assets/css/media.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <BrowserRouter basename={process.env.REACT_APP_BASE_URL} >
            <App />
        </BrowserRouter>{' '}
    </Provider>
)
