import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Accordion from 'react-bootstrap/Accordion';

function PPPConverter() {
    const [countriesList, SetcountriesList] = useState([]);
    const [displayCountryOne, SetDisplayCountryOne] = useState("");
    const [displayCountryTwo, SetDisplayCountryTwo] = useState("Afghanistan");
    const [PPPFactorCountryOne, SetPPPFactorCountryOne] = useState(0);
    const [PPPFactorCountryTwo, SetPPPFactorCountryTwo] = useState(19.12);
    const [salary, SetSalary] = useState(0);
    const [cardShowOne, SetCardShowOne] = useState(false);
    const [PPPFinalAmount, SetPPPFinalAmount] = useState(0);
    const GetPPPCountryList = async () => {
        if (countriesList.length !== 0) {
        }
        else {
            let i = 0;
            let MyCountryList = [];
            const url = "https://retoolapi.dev/I8OuCH/data";
            const result = await fetch(url);
            const data = await result.json();
            for (i = 0; i < data.length - 1; i++) {
                MyCountryList[i] = data[i].Country_Name;
            }
            SetcountriesList(MyCountryList);
        }
    }

    useEffect(() => {
        GetPPPCountryList();
    }, [])
    const SelectPPPCountryOne = async (e) => {
        let country_one = e;
        const url = `https://api-generator.retool.com/Q5utmZ/data?Country_Name=${country_one}`;
        const result = await fetch(url);
        const data = await result.json();
        SetDisplayCountryOne(data[0].Country_Name)
        SetPPPFactorCountryOne(data[0].Year_2021)
    }
    const SelectPPPCountryTwo = async (e) => {
        let country_two = e;
        const url = `https://api-generator.retool.com/Q5utmZ/data?Country_Name=${country_two}`;
        const result = await fetch(url);
        const data = await result.json();
        SetDisplayCountryTwo(data[0].Country_Name)
        SetPPPFactorCountryTwo(data[0].Year_2021)
    }

    const GetPPPList = () => {
        SetCardShowOne(true);
        let amount = PPPFactorCountryTwo / PPPFactorCountryOne;
        let FinalAmount = salary * amount;
        SetPPPFinalAmount(FinalAmount.toFixed(2));
    }

    return (
        <body>
            <br />
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-0 px-md-2 text-center text-lg-start my-2">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-10 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}> Purchasing Power Parity Salary Converter.</h1>
                            <p className="mb-2 opacity-70" style={{ color: "hsl(218, 81%, 85%)", position: "relative", bottom: "30px", fontSize: "20px" }}>
                                Convert your salary from one currency to another using PPP<br />
                            </p>
                            <FormControl sx={{ m: 1, minWidth: 180 }} style={{ position: "relative", right: "10px", backgroundColor: "#364f6b", borderRadius: "10px", color: "black", }}>
                                <InputLabel style={{ color: "hsl(218, 81%, 95%)" }} id="demo-simple-select-standard-label">Source Country</InputLabel >
                                <Select style={{ color: "hsl(218, 81%, 95%)" }} labelId="demo-simple-select-standard-label" id="catagory" onChange={(e) => { SelectPPPCountryOne(e.target.value) }} label="Source Country">
                                    {
                                        countriesList.map((curele) => {
                                            return (
                                                <MenuItem value={`${curele}`}>{curele}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl> <br /> <br />
                            <div className="col-md-6 mb-4">
                                <div className="form-outline" >
                                    <label className="form-label" style={{ color: "hsl(218, 81%, 95%)" }} htmlFor="titlein">Salary in {displayCountryOne}'s Local Currency</label>
                                    <input type="text" inputmode="numeric" pattern="\d*" id="titlein" onChange={(e) => { SetSalary(e.target.value) }} className="form-control" autoComplete="on" placeholder="Example: 80,000" />
                                </div>
                            </div>
                            <FormControl sx={{ m: 1, minWidth: 180 }} style={{ position: "relative", right: "10px", backgroundColor: "#364f6b", borderRadius: "10px" }}>
                                <InputLabel style={{ color: "hsl(218, 81%, 95%)" }} id="demo-simple-select-standard-label">Target Country</InputLabel>
                                <Select style={{ color: "hsl(218, 81%, 95%)" }} labelId="demo-simple-select-standard-label" onChange={(e) => { SelectPPPCountryTwo(e.target.value) }}>
                                    {
                                        countriesList.map((curele) => {
                                            return (
                                                <MenuItem value={`${curele}`}>{curele}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            {displayCountryTwo === "Afghanistan" ? <span style={{ color: "hsl(218, 81%, 95%)" }}> <br /> Default target country is set to Afghanistan.</span> : <h1></h1>}
                            <br /> <br />
                            <div className="col-md-6 mb-4">
                                <div className="form-outline" >
                                    <label className="form-label" style={{ color: "hsl(218, 81%, 95%)" }} htmlFor="titlein">Output</label>
                                    <input type="text" id="titlein" disabled={true} value={PPPFinalAmount} className="form-control" />
                                </div>
                            </div> <br />
                            {cardShowOne ? <>  <Card >
                                <Card.Body>You require a salary of {PPPFinalAmount} in {displayCountryTwo}'s local currency to live a similar quality of life as you would with a salary of {salary} in {displayCountryOne}'s local currency.</Card.Body>
                            </Card> <br /> </> : <> </>}
                            <button type="submit" onClick={() => { GetPPPList() }} className="btn btn-primary btn-block mb-4">
                                Submit
                            </button><br />
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Learn More</Accordion.Header>
                                    <Accordion.Body>
                                        The foreign exchange rate tells you that a salary of 80,000 Euros can be converted into 100,000 US Dollars.
                                        What it doesn't tell you is if 100,000 USD in America can get you the same standard of living as 80,000 Euros does in France.
                                        How much money would you need in America to buy the same things that you would buy in France? <br /> <br />

                                        This is where <a rel="noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/Purchasing_power_parity"> Purchasing Power Parity (PPP)</a> comes in. Converting your salary using PPP,
                                        instead of the exchange rate, helps to give you a better approximation of what your standard of
                                        living would be like in two different countries. This can be handy to know if you're planning on moving,
                                        a remote worker, sending money abroad, or many other things.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> <br /> <br />
                            <br /> <br />
                        </div>
                        <span style={{ color: "#6c757d" }}><center>All data is provided by the wonderful people at <a rel="noreferrer" href="https://www.worldbank.org/en/home" target="_blank">The World Bank</a> </center></span>
                    </div>
                    <h6 style={{ color: "#1f4287", justifyContent: "center", position: "relative", display: "flex" }}>© 2023 Divya Patel. All Rights Reserved</h6>
                </div>
            </section>
        </body>
    )
}

export default PPPConverter;