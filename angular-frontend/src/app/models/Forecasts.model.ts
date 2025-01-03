export interface Forecasts {
  // current: {
  //   name: string;
  //   temperature_celc: number;
  //   humidity: number;
  //   wind_kph: number;
  //   time: string;
  //   condition: {
  //     code: number;
  //     icon: string;
  //     text: string;
  //   };
  // };

      condition: string,
      date: string,
      humidity: number,
      icon: string,
      name: string,
      temperature_celc: number

  
}
