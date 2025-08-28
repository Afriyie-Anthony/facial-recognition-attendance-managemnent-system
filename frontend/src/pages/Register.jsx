import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  User,
  Mail,
  Hash,
  GraduationCap,
  School,
  Camera,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

const MySwal = withReactContent(Swal);

const Register = () => {
  const webcamRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    studentId: '',
    className: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = (e) => {
    e.preventDefault();
    // Basic validation check
    if (form.name && form.email && form.studentId && form.className) {
      setStep(2);
    } else {
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all fields',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImage(imgSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Please capture an image',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    setLoading(true);

    const BASE_URL = "https://facial-recognition-backend-rmti.onrender.com";

    // Helper function to convert base64 to Blob
    const dataURLtoBlob = (dataurl) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };

    try {
      const formData = new FormData();
      formData.append('studentId', form.studentId);
      formData.append('fullName', form.name);
      formData.append('email', form.email);
      formData.append('class', form.className);

      const imageBlob = dataURLtoBlob(image);
      formData.append('profileImage', imageBlob, 'profile.jpeg'); // 'profile.jpeg' is the filename

      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        MySwal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have been successfully registered.',
          showConfirmButton: false,
          timer: 2500,
        });
        setForm({
          name: '',
          email: '',
          studentId: '',
          className: '',
        });
        setImage(null);
        setStep(1);
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message || 'An error occurred during registration.',
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Could not connect to the server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon, ...props }) => (
    <div className="relative mb-4">
      <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );

  const SelectField = ({ icon, children, ...props }) => (
    <div className="relative mb-4">
      <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <select
        {...props}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 
        The <style> tag is used here for the keyframe animation, 
        as it's a simple way to include it without modifying global CSS files for this component-specific animation.
      */}
      <style>{`
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .webcam-animated-border {
          position: absolute;
          top: -2%; left: 23.3%;
          transform: translate(-50%, -50%);
          width: 232px; /* 224px (webcam) + 8px (border) */
          height: 232px; /* 224px (webcam) + 8px (border) */
          border-radius: 50%;
          border: 4px solid #60a5fa; /* blue-400 */
          border-top-color: #3b82f6; /* blue-500 */
          animation: rotateBorder 2s linear infinite;
          z-index: 1;
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-lg w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-2xl sm:text-3xl tracking-wide text-gray-800">Register Student</h2>
          <span className="text-gray-500 font-medium text-sm">Step {step} of 2</span>
        </div>
        <p className="text-gray-500 mb-8 text-sm">
          {step === 1 ? 'Please fill in your details to proceed.' : 'Position your face in the center and capture.'}
        </p>

        {step === 1 ? (
          <form onSubmit={nextStep}>
            <InputField
              icon={<User size={20} />}
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<Mail size={20} />}
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<Hash size={20} />}
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={form.studentId}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<School size={20} />}
              type="text"
              name="className"
              placeholder="Class Name (e.g., Computer Science)"
              value={form.className}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-lg shadow-md transition mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next <ArrowRight size={20} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="relative w-full flex justify-center mb-6">
              <div className="webcam-animated-border"></div>
              <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg relative z-10 bg-gray-200">
                {image ? (
                  <img src={image} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ width: 400, height: 400, facingMode: "user" }}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            
            <div className="flex gap-4 mb-6">
              {!image ? (
                <button
                  type="button"
                  onClick={capture}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Camera size={20} /> Capture
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-500 text-white font-semibold text-lg shadow-md hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  <RefreshCw size={20} /> Retake
                </button>
              )}
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || !image}
                className="w-full py-3 rounded-lg font-bold text-lg shadow-md transition bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-gray-600 border border-gray-300 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                <ArrowLeft size={20} /> Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;