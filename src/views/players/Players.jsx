import React, { useEffect, useState } from 'react';
import {
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
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
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { ipoStatusApi } from '../../services/fanxangeApi';

const Players = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [players, setPlayers] = useState([]); // State to hold players data
    const { matchkey } = useParams(); // Extract matchkey from URL parameters
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await ipoStatusApi.getPlayers({ "matchkey": matchkey }); // Use the extracted matchkey
                setPlayers(res.data); // Assuming the API returns an object with a 'players' array
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        };
        fetchPlayers();
    }, [matchkey]); // Dependency array includes matchkey to refetch if it changes

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
                        <CCardHeader>Players</CCardHeader>
                        <CCardBody>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell>Player</CTableHeaderCell>
                                        <CTableHeaderCell>Team</CTableHeaderCell>
                                        <CTableHeaderCell>Role</CTableHeaderCell>
                                        <CTableHeaderCell>Buy Rate</CTableHeaderCell>
                                        <CTableHeaderCell>Sell Rate</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {players.map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell className="text-center">
                                                <div className='d-flex align-items-center'>
                                                    <CAvatar src={item.image} className='me-3' />
                                                    {item.name}
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell>{item.teamname}</CTableDataCell>
                                            <CTableDataCell>{item.role}</CTableDataCell>
                                            <CTableDataCell>{item.buy_rate}</CTableDataCell>
                                            <CTableDataCell>{item.sell_rate}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButton color="primary" onClick={() => handleEditClick(item)}>Edit</CButton>
                                                <Link to={`/player-details/${item._id}`} className="ms-2">
                                                    <CButton color="info">Details</CButton>
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
                    <CModalTitle>Edit Player</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {editData && (
                        <CForm>
                            <CFormLabel htmlFor="playerName">Player Name</CFormLabel>
                            <CFormInput
                                id="playerName"
                                type="text"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            />
                            {/* Include other fields as necessary */}
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
