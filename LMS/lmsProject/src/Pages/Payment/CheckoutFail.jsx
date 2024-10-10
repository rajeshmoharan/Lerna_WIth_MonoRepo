import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFail() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="w-80-h-[26rem] flex flex-col justify-center items-center">
          <h1 className="bg-red-500 text-center">Payment Failed</h1>
          <div className="px-4 flex flex-col items-center  justify-center space-y-2">
            {/* <h2 className="text-lg font-semibold">Try agian</h2> */}
            {/* <p className="text-left">Try after 1hr</p> */}
            <Link to="/checkout">Try Again</Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default CheckoutFail;
