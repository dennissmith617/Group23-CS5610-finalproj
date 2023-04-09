import React  from "react";

function AnonymousHomePage() {
   return (
       <div className="position-relative mb-2">
           <img src="/images/books.jpeg" className="w-100" alt="book header"/>
           <h1>Welcome to Readit!</h1>
           <h2>Trying to decide your next read?</h2>
           <paragraph>Look no further than Readit! When you sign up, you can connect with friends and find new books.</paragraph>

           <h2>Books Our Users have been LOVING</h2>

           <div className="row p-3 mb-2 bg-primary text-white rounded" >
               <div className="col-lg-4 col-md-4 col-xs-4 thumb">
                   <a className="thumbnail" href="#">
                       <img className="img-responsive" src="/images/harlem_shuffle.jpeg" alt=""/>
                   </a>
               </div>
               <div className="col-lg-4 col-md-4 col-xs-4 thumb">
                   <a className="thumbnail" href="#">
                       <img className="img-responsive" src="/images/lessons_in_chemistry.jpeg" alt=""/>
                   </a>
               </div>
               <div className="col-lg-4 col-md-4 col-xs-4 thumb">
                   <a className="thumbnail" href="#">
                       <img className="img-responsive" src="/images/man_who_died.jpeg" alt=""/>
                   </a>
               </div>
           </div>

       </div>
    )
}
export default AnonymousHomePage;