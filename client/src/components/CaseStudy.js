import React, {useRef} from "react";
import {useReactToPrint} from "react-to-print";
import ErrorPage from "./ErrorPage";
import "../App.css"

const CaseStudy = ({result}) => {
  const componentRef = useRef();

  //FUNCTION TO REPLACE NEW LINE WITH A BREAK TAG
  // const replaceWithBr = (string) =>{
  //   return string.replace(/\n/g, "<br />");
  // };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${result.headline} Case Study`,
    onAfterPrint: () => alert("Print Successful!"),
  });
  
  //RETURNS ERROR PAGE IF RESULT OBJECT IS EMPTY
    if (JSON.stringify(result) === "{}"){
        return <ErrorPage/>
    }
  return (
    <div >
      <div>
        <button onClick={handlePrint} className="outline-double outline-3 outline-offset-2
        m-4 p-2 rounded outline-blue-500 font-bold hover:bg-blue-500 hover:text-white ">Print Case Study</button>
      </div>
        <main className='container outline outline-4 outline-black bg-blue-400 text-white' ref={componentRef}>
            <header className="flex flex-wrap justisy-between">
              <section>
                <h1 className="font-extrabold  text-5xl">{result.headline}</h1><br/>
              </section>
              <section>
                <h3>Introduction</h3>
                <p>{result.introduction}</p>
              </section>
            </header>

            <div className="object rounded-full m-2">
              <img
                src={result.image_url}
                alt={result.headline}
                className="object-cover h-48 w-96 rounded-full"
              />
            </div>
            <div className="body">
                <div>
                  <h3>Problems</h3>
                  <h4>{result.problems}</h4><br/>
                  <h3>Solution</h3>
                  <h4>{result.solutionPoints}</h4><br/>
                  <h3>Results</h3>
                  <h4>{result.resultsPoints}</h4><br/>
                </div>
                <div className="inspiration">
                  <h3>Inspiration</h3>
                  <p>{result.inspirationPoints}</p><br/>
                  <h3>Quote</h3>
                  <p className="text-3xl font-bold underline"><em>"{result.quote}"</em></p>
                </div>
            </div>
        </main>
    </div>
  )
}

export default CaseStudy;