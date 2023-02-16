import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { AmburgerIcon } from "../icons";
import NavButton from "../navButton";

const Header = () => {
    const address  = useAddress();
    const disconnect = useDisconnect();
    return ( 
       <header className="grid grid-cols-2 md:grid-cols-5 items-center">
         <div className="flex items-center space-x-2 ">
                <img 
                className="rounded-full h-20 w-20"
                src="https://i.imgur.com/4h7mAu7.png" 
                alt="" />
            <div>
                <h1 className="text-lg font-bold text-white">
                    Lottery App
                </h1>
                <p className="text-xs text-emerald-500 truncate">
                    {address?.slice(0, 5) + "..." + address?.slice(address?.length , address?.length - 5)}
                </p>
            </div>
        </div>
        <div className="hidden md:col-span-3 md:flex items-center justify-center py-2">
            <div className="bg-[#0A1F1C] px-4 space-x-2">
                <NavButton title="Buy Ticket" isActive={true} />
                <NavButton title="Logout" onClick={disconnect} />

            </div>
        </div>
        <div className="flex flex-col ml-auto text-right">
     
            <AmburgerIcon className="text-white" width={30} height={30} />

            <span className="md:hidden">
                {/* <NavButton title="Buy Ticket" isActive={true} /> */}
                <NavButton title="Logout" onClick={disconnect} />
            </span>

        </div>
       </header>
     );
}
 
export default Header;