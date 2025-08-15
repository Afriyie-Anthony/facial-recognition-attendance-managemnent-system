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
    try {
      const res = await fetch('/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        setResults([]);
        MySwal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'No face detected',
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-teal-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h2 className="mb-6 font-bold text-3xl text-green-500 tracking-wide">Take Attendance</h2>
        <div className="flex flex-col items-center mb-4">
          <div className="rounded-full overflow-hidden border-4 border-green-400 mb-4" style={{ width: 200, height: 200 }}>
            {image ? (
              <img src={image} alt="Captured" className="w-full h-full object-cover" />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
          {!image && (
            <button
              type="button"
              onClick={capture}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold text-lg shadow hover:from-green-500 hover:to-teal-500 transition mb-2"
            >
              Capture Image
            </button>
          )}
          {image && (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-400 to-green-400 text-white font-semibold text-lg shadow hover:from-teal-500 hover:to-green-500 transition mb-2"
            >
              Retake Image
            </button>
          )}
          <button
            type="button"
            onClick={handleAttendance}
            disabled={!image || loading}
            className={`w-full py-3 rounded-lg font-bold text-xl shadow transition mt-2 ${(!image || loading) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-teal-400 text-white hover:from-green-600 hover:to-teal-500 cursor-pointer'}`}
          >
            {loading ? 'Checking...' : 'Submit Attendance'}
          </button>
        </div>
        {results.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="font-bold text-lg mb-2 text-green-600">Matched Students</h3>
            <ul>
              {results.map((student, idx) => (
                <li key={idx} className="mb-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div><span className="font-semibold">Name:</span> {student.name}</div>
                  <div><span className="font-semibold">Class:</span> {student.className}</div>
                  <div><span className="font-semibold">Level:</span> {student.level}</div>
                  <div><span className="font-semibold">Index Number:</span> {student.studentId}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeAttendance;