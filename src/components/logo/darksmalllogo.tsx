import DisenoLogoDark from "/public/logo/disenoaicenterfordarktheme.webp";
import Link from "next/link";
import Image from "next/image";

function SmallDarkLogo(){
    return <Link href="https://www.diseno.ai" passHref><Image src={DisenoLogoDark} width={100} height={75} alt="Diseno Logo"  /></Link>;
}

export default SmallDarkLogo;