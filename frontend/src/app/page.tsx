import Image from "next/image";
import {NavbarReg} from "@/components/NavbarReg";
import PropertyTable from "@/components/PropertyTable"

export default function Home() {
  return (
      <>
        <NavbarReg/>
        <PropertyTable/>
      </>

  );
}
