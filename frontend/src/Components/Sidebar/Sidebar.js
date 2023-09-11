import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
    return (
        <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
            <div class="container-fluid">
                {/* <!-- Toggler --> */}
                <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                {/* <!-- Brand --> */}
                <Link class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" to="#">
                    <img src="https://preview.webpixels.io/web/img/logos/clever-primary.svg" alt="..." />
                </Link>
                {/* <!-- User menu (mobile) --> */}
                <div class="navbar-user d-lg-none">
                    {/* <!-- Dropdown --> */}
                    <div class="dropdown">
                        {/* <!-- Toggle --> */}
                        <Link to="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="avatar-parent-child">
                                <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar- rounded-circle" />
                                <span class="avatar-child avatar-badge bg-success"></span>
                            </div>
                        </Link>
                        {/* <!-- Menu --> */}
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                            <Link to="#" class="dropdown-item">Profile</Link>
                            <Link to="#" class="dropdown-item">Settings</Link>
                            <Link to="#" class="dropdown-item">Billing</Link>
                            <hr class="dropdown-divider" />
                            <Link to="#" class="dropdown-item">Logout</Link>
                        </div>
                    </div>
                </div>
                {/* <!-- Collapse --> */}
                <div class="collapse navbar-collapse" id="sidebarCollapse">
                    {/* <!-- Navigation --> */}
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/dashboard">
                                <i class="bi bi-house"></i> Dashboard
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/view-user">
                                <i class="bi bi-people"></i> View Users
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/create-user">
                                <i class="bi bi-people"></i> Create Users
                            </Link>
                        </li>
                        {/* <li class="nav-item">
                            <Link class="nav-link" to="#">
                                <i class="bi bi-bar-chart"></i> Analitycs
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">
                                <i class="bi bi-chat"></i> Messages
                                <span class="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">
                                <i class="bi bi-bookmarks"></i> Collections
                            </Link>
                        </li> */}
                      
                    </ul>
                    {/* <!-- Divider --> */}
                    <hr class="navbar-divider my-5 opacity-20" />
                    {/* <!-- Navigation --> */}

                    {/* <!-- Push content down --> */}
                    <div class="mt-auto"></div>

                </div>
            </div>
        </nav>
    )
}

export default Sidebar