# Facial Recognition Backend

This is the backend for a facial recognition-based attendance system.
Base_URL= "https://facial-recognition-backend-rmti.onrender.com"
## Latest Updates

This update introduces new data models, API endpoints, and refactors existing blueprints to handle an expanded set of features, including dashboard metrics and improved student management.

### Models Update

*   **`Student` Model:**
    *   Now includes `attendance_percent` (Integer), `status` (String), and `last_seen` (DateTime) fields to store more comprehensive student information.
*   **New Models Added:**
    *   **`DashboardMetrics`**: Stores key performance indicators for the dashboard.
        *   Fields: `title` (String), `value` (Integer), `description` (String).
    *   **`Chart`**: Stores data for graphical representation, such as daily attendance.
        *   Fields: `day` (String), `present` (Integer), `absent` (Integer).
    *   **`AttendanceMetrics`**: Stores aggregated attendance statistics.
        *   Fields: `title` (String), `value` (Integer).

### API Endpoints Update

#### Core Blueprint (`/`)

*   **`GET /`**
    Returns a welcome message.

    **Response:**

    ```json
    {
      "success": true,
      "message": "Welcome to the Facial Recognition Backend"
    }
    ```

*   **`POST /api/register`**
    Registers a new student.

    **Request:**

    This endpoint now expects a `multipart/form-data` request with the following fields:

    -   `studentId` (string, required): The student's ID.
    -   `fullName` (string, required): The student's full name.
    -   `email` (string, required): The student's email address.
    -   `class` (string, required): The student's class.
    -   `profileImage` (file, required): The student's profile image file.

    **Response (Success):**

    ```json
    {
      "success": true,
      "student": {
        "id": "ST005",
        "fullName": "string",
        "email": "string",
        "class": "string",
        "status": "active",
        "profileImage": "url or base64"
      },
      "message": "Student registered successfully."
    }
    ```

#### Attendance Blueprint (`/api/v1`)

*   **`POST /api/v1/attendance`**
    Takes attendance by recognizing faces in an uploaded image.

    **Request:**

    ```json
    {
      "image": "<base64_encoded_image>"
    }
    ```

    **Response (Success):**

    ```json
    {
      "success": true,
      "message": "Attendance recorded.",
      "matchedStudents": [
        {
          "id": "student123",
          "fullName": "John Doe",
          "email": "john.doe@example.com",
          "class": "Computer Science",
          "status": "present",
          "time": "09:30"
        }
      ]
    }
    ```

#### Dashboard Blueprint (`/api/v1`)

*   **`GET /api/v1/dashboard/metrics`**
    Retrieves key dashboard metrics.

    **Response (Example):**

    ```json
    [
      {
        "title": "Total Students",
        "value": 320,
        "description": "Total number of registered students"
      },
      {
        "title": "Present Today",
        "value": 18,
        "description": "Total number of teachers"
      }
    ]
    ```

*   **`GET /api/v1/dashboard/chart`**
    Retrieves data for the attendance chart.

    **Response (Example):**

    ```json
    [
      { "day": "Mon", "present": 29, "absent": 3 },
      { "day": "Tue", "present": 31, "absent": 1 }
    ]
    ```

*   **`GET /api/v1/attendance/metrics`**
    Retrieves aggregated attendance metrics.

    **Response (Example):**

    ```json
    [
      { "title": "Present", "value": 2 },
      { "title": "Late", "value": 2 }
    ]
    ```
