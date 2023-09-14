import React from "react";
import { useTranslation } from "react-i18next";
import {Container} from 'react-bootstrap' 

const HowItWorks = () => {
    const {t} = useTranslation()
    const home = t('home',{returnObjects:true})
  return (
    <section className="how-it-works">
      <Container>
        <h2>How it Works</h2>
        <ul className="progress-steps">
            {home.Howitworks.map((Howitworks,i)=> 
            <>  
                  <li key={i}>
            <h4 className="count">{Howitworks.count}</h4>
            <h3>{Howitworks.title}</h3>
            <p>{Howitworks.discription}</p>
            {Howitworks.discriptionList && 
                <ul className="common-list">
                    {Howitworks.discriptionList.map ((ert,i)=> 
                    <>
                      <li key={i}>{ert}</li>
                    </>
                    )}
            </ul>
            }
          </li>
            </>
            )}
        </ul>
      </Container>
    </section>
  );
};

export default HowItWorks;
