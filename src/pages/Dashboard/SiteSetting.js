import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AdminApp from './AdminApp';

const SiteSettings = () => {
    const [generalInfo, setGeneralInfo] = useState({
        companyName: 'Nthome express',
        supportEmail: 'info@nthome.com',
        supportPhone: '+27 84 234 6914 / +27 84 234 6918'
    });

    const [notifications, setNotifications] = useState({
        driverNotifications: true,
        riderNotifications: true,
        promoNotifications: false
    });

    const [fareSettings, setFareSettings] = useState({
        baseFareBlack: 100,
        baseFareX: 20,
        perKMRateBlack: 15.00,
        perKMRateX: 10.00,
        perMonthRate: 1500,
        perWeekRate: 400,
        workingHours: 10,
        cancellationFee: 5
    });

    useEffect(() => {
        fetchCurrentSettings();
    }, []);

    const fetchCurrentSettings = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/update_settings');
            const { data } = response;

            setGeneralInfo({
                companyName: data.companyName,
                supportEmail: data.supportEmail,
                supportPhone: data.supportPhone
            });

            setNotifications({
                driverNotifications: data.driverNotifications,
                riderNotifications: data.riderNotifications,
                promoNotifications: data.promoNotifications
            });

            setFareSettings({
                baseFareBlack: data.baseFareBlack,
                baseFareX: data.baseFareX,
                perKMRateBlack: data.perKMRateBlack,
                perKMRateX: data.perKMRateX,
                perMonthRate: data.perMonthRate,
                perWeekRate: data.perWeekRate,
                workingHours: data.workingHours,
                cancellationFee: data.cancellationFee
            });

        } catch (error) {
            console.error('Error fetching settings:', error);
            toast.error('Error fetching settings');
        }
    };

    const handleGeneralInfoChange = (e) => {
        const { name, value } = e.target;
        setGeneralInfo({ ...generalInfo, [name]: value });
    };

    const handleNotificationsChange = (e) => {
        const { name, checked } = e.target;
        setNotifications({ ...notifications, [name]: checked });
    };

    const handleFareSettingsChange = (e) => {
        const { name, value } = e.target;
        setFareSettings({ ...fareSettings, [name]: parseFloat(value) });
    };

    const handleSaveSettings = async () => {
        const settingsData = {
            ...generalInfo,
            ...notifications,
            ...fareSettings
        };
    
        try {
            const response = await axios.post('http://localhost:8085/api/update_settings', settingsData);
            console.log('Settings saved:', response.data);
            toast.success('Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Error saving settings');
        }
    };

    return (
        <AdminApp>
            <div className="container py-5 mb-5 mt-5">
                <Toaster />
                <h2 className="mb-4 text-dark">Site Settings</h2>
                <div className="d-flex justify-content-between mb-3">
                    <div><Link to="/adminapp" className="btn btn-outline-primary float-left py- mb-">Back</Link></div>
                </div>

                <div className="mb-4">
                    <h4>General Information</h4>
                    <div className="form-group">
                        <h6 className="form-label">Company Name</h6>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            className="form-control"
                            value={generalInfo.companyName}
                            onChange={handleGeneralInfoChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Support Email</h6>
                        <input
                            type="email"
                            id="supportEmail"
                            name="supportEmail"
                            className="form-control"
                            value={generalInfo.supportEmail}
                            onChange={handleGeneralInfoChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Support Phone</h6>
                        <input
                            type="text"
                            id="supportPhone"
                            name="supportPhone"
                            className="form-control"
                            value={generalInfo.supportPhone}
                            onChange={handleGeneralInfoChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h4>Notification Preferences</h4>
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            id="driverNotifications"
                            name="driverNotifications"
                            className="form-check-input"
                            checked={notifications.driverNotifications}
                            onChange={handleNotificationsChange}
                        />
                        <label className="form-check-label text-dark" htmlFor="driverNotifications">Driver Notifications</label>
                    </div>
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            id="riderNotifications"
                            name="riderNotifications"
                            className="form-check-input"
                            checked={notifications.riderNotifications}
                            onChange={handleNotificationsChange}
                        />
                        <label className="form-check-label text-dark" htmlFor="riderNotifications">Rider Notifications</label>
                    </div>
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            id="promoNotifications"
                            name="promoNotifications"
                            className="form-check-input"
                            checked={notifications.promoNotifications}
                            onChange={handleNotificationsChange}
                        />
                        <label className="form-check-label text-dark" htmlFor="promoNotifications">Promotional Notifications</label>
                    </div>
                </div>

                <div className="mb-4">
                    <h4>Ride Fare Settings</h4>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Per KM Rate Nthome Black (R)</h6>
                        <input
                            type="number"
                            id="perKMRateBlack"
                            name="perKMRateBlack"
                            className="form-control"
                            value={fareSettings.perKMRateBlack}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Per KM Rate Nthome X (R)</h6>
                        <input
                            type="number"
                            id="perKMRateX"
                            name="perKMRateX"
                            className="form-control"
                            value={fareSettings.perKMRateX}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                    <h4 className="mt-3">Driver Fare Settings</h4>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Working Hours (Daily)</h6>
                        <input
                            type="number"
                            id="workingHours"
                            name="workingHours"
                            className="form-control"
                            value={fareSettings.workingHours}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Base Fare Nthome Black (R)</h6>
                        <input
                            type="number"
                            id="baseFareBlack"
                            name="baseFareBlack"
                            className="form-control"
                            value={fareSettings.baseFareBlack}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Base Fare Nthome X (R)</h6>
                        <input
                            type="number"
                            id="baseFareX"
                            name="baseFareX"
                            className="form-control"
                            value={fareSettings.baseFareX}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Per Week Rate (R)</h6>
                        <input
                            type="number"
                            id="perWeekRate"
                            name="perWeekRate"
                            className="form-control"
                            value={fareSettings.perWeekRate}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Per Month Rate (R)</h6>
                        <input
                            type="number"
                            id="perMonthRate"
                            name="perMonthRate"
                            className="form-control"
                            value={fareSettings.perMonthRate}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <h6 className="form-label">Cancellation Fee</h6>
                        <input
                            type="number"
                            id="cancellationFee"
                            name="cancellationFee"
                            className="form-control"
                            value={fareSettings.cancellationFee}
                            onChange={handleFareSettingsChange}
                        />
                    </div>
                </div>

                <button className="btn btn-primary" onClick={handleSaveSettings}>Save Settings</button>
            </div>
        </AdminApp>
    );
};

export default SiteSettings;
