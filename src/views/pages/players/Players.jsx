import React, { useState } from 'react';
import {
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CForm,
    CFormInput,
    CFormLabel,
    CModalTitle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPeople } from '@coreui/icons';

import avatar1 from 'src/assets/images/avatars/1.jpg';
import { Link } from 'react-router-dom';

const Players = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    const tableExample = [
        {
            avatar: { src: avatar1, status: 'success' },
            user: {
                name: 'Yiorgos Avraamu',
                new: true,
                registered: 'Jan 1, 2023',
            },
            country: { name: 'USA', flag: 'cifUs' },
            usage: {
                value: 50,
                period: 'Jun 11, 2023 - Jul 10, 2023',
                color: 'success',
            },
            payment: { name: 'Mastercard', icon: 'cibCcMastercard' },
            activity: '10 sec ago',
        },
        // Add other data
    ];

    const handleEditClick = (data) => {
        setEditData(data);
        setEditModalVisible(true);
    };

    const handleSaveEdit = () => {
        // Logic to save edited data
        setEditModalVisible(false);
    };

    return (
        <>
            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Players </CCardHeader>
                        <CCardBody>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Player Name</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Team</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Quantity</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Buy Orders </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Sell Orders</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Actions</CTableHeaderCell> {/* Add this line */}
                                        <CTableHeaderCell className="bg-body-tertiary"> </CTableHeaderCell> {/* Add this line */}

                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {tableExample.map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell className="text-center">
                                                <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.user.name}</div>
                                                <div className="small text-body-secondary text-nowrap">
                                                    <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered: {item.user.registered}
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex justify-content-between text-nowrap">
                                                    <div className="fw-semibold">{item.usage.value}%</div>
                                                    <div className="ms-3">
                                                        <small className="text-body-secondary">{item.usage.period}</small>
                                                    </div>
                                                </div>
                                                <CProgress thin color={item.usage.color} value={item.usage.value} />
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={item.payment.icon} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="small text-body-secondary text-nowrap">Last login</div>
                                                <div className="fw-semibold text-nowrap">{item.activity}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton color="primary" onClick={() => handleEditClick(item)}>Edit</CButton> {/* Add this line */}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <Link to="/players">
                                                    <CButton color="info" >Show</CButton>
                                                </Link>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {/* Edit Modal */}


            <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Edit Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {editData && (
                        <CForm>
                            {/* Avatar Image */}
                            <CForm>
                                <CFormLabel>Avatar Image</CFormLabel>
                                <CFormInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setEditData({ ...editData, avatar: { ...editData.avatar, src: URL.createObjectURL(file) } });
                                    }}
                                />
                                {editData.avatar.src && (
                                    <img src={editData.avatar.src} alt="Avatar" style={{ width: '100px', marginTop: '10px' }} />
                                )}
                            </CForm>
                            {/* Country */}
                            <CForm>
                                <CFormLabel>Country</CFormLabel>
                                <CFormInput
                                    type="text"
                                    value={editData.country.name}
                                    onChange={(e) =>
                                        setEditData({ ...editData, country: { ...editData.country, name: e.target.value } })
                                    }
                                />
                            </CForm>
                            {/* Usage */}
                            <CForm>
                                <CFormLabel>Usage (%)</CFormLabel>
                                <CFormInput
                                    type="number"
                                    value={editData.usage.value}
                                    onChange={(e) =>
                                        setEditData({ ...editData, usage: { ...editData.usage, value: parseInt(e.target.value) } })
                                    }
                                />
                            </CForm>
                            {/* Payment Method */}
                            <CForm>
                                <CFormLabel>Payment Method</CFormLabel>
                                <CFormInput
                                    ype="text"
                                    value={editData.payment.name}
                                    onChange={(e) =>
                                        setEditData({ ...editData, payment: { ...editData.payment, name: e.target.value } })
                                    }
                                />
                            </CForm>
                            {/* Activity */}
                            <CForm>
                                <CFormLabel>Activity</CFormLabel>
                                <CFormInput
                                    type="text"
                                    value={editData.activity}
                                    onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
                                />
                            </CForm>
                        </CForm>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleSaveEdit}>Save</CButton>
                    <CButton color="secondary" onClick={() => setEditModalVisible(false)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

        </>
    );
};

export default Players;
