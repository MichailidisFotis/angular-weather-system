export interface CurrentWeather {
  name: string;
  temperature_celc: number;
  humidity: number;
  wind_kph: number;
  time: string;
  condition: {
    code: number;
    icon: string;
    text: string;
  };
}
