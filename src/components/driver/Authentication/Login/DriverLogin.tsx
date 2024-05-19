import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { auth } from "../../../../service/firebase";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import axiosDriver from "../../../../service/axios/axiosDriver";
import { driverLogin } from "../../../../service/redux/slices/driverAuthSlice";
import {
    ApplicationVerifier,
    Auth,
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
  } from "firebase/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  openPendingModal } from "../../../../service/redux/slices/pendingModalSlice";
  
function DriverLogin() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [otpInput,setotpInput]=useState<boolean>(false)
    const [otp,setOtp]=useState<number>(0);
    const [driverData,setdriverData]=useState({
        name:"",
        driverToken:null,
        driver_id:""
    })
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    const [counter,setCounter]=useState<number>(30)
    useEffect(() => {
        if (otpInput) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, otpInput]);

    const formik=useFormik({
        initialValues:{
            mobile:""
        },
        validationSchema:yup.object({
            mobile:yup.string().length(10,"Enter a valid mobile number").required("Please enter the mobile number")
        }),
        onSubmit:async (values)=>{
            try {
                const {data}=await axiosDriver("").post("/checkLoginDriver",values)
                console.log(data);
                
                if(data.message==="Success"){
                    sendOtp()
                    setdriverData({name:data.name,driverToken: data.token, driver_id: data._id })
                }else if (data.message === "Incomplete registration") {
                    toast.info("Please complete the verification!");
                    localStorage.setItem("driverId", data.driverId);
                    navigate("/driver/identification");
                } else if (data.message === "Blocked") {
                    toast.info("Your account is blocked!");
                } else if (data.message === "Not verified") {
                    dispatch(openPendingModal());
                } else if (data.message === "Rejected") {
                    localStorage.setItem("driverId", data.driverId);
                    // dispatch(openRejectedModal());
                } else {
                    toast.error("Not registered! Please register to  continue.");
                }
                
            } catch (error) {
                toast.error((error as Error).message);
            }
        }
    })
    const sendOtp = async () => {
        try {
            onCaptchaVerify(auth);
            const number = "+91" + formik.values.mobile;
            const appVerifier: ApplicationVerifier | undefined = window.recaptchaVerifier;
            if(appVerifier){
                const result = await signInWithPhoneNumber(auth, number, appVerifier);
                setConfirmationResult(result);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };
    const onCaptchaVerify = (auth: Auth) => {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: () => {
                toast.success("Otp sent successfully");
                setotpInput(true);
              },
              "expired-callback": () => {
                toast.error("TimeOut");
              },
            }
          );
        }
      };

    const otpVerify = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        event.preventDefault();
        if (otp && confirmationResult) {
          const otpValue: string = otp.toString();
          confirmationResult
            .confirm(otpValue)
                .then(async () => {
                    toast.success("Login success");
                    dispatch(driverLogin(driverData));
                    // navigate("/driver/dashboard");
                    localStorage.removeItem("driverId");
                })
                .catch(() => {
                    toast.error("Enter a valid otp");
                });
        } else {
            toast.error("Enter a valid otp");
        }
    };

    const handleOtpChange=(index:number,newValue:number)=>{
        const newOtp=[...otp.toString()];
        newOtp[index]=newValue.toString();
        setOtp(parseInt(newOtp.join("")))
    }
    const iconsColor = "text-gray-400";


  return (
    <>
     <nav className="bg-black text-white flex justify-between items-center p-6 ">
        <div className="flex items-center space-x-4">
          <Link to="/driver/login" className="hover:text-gray-300">
            <img
              src="/images/images__1_-removebg-preview.png"
              alt="Logo"
              className=" w-[40%]"
            />
          </Link>
        </div>
      </nav>
            <div className="driver-registration-container h-screen flex justify-center items-center">
                <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                        <div className=" w-full pt-10 ">
                            <h1 className="text-blue-800 font-bold md:mt-4 text-4xl mx-7 md:mx-0  md:text-5xl user-signup-title md:max-w-sm">
                                Please sign in with your mobile number!
                            </h1>
                            <h1 className="text-blue-800 md:max-w-xs text-sm my-3 mx-7 md:mx-0  md:text-sm md:mt-3 user-signup-title">
                                We'll send you a One-Time-Password to your registered mobile number.
                            </h1>
                        </div>

                        <div className="hidden  md:flex md:items-center" style={{ marginTop: "-45px" }}>
                            <img
                                style={{ height: "300px", width: "auto" }}
                                src="https://d2y3cuhvusjnoc.cloudfront.net/[removal.ai]_4c7ba0ac-90b6-43f1-b097-932d54d9f8b0-sssdsdsd.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex md:w-1/2 justify-center  pb-10 md:py-10 items-center">
                        <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="text-center">
                                    <h1 className="text-gray-800 font-bold text-2xl mb-5">Welcome back!</h1>
                                </div>

                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <SmartphoneIcon className={iconsColor} />

                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="number"
                                        name="mobile"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        id="mobile"
                                        placeholder="Mobile number"
                                    />
                                </div>
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <p className="form-error-p-tag">{formik.errors.mobile}</p>
                                )}

                                <div className="my-4 px-2">
                                    {otpInput && (
                                        <HStack>
                                            <PinInput otp placeholder="">
                                                {[...Array(6)].map((_, index) => (
                                                    <PinInputField
                                                        key={index}
                                                        onChange={(e) => handleOtpChange(index, parseInt(e.target.value))}
                                                    />
                                                ))}
                                            </PinInput>
                                        </HStack>
                                    )}
                                </div>

                                {otpInput ? (
                                    <>
                                        <button
                                            onClick={otpVerify}
                                            className="block w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2"
                                        >
                                            Verify OTP
                                        </button>
                                        <div className="text-center text-gray-500 mt-4">
                                            {counter > 0 ? (
                                                <p className="text-sm">Resend OTP in 00:{counter}</p>
                                            ) : (
                                                <p
                                                    className="text-sm text-blue-800 cursor-pointer"
                                                    onClick={() => {
                                                        setCounter(30);
                                                        sendOtp;
                                                    }}
                                                >
                                                    Resend OTP
                                                </p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        className="block w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2"
                                    >
                                        Send OTP
                                    </button>
                                )}

                                <div className="flex flex-col w-full border-opacity-50">
                                    <div className="divider text-xs font-medium">or sign-in using Google</div>

                                    <div className="flex justify-center items-center mb-2">
                                        {/* <GoogleLogin shape="circle" ux_mode="popup" onSuccess={googleLogin} /> */}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <span
                                        onClick={() => navigate('/driver/signup')}
                                        className="text-xs ml-2 hover:text-blue-500 cursor-pointer"
                                    >
                                        Not registered yet? Sign-up here!
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </>
  )
}

export default DriverLogin
