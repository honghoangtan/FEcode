import classNames from 'classnames/bind';
import styles from './WeatherApp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faDroplet, faMagnifyingGlass, faWind } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function WeatherApp() {
    let api_key = 'dd94f859a0e52d6e4767fddf735f04a7';

    const search = async () => {
        const element = document.getElementsByClassName('city-input');
        if (element[0].value === '') {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementById('humidity-percent');
        const wind = document.getElementById('wind-rate');

        const temprature = document.getElementById('weather-temp');
        // const location = document.getElementsByClassName('weather-location');
        const location = document.getElementById('location');

        humidity.innerHTML = data.main.humidity;
        temprature.innerHTML = data.main.temp;
        wind.innerHTML = data.wind.speed;
        location.innerHTML = data.name;
        console.log(humidity);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('top-bar')}>
                <input className={cx('city-input')} placeholder="Search"></input>
                <button
                    className={cx('search-btn')}
                    onClick={() => {
                        search();
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <div className={cx('weather-img')}>
                <FontAwesomeIcon icon={faCloudSun} />
            </div>
            <div className={cx('weather-temp')} id="weather-temp">
                24C
            </div>
            <div className={cx('weather-location')} id="location">
                London
            </div>
            <div className={cx('data-container')}>
                <div className={cx('element')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faDroplet}></FontAwesomeIcon>
                    <div className={cx('data')}>
                        <div className={cx('humidity-percent')} id="humidity-percent">
                            64%
                        </div>
                        <div className={cx('text')}>humidity</div>
                    </div>
                </div>

                <div className={cx('element')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faWind}></FontAwesomeIcon>
                    <div className={cx('data')}>
                        <div className={cx('wind-rate')} id="wind-rate">
                            18 km/h
                        </div>
                        <div className={cx('text')}>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
