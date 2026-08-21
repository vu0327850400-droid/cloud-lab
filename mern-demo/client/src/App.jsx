import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [mssv, setMssv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null); // State để biết đang sửa sinh viên nào

  // Link API hiện tại của bạn
  const API_URL = 'https://upgraded-guide-jjvqjp6xr7vjhq9p4-5000.app.github.dev/api/students'; 

  // Lấy danh sách (GET)
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Xử lý Thêm (POST) và Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const studentData = { studentId: mssv, name, email }; 

    try {
      if (editId) {
        // Câu 61: Gửi API PUT để cập nhật
        const response = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
        if (response.ok) {
          alert('Cập nhật thành công!');
          setEditId(null); // Hủy chế độ sửa
        }
      } else {
        // Gửi API POST để thêm mới
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
        if (response.ok) {
          alert('Thêm sinh viên thành công!');
        }
      }

      // Xóa form và tải lại danh sách
      setMssv('');
      setName('');
      setEmail('');
      fetchStudents(); 
    } catch (error) {
      console.error('Lỗi khi lưu sinh viên:', error);
    }
  };

  // Nút Sửa: Đưa thông tin lên Form
  const handleEdit = (student) => {
    setMssv(student.studentId);
    setName(student.name);
    setEmail(student.email);
    setEditId(student._id); // Lấy _id của MongoDB để sửa
  };

  // Câu 62: Gửi API DELETE để xóa
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Xóa sinh viên thành công!');
          fetchStudents(); 
        }
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý Sinh viên</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="MSSV" value={mssv} onChange={(e) => setMssv(e.target.value)} required style={{ marginRight: '5px' }}/>
        <input type="text" placeholder="Họ tên" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginRight: '5px' }}/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginRight: '5px' }}/>
        <button type="submit">{editId ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}</button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setMssv(''); setName(''); setEmail(''); }} style={{ marginLeft: '5px' }}>
            Hủy sửa
          </button>
        )}
      </form>

      {/* Danh sách sinh viên kèm nút Sửa/Xóa */}
      <ul>
        {students.map((student, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
             {student.studentId} - {student.name} - {student.email}
             <button onClick={() => handleEdit(student)} style={{ marginLeft: '15px' }}>Sửa</button>
             <button onClick={() => handleDelete(student._id)} style={{ marginLeft: '5px', color: 'red' }}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;