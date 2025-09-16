import React, { useState } from "react";
import { notifyError, notifySuccess } from "../utils/toast";
import LoginServices from "../services/LoginServices";

function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            notifyError("New Password and Confirm Password do not match");
            return;
        }

        try {
            let res;
            if (role === "operations") {
                res = await LoginServices.ChangeOperationalGuyPassword({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                });
            } else if (role === "admin") {
                res = await LoginServices.ChangeAdminPassword({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                });
            }

            if (res?.success) {
                notifySuccess("Password changed successfully!");
                setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                notifyError(res?.message || "Failed to change password");
            }
        } catch (err) {
            notifyError(err?.response?.data?.message || err.message);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="border rounded p-2"
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="border rounded p-2"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border rounded p-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
