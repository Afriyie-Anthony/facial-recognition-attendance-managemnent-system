import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Register = () => {
  const webcamRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    studentId: '',
    level: '',
    className: '',
  });
  const levels = ['100', '200', '300', '400', '500', '600'];
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
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
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          image,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        MySwal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Registration successful!',
          showConfirmButton: false,
          timer: 2000,
        });
        setForm({
          name: '',
          email: '',
          studentId: '',
          level: '',
          className: '',
        });
        setImage(null);
        setStep(1);
      } else {
        MySwal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: data.message || 'Registration failed',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch {
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Network error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
      <style>{`
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .webcam-border {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .webcam-animated-border {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          margin: auto;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 6px solid #22c55e;
          border-top: 6px solid #2dd4bf;
          animation: rotateBorder 2s linear infinite;
          z-index: 1;
        }
        .webcam-circle {
          border-radius: 50%;
          overflow: hidden;
          width: 200px;
          height: 200px;
          box-shadow: 0 2px 16px rgba(34,197,94,0.15);
          z-index: 2;
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h2 className="mb-6 font-bold text-3xl tracking-wide">Register Student</h2>
        {step === 1 ? (
          <form onSubmit={nextStep}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 rounded-lg border text-lg focus:outline-none focus:border-blue-400 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 rounded-lg border text-lg focus:outline-none focus:border-blue-400 transition"
            />
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={form.studentId}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 rounded-lg border text-lg focus:outline-none focus:border-blue-400 transition"
            />
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 rounded-lg border text-lg focus:outline-none focus:border-blue-400 transition bg-blue-50 text-blue-600"
            >
              <option value="" disabled>Select Level</option>
              {levels.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <input
              type="text"
              name="className"
              placeholder="Class"
              value={form.className}
              onChange={handleChange}
              required
              className="w-full mb-5 px-4 py-3 rounded-lg border border-blue-200 text-lg focus:outline-none focus:border-blue-400 transition"
            />
            <button
              type="submit"
              className="w-full py-4 rounded-lg font-bold text-xl shadow transition mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-600 hover:to-blue-500 cursor-pointer"
            >
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="webcam-border">
              <div className="webcam-animated-border"></div>
              <div className="webcam-circle">
                {image ? (
                  <img src={image} alt="Captured" width={250} height={250} className="rounded-full w-full h-full object-cover" />
                ) : (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={200}
                    height={200}
                    style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                )}
              </div>
            </div>
            {!image && (
              <button
                type="button"
                onClick={capture}
                className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg shadow hover:from-blue-600 hover:to-blue-700 transition"
              >
                Capture Image
              </button>
            )}
            {image && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-400 text-white font-semibold text-lg shadow hover:from-blue-500 hover:to-blue-500 transition"
              >
                Retake Image
              </button>
            )}
            {/* No image preview below the main image */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-xl shadow transition mt-2 ${loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500 cursor-pointer'}`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full py-2 rounded-lg font-semibold text-blue-500 mt-2 border border-blue-300 hover:bg-blue-50 transition"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;