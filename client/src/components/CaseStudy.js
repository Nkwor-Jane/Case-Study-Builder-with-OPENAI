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
        <main className='container text-black grid grid-cols-3 m-4' ref={componentRef}>
            <section className=" ">
            <section className="bg-purple-300 p-3 row-span-4">
              <div className="m-2 flex justify-center items-center flex-column w-full ">
                  <img
                    src={result.image_url}
                    alt={result.headline}
                    className="object-cover object-center w-6/12 rounded-full "
                  />
                  <h1 className="font-bold italic text-5xl">{result.headline}</h1><br/>
                </div>
                  
            </section>
            <div>
              <section className="bg-purple-100 p-4">
                <h3>Introduction</h3>
                <p className="text-left">{result.introduction}</p>
              </section>
            </div>

            <div className="inspiration pl-4 bg-slate-300 p-4">
                  <h3 className="text-2xl font-bold pb-2">Inspiration</h3>
                  <p className="text-justify">{result.inspirationPoints}</p><br/>
                  {/* <h3 className="text-2xl font-bold pb-2">Quote</h3>
                  <p className="text-1xl font-bold"><em>"{result.quote}"</em></p> */}
                </div>
            </section>

            <div className="body col-span-2 bg-purple-100 pr-2">
                <div>
                  <section className=" w-full p-4">
                    <h3 className="text-2xl font-bold pb-2">Problems</h3>
                    <p className="text-justify">{result.problems}</p><br/>
                  </section>
                  <section className="p-4">
                    <h3 className="text-2xl font-bold pb-2">Solution</h3>
                    <p className="text-justify">{result.solutionPoints}</p><br/>
                  </section>
                  <section className="p-4">
                  <h3 className="text-2xl font-bold pb-2">Results</h3>
                  <p className="text-justify">{result.resultsPoints}</p><br/>
                  </section>
                </div>
            </div>
        </main>
    </div>
  )
}

export default CaseStudy;