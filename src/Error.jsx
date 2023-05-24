import React from 'react'
import Layout from './Navbar/Layout';


// function Error() {
//   return (
//     <div>Error</div>
//   )
// }

// export default Error

import { useRouteError } from "react-router-dom";
import './Error.css'
import conyGif from "./images/conyGif.gif";


export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <Layout>
      <div id="error-page">
      <img src={conyGif} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button type="button" className='button-errorpage'><a href={'/'}>Back</a></button>
    </div>
    </Layout>
  );
}