import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobId } = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prevData) => ({ ...prevData, resume: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePostApplication = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    dispatch(postApplication(form, jobId));
  };

  useEffect(() => {
    console.log("User: ", user);
    console.log("isAuthenticated: ", isAuthenticated);
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        coverLetter: user.coverLetter || "",
      }));
    }

    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      navigateTo(`/jobs/${jobId}`);
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user, navigateTo]);

  const qualifications = useMemo(
    () => (singleJob.qualifications ? singleJob.qualifications.split(". ") : []),
    [singleJob.qualifications]
  );
  const responsibilities = useMemo(
    () => (singleJob.responsibilities ? singleJob.responsibilities.split(". ") : []),
    [singleJob.responsibilities]
  );
  const offering = useMemo(
    () => (singleJob.offers ? singleJob.offers.split(". ") : []),
    [singleJob.offers]
  );

  return (
    <article className="application_page">
      <form onSubmit={handlePostApplication}>
        <h3>Application Form</h3>
        <div>
          <label htmlFor="jobTitle">Job Title</label>
          <input type="text" id="jobTitle" placeholder={singleJob.title} disabled />
        </div>
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        {isAuthenticated && user.role === "Job Seeker" ? (
          <>
            <div>
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={10}
              />
            </div>
            <div>
              <label htmlFor="resume">Resume</label>
              <input
                id="resume"
                name="resume"
                type="file"
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <p style={{ color: "red", fontWeight: "bold", marginBottom: "1rem" }}>
          It looks like you’re not logged in as a Job Seeker. To apply for jobs, please log in with your Job Seeker account.
        </p>
        
        )}

        {isAuthenticated && user.role === "Job Seeker" && (
          <div style={{ alignItems: "flex-end" }}>
            <button
              className="btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          </div>
        )}
      </form>

      <div className="job-details">
        <header>
          <h3>{singleJob.title}</h3>
          {singleJob.personalWebsite && (
            <Link target="_blank" to={singleJob.personalWebsite.url}>
              {singleJob.personalWebsite.title}
            </Link>
          )}
          <p>{singleJob.location}</p>
          <p>Rs. {singleJob.salary} a month</p>
        </header>
        <hr />
        <section>
          <div className="wrapper">
            <h3>Job Details</h3>
            <div>
              <IoMdCash />
              <div>
                <span>Pay</span>
                <span>{singleJob.salary} a month</span>
              </div>
            </div>
            <div>
              <FaToolbox />
              <div>
                <span>Job Type</span>
                <span>{singleJob.jobType}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Location</h3>
            <div className="location-wrapper">
              <FaLocationDot />
              <span>{singleJob.location}</span>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Full Job Description</h3>
            <p>{singleJob.introduction}</p>
            {qualifications.length > 0 && (
              <div>
                <h4>Qualifications</h4>
                <ul>
                  {qualifications.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {responsibilities.length > 0 && (
              <div>
                <h4>Responsibilities</h4>
                <ul>
                  {responsibilities.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {offering.length > 0 && (
              <div>
                <h4>Offering</h4>
                <ul>
                  {offering.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <hr />
        <footer>
          <h3>Job Niche</h3>
          <p>{singleJob.jobNiche}</p>
        </footer>
      </div>
    </article>
  );
};

export default PostApplication;

