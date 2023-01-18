import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';

function WeatherApi() {
    const [city, SetCity] = useState("");
    const [fcity, SetfCity] = useState("");
    const [search, Setsearch] = useState("");
    const [day, SetDay] = useState("");
    const [time, SetTime] = useState("");
    const [sunRise, SetSunRise] = useState("");
    const [sunSet, SetSunSet] = useState("");
    const [errorMessage, SetErrorMessage] = useState("");

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const WheatherData = async () => {
        if (!fcity) {
        }
        else {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${fcity}&units=metric&appid=${process.env.REACT_APP_APIKEYWEATHER}`;
            const result = await fetch(url);
            const data = await result.json();
            if (data.message === "city not found") {
                SetErrorMessage("Please enter vadlid city name");
            }
            else {
                SetErrorMessage("");
                Setsearch(data);
                SetDay(days[new Date().getDay() - 1]);
                let d = new Date()
                let localTime = d.getTime()
                let localOffset = d.getTimezoneOffset() * 60000
                let utc = localTime + localOffset
                var atlanta = utc + (1000 * data.timezone);
                let nd = String(new Date(atlanta));
                SetTime(nd.slice(16, 21))
                let unix = data.sys.sunrise + data.timezone;
                var date = new Date(unix * 1000);
                let sunr = date.toUTCString();
                // console.log(date.toUTCString());
                SetSunRise(sunr.slice(17, 22));
                unix = data.sys.sunset + data.timezone;
                date = new Date(unix * 1000);
                let suns = date.toUTCString();
                // console.log(date.toUTCString());
                SetSunSet(suns.slice(17, 22))
            }
        }
    }

    useEffect(() => {
        WheatherData();
    }, [fcity])

    const GetWheather = () => {
        SetfCity(city);
    }

    return (
        <body>
            <br />
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-0 px-md-2 text-center text-lg-start my-2">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-10 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}> Find out how your city's weather is</h1>
                            <p className="mb-2 opacity-70" style={{ color: "hsl(218, 81%, 85%)", position: "relative", bottom: "30px", fontSize: "22px" }}>
                                Enter your City name to get weather detail of your city.<br /></p>
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="titlein" style={{ color: "hsl(218, 81%, 95%)" }}>City</label>
                                    <input type="text" onChange={(e) => { SetCity(e.target.value) }} placeholder="Example: Ahmedabad" id="titlein" className="form-control" autoComplete="on" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="titlein" style={{ color: "hsl(218, 81%, 95%)" }}>Output</label>
                                    <textarea style={{ height: "110px" }} type="text" disabled="true" value={search !== "" ? errorMessage !== "" ? errorMessage : "Temprature in " + fcity + ", " + search.sys.country + " : " + search.main.temp + "°C " + search.weather[0].main + "                                                             " + "Date and Time : " + day + ", " + time + "                                            " + "Sun Rise : " + sunRise + "                                               " + "Sun Set : " + sunSet : errorMessage !== "" ? errorMessage : "0° Celcius"} id="titlein" className="form-control" />
                                    {/* <textarea style={{ height: "110px" }} type="text" disabled="true" value={search !== "" ? errorMessage !== "" ? errorMessage : <h6> "Temprature in " + {fcity} + ", " + {search.sys.country} + " : " + {search.main.temp} + "°C " + {search.weather[0].main} + <br/> + "Date and Time : " + {day} + ", " + {time} + <br/> + "Sun Rise : " + {sunRise} + <br/> + "Sun Set : " + {sunSet} </h6> : errorMessage !== "" ? errorMessage : "0° Celcius"} id="titlein" className="form-control" /> */}
                                </div>
                            </div>
                            <button type="submit" onClick={GetWheather} className="btn btn-primary btn-block mb-4">
                                Submit
                            </button><br />
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>About Weather Details</Accordion.Header>
                                    <Accordion.Body>
                                        For the purpose of getting weather details of any city, I have used the Openweathermap API.
                                        This site clearly describes the use of this API, and there are many great APIs available from this organization
                                        for gathering current and forecast weather data. The above functionality can be found in <a href="https://openweathermap.org/current">Current Weather Data API</a>. For more information, visit the <a href="https://openweathermap.org/api">Openweathermap</a>.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> <br /> <br />
                            <br /> <br />
                        </div>
                    </div>
                    <h6 style={{ color: "#1f4287", justifyContent: "center", position: "relative", display: "flex" }}>© 2023 Divya Patel. All Rights Reserved</h6>
                </div>
            </section>
        </body>
    )
}

export default WeatherApi;