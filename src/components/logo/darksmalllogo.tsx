import Link from "next/link";
import Image from "next/image";

const disenoLogoDark = "https://firebasestorage.googleapis.com/v0/b/diseno-5b992.appspot.com/o/public%2Flogos%2Fdisenoaicenterfordarktheme.webp?alt=media&token=4df5df3a-2635-4275-8529-0dec8d3302b7"

function SmallDarkLogo(){
    // return <Link href="https://designer.diseno.ai" passHref><Image src={disenoLogoDark} width={100} height={75} alt="Diseno Logo"  /></Link>;
    return <img src={disenoLogoDark} className="w-full h-auto" alt="Diseno Logo" />;
}

export default SmallDarkLogo;