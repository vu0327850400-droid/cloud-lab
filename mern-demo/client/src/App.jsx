import { useState, useEffect } from 'react';

function App() {
  // Câu 48: Tạo React State để lưu dữ liệu danh sách và Form
  const [students, setStudents] = useState([]);
  const [mssv, setMssv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Đã cập nhật URL Backend thành link Port 5000 của Codespaces
  const API_URL = 'https://upgraded-guide-jjvqjp6xr7vjhq9p4-5000.app.github.dev/api/students'; 

  // Câu 47: Gọi GET /api/students để lấy danh sách
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  // Chạy fetchStudents ngay khi component vừa load xong
  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 49: Gửi dữ liệu POST /api/students khi submit Form
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // Lưu ý: Đã đổi 'mssv' thành 'studentId' để gửi lên cho khớp với Backend và MongoDB
    const newStudent = { studentId: mssv, name, email }; 

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        alert('Thêm sinh viên thành công!');
        // Xóa trắng form sau khi thêm thành công
        setMssv('');
        setName('');
        setEmail('');
        // Lấy lại danh sách mới nhất
        fetchStudents();
      } else {
        alert('Có lỗi xảy ra khi thêm sinh viên!');
      }
    } catch (error) {
      console.error('Lỗi khi thêm sinh viên:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý Sinh viên</h1>

      {/* Câu 48: Giao diện Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="MSSV"
          value={mssv}
          onChange={(e) => setMssv(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Thêm sinh viên</button>
      </form>

      {/* Câu 47: Giao diện hiển thị danh sách */}
      <ul>
        {students.map((student, index) => (
          <li key={index}>
             {/* Đã sửa chỗ này thành student.studentId để hiển thị đúng mã số */}
             {student.studentId} - {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;