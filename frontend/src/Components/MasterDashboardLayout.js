import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Topbar from './Topbar/Topbar'
function MasterDashboardLayout({ children }) {
    return (
        <div>


            <Topbar />
            <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <Sidebar />
                {/* <!-- Main content --> */}
                <div class="h-screen flex-grow-1 overflow-y-lg-auto">
                    {/* <!-- Header --> */}
                    <header class="pt-6">
                        <div class="container-fluid">
                            <div class="mb-npx">
                                <div class="row align-items-center">
                                    <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                        {/* <!-- Title --> */}
                                        <h1 class="h2 mb-0 ls-tight">Application</h1>
                                    </div>
                                    {/* <!-- Actions --> */}
                                    <div class="col-sm-6 col-12 text-sm-end">
                                        <div class="mx-n1">
                                            <a href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                                <span class=" pe-2">
                                                    <i class="bi bi-pencil"></i>
                                                </span>
                                                <span>Edit</span>
                                            </a>
                                            <a href="#" class="btn d-inline-flex btn-sm btn-primary mx-1">
                                                <span class=" pe-2">
                                                    <i class="bi bi-plus"></i>
                                                </span>
                                                <span>Create</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </header>
                    {/* <!-- Main --> */}
                    <main class="py-6 bg-surface-secondary">
                        <div class="container-fluid">
                            {/* <!-- Card stats --> */}

                            <div class="">
                                {
                                    children
                                }
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        </div>
    )
}

export default MasterDashboardLayout