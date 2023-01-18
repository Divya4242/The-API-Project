import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Player } from '@lottiefiles/react-lottie-player';
import CurAnimation from './lotties/CurEx.json';
import CurButton from './lotties/CurExButton.json';
import Accordion from 'react-bootstrap/Accordion';

function ForExApi() {

    const [amount, SetAmount] = useState(0);
    const [countriesList, SetcountriesList] = useState([]);
    const [countryOne, SetCountryOne] = useState("");
    const [countryTwo, SetCountryTwo] = useState("");
    const [startDate, SetStartDate] = useState("");
    const [endDate, SetEndDate] = useState("");
    const [baseCurrency, SetBaseCurrency] = useState("");
    const [convertedAmount, SetConvertedAmount] = useState(0);
    const [flucuateAmount, SetFlcuateAmount] = useState(0);
    const [startDataAmount, SetStartDateAmount] = useState(0);
    const [endDateAMount, SetEndDateAmount] = useState(0);
    const [cardShowOne, SetCardShowOne] = useState(false);
    const [cardShowTwo, SetCardShowTwo] = useState(false);
    const [displayAnimation, SetDisplayAnimation] = useState("hidden");

    const GetCountryList = async () => {
        if (countriesList.length !== 0) {

        }
        else {
            let short = [], i = 0;
            let detail = [];
            const url = `https://api.apilayer.com/currency_data/list?apikey=${process.env.REACT_APP_APIKEY}`;
            const result = await fetch(url);
            const data = await result.json();
            for (let curdata of Object.keys(data.currencies)) {
                short[i] = curdata;
                i++;
            }
            i = 0;
            for (let curdata of Object.values(data.currencies)) {
                detail[i] = curdata;
                i++;
            }
            for (let j = 0; j < short.length; j++) {
                short[j] = short[j] + ": " + detail[j];
            }
            SetcountriesList(short);
        }
    }

    useEffect(() => {
        GetCountryList();
    }, [])
    const SelectCountryOne = (e) => {
        let country_one = e;
        SetCountryOne(country_one.slice(0, 3))
    }
    const SelectCountryTwo = (e) => {
        let country_two = e;
        SetCountryTwo(country_two.slice(0, 3))
    }

    const SelectBaseCurrency = (e) => {
        let basecur = e;
        SetBaseCurrency(basecur.slice(0, 3))
    }

    const ConvertCurrency = async () => {
        SetDisplayAnimation("visible")
        const url = `https://api.apilayer.com/currency_data/convert?to=${countryTwo}&from=${countryOne}&amount=${amount}&apikey=${process.env.REACT_APP_APIKEY}`;
        const result = await fetch(url);
        const data = await result.json();
        SetConvertedAmount((data.result).toFixed(2));
        SetDisplayAnimation("hidden");
        SetCardShowOne(true)
    }

    const fluctuation = async () => {
        SetDisplayAnimation("visible")
        const url = `https://api.apilayer.com/fixer/fluctuation?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&apikey=${process.env.REACT_APP_APIKEY}`;
        const result = await fetch(url);
        const data = await result.json();
        SetDisplayAnimation("hidden");
        SetCardShowTwo(true);
        let famount = data.rates.INR.change;
        let samount = data.rates.INR.start_rate;
        let eamount = data.rates.INR.end_rate;
        SetFlcuateAmount(famount.toFixed(2));
        SetStartDateAmount(samount.toFixed(2));
        SetEndDateAmount(eamount.toFixed(2));
    }
    return (
        <body>
            <br />
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-0 px-md-2 text-center text-lg-start my-2">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-10 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>Foreign Exchange Calculator</h1>
                            <p className="mb-2 opacity-70" style={{ color: "hsl(218, 81%, 85%)", position: "relative", bottom: "30px", fontSize: "22px" }}>
                                Get information about foreign exchange rate of two different currencies and fluctuation rate of any specific currency.<br />
                            </p>
                            <FormControl sx={{ m: 1, minWidth: 340 }} style={{ position: "relative", right: "10px", backgroundColor: "#364f6b", borderRadius: "10px", color: "black", }}>
                                <InputLabel style={{ color: "hsl(218, 81%, 95%)" }} id="demo-simple-select-standard-label">Currency you would like to convert from</InputLabel >
                                <Select style={{ color: "hsl(218, 81%, 95%)" }} labelId="demo-simple-select-standard-label" id="catagory" onChange={(e) => { SelectCountryOne(e.target.value) }} label="Source Country">
                                    {
                                        countriesList.map((curele) => {
                                            return (
                                                <MenuItem value={`${curele}`}>{curele}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl> <br />
                            <div className="col-md-6 mb-4">
                                <div className="form-outline" >
                                    <label className="form-label" style={{ color: "hsl(218, 81%, 95%)" }} htmlFor="titlein">Amount</label>
                                    <input type="text" id="titlein" onChange={(e) => { SetAmount(e.target.value) }} className="form-control" autoComplete="on" placeholder="Example: 100" />
                                </div>
                            </div>
                            <FormControl sx={{ m: 1, minWidth: 340 }} style={{ position: "relative", right: "10px", backgroundColor: "#364f6b", borderRadius: "10px", color: "black", }}>
                                <InputLabel style={{ color: "hsl(218, 81%, 95%)" }} id="demo-simple-select-standard-label">Currency you would like to convert to</InputLabel >
                                <Select style={{ color: "hsl(218, 81%, 95%)" }} labelId="demo-simple-select-standard-label" id="catagory" onChange={(e) => { SelectCountryTwo(e.target.value) }} label="Source Country">
                                    {
                                        countriesList.map((curele) => {
                                            return (
                                                <MenuItem value={`${curele}`}>{curele}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl> <br />
                            {displayAnimation === "hidden" ? <> </> : <Player src={CurAnimation} className="player" loop autoplay style={{ height: '300px', width: '300px', position: "relative", left: "20px", contentVisibility: `${displayAnimation}` }} />}
                            <div className="col-md-6 mb-4">
                                <div className="form-outline" >
                                    <label className="form-label" style={{ color: "hsl(218, 81%, 95%)" }} htmlFor="titlein">Output</label>
                                    <input type="text" id="titlein" disabled={true} value={convertedAmount} className="form-control" />
                                </div>
                            </div>
                            {cardShowOne ? <div> <Card >
                                <Card.Body>{amount} {countryOne} will be {convertedAmount} in {countryTwo}.</Card.Body>
                            </Card> <br /> </div> : <> </>}

                            <button type="submit" onClick={() => { ConvertCurrency() }} className="btn btn-primary btn-block mb-4">
                                Submit <Player src={CurButton} className="player" loop autoplay style={{ height: '50px', width: '50px' }} />
                            </button><br />
                            <span style={{ color: "hsl(218, 81%, 95%)" }}> <br /> Find out flucuation rate of INR - Indian Rupee to any different currency.</span> <br /> <br />
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="titlein" style={{ color: "hsl(218, 81%, 95%)" }}>Start Date</label>
                                    <input type="date" onChange={(e) => { SetStartDate(e.target.value) }} value={startDate} id="datein" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="titlein" style={{ color: "hsl(218, 81%, 95%)" }}>End Date</label>
                                    <input type="date" onChange={(e) => { SetEndDate(e.target.value) }} value={endDate} id="datein" className="form-control" />
                                </div>
                            </div>
                            <FormControl sx={{ m: 1, minWidth: 340 }} style={{ position: "relative", right: "10px", backgroundColor: "#364f6b", borderRadius: "10px", color: "black", }}>
                                <InputLabel style={{ color: "hsl(218, 81%, 95%)" }} id="demo-simple-select-standard-label">Base Currency</InputLabel >
                                <Select style={{ color: "hsl(218, 81%, 95%)" }} labelId="demo-simple-select-standard-label" id="catagory" onChange={(e) => { SelectBaseCurrency(e.target.value) }} label="Source Country">
                                    {
                                        countriesList.map((curele) => {
                                            return (
                                                <MenuItem value={`${curele}`}>{curele}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <span style={{ color: "hsl(218, 81%, 95%)" }}> <br /> Target Currency is set to INR - Indian Rupee</span> <br /> <br />
                            {displayAnimation === "hidden" ? <> </> : <Player src={CurAnimation} className="player" loop autoplay style={{ height: '300px', width: '300px', position: "relative", left: "20px", contentVisibility: `${displayAnimation}` }} />}
                            <div className="col-md-6 mb-4">
                                <div className="form-outline" >
                                    <label className="form-label" style={{ color: "hsl(218, 81%, 95%)" }} htmlFor="titlein">Output</label>
                                    <input type="text" id="titlein" disabled={true} value={"₹" + flucuateAmount} className="form-control" />
                                </div>
                            </div>
                            {cardShowTwo ? <div> <Card >
                                <Card.Body>Fluctuated amount is ₹{flucuateAmount} to 1 {baseCurrency} from {startDate} to {endDate} with the starting rate of ₹{startDataAmount} and ending rate of ₹{endDateAMount}.</Card.Body>
                            </Card> <br /> </div> : <> </>}
                            <p className="mb-2 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                                <button type="submit" onClick={() => { fluctuation() }} className="btn btn-primary btn-block mb-6">
                                    Submit <Player src={CurButton} className="player" loop autoplay style={{ height: '50px', width: '50px' }} />
                                </button><br /> <br />
                            </p>
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>About ForEx Calculator</Accordion.Header>
                                    <Accordion.Body>
                                        The foreign exchange rate tells you that a salary of 80,000 Euros can be converted into 100,000 US Dollars.
                                        A currency fluctuation rate indicates how much the rupee fluctuates over a specific time period. <a href="https://apilayer.com/marketplace/currency_data-api">Currency Data API</a> were used for converting two different currencies, while <a href="https://apilayer.com/marketplace/fixer-api">Fixer API</a> were used for fluctuation rate calculation.
                                        API documentations for both APIs have been provided by amazing people with great clarity.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> <br /> <br />
                        </div>
                    </div>
                    <h6 style={{ color: "#1f4287", justifyContent: "center", position: "relative", display: "flex" }}>© 2023 Divya Patel. All Rights Reserved</h6>
                </div>
            </section>
        </body>
    )
}

export default ForExApi;