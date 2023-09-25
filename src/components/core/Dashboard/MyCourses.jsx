import React from 'react'

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
  return (
    <div>
      <p>my courses</p>
    </div>
  )
}

export default MyCourses
