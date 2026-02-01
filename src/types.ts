interface Weather {
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
}

interface ForecastDay {
    date: string;
    tempHigh: number;
    tempLow: number;
    description: string;
    icon: string;
}
