import React, { useState, useEffect } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { weatherApiRef } from '../../api/WeatherApi';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WeatherResponse } from '../../api/types';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    maxWidth: 400,
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  cardContent: {
    paddingTop: theme.spacing(1),
  },
  weatherDetail: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherImage: {
    width: 50,
    height: 50,
  },
}));

export const WeatherCardComponent = () => {
  const classes = useStyles();
  const weatherApi = useApi(weatherApiRef);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Removed errorResponse

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const weatherData: WeatherResponse = await weatherApi.getWeather();
        setWeather(weatherData);
        setError(null);
      } catch (err) {
        console.error(`Failed to fetch weather data: ${err}`);
        setError('Failed to fetch weather data');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [weatherApi]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">
          Weather in {weather?.location.name || 'Unknown Location'}
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          weather && (
            <>
              <div className={classes.weatherDetail}>
                <Typography variant="h6">{weather.current.temperature}°C</Typography>
                <img src={weather.current.weather_icons[0]} alt="Weather Icon" className={classes.weatherImage} />
              </div>
              <Typography>{weather.current.weather_descriptions.join(', ')}</Typography>
              <Typography>Wind: {weather.current.wind_speed} km/h</Typography>
              <Typography>Humidity: {weather.current.humidity}%</Typography>
              <Typography>Feels Like: {weather.current.feelslike}°C</Typography>
              <Typography>Visibility: {weather.current.visibility} km</Typography>
              <Typography>Local Time: {weather.location.localtime}</Typography>
              <Typography>Day/Night: {weather.current.is_day === 'yes' ? 'Day' : 'Night'}</Typography>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};
