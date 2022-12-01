import React, { useEffect, useState } from 'react'
import './Home.css'
import { FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import Each from './Each.js'
import {readFile, utils} from 'xlsx'
import Templeton from './Templeton'
import Hdfc from './Hdfc'
import Icici from './Icici'
import Sundaram from './Sundaram'

function Home() {

    const [fund, setFund] = useState(0)
    const [start,setStart] = useState("2013-01")
    const [end,setEnd] = useState("2021-12")
    const [scheme, setScheme] = useState(0)
    const [all, setAll] = useState(0);
    const [ret, setRet] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
    const [fluc,setFluc] = useState(0)
    const [best,setBest] = useState([0,0,0])
    const [best2, setBest2] = useState([0,0,0])
    const [best3, setBest3] = useState([0,0,0])
    const [best_day, setBestDay] = useState(100000)
    const [allFluc, setAllFluc] = useState([0,0,0])
    
    const fundChange = (event) => {
        setFund(event.target.value)
    }

    const schemeChange = (event) => {
        if(event.target.value===4) {
            let a = [0,0,0]
            a[0] = Analyse(1);
            a[1] = Analyse(2);
            a[2] = Analyse(3);
            setAllFluc(a);
            setAll(1)
        }
        else setScheme(event.target.value)
    }

    const dummy = ["-","-","-"]
    const templeton = ["Templeton India Value GR","Templeton India Equity Income Dir Gr","Templeton India Value Dir Gr"]
    const hdfc = ["HDFC Flexi Cap GR", "HDFC Arbitrage Dir IDCW Quaterly","HDFC Arbitrage Wholesale Normal IDCW"]
    const icici = ["Icici Prudentials All Seasons Bond Annual IDCW","ICICI Prudetials All Seasons Bond Gr","ICICI Prudentials All Seasons Bond Quaterly IDCW"]
    const sundaram = ["Sundaram small cap DIRGR","Sundaram Aggressive Hybrid Fund Dir Monthly IDCW","Sundaram Balanced Advantage Fund Dir Gr"]
    
    const allFunds = [dummy,templeton,hdfc,icici,sundaram]

    const getStarting = () => {
        return ""+ document.getElementById("start").value
    }

    const getEnding = () => {
        return ""+document.getElementById("end").value
    }

 
    const Analyse = (scheme) => {
        let start = getStarting();
        let end = getEnding();
        let start_month = start.substring(5)
        let start_year = start.substring(2,4)
        let end_month = end.substring(5)
        let end_year = end.substring(2,4)
        let highest = 0;
        let lowest = 10000;
        let highest_two = 0;
        let highest_four = 0;
        let best_day = 10000;
        if(fund===1){
            let array = []
            for(var day=1;day<31;day++)
            {
                let profit_percent = one_month(day,10000,start_month,start_year,end_month,end_year,Templeton[scheme-1]).toFixed(2) - 0.0
                if(profit_percent>highest){
                    highest = profit_percent
                    best_day = day;
                }
                if(profit_percent< lowest) lowest = profit_percent
                array[day-1]=profit_percent
            }
            setRet(array)
            highest_two = bimonthly(1,15,10000,start_month,start_year,end_month,end_year,Templeton[scheme-1]).toFixed(2) - 0.0;
            highest_four = weekly(1,8,15,22,10000,start_month,start_year,end_month,end_year,Templeton[scheme-1]).toFixed(2) - 0.0;

        }
        if(fund===2){
            let array = []
            for(var day=1;day<31;day++)
            {
                let profit_percent = one_month(day,10000,start_month,start_year,end_month,end_year,Hdfc[scheme-1]).toFixed(2) - 0.0
                if(profit_percent>highest)
                {
                    highest = profit_percent
                    best_day = day
                }
                if(profit_percent< lowest) lowest = profit_percent
                array[day-1]=profit_percent
            }
            setRet(array)
            highest_two = bimonthly(1,15,10000,start_month,start_year,end_month,end_year,Hdfc[scheme-1]).toFixed(2) - 0.0;
            highest_four = weekly(1,8,15,22,10000,start_month,start_year,end_month,end_year,Hdfc[scheme-1]).toFixed(2) - 0.0;
        }
        if(fund===3){
            let array = []
            for(var day=1;day<31;day++)
            {
                let profit_percent = one_month(day,10000,start_month,start_year,end_month,end_year,Icici[scheme-1]).toFixed(2) - 0.0
                if(profit_percent>highest)
                {
                    highest = profit_percent
                    best_day = day
                }
                if(profit_percent< lowest) lowest = profit_percent
                array[day-1]=profit_percent
            }
            setRet(array)
            highest_two = bimonthly(1,15,10000,start_month,start_year,end_month,end_year,Icici[scheme-1]).toFixed(2) - 0.0;
            highest_four = weekly(1,8,15,22,10000,start_month,start_year,end_month,end_year,Icici[scheme-1]).toFixed(2) - 0.0;

        }
        if(fund===4){
            let array = []
            for(var day=1;day<31;day++)
            {
                let profit_percent = one_month(day,10000,start_month,start_year,end_month,end_year,Sundaram[scheme-1]).toFixed(2) - 0.0
                if(profit_percent>highest){
                    highest = profit_percent
                    best_day = day
                }
                if(profit_percent< lowest) lowest = profit_percent
                array[day-1]=profit_percent
            }
            setRet(array)
            highest_two = bimonthly(1,15,10000,start_month,start_year,end_month,end_year,Sundaram[scheme-1]).toFixed(2) - 0.0;
            highest_four = weekly(1,8,15,22,10000,start_month,start_year,end_month,end_year,Sundaram[scheme-1]).toFixed(2) - 0.0;

        }
       
      
        console.log(highest)
        setFluc((highest-lowest).toFixed(2));

       if(all===0 || scheme===1) setBest([highest,highest_two,highest_four])
       else if(scheme===2) setBest2([highest,highest_two,highest_four])
       else setBest3([highest,highest_two,highest_four])
       setBestDay(best_day)

       return (highest-lowest).toFixed(2)
        
    }

    // Month = 1-12 , Year = 13-21
    const one_month = (day,monthly_investment,start_mon,start_yr,end_mon,end_yr,nav) => {
        let total_units=0;
        let total_mon=0;
        for(let yr=start_yr;yr<=end_yr;yr++){
            let end_monn=(yr==end_yr)?end_mon:12;
            for(let mon=start_mon;mon<=end_monn;mon++){
                total_mon++;
                total_units+=(monthly_investment/nav[yr-13][mon-1][day-1]);
            }
        }
        let total_invest=total_mon*monthly_investment;
        let return_total=nav[end_yr-13][end_mon-1][day-1]*total_units;
        let profit_percent= (return_total/total_invest)*100 ;

        //console.log(total_mon*monthly_investment + " " + return_total)
        return profit_percent
    }

    const bimonthly = (day1 , day2 , monthly_investment,start_mon,start_yr,end_mon,end_yr,nav  ) => {
        let total_units=0;
        let total_mon=0;
        monthly_investment = monthly_investment/2
    
        for(let yr=start_yr;yr<=end_yr;yr++){
            let end_monn=(yr===end_yr)?end_mon:12;
            for(let mon=start_mon;mon<=end_monn;mon++){
                total_mon++;
                total_units+=(monthly_investment/nav[yr-13][mon-1][day1-1]);
                total_units+=(monthly_investment/nav[yr-13][mon-1][day2-1]);
            }
        }
        let total_invest=total_mon*monthly_investment*2;
        let return_total=nav[end_yr-13][end_mon-1][29]*total_units;
        let profit_percent= (return_total/total_invest)*100 ;
    
        //console.log(total_mon*monthly_investment + " " + return_total)
    
         return profit_percent
    }

    function weekly(day1 , day2 ,day3 , day4 ,  monthly_investment,start_mon,start_yr,end_mon,end_yr,nav  ){
        let total_units=0;
        let total_mon=0;
        monthly_investment = monthly_investment/4
    
        for(let yr=start_yr;yr<=end_yr;yr++){
            let end_monn=(yr==end_yr)?end_mon:12;
            for(let mon=start_mon;mon<=end_monn;mon++){
                total_mon++;
                total_units+=(monthly_investment/nav[yr-13][mon-1][day1-1]);
                total_units+=(monthly_investment/nav[yr-13][mon-1][day2-1]);
                total_units+=(monthly_investment/nav[yr-13][mon-1][day3-1]);
                total_units+=(monthly_investment/nav[yr-13][mon-1][day4-1]);
            }
        }
        let total_invest=total_mon*monthly_investment*4;
        let return_total=nav[end_yr-13][end_mon-1][day4-1]*total_units;
        let profit_percent= (return_total/total_invest)*100 ;
    
            //console.log(total_mon*monthly_investment + " " + return_total)
    
         return profit_percent
    }

  return (
    <div className='container'>
        <div className='app-name'>  <h1 >Mutual Funds Analysis</h1></div>
        <FormControl>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fund}
                label="hdhd"
                onChange={fundChange}
                style={{border:"2px solid #f97b8b",backgroundColor:"white",width:"200px"}}
            >
                <MenuItem value={0}>Select Mutual Fund Family</MenuItem>
                <MenuItem value={1}>Templeton</MenuItem>
                <MenuItem value={2}>HDFC</MenuItem>
                <MenuItem value={3}>ICICI</MenuItem>
                <MenuItem value={4}>Sundaram</MenuItem>
            </Select>
        </FormControl>
        <span style={{margin:"5px"}}></span>
        <FormControl>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={scheme}
                label="hdhd"
                onChange={schemeChange}
                style={{border:"2px solid #6c6ce5",backgroundColor:"white",width:"200px"}}
            >
                <MenuItem value={0}>Select Scheme</MenuItem>
                <MenuItem value={1}>{allFunds[fund][0]}</MenuItem>
                <MenuItem value={2}>{allFunds[fund][1]}</MenuItem>
                <MenuItem value={3}>{allFunds[fund][2]}</MenuItem>
                <MenuItem value={4}>All</MenuItem>
            </Select>
        </FormControl>

        <div className='starting'>
            <label for="start">Start Month and Year : </label>
            <input type="month" id="start" name="start" value={start} min="2013-01" max="2021-12" onChange={(e) => setStart(e.target.value)}/>
        </div>

        <div className='ending'>
            <label for="end">End Month and Year : </label>
            <input type="month" id="end" name="end" value={end} min="2013-01" max="2021-12" onChange={(e) => setEnd(e.target.value)}/>
        </div>

        <button onClick={ () => Analyse(scheme)}>Analyse</button>

        {  all !== 1 ?
            <div className='info'>
                <h2>Date-wise Returns of The Starting Month</h2>
               <div className='info-box'>
                   <div className='info-box-row'>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 1 ? '#FFE9B1' : ""}`}}><Each day="1" ret={ret[0]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 2 ? '#FFE9B1' : ""}`}}><Each day="2" ret={ret[1]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 3 ? '#FFE9B1' : ""}`}}><Each day="3" ret={ret[2]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 4 ? '#FFE9B1' : ""}`}}><Each day="4" ret={ret[3]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 5 ? '#FFE9B1' : ""}`}}><Each day="5" ret={ret[4]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 6 ? '#FFE9B1' : ""}`}}><Each day="6" ret={ret[5]}></Each></div>
                   </div>
                   <div className='info-box-row'>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 7 ? '#FFE9B1' : ""}`}}><Each day="7" ret={ret[6]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 8 ? '#FFE9B1' : ""}`}}><Each day="8" ret={ret[7]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 9 ? '#FFE9B1' : ""}`}}><Each day="9" ret={ret[8]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 10 ? '#FFE9B1' : ""}`}}><Each day="10" ret={ret[9]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 11 ? '#FFE9B1' : ""}`}}><Each day="11" ret={ret[10]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 12 ? '#FFE9B1' : ""}`}}><Each day="12" ret={ret[11]}></Each></div>
                   </div>
                   <div className='info-box-row'>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 13 ? '#FFE9B1' : ""}`}}><Each day="13" ret={ret[12]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 14 ? '#FFE9B1' : ""}`}}><Each day="14" ret={ret[13]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 15 ? '#FFE9B1' : ""}`}}><Each day="15" ret={ret[14]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 16 ? '#FFE9B1' : ""}`}}><Each day="16" ret={ret[15]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 17 ? '#FFE9B1' : ""}`}}><Each day="17" ret={ret[16]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 18 ? '#FFE9B1' : ""}`}}><Each day="18" ret={ret[17]}></Each></div>
                   </div>
                   <div className='info-box-row'>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 19 ? '#FFE9B1' : ""}`}}><Each day="19" ret={ret[18]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 20 ? '#FFE9B1' : ""}`}}><Each day="20" ret={ret[19]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 21 ? '#FFE9B1' : ""}`}}><Each day="21" ret={ret[20]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 22 ? '#FFE9B1' : ""}`}}><Each day="22" ret={ret[21]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 23 ? '#FFE9B1' : ""}`}}><Each day="23" ret={ret[22]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 24 ? '#FFE9B1' : ""}`}}><Each day="24" ret={ret[23]}></Each></div>
                   </div>
                   <div className='info-box-row'>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 25 ? '#FFE9B1' : ""}`}}><Each day="25" ret={ret[24]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 26 ? '#FFE9B1' : ""}`}}><Each day="26" ret={ret[25]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 27 ? '#FFE9B1' : ""}`}}><Each day="27" ret={ret[26]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 28 ? '#FFE9B1' : ""}`}}><Each day="28" ret={ret[27]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 29 ? '#FFE9B1' : ""}`}}><Each day="29" ret={ret[28]}></Each></div>
                      <div className='info-box-col' style={{backgroundColor:`${best_day === 30 ? '#FFE9B1' : ""}`}}><Each day="30" ret={ret[29]}></Each></div>
                   </div>
                 
               </div>
               <h3>Fluctuation of : {fluc}%</h3>
               
               <div className='table'>
                  <table>
                     <tr><th>Type of SIP</th> <th>Return</th></tr>
                     <tr><td>One Investment Per Month</td><td>{best[0]}%</td></tr>
                     <tr><td>Two Investments Per Month</td><td>{best[1]}%</td></tr>
                     <tr><td>Four Investments Per Month</td><td>{best[2]}%</td></tr>
                  </table>
               </div>
            </div> :
            <div className='table-All'>
                  <table>
                     <tr><th>Scheme Name</th> <th>Fluctuation</th><th>Monthly Investment</th><th>Bi-Monthly Investment</th><th>Weekly Investment</th></tr>
                     <tr><td>{allFunds[fund][0]}</td><td>{allFluc[0]}%</td><td>{best[0]}</td><td>{best[1]}</td><td>{best[2]}</td></tr>
                     <tr><td>{allFunds[fund][1]}</td><td>{allFluc[1]}%</td><td>{best2[0]}</td><td>{best2[1]}</td><td>{best2[2]}</td></tr>
                     <tr><td>{allFunds[fund][2]}</td><td>{allFluc[2]}%</td><td>{best3[0]}</td><td>{best3[1]}</td><td>{best3[2]}</td></tr>
                  </table>
                  <button onClick={()=>setAll(0)}>Done</button>
               </div>

        }
           </div>
  )
}

export default Home