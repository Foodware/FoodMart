import data from "../data"
import foodwareLogo from "../assets/icons/foodwarelogo.svg"
const handleClick = function (e, value) {
    console.log(value)
}
export default function FirstPage() {
    const dataList = data.map(function (value, index) {
        return (
            <div key={index} className="w-[80%] bg-black overflow-hidden mx-auto relative" onClick={(e) => handleClick(e, value)}>
                <img src={`/public/assets/${value.img}`} alt={value.img} />
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
                <div className="searchBar">Search Bar</div>
                <div className="icons">icons</div>
            </nav>
            <section className="data flex flex-col gap-6 mb-[7rem]">
                {dataList}
            </section>
            <footer className="firstpagenavbar fixed bottom-0 left-0 w-full bg-white h-[5rem] flex items-center justify-center gap-9">
                <div className="flex flex-col justify-center items-center">
                    <span className="icon">icon</span><span>Market</span>
                </div>
                <div className="flex flex-col justify-center items-center"><span className="icon">icon</span><span>Wallet</span></div>
                <div className="flex flex-col justify-center items-center"><span className="icon">icon</span><span>Tracker</span></div>
            </footer>
        </>
    )
}