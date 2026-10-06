import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/auth/profile", { withCredentials: true })
      .then(({ data }) => {
        if (data.Status) 
          setProfile(data.Result);
        else 
          setError(data.Error || "Unable to load profile.");
      })
      .catch(() => setError("Unable to load profile. Please sign in again."));
  }, []);

  


  if (error) {
    return (
      <main className="container py-4 py-lg-5">
        <section className="alert alert-danger d-flex align-items-start gap-3 shadow-sm" role="alert">
          <i className="bi bi-exclamation-circle-fill fs-4" aria-hidden="true" />
          <div>
            <h1 className="h5 mb-1">Profile unavailable</h1>
            <p className="mb-3">{error}</p>
            <Link to="/login" className="btn btn-danger btn-sm">
              <i className="bi bi-box-arrow-in-right me-2" aria-hidden="true" />Return to login
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="container py-5">
        <div className="d-flex align-items-center gap-3 text-secondary" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Loading profile...</span>
        </div>
      </main>
    );
  }

  const displayName = profile.name || profile.email || "Administrator";
  const initials = displayName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <main className="container-fluid px-3 px-lg-4 py-4 py-lg-5">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <p className="text-uppercase text-success fw-semibold small mb-2">Account</p>
          <h1 className="h2 fw-bold mb-1">My profile</h1>
          <p className="text-secondary mb-0">Your administrator account and sign-in details.</p>
        </div>
        <Link to="/dashboard/employees" className="btn btn-outline-success">
          <i className="bi bi-people me-2" aria-hidden="true" />Manage employees
        </Link>
      </header>

      <section className="card border-0 shadow-sm mb-4" aria-label="Account overview">
        <div className="card-body p-4 p-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-auto">
              <div className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center fw-bold fs-3"
                style={{ width: 88, height: 88 }} aria-hidden="true">
                {initials || "A"}
              </div>
            </div>
            <div className="col">
              <span className="badge text-bg-success rounded-pill mb-2">
                <i className="bi bi-check-circle-fill me-1" aria-hidden="true" />Active administrator
              </span>
              <h2 className="h3 fw-bold mb-1">{displayName}</h2>
              <p className="text-secondary mb-0">{profile.email}</p>
            </div>
            <div className="col-12 col-lg-auto border-top border-lg-top-0 pt-3 pt-lg-0">
              <p className="small text-uppercase text-secondary fw-semibold mb-1">Account ID</p>
              <p className="font-monospace fw-semibold mb-0">ADM-{String(profile.id).padStart(4, "0")}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <section className="card border-0 shadow-sm h-100" aria-labelledby="profile-details-title">
            <div className="card-header bg-white border-0 px-4 pt-4 pb-0">
              <p className="text-uppercase text-success fw-semibold small mb-2">Personal information</p>
              <h2 id="profile-details-title" className="h5 fw-bold mb-0">Account details</h2>
            </div>
            <div className="card-body px-4 py-3">
              <dl className="mb-0">
                <div className="row py-3 border-bottom">
                  <dt className="col-sm-5 text-secondary fw-normal"><i className="bi bi-person me-2" aria-hidden="true" />Full name</dt>
                  <dd className="col-sm-7 fw-semibold mb-0">{displayName}</dd>
                </div>
                <div className="row py-3 border-bottom">
                  <dt className="col-sm-5 text-secondary fw-normal"><i className="bi bi-envelope me-2" aria-hidden="true" />Email address</dt>
                  <dd className="col-sm-7 fw-semibold mb-0 text-break">{profile.email}</dd>
                </div>
                <div className="row py-3">
                  <dt className="col-sm-5 text-secondary fw-normal"><i className="bi bi-shield-check me-2" aria-hidden="true" />Account role</dt>
                  <dd className="col-sm-7 fw-semibold mb-0">Administrator</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
        <div className="col-12 col-xl-4">
          <section className="card border-0 shadow-sm h-100" aria-label="Account security">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-center rounded-3 bg-success-subtle text-success mb-3"
                style={{ width: 48, height: 48 }} aria-hidden="true">
                <i className="bi bi-lock fs-5" />
              </div>
              <h2 className="h5 fw-bold mb-2">Account security</h2>
              <p className="text-secondary mb-4">Your account is protected by your administrator sign-in.</p>
              <div className="d-flex align-items-center justify-content-between border-top pt-3">
                <span className="text-secondary small">Security status</span>
                <span className="badge text-bg-success rounded-pill">Protected</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;