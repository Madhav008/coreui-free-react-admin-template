import React, { useEffect, useState } from 'react';
import {
    CAvatar,
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

const OrderUsers = () => {
    const [users, setUsers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const { matchOrderId } = useParams();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await ipoStatusApi.getMatchOrderbyUser(matchOrderId);
                setUsers(res.data); // Assuming res.data matches the structure provided
            } catch (error) {
                console.error("Failed to fetch user orders:", error);
            }
        };
        fetchUsers();
    }, [matchOrderId]);

    const toggleRowExpansion = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    const getOrderTotals = (orders, type) => {
        return orders
            .filter(order => order.orderType === type)
            .reduce((total, order) => total + order.qty, 0);
    };

    const calculateTotalAfterSettlement = (orders) => {
        // Sum up the 'amount' from all orders to get the total investment
        const totalInvestment = orders.reduce((acc, order) => acc + order.amount, 0);

        // Sum up the 'profit' from all orders
        const totalProfit = orders.reduce((acc, order) => acc + order.profit, 0);

        // Calculate the net result by subtracting the total profit from the total investment
        const netResult = totalProfit - totalInvestment;

        return netResult; // This will be the net result after considering all orders
    };


    // Calculate Grand Total and Total Number of Orders
    const grandTotal = users.reduce((acc, user) => acc + calculateTotalAfterSettlement(user.orders), 0);
    const totalOrders = users.reduce((acc, user) => acc + user.orders.length, 0);

    return (
        <>
            <CRow>
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
                        <CCardHeader>Users and Orders</CCardHeader>
                        <CCardBody>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>User</CTableHeaderCell>
                                        <CTableHeaderCell>Total Buy Orders</CTableHeaderCell>
                                        <CTableHeaderCell>Total Sell Orders</CTableHeaderCell>
                                        <CTableHeaderCell>Total After Settlement</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {users.map(user => (
                                        <React.Fragment key={user.userInfo._id}>
                                            <CTableRow onClick={() => toggleRowExpansion(user.userInfo._id)} style={{ cursor: 'pointer' }}>
                                                <CTableDataCell>{user.userInfo.displayName}</CTableDataCell>
                                                <CTableDataCell>{getOrderTotals(user.orders, 'buy')}</CTableDataCell>
                                                <CTableDataCell>{getOrderTotals(user.orders, 'sell')}</CTableDataCell>
                                                <CTableDataCell>₹{calculateTotalAfterSettlement(user.orders).toFixed(2)}</CTableDataCell>
                                            </CTableRow>
                                            {expandedUserId === user.userInfo._id && (
                                                user.orders.map((order, index) => (
                                                    <CTableRow key={`details-${user.userInfo._id}-${index}`}>
                                                        <CTableDataCell colSpan={4}>
                                                            <div>Order ID: {order._id}</div>
                                                            <div>Type: {order.orderType}</div>
                                                            <div>Price: ₹{order.price}</div>
                                                            <div>Qty: {order.qty}</div>
                                                            <div>Profit: ₹{order.profit}</div>
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                ))
                                            )}
                                        </React.Fragment>
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

export default OrderUsers;
