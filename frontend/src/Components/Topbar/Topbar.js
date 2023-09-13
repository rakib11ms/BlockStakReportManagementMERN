import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('refreshToken');
    // Clear access token from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_info');
    // Navigate to the login route
    navigate('/login');
  };

  return (
    
    <div className=''>
    <div className='w-100 fixed-top '>
        <a class="btn py-4 w-full btn-primary text-truncate rounded-0 py-2 border-0 position-relative" style={{ zIndex: "1000" }}>
            {/* <strong>Crafted with Webpixels CSS:</strong> The design system for Bootstrap 5. Browse all components → */}
            <button type="button" class="btn btn-sm  btn-danger text-danger-hover  border float-end px-5 mx-5 "  onClick={handleLogout}>
                {/* <i class="bi bi-box-arrow-right fs-4"></i> */}
                <p>Sign Out </p>
            </button>
        </a>

    </div>
</div>


  )
}

export default Topbar