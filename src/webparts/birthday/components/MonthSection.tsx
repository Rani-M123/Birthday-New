//import { addYears, format } from "date-fns/esm";
// import formatDistance from "date-fns/formatDistance";
//import set from "date-fns/set";
import {  IconButton } from "office-ui-fabric-react";
import * as React from "react";

//import {Slide} from 'react-slideshow-image'
//import 'react-slideshow-image/dist/styles.css'
import { BirthdaysInMonth } from "../../../models/BirthdaysInMonth";

import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
//import { duration } from 'moment-timezone';




interface IMonthSectionProps {
  data: BirthdaysInMonth;
  index: number;
}


const MonthSection = (props: IMonthSectionProps): JSX.Element => {
  // const [isExpand, toggleExpand] = React.useReducer(
  //   (previous) => !previous,
  //   props.index === 0 || props.index === 1
  // );

  

  // const getDate = (date: number, month: number): Date => {
  //   let birthdateDate = set(new Date(), { month, date });
  //   if (birthdateDate.getMonth() < new Date().getMonth()) {
  //     birthdateDate = addYears(birthdateDate, 1);
  //   }
  //   return birthdateDate;
  // };

  // const generateDateLabel = (date: number, month: number): string => {
  //   const birthdateDate = getDate(date, month);
  //   return format(birthdateDate, "E, d MMM");
  // };

  // const generateDistanceLabel = (date: number, month: number): string => {
  //   const birthdateDate = getDate(date, month);
  //   return formatDistance(birthdateDate, new Date(), { addSuffix: true });
  // };


  return (
    <>
   

    <div className="background">
      
       
           <div className="maindiv">
            {/* <img src="https://www.bing.com/th/id/OGC.a6e7d5bf8f9f21f4cf9b98cb05e360b9?pid=1.7&rurl=https%3a%2f%2fwallpapercollection.net%2fwp-content%2fuploads%2f2018%2f05%2f279f0158060483.59ee4e804c846.gif&ehk=SHb1JGk7wiZvLj0VU4ujulQJ1QkinX6uiSjK2rl3sTw%3d"/> */}
        <div>
        
        <Carousel className="maincarousel">
     
          {props.data.users.length === 0 && <div>No birthdays this month.</div>}         
          {props.data.users.map((user) => {
            
return(
 
  <Carousel.Item  key={user.id}>
            
              <div  className="imagediv">
               <img src={`/_layouts/15/userphoto.aspx?UserName=${user.email}`}/>
                </div>
              
              <div >
                <div >
                  <div>{user.name}</div>
                  <IconButton
                    iconProps={{ iconName: "Mail" }}
                    title="Mail"
                    onClick={(event) => {
                      event.stopPropagation();
                      window.open(`mailto:${user.email}`);
                    }}
                  />
                </div>
              </div>
            
            
            </Carousel.Item> 
       
              )//return
              })} 
         </Carousel >
        </div>
   
      
    </div>
    </div>
   </>
    
  );
 
};



export { MonthSection };
