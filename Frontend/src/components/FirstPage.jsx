import data from "../data"
import foodwareLogo from "../assets/icons/foodwarelogo.svg"
import cartIcon from "../assets/icons/cart.svg"
import menuIcon from "../assets/icons/menu.svg"
import messagingIcon from "../assets/icons/messaging.svg"

import { Link } from "react-router-dom"

const handleClick = function (e, value) {
    console.log(value)
}
export default function FirstPage() {
    const dataList = data.map(function (value, index) {
        return (
            <div key={index} className="w-[80%] overflow-hidden mx-auto relative" onClick={(e) => handleClick(e, value)}>
                <img src={`/public/assets/${value.img}`} alt={value.img} className="w-full h-auto " />
                <span
                    className="absolute top-[1rem] left-[1rem] p-2 bg-white rounded-lg"
                    style={{ textTransform: "capitalize" }}
                >
                    {value.title}
                </span>
            </div>
        )
    })
    return (
        <>
            <nav className="homePage flex justify-between items-center mx-[9rem] my-6">
                <div className="logo">
                    <img src={foodwareLogo} alt="Logo" className="w-12" />
                </div>
                <div className="searchBar">
                    <label htmlFor="email" className="labelWithRoundedCorner">
                        {/* <img className="signInIcons" src={emailIcon} alt="" />{" "} */}
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search Here"

                        />
                    </label>
                </div>
                <div className="icons flex gap-3">
                    <img className="w-7" src={cartIcon} alt="Cart Icon" />
                    <img className="w-7" src={messagingIcon} alt="Messaging Icon" />
                    <img className="w-[0.5rem]" src={menuIcon} alt="Menu Icon" />
                </div>
            </nav>
            <section className="data flex flex-col gap-6 mb-[7rem]">
                {dataList}
            </section>
            <footer className="firstpagenavbar fixed bottom-0 left-0 w-full bg-white h-[5rem] flex items-center justify-center gap-9">
                <Link to={'/'}>
                    <div className="flex flex-col justify-center items-center">
                        <span className="icon">icon</span><span>Market</span>
                    </div>
                </Link>
                <Link to={"/wallet"}>
                    <div className="flex flex-col justify-center items-center"><span className="icon">icon</span><span>Wallet</span></div>
                </Link>
                <Link to={"/tracker"}>
                    <div className="flex flex-col justify-center items-center"><span className="icon">icon</span><span>Tracker</span></div>
                </Link>
            </footer>
        </>
    )
}