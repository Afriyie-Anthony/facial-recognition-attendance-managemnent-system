import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TakeAttendance = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const capture = () => {
    const imgSrc = webcamRef.current?.getScreenshot() || null;
    setImage(imgSrc);
  };

  const handleAttendance = async () => {
    if (!image) return;
    setLoading(true);
    setResults([]); // Clear previous results
    try {
      const res = await fetch('/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data) && data.length > 0) {
        setResults(data);
        MySwal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `${data.length} student(s) matched!`,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        setResults([]);
        MySwal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: data.message || 'No face detected or student not found.',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred. Please try again.',
        showConfirmButton: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: 'user',
  };

  return (
    <>
      <style>{`
        .webcam-animated-border {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 272px; /* 256px (w-64) + 16px */
          height: 272px; /* 256px (h-64) + 16px */
          border-radius: 50%;
          border: 4px solid #60a5fa; /* teal-400 */
          border-top-color: #3b82f6; /* teal-600 */
          animation: spin 1.5s linear infinite;
          z-index: 10;
        }

        @keyframes spin {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full">
          <h2 className="mb-6 font-bold text-3xl text-gray-800 dark:text-white text-center tracking-wide">
            Take Attendance
          </h2>

          <div className="flex flex-col items-center mb-6">
            <div className="relative w-64 h-64">
              {loading && <div className="webcam-animated-border"></div>}
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-400 dark:border-blue-500 shadow-lg mx-auto">
                {image ? (
                  <img src={image} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {!image ? (
              <button
                type="button"
                onClick={capture}
                className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-md hover:bg-teal-600 transition duration-300"
              >
                Capture Image
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="w-full py-3 rounded-lg bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-800 font-semibold text-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300"
                >
                  Retake
                </button>
                <button
                  type="button"
                  onClick={handleAttendance}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Checking...' : 'Submit'}
                </button>
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="mt-8 text-left">
              <h3 className="font-bold text-xl mb-4 text-gray-700 dark:text-gray-200 text-center">
                Matched Students
              </h3>
              <ul className="space-y-4">
                {results.map((student, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="font-semibold text-gray-600 dark:text-gray-300">Name:</div>
                      <div className="text-gray-800 dark:text-white">{student.name}</div>

                      <div className="font-semibold text-gray-600 dark:text-gray-300">Class:</div>
                      <div className="text-gray-800 dark:text-white">{student.className}</div>

                      <div className="font-semibold text-gray-600 dark:text-gray-300">Level:</div>
                      <div className="text-gray-800 dark:text-white">{student.level}</div>

                      <div className="font-semibold text-gray-600 dark:text-gray-300">Index No:</div>
                      <div className="text-gray-800 dark:text-white">{student.studentId}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TakeAttendance;