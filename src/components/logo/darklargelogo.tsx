import DisenoLogoDark from "/public/logo/disenoaicenterfordarktheme.webp";
import Link from "next/link";
import Image from "next/image";

function LargeDarkLogo(){
    return <Link href="https://www.diseno.ai"><Image src={DisenoLogoDark} width={642} height={200} alt="Diseno Logo"  /></Link>;
}

export default LargeDarkLogo;