import React from 'react';
import img from './lotties/Page404.jpg'

function Page404(){
    return(
        <body>
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <img src={img} style={{height:"200px", width:"200px"}} alt="Pahe Not Found"></img>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <a href="/" class="btn btn-primary">Go Home</a>
            </div>
        </div>
    </body>
    )
}

export default Page404;