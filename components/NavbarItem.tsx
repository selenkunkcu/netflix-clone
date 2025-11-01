import React from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";


interface NavbarItemProps {
    label: string;
    url?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({label, url}) => {

  const router = useRouter();
  const path = usePathname();

  return (
    <div className={` ${(url && path === url) ? 'font-medium' : 'font-normal'} text-white cursor-pointer hover:text-gray-300 transition`}
    onClick={url ? (() => router.push(url)) : (() => {})}>
        {label}
    </div>
  )
}

export default NavbarItem;