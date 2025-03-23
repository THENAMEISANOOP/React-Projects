import guitar from "../assets/guitar.png";
import google from "../assets/google.png";
import phone from "../assets/phone.png";
import { useAuth } from "../context/AuthContext";  

const Login = ({ setOpenLogin }) => {
  const { loginWithGoogle } = useAuth();  

  const googleSignIn = async () => {
    try {
      await loginWithGoogle();
      setOpenLogin(false);  
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-zinc-950 opacity-85 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h1 onClick={() => setOpenLogin(false)}
                  className="cursor-pointer font-semibold text-3xl absolute top-4 right-8 ">
                  X
                </h1>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <img src={guitar} className="w-20 h-20 ml-32" alt="guitar logo" />
                      <p className="text-base font-medium mt-5 text-center">
                        Help us become one of the safest places <br /> to buy and sell
                      </p>

                      <div className="flex border-2 border-black p-2 rounded-md cursor-pointer hover:border-4 mt-12">
                        <img src={phone} className="w-6 h-6" alt="phone icon" />
                        <h1 className="font-semibold ml-3">Continue with phone</h1>
                      </div>
                      <h1 className="text-center mt-4">OR</h1>
                      <div className="flex border-2 border-gray-300 p-2 rounded-md cursor-pointer mt-4"
                        onClick={googleSignIn}> 
                        <img src={google} className="w-6 h-6" alt="google icon" />
                        <h1 className="font-semibold ml-12">Continue with Google</h1>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
