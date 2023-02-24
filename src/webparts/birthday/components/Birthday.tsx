import * as React from "react";
import { BirthdaysInMonth } from "../../../models/BirthdaysInMonth";
import { MonthSection } from "./MonthSection";

interface IBirthdaysPerMonthProps {
  data: Array<BirthdaysInMonth>;
}

const Birthday = (props: IBirthdaysPerMonthProps): JSX.Element => {

  return (
    <section>
      {/* eslint-disable-next-line */}
      {props.data.map((month:any, index) => (
<MonthSection key={month.title} data={month} index={index} />
        
      ))}
    </section>
  );
};

export { IBirthdaysPerMonthProps,Birthday };