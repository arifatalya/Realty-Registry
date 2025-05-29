import {Navbar} from "@/components/Navbar";
import PropertyTable from "@/components/PropertyTable"

export default function Home() {
  return (
      <>
        <Navbar/>
          <div className="mt-20">
              <PropertyTable/>
          </div>

      </>

  );
}
