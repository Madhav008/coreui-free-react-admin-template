import React, { useEffect, useState } from 'react';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CImage, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ipoStatusApi } from '../../services/fanxangeApi';

const NotStarted = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [matches, setMatches] = useState([]); // State to hold fetched matches
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMatches = async () => { // Define an async function inside useEffect
            const res = await ipoStatusApi.getStartedMatches(); // Assuming this returns a promise
            setMatches(res.data.matches); // Update local state with fetched matches
        };
        fetchMatches(); // Call the async function
    }, [dispatch]); // Include dispatch in the dependency array

    const handleEditClick = (data) => {
        setEditData(data);
        setEditModalVisible(true);
    };

    const handleSaveEdit = () => {
        console.log('Edited Data:', editData); // Implement saving logic here
        setEditModalVisible(false);
    };

    return (
        <>
            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Completed Matches</CCardHeader>
                        <CCardBody>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell>Teams</CTableHeaderCell>
                                        <CTableHeaderCell>Series Name</CTableHeaderCell>
                                        <CTableHeaderCell>Start Date</CTableHeaderCell>
                                        <CTableHeaderCell>Status</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {matches.map((item, index) => (
                                        <CTableRow key={item._id}>
                                            <CTableDataCell>
                                                <div className='d-flex align-items-center'>
                                                    <CImage height={30} className='me-2' src={item.team1logo} alt={item.team1display} />
                                                    <span className='me-2'>{item.team1display}</span>
                                                    <span>VS</span>
                                                    <span className='ms-2'>{item.team2display}</span>
                                                    <CImage height={30} className='ms-2' src={item.team2logo} alt={item.team2display} />
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell>{item.seriesname}</CTableDataCell>
                                            <CTableDataCell>{item.start_date}</CTableDataCell>
                                            <CTableDataCell>{item.match_status}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton color="primary" onClick={() => handleEditClick(item)}>Edit</CButton>
                                                <Link to={`/players/${item.matchkey}`} className="ms-2">
                                                    <CButton variant='outline' color="info">Show Players</CButton>
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

            <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Edit Match</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {editData && (
                        <CForm>
                            <CFormLabel htmlFor="seriesName">Series Name</CFormLabel>
                            <CFormInput
                                id="seriesName"
                                type="text"
                                value={editData.seriesname}
                                onChange={(e) => setEditData({ ...editData, seriesname: e.target.value })}
                            />
                            <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
                            <CFormInput
                                id="startDate"
                                type="text"
                                value={editData.start_date}
                                onChange={(e) => setEditData({ ...editData, start_date: e.target.value })}
                            />
                            <CFormLabel htmlFor="status">Status</CFormLabel>
                            <CFormInput
                                id="status"
                                type="text"
                                value={editData.match_status}
                                onChange={(e) => setEditData({ ...editData, match_status: e.target.value })}
                            />
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

export default NotStarted;
