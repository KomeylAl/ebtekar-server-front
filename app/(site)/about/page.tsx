import AboutComp from "@/components/AboutComp";
import Header from "@/components/Header";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function About() {

  let info: any
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}info`)
      .then(function (response) {
        if (response.status === 200) {
          info = response.data
        }
      })
      .catch(function (error) {
        if (error.status === 500) {
          return redirect('/server-error')
        }
        return redirect('/server-error')
      })
      

  return (
    <div className="py-8">
      <Header title="درباره و تماس با ما" />
      <AboutComp
        name={info.company_name}
        description={info.description}
        phone={info.phone_numbers}
        address={info.address}
        email={info.email}
        logo={info.logo_path}
      />
    </div>
  );
};
