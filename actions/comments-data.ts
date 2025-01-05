import axios from "axios";

export async function commentsData() {
   let comments: any = {};
   await axios
     .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}comments`, {
       headers: {
         "Cache-Control": "no-cache",
         Pragma: "no-cache",
         Expires: "0",
       },
     })
     .then(function (response) {
       comments = response.data;
     })
     .catch(function (error) {
       console.log(error);
       comments = [];
     });
 
   return comments;
 }