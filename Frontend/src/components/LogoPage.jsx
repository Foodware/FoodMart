import FoodWareLogo from "../assets/foodware.png";

export default function LogoPage() {
  return (
    <div className="logo w-full h-full flex items-center justify-center px-4">
      <img src={FoodWareLogo} alt="Foodware Logo" />
    </div>
  );
}
