import React from 'react'

function Topbar() {
  return (
    
    <div className=''>
    <div className='w-100 fixed-top '>
        <a href="https://webpixels.io/components?ref=codepen" class="btn py-4 w-full btn-primary text-truncate rounded-0 py-2 border-0 position-relative" style={{ zIndex: "1000" }}>
            {/* <strong>Crafted with Webpixels CSS:</strong> The design system for Bootstrap 5. Browse all components → */}
            <button type="button" class="btn btn-sm  btn-danger text-danger-hover  border float-end px-5 mx-5 ">
                {/* <i class="bi bi-box-arrow-right fs-4"></i> */}
                <p>Sign Out </p>
            </button>
        </a>

    </div>
</div>


  )
}

export default Topbar