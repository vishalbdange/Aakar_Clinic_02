import React,{ createRef, useState ,useEffect,useRef} from 'react'
import './Preview.css'
import aakar from "./aakar.jpg"
import TestPDF from './TestPDF'
import { useScreenshot } from 'use-react-screenshot'
import { saveAs } from 'file-saver'
import sign from "./sign.png"

import sign1 from "./sign1.png"
import drskinfo from "./drskinfo.jpeg"
import autism2 from "./autism2.jpeg"
import doctorInfo from "./doctorInfo.jpeg"
import { FormGroup, Form, Input, Label, Button, Col,Alert ,Table,List} from 'reactstrap'
import Draggable from 'react-draggable'; // The default
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CsvDownload from 'react-json-to-csv'
import NavbarComponent from './NavbarComponent'
import { Paper } from '@mui/material'
import Divider from '@mui/material/Divider';
import CsvDownloadButton from 'react-json-to-csv'
import {Link} from 'react-router-dom'
const Preview = ({imageURL}) => {
 

    var state = JSON.parse(localStorage.getItem('state'));
    const prescription = JSON.parse(localStorage.getItem('prescription'));
        // console.log(state)
    // var p_data = [];
    var prescription_string = ''

    for (let p of prescription){
        prescription_string = ' '+p + ''
    }
    const { DOB, file,Visit_No,Name, Address,Age, Sex, Diagnosis,Goal,m_num,Receipt,Description,ImageFile} = state;
    // const csvData = {...state,prescription:prescription}
    console.log(DOB)

    const exportPDF = () => {
        const input = document.getElementById("Page");
        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,}).then(canvas =>{
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('p','mm','a4');
            pdf.addImage(imgData,'JPEG',0,0,210,310);
            if(state.name !== null){
                var pdfname = `${state.Name}.pdf`;
                pdf.save(pdfname);
            }
            else{
                pdf.save(`${state.Visit_No}.pdf`);
            }
        })
    }


    const ref = createRef(null)
    const [image, takeScreenshot] = useScreenshot();
    var isSS = false;
    const getImage = () => {
        // ssBtnStyle.assign({},ssBtnStyle,vis);
        isSS = true;
        takeScreenshot(ref.current)
        console.log(isSS)
    }

    const [textAreaStyle,setTextAreaStyle] = useState({width:"100%",border:"none",padding:"0%",margin:"0%"});
     useEffect (() => {
        var count = JSON.parse(localStorage.getItem('counter') || 0);
      
        localStorage.setItem('counter', ++count)
        console.log(JSON.parse(localStorage.getItem('counter')))
    },[window.unload])
 
   
    useEffect(() => {
        // console.log(Prescription)
        // const csvDOB = DOB.toString();
        // const csvPrescription = prescription.toString();
    
        // const csvState = {
        //     csvDOB,Visit_No,Name, csvPrescription,Address,Age, Sex, Diagnosis,Goal,MobileNo,Receipt,Description
        // }
        // const prescription_d = JSON.parse(localStorage.getItem('prescription_data'));
        // prescription_d.push(csvState);
        // localStorage.setItem('prescription_data', JSON.stringify(prescription_d))
        // p_data = prescription_d;
        state.Prescription[0] = prescription_string;
        console.log(state)
        if(window.innerWidth > 900){
            setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"200px"})
        } 
        else if(window.innerWidth  < 900 &&  window.innerWidth > 510){  
            setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"400px"});
        }
    })
    function getAge(dob) {
          
        if(dob == ''){
            return Age;
        }   
        var dobYear = dob.slice(0,4)-1900;  
        var dobMonth = dob.slice(5,7);  
        var dobDate = dob.slice(8,10);  
 
          
        //get the current date from the system  
        var now = new Date();  
        //extract the year, month, and date from current date  
        var currentYear = now.getYear();  
        var currentMonth = now.getMonth()+1;  
        var currentDate = now.getDate();  
          
        
        //declare a variable to collect the age in year, month, and days  
        var age = {};  
        var ageString = "";  
        
        //get years  
       var yearAge = currentYear - dobYear;  


        //get months  
        if (currentMonth >= dobMonth)  
          //get months when current month is greater  
          var monthAge = currentMonth - dobMonth;  
        else {  
          yearAge--;  
          var monthAge = 12 + currentMonth - dobMonth;  
        }  

      
        //get days  
        if (currentDate >= dobDate)  
          //get days when the current date is greater  
          var dateAge = currentDate - dobDate;  
        else {  
          monthAge--;  
          var dateAge = 31 + currentDate - dobDate;  
      
          if (monthAge < 0) {  
            monthAge = 11;  
            yearAge--;  
          }  
        }  
        //group the age in a single variable  
        age = {  
        years: yearAge,  
        months: monthAge,  
        days: dateAge  
        };  
            
            
        if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )  
           ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";  
        else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )  
           ageString = "Only " + age.days + " days old!";  
        //when current month and date is same as birth date and month  
        else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )  
            ageString = age.years +  " years old. Happy Birthday!!";  
        else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )  
            ageString = age.years + " years and " + age.months + " months old.";  
        else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )  
            ageString = age.months + " months and " + age.days + " days old.";  
        else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )  
            ageString = age.years + " years, and " + age.days + " days old.";  
        else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )  
            ageString = age.months + " months old.";  
        //when current date is same as dob(date of birth)  
        else ageString = "";
        return ageString ;
    }
    
    const downloadImage = () => {
        saveAs(image, 'image.jpg') // Put your image url here.
      }
    //  var vis = {visibility:"hidden"}
    
    function ChangeFormateDate(date){
        var p = date.split(/\D/g)
        return [p[2],p[1],p[0] ].join("/")
     }
     var x =  moment().format('LLLL');
     var displayDate = x;
      
    var age_c  = getAge(DOB); 
    if(age_c == ""){
            age_c = Age     ; 
    }


    return (
        <>
         <NavbarComponent />
         
        <div className="prescription-view" >
        <CsvDownloadButton  data={[state]}/>
        <Link to="/prescription">TO Prescription</Link>
            <section id = "Page"  className ="page"  ref={ref }   >
           

            <Grid container spacing={0}>
                <Grid item xs={8}>
                    <Draggable>
                        <img width="340px" src={aakar} alt="Aakar Clinic" />
                    </Draggable>
                </Grid>
                <Grid item xs={4}>
                    <Draggable>
                    {
                            file !== null ? 
                            (
                                <>
                                <img src={file} style={{width:"100px"}} alt="" /> 
                                </>
                            ) : 
                            (
                                <>
                                <img src={imageURL} style={{width:"100px"}} alt="" /> 
                                </>
                            )
                    }  
                    </Draggable>
                </Grid>
            </Grid>
        
            {/* <CsvDownload 
    data={ p_data}
    filename="good_data.csv"
    style={{ //pass other props, like styles
      boxShadow:"inset 0px 1px 0px 0px #e184f3",
      background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
      backgroundColor:"#c123de",
      borderRadius:"6px",
      border:"1px solid #a511c0",
      display:"inline-block",
      cursor:"pointer","color":"#ffffff",
      fontSize:"15px",
      fontWeight:"bold",
      padding:"6px 24px",
      textDecoration:"none",
      textShadow:"0px 1px 0px #9b14b3"
      }}
  >
    Good Data ✨
  </CsvDownload> */}
            <section class="doctor-info">
                <div class="doctor-name">
                <span>Dr Santosh <surname>Kondekar</surname></span>
                <p>Reg N:86230 ,MD DNB DCH FCPS FAIMER</p>
                </div>
                <div class="profession">
                <span>Neuro-Developmental <surname>Pediatrician</surname></span>
                <p>aakaarclinic@gmail.com <num>M:9869405747</num></p>
                </div>
            </section>
             {/* <img   src={doctorInfo} className="doctor-logo" alt="doctor Info" /> */}
            {/* <section class="doctor-info">
                
                <div class="doctor-name">
                    <span>Dr Santosh <surname>Kondekar</surname></span>
                    <p>Reg N:86230 ,MD DNB DCH FCPS FAIMER</p>
                </div>
                <div class="profession">
                    <span>Neuro-Developmental <surname>Pediatrician</surname></span>
                    <p>aakaarclinic@gmail.com <num>M:9869405747</num></p>
                </div>
            </section> */}
            {/* <h2 class="prescription-heading">Prescription</h2> */}
            {/* <Draggable style={{textAlign:"center",border:"2px solid black"}}> */}
         
           {/* </Draggable> */}
           
            <section class="patient-profile" style={{ backgroundImage: `url(${sign1})`}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0} >
                    <Grid item xs={3}  style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",borderTop:"1px solid #F6BE00",fontSize:"12px"}}>
                        <b > &nbsp;&nbsp;Date</b> 
                    </Grid>
                  
                    <Grid item xs={9}  style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",borderTop:"1px solid #F6BE00",fontSize:"12px"}}>
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{displayDate} 
                    </Grid>
                   
                    {/* <Grid item xs={6} >
                        <b > &nbsp;&nbsp;Payment Receipt No. : &nbsp; </b> W-{JSON.parse(localStorage.getItem('counter'))+2000}/2022
                    </Grid> */}
                    <Grid item xs={3}  style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}}>
                        <b> &nbsp;&nbsp;Visit_No </b>   
                    </Grid>
                    <Grid item xs={9}  style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}}>
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Visit_No}  
                    </Grid>
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;ID </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{m_num}  
                    </Grid>
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Age</b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{age_c}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Name </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Name}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;DOB </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{DOB}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Sex </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Sex}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Address </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Address}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Diagnosis </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Diagnosis}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid #F6BE00",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Goal for next month </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid #F6BE00",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp;{Goal}  
                    </Grid>
                   
                </Grid>
            </Box>
        
           
            <hr/>
            </section>
          
            {
                prescription.length === 0 ? (
                    <></>
                )  : (
                   <>
                        
                    <div ><b>Prescription : </b></div>
                    <b><p style={{fontSize:"10px"}}> (Join parent support group and read more about Goal Directed Cognitive Approach at <a href="http://www.neuropediatrician.com">www.neuropediatrician.com</a>)</p></b>
       
                       <ul> {prescription?.map((p)=>{
                               return(
                                   <li style={{fontSize:"12px"}}>{p}</li>
                               )
                       })}</ul >
                   </>
                )
            }
            <section  style={{fontSize:"9px !important"}}>
                  <Draggable>    

  
               <p  style={{fontSize:"11px"}}>
                   <b>{Description}</b> 
               </p>
               </Draggable>     
                <br /> 
                <Draggable style={{margin:"0px !important",padding:"0px !important",width:"100px !important"}}>
                <div style={{height:"100px",margin :"0px !important",paddingLeft:"50px",maxWidth:"100px !important"}}>
                <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={drskinfo} alt='drskinfo' />
                 
                </div>
                </Draggable>
                <Draggable style={{margin:"0px !important",padding:"0px !important",width:"80px !important"}}> 
                <img  style={{height:"40px",margin:"0px !important",padding:"0px !important"}}  src={autism2} alt='drskinfo' />                 
                </Draggable>
                <br/>
                <Draggable>
                    <div className="Desc">
                <p className="textArea" style={{color:"#338BA8"}}>
               Read <b>www.pedneuro.in</b> for Dr kondekar's Protocol of managing Autism. For basic health queries  visit  <b>www.aakaarclinic.com</b> or <b>www.kondekar.com</b>. F/u on whatsapp every 07 days to titrate doses and physical follow up one monthly or as needed
               </p>
                <b style={{color:"#338BA8",textAlign:"center",margin:"0px",padding:"0px"}}>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}> DR KONDEKAR SANTOSH V. MD DNB DCH FCPS R NO  86230 MMC  </p>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>WWW.AAKAARCLINIC.COM  </p>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>AAKAAR CLINIC OPP BYCULLA STATION WEST MUMBAI 400024 INDIA   </p>
                 </b>
                 </div>
                 </Draggable>
                 <Grid container spacing={2}>
                  
                    <Grid item xs={6}>
                        <Draggable>
                            <section>
                                <br/>
                                <p><strong>Payment Receipt No. : </strong> W-{JSON.parse(localStorage.getItem('counter'))+2000}/2022</p>
                                <p><strong>Payment Receipt :  </strong> {Receipt}</p>
                            </section>
                            
                        </Draggable>
                      
                    </Grid>
                                      
                    <Grid item xs={6}>
                        <Draggable>
                        <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                        </Draggable>
                    </Grid>
                 </Grid>


            </section>
            
            </section>
            <section className="screenshot-capture" style={{padding:"4px"}}>
                <Button color="primary" onClick={getImage} style={{height:"35px",margin:"15px"}}>
                        Take screenshot
                </Button>
                <Button onClick={exportPDF}>Download PDF</Button> <br />
           
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",color:"white",fontSize:"44px"}}>
                <div > Image :  </div> 
                <hr />
                <div style={{textAlign:"center"}}>
                
                <img style={{width:"400px",position:"relative",border:"2px solid orange",borderRadius:"30px"}} src={image} alt={'Screenshot Will Come Here'} />
            
            </div>
           
            </div>
            </section>
            {/* <TestPDF state={state} /> */}

        </div>
        </>
    )
}

export default Preview