import React, { useState, useEffect, useRef } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
    FaHome, FaBuilding, FaUser, FaBell, FaChartBar,
    FaCog, FaFileInvoice, FaWallet, FaBox, FaParking,
    FaLayerGroup, FaDoorOpen, FaArrowUp, FaChevronDown, FaChevronRight, FaArrowRight
} from "react-icons/fa";
import user from '../assets/user.png';
import "../assets/dashboardSCSS.scss";
import {
    Button,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    UncontrolledDropdown,
    Card,
    CardBody,
    Row,
    Col
} from "reactstrap";
import { Menu } from "react-feather";
import logo from "../assets/Home-Apartment-Building-by-logoroma.png";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import img from "../assets/profile-img.png";
import UserTable from "../components/user-table";
import HouseTable from "../components/house-table";
import TodayVisitor from "../components/today-visitors";
import ApprovalPending from "../components/aproval-pending";
import loader from '../assets/loader.svg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Loading = () => (
    <div className="loading-container">
        <img src={loader} alt="Loading..." className="loading-spinner" />
    </div>
);

const DashBoardView = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isApartmentSetupOpen, setIsApartmentSetupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const chartRef = useRef(null);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleApartmentSetup = () => {
        setIsApartmentSetupOpen(!isApartmentSetupOpen);
    };

    const chartData = {
        labels: ['August-2024', 'September-2024'],
        datasets: [
            {
                label: 'Maintenance',
                data: [15000, 25000],
                backgroundColor: '#4CAF50',
            },
            {
                label: 'Invoice',
                data: [10000, 15000],
                backgroundColor: '#FFA726',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
            },
            y: {
                type: 'linear',
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [location]);

    const DashboardContent = () => (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">DASHBOARD</h4>
                <span className="text-muted">Welcome to Dashboard</span>
            </div>

            {/* Statistics Cards */}
            <Row className="g-3 mb-4">
                <Col md={3}>
                    <Card className="h-100">
                        <CardBody className="d-flex align-items-center">
                            <div>
                                <div className="text-muted mb-1">User<Link to="/dashboard/user-table" className="ms-2 text-primary">
                                    <FaArrowRight size={16} />
                                </Link></div>
                                <h3 className="mb-0">1</h3>
                            </div>
                            <div className="ms-auto p-3 bg-primary bg-opacity-10 rounded">
                                <FaUser className="text-primary" size={24} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <CardBody className="d-flex align-items-center">
                            <div>
                                <div className="text-muted mb-1">House<Link to="/dashboard/housetable" className="ms-2 text-primary">
                                    <FaArrowRight size={16} />
                                </Link></div>
                                <h3 className="mb-0">7</h3>
                            </div>
                            <div className="ms-auto p-3 bg-success bg-opacity-10 rounded">
                                <FaHome className="text-success" size={24} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <CardBody className="d-flex align-items-center">
                            <div>
                                <div className="text-muted mb-1">Today Visitor<Link to="/dashboard/visitor" className="ms-2 text-primary">
                                    <FaArrowRight size={16} />
                                </Link></div>
                                <h3 className="mb-0">0</h3>
                            </div>
                            <div className="ms-auto p-3 bg-info bg-opacity-10 rounded">
                                <FaUser className="text-info" size={24} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <CardBody className="d-flex align-items-center">
                            <div>
                                <div className="text-muted mb-1">Approval Pending<Link to="/dashboard/aproval-pending" className="ms-2 text-primary">
                                    <FaArrowRight size={16} />
                                </Link></div>
                                <h3 className="mb-0">0</h3>
                            </div>
                            <div className="ms-auto p-3 bg-warning bg-opacity-10 rounded">
                                <FaCog className="text-warning" size={24} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Chart and Welcome Card */}
            <Row className="g-3">
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <h5 className="mb-4">House Maintenance Invoice</h5>
                            <Bar ref={chartRef} data={chartData} options={chartOptions} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-primary bg-opacity-10">
                        <CardBody>
                            <div className="row align-items-center">
                                <div className="col-7">
                                    <h5>Welcome Back!</h5>
                                    <p className="text-muted">Dream House</p>
                                </div>
                                <div className="col-5 text-end">
                                    <img
                                        src={img}
                                        alt="Person working"
                                        className="img-fluid"
                                        style={{ maxHeight: '120px' }}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <img src={user} alt="profile" className="rounded-circle" width="64" height="64" />
                                <h6 className="mt-3 mb-1">suryakant</h6>
                                <p className="text-muted mb-1">Admin</p>
                                <p className="mb-0">8917686309</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <Navbar color="white" light expand="lg" className="topbar shadow-sm">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="OhhPro" className="brand-logo" />

                    {isExpanded && (
                        <span className="company-name me-3">
                            Suryakant.co
                        </span>
                    )}
                    <Button
                        className="sidebar-toggle"
                        onClick={toggleSidebar}
                    >
                        <Menu size={20} />
                    </Button>
                </div>

                <div className="ms-auto d-flex align-items-center">
                    <div className="position-relative me-3">
                        <FaBell size={20} className="text-muted" />
                    </div>
                    <UncontrolledDropdown>
                        <DropdownToggle color="transparent">
                            <div className="d-flex align-items-center">
                                <img src={user} alt="profile" className="rounded-circle me-2" width="32" height="32" />
                                <span className="d-none d-md-block">Suryakant</span>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu end>
                            <div className="p-3">
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <Link to="/settings" className="dropdown-item">Settings</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/logout" className="dropdown-item">Logout</Link>
                            </div>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Navbar>

            {/* Sidebar */}
            <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
                <Nav vertical className="flex-column">
                    <div className="sidebar-items">
                        <Link to="/dashboard" className="sidebar-item active">
                            <FaChartBar />
                            <span>Dashboards</span>
                            {isExpanded && <span className="badge bg-success rounded-pill ms-2">NEW</span>}
                        </Link>

                        <div className="sidebar-submenu">
                            <div className="sidebar-item" onClick={toggleApartmentSetup}>
                                <FaBuilding />
                                <span>Apartment Setup</span>
                                {isExpanded && (isApartmentSetupOpen ? <FaChevronDown className="ms-auto" /> : <FaChevronRight className="ms-auto" />)}
                            </div>
                            {isApartmentSetupOpen && isExpanded && (
                                <div className="submenu">
                                    <Link to="/block" className="sidebar-item">
                                        <FaLayerGroup />
                                        <span>Block</span>
                                    </Link>
                                    <Link to="/floor" className="sidebar-item">
                                        <FaLayerGroup />
                                        <span>Floor</span>
                                    </Link>
                                    <Link to="/dashboard/housetable" className="sidebar-item">
                                        <FaDoorOpen />
                                        <span>House</span>
                                    </Link>
                                    <Link to="/lift" className="sidebar-item">
                                        <FaArrowUp />
                                        <span>Lift</span>
                                    </Link>
                                    <Link to="/parking" className="sidebar-item">
                                        <FaParking />
                                        <span>Parking</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link to="/complaints" className="sidebar-item">
                            <FaFileInvoice />
                            <span>Complain Management</span>
                        </Link>
                        <Link to="/daily-help" className="sidebar-item">
                            <FaUser />
                            <span>Daily Help</span>
                        </Link>

                        <div className="sidebar-category">FINANCIAL TRANSACTION</div>

                        <Link to="/assets" className="sidebar-item">
                            <FaBox />
                            <span>Asset & Amenity</span>
                            {isExpanded && <span className="badge bg-success rounded-pill ms-2">NEW</span>}
                        </Link>
                        <Link to="/bank" className="sidebar-item">
                            <FaWallet />
                            <span>Apartment Bank Account</span>
                        </Link>
                    </div>
                </Nav>
            </div>

            {/* Main Content */}
            <div className={`main-content ${isExpanded ? 'shifted' : ''}`}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Routes>
                        <Route path="/" element={<DashboardContent />} />
                        <Route path="/user-table" element={<UserTable />} />
                        <Route path="/housetable" element={<HouseTable />} />
                        <Route path="/visitor" element={<TodayVisitor />} />
                        <Route path="/aproval-pending" element={<ApprovalPending />} />
                    </Routes>
                )}
            </div>
        </div>
    );
};

export default DashBoardView;
