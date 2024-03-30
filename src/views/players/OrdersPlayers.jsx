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
    CWidgetStatsA,
} from '@coreui/react';
import { useParams } from 'react-router-dom';
import { ipoStatusApi } from '../../services/fanxangeApi';

const OrderPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [expandedPlayerId, setExpandedPlayerId] = useState(null);
    const { matchOrderId } = useParams();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await ipoStatusApi.getMatchOrders(matchOrderId);
                setPlayers(res.data);
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        };
        fetchPlayers();
    }, [matchOrderId]);

    const toggleRowExpansion = (playerId) => {
        setExpandedPlayerId(expandedPlayerId === playerId ? null : playerId);
    };

    const getOrderTotals = (orders, type) => {
        return orders
            .filter(order => order.orderType === type)
            .reduce((total, order) => total + order.qty, 0);
    };

    const calculateTotalAfterSettlement = (orders) => {
        const buyOrders = orders.filter(order => order.orderType === 'buy');
        const sellOrders = orders.filter(order => order.orderType === 'sell');
        const totalBuy = buyOrders.reduce((acc, order) => acc + order.qty, 0);
        const totalSell = sellOrders.reduce((acc, order) => acc + order.qty, 0);
        const averagePrice = (buyOrders.reduce((acc, order) => acc + order.price, 0) + sellOrders.reduce((acc, order) => acc + order.price, 0)) / (buyOrders.length + sellOrders.length);

        return Math.abs(totalBuy - totalSell) * averagePrice;
    };
    // Calculate Grand Total and Total Number of Orders
    const grandTotal = players.reduce((acc, player) => {
        // Calculate the total settlement for the current player
        const playerSettlement = calculateTotalAfterSettlement(player.orders);
        // Accumulate the settlement into the grand total
        return acc + playerSettlement;
    }, 0);
    const totalOrders = players.reduce((acc, player) => acc + player.orders.length, 0);

    return (
        <> <CRow>
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={`₹${grandTotal.toFixed(2)}`}
                    title="Grand Total of Orders"
                />
            </CCol>
            <CCol sm={6}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={`${totalOrders} Orders`}
                    title="Total Number of Orders"
                />
            </CCol>
        </CRow>

            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Players and Orders</CCardHeader>
                        <CCardBody>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Player</CTableHeaderCell>
                                        <CTableHeaderCell>Buy Price</CTableHeaderCell>
                                        <CTableHeaderCell>Sell Price</CTableHeaderCell>
                                        <CTableHeaderCell>Total Buy Orders </CTableHeaderCell>
                                        <CTableHeaderCell>Total Sell Orders </CTableHeaderCell>
                                        <CTableHeaderCell>Total After Settlement</CTableHeaderCell>

                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {players.map(player => (
                                        <>
                                            <CTableRow key={player.playerInfo._id} onClick={() => toggleRowExpansion(player.playerInfo._id)} style={{ cursor: 'pointer' }}>
                                                <CTableDataCell>
                                                    <div className='d-flex align-items-center'>
                                                        <CAvatar src={player.playerInfo.image} size="md" className='me-3' />
                                                        {player.playerInfo.name}
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell>{player.playerInfo.buy_rate}</CTableDataCell>
                                                <CTableDataCell>{player.playerInfo.sell_rate}</CTableDataCell>
                                                <CTableDataCell>{getOrderTotals(player.orders, 'buy')}</CTableDataCell>
                                                <CTableDataCell>{getOrderTotals(player.orders, 'sell')}</CTableDataCell>
                                                <CTableDataCell>{calculateTotalAfterSettlement(player.orders)}</CTableDataCell> {/* Display Total After Settlement */}
                                            </CTableRow>
                                            {expandedPlayerId === player.playerInfo._id && (
                                                <CTableRow key={`details-${player.playerInfo._id}`}>
                                                    <CTableDataCell colSpan={3}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div style={{ width: '50%' }}>
                                                                <h5>Buy Orders</h5>
                                                                {player.orders.filter(order => order.orderType === 'buy').map((order, index) => (
                                                                    <div key={index} style={{ backgroundColor: '#d1e7dd', padding: '5px', marginBottom: '5px' }}>
                                                                        Price: {order.price}, Qty: {order.qty}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div style={{ width: '50%' }}>
                                                                <h5>Sell Orders</h5>
                                                                {player.orders.filter(order => order.orderType === 'sell').map((order, index) => (
                                                                    <div key={index} style={{ backgroundColor: '#f8d7da', padding: '5px', marginBottom: '5px' }}>
                                                                        Price: {order.price}, Qty: {order.qty}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            )}
                                        </>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default OrderPlayers;
