import { mainPageAbout } from "@/actions/main-page-data";
import AboutComp from "@/components/AboutComp";
import Header from "@/components/Header";

export default async function About() {
  
  const info = await mainPageAbout();

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
