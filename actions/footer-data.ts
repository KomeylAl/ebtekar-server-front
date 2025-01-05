import axios from "axios";

export async function footerData() {
   let footer: any = {};
   await axios
     .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}footer`, {
       headers: {
         "Cache-Control": "no-cache",
         Pragma: "no-cache",
         Expires: "0",
       },
     })
     .then(function (response) {
       footer = response.data;
     })
     .catch(function (error) {
       console.log(error);
 
       footer = {
         company_name: "ماشین سازی ابتکار صنعت اسپادانا",
         description: "",
         logo_path: "",
         bg_path: ""
       };
     });
 
   return footer;
 }