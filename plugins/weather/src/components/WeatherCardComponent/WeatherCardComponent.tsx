import React, { useState, useEffect } from 'react';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { weatherApiRef } from '../../api/WeatherApi';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WeatherResponse, ErrorResponse } from '../../api/types';

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
  const config = useApi(configApiRef);
  const weatherApi = useApi(weatherApiRef);
  const defaultLocation = config.getOptionalString('weather.defaultLocation') || 'Stockholm';
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const weatherData: WeatherResponse = await weatherApi.getWeather(defaultLocation);
        if (!weatherData.success && weatherData.error) {
          const errorInfo = weatherData.error;
          setError(`Error ${errorInfo.code}: ${errorInfo.type} - ${errorInfo.info}`);
          setErrorResponse(weatherData as ErrorResponse);
          setWeather(null);
        } else {
          setWeather(weatherData);
          setError(null);
          setErrorResponse(null);
        }
      } catch (err) {
        console.error(`Failed to fetch weather data: ${err}`);
        if (typeof err === 'object' && err !== null) {
          setErrorResponse(err as ErrorResponse);
        }
        setError('Failed to fetch weather data');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [defaultLocation, weatherApi]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">Weather in {defaultLocation}</Typography>
        {error ? (
          <>
            <Typography color="error">{error}</Typography>
            <Typography variant="body2" color="error">{JSON.stringify(errorResponse, null, 2)}</Typography>
          </>
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
              <Typography>Visibility: {weather.current.visibility} km}</Typography>
              <Typography>Local Time: {weather.location.localtime}</Typography>
              <Typography>Day/Night: {weather.current.is_day === 'yes' ? 'Day' : 'Night'}</Typography>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};
