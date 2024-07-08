import { useState, useRef } from "react";

export default function OtpInput() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    console.log("Submitted OTP:", otpString);
    // Here you can add your logic to verify the OTP
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Enter OTP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-2xl text-center text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:bg-white transition"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Verify OTP
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Didn't receive the code?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
}
