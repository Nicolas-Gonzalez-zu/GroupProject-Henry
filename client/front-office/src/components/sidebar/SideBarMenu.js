import React from 'react'

const SideBarMenu = () => {
    return (
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                <li className="nav-item">
                    <a href="../widgets.html" className="nav-link">
                        <i className="nav-icon fas fa-th"></i>
                        <p>
                            Widgets
                            <span className="right badge badge-danger">New</span>
                        </p>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default SideBarMenu;